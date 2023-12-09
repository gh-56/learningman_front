import { useEffect, useState, useRef } from 'react';
import { studentInfo } from '../api/ApiClient';
import { getCookie } from '../cookies/CookieFunction';
import { apiClient } from '../api/ApiClient';
import basicImg from '../baseImg/basicImg.jpg';
import './TeacherMain.css';
import './ModalBack.css';
import StudentQuizModal from '../components/StudentQuizModal';
import serverConfig from '../config/serverConfig';

function TeacherMain() {
  const [student, setStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [studentWrongIndexList, setStudentWrongIndexList] = useState([]);
  const modalRef = useRef(null);

  // 모달창 노출
  const showModal = (info) => {
    setStudentWrongIndexList(info.wrongIndexList);
    setModalOpen(true);
  };

  const callApi = async () => {
    // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });

    const response = await studentInfo();

    for (let index = 0; index < response.data.length; index++) {
      if (response.data[index].memberProfileImg === null) {
        response.data[index].memberProfileImg = 'null';
      }
    }

    setStudent(
      response.data.map((value) => (
        <div className='card-element' onClick={() => showModal(value)}>
          {value.memberProfileImg !== 'null' ? (
            <img
              src={
                serverConfig.serverUrl + `:8080${value.memberProfileImg.imgUrl}`
              }
              className='card-img-top'
              alt='현재 프로필 이미지 없음'
            />
          ) : (
            <img
              src={basicImg}
              className='card-img-top'
              alt='기본 프로필 이미지 없음'
            />
          )}
          <h2 className='card-h2-list'>{value.memberName}</h2>
          <div className='card-email-list'>{value.memberEmail}</div>
          {value.homework === null ? null : value.done === false ? (
            <div className='resultF'>F</div>
          ) : (
            <div>
              <div className='resultP'>P</div>
              <h3 className='score'>점수 : {value.quizScore}점</h3>
            </div>
          )}
        </div>
      ))
    );
  };

  const modalOutSideClick = (e) => {
    console.log(e);
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <h2>학생 리스트</h2>
      {student && <div className='card-list'>{student}</div>}
      {modalOpen && (
        <div
          ref={modalRef}
          onClick={(e) => modalOutSideClick(e)}
          className='modalback'
        >
          <StudentQuizModal
            setModalOpen={setModalOpen}
            wrongIndexList={studentWrongIndexList}
            modalOpen={modalOpen}
          />
        </div>
      )}
    </div>
  );
}
export default TeacherMain;
