import { useEffect, useState } from 'react';
import { studentInfo } from '../api/ApiClient';
import { getCookie } from '../cookies/CookieFunction';
import { apiClient } from '../api/ApiClient';
import basicImg from '../baseImg/basicImg.jpg';
import './TeacherMain.css';

function TeacherMain() {
  const [student, setStudent] = useState(null);

  const callApi = async () => {
    // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });

    const response = await studentInfo();
    console.log(response.data);

    for (let index = 0; index < response.data.length; index++) {
      if (response.data[index].memberProfileImg === null) {
        response.data[index].memberProfileImg = 'null';
      }
    }

    setStudent(
      response.data.map((value) => (
        <div className='card-element'>
          {value.memberProfileImg !== 'null' ? (
            <img
              src={`http://43.200.5.111:8080${value.memberProfileImg.imgUrl}`}
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

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <br />
      <h2>학생 리스트</h2>
      {student && <div className='card-list'>{student}</div>}
    </div>
  );
}

export default TeacherMain;
