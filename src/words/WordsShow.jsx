import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { Link } from 'react-router-dom';
import './WordsShow.css';

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
    <div className='word-item1'>
      <h2>예문 만들기</h2>
      <div className='wordList-container'>
        {wordList.map((list) => (
          <Link to={`/words/${list.id}`}>
            <div className='wordList' key={list.id}>
              <div>{list.kword}</div>
              <div>{list.eword}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WordsShow;
