import axios from 'axios';
import React, { useState } from 'react';

function QuizRegister() {
  const baseUrl = 'http://localhost:8080';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(baseUrl + '/api/articles', {
        title: title,
        content: content,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeHandlerTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeHandlerContent = (e) => {
    setContent(e.target.value);
  };
  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className='mb-3'>
          <label className='form-label'>단어(한국어)</label>
          <input
            name='title'
            type='text'
            className='form-control'
            value={title}
            onChange={onChangeHandlerTitle}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>단어(영어)</label>
          <input
            name='content'
            type='text'
            className='form-control'
            value={content}
            onChange={onChangeHandlerContent}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          단어 넣기
        </button>
        {/* <a href='/articles'>단어 목록</a> */}
      </form>
    </div>
  );
}

export default QuizRegister;
