import React, { useState } from 'react';
import { apiClient } from '../api/ApiClient';

function WordsRegister() {
  const [kword, setKword] = useState('');
  const [eword, setEword] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    await apiClient
      .post('/api/words', {
        kword: kword,
        eword: eword,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeHandlerKword = (e) => {
    setKword(e.target.value);
  };
  const onChangeHandlerEword = (e) => {
    setEword(e.target.value);
  };
  return (
    <div>
      <form onSubmit={formSubmit}>
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

export default WordsRegister;
