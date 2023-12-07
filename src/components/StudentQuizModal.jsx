import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { getCookie } from '../cookies/CookieFunction';
import axios, { AxiosError } from 'axios';
import './StudentQuizModal.css';
import serverConfig from '../config/serverConfig';

function StudentQuizModal({ setModalOpen, wrongIndexList, modalOpen }) {
  const baseUrl = serverConfig.serverUrl + ':8080';
  const [wrongQuizList, setWrongQuizList] = useState(null);
  const [listSize, setListSize] = useState(null);

  const quizInfo = async () => {
    try {
      const response = await axios.post(
        baseUrl + '/teacher/wrongquiz',
        {
          wrongIndexList: wrongIndexList,
        },
        {
          headers: {
            Authorization: getCookie('tokenKey'),
          },
        }
      );
      console.log('/quiz/test에서 받은 데이터: ', response.data);
      setWrongQuizList(response.data);
      setListSize(response.data.length);
    } catch (error) {
      console.error('details error : ', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    quizInfo();
  }, []);

  return (
    <div>
      <div className='container'>
        {wrongIndexList === null ? null : ( // <div>아직 과제를 하지 않았습니다</div>
          <div className='modal-container'>
            <h2 className='listSize'>틀린 문제 개수 : {listSize}</h2>
            {wrongQuizList &&
              wrongQuizList.map((value) => (
                <div className='modal-item'>
                  <div className='modal-front'>{value[0]}</div>
                  <div className='modal-back'>{value[1]}</div>
                </div>
              ))}
          </div>
        )}
        {/* <button className='close' onClick={closeModal}>
          X
        </button> */}
      </div>
    </div>
  );
}

export default StudentQuizModal;
