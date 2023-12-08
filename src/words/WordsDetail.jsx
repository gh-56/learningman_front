import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../api/ApiClient';
import SentenceShow from './SentenceShow';
import SenteceNew from './SenteceNew';

function WordsDetail() {
  const { id } = useParams();
  const [wordData, setWordData] = useState('');

  const details = async () => {
    try {
      const response = await apiClient.get(`/api/words/${id}`);
      console.log('quizData : ', response.data);
      setWordData(response.data);
    } catch (error) {
      console.error('details error : ', error);
    }
  };

  useEffect(() => {
    details();
  }, []);

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>번호</th>
            <th>단어(한국어)</th>
            <th>단어(영어)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{wordData.id}</th>
            <td>{wordData.kword}</td>
            <td>{wordData.eword}</td>
          </tr>
        </tbody>
      </table>

      <SentenceShow />
      <SenteceNew />
    </div>
  );
}

export default WordsDetail;
