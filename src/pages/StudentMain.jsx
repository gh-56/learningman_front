import React, { useEffect, useState } from 'react';
import { getCookie } from '../cookies/CookieFunction';
import axios from 'axios';
import serverConfig from '../config/serverConfig';
import './StudentMain.css';

function StudentMain() {
  const baseUrl = serverConfig.serverUrl + ':8080';

  const [wrongQuizList, setWrongQuizList] = useState([]);
  const quizInfo = async () => {
    try {
      const response = await axios.get(baseUrl + '/mywrongquiz', {
        headers: {
          Authorization: getCookie('tokenKey'),
        },
      });
      console.log('/quiz/test에서 받은 데이터: ', response.data);
      setWrongQuizList(response.data);
    } catch (error) {
      console.error('details error : ', error);
    }
  };

  useEffect(() => {
    quizInfo();
  }, []);

  return (
    <div className='studentmain-div'>
      <h2 className='title-wrong'>이번 과제 중 틀린 문제</h2>
      <div className='wrong-container'>
        {wrongQuizList &&
          wrongQuizList.map((value) => (
            <div>
              <div className='flip-card'>
                <div className='card-front'>{value[0]}</div>
                <div className='card-back'>{value[1]}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default StudentMain;
