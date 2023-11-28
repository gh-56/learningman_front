import axios from 'axios';
import React, { useEffect, useState } from 'react';

function QuizShow() {
  const baseUrl = 'http://localhost:8080';
  const [quizList, setQuizList] = useState([]);

  const show = async () => {
    try {
      const response = await axios.get(baseUrl + '/api/articles');
      console.log(response.data);
      setQuizList(response.data);
    } catch (error) {
      console.error('show error : ', error);
    }
  };
  useEffect(() => {
    show();
  }, []);
  return (
    <div>
      <h2>문제 확인</h2>
      <table className='table'>
        <thead>
          <tr>
            {/* <th>번호</th> */}
            <th>단어(한국어)</th>
            <th>단어(영어)</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((list) => (
            <tr key={list.id}>
              {/* <th>{list.id}</th> */}
              <td>{list.title}</td>
              <td>{list.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizShow;
