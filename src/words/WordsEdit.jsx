import React, { useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { useParams } from 'react-router-dom';

function WordsEdit() {
  const { id } = useParams();
  const [kword, setKword] = useState('');
  const [eword, setEword] = useState('');
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
  const onChangeHandlerKword = (e) => {
    setKword(e.target.value);
  };
  const onChangeHandlerEword = (e) => {
    setEword(e.target.value);
  };
  return (
    <div>
      {' '}
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
    </div>
  );
}

export default WordsEdit;
