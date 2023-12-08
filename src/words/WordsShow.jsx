import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { Link } from 'react-router-dom';

function WordsShow() {
  const [wordList, setWordList] = useState([]);

  const show = async () => {
    try {
      const response = await apiClient.get('/api/words');
      console.log('wordList : ', response.data);
      setWordList(response.data);
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
          {wordList.map((list) => (
            <tr key={list.id}>
              <td>
                <Link to={`/words/${list.id}`}>{list.kword} </Link>
              </td>
              <td>{list.eword}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WordsShow;
