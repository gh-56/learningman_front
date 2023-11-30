import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/ApiClient';

function ArticleShow() {
  const [quizList, setQuizList] = useState([]);

  const show = async () => {
    try {
      const response = await apiClient.get('/api/articles');
      console.log('quizList : ', response.data);
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
              <td>
                <Link to={`/articles/${list.id}`}>{list.title} </Link>
              </td>
              <td>{list.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArticleShow;
