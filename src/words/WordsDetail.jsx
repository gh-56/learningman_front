import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../api/ApiClient';
import SentenceShow from './SentenceShow';
import SenteceNew from './SenteceNew';

function WordsDetail() {
  const { id } = useParams();
  const [wordData, setWordData] = useState('');
  const [kword, setKword] = useState('');
  const [eword, setEword] = useState('');

  const details = async () => {
    try {
      const response = await apiClient.get(`/api/words/${id}`);
      console.log('quizData : ', response.data);
      setWordData(response.data);
    } catch (error) {
      console.error('details error : ', error);
    }
  };

  const edit = async () => {
    try {
      const response = await apiClient.patch(`/api/words/${id}`, {
        kword: kword,
        eword: eword,
      });
      console.log('patch data: ', response.data);
    } catch (error) {
      console.error('edit error : ', error);
    }
  };
  useEffect(() => {
    details();
  }, []);

  const onChangeHandlerKword = (e) => {
    setKword(e.target.value);
  };
  const onChangeHandlerEword = (e) => {
    setEword(e.target.value);
  };
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
      <form onSubmit={edit}>
        <div className='mb-3'>
          <label className='form-label'>단어(한국어)</label>
          <input
            name='kword'
            type='text'
            className='form-control'
            value={kword}
            onChange={onChangeHandlerKword}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>단어(영어)</label>
          <input
            name='eword'
            type='text'
            className='form-control'
            value={eword}
            onChange={onChangeHandlerEword}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          단어 제출
        </button>
      </form>
      <SentenceShow />
      <SenteceNew />
    </div>
  );
}

export default WordsDetail;
