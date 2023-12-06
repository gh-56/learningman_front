import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { getCookie } from '../cookies/CookieFunction';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';
import serverConfig from '../config/serverConfig';

function StudentMain() {
  const baseUrl = serverConfig.serverUrl + ':8080';

  const [wrongQuizList, setWrongQuizList] = useState(null);

  const quizInfo = async () => {
    try {
      const response = await axios.get(baseUrl + '/mywrongquiz', {
        headers: {
          Authorization: getCookie('tokenKey'),
        },
      });
      console.log('/quiz/test에서 받은 데이터: ', response.data);
      setWrongQuizList(
        response.data.map((value) => (
          <div>
            <div>{value[0]}</div>
            <div>{value[1]}</div>
          </div>
        ))
      );
    } catch (error) {
      console.error('details error : ', error);
    }
  };

  useEffect(() => {
    quizInfo();
  }, []);

  return (
    <div>
      <h1>이번 과제에서 틀린 문제</h1>
      {wrongQuizList && <div>{wrongQuizList}</div>}
    </div>
  );
}

export default StudentMain;
