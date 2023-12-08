import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../cookies/CookieFunction';
import { apiClient } from '../api/ApiClient';

function SenteceNew() {
  const { id } = useParams();
  const [nickname, setNickName] = useState('');
  const [body, setBody] = useState('');
  const formSubmit = async (e) => {
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });
    e.preventDefault();
    apiClient
      .post(`/api/words/${id}/sentence`, {
        nickname: nickname,
        body: body,
        wordId: id,
      })
      .then((response) => {
        console.log('sentence : ', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onChangeHandlerNickname = (e) => {
    setNickName(e.target.value);
  };
  const onChangeHandlerBody = (e) => {
    setBody(e.target.value);
  };
  return (
    <div className='card m-2' id='comments-new'>
      <div className='card-body'>
        {/* 댓글 작성 폼 */}
        <form onSubmit={formSubmit}>
          {/* 닉네임 입력 */}
          <div className='mb-3'>
            <label className='form-label'>닉네임</label>
            <input
              name='nickname'
              type='text'
              value={nickname}
              className='form-control'
              id='new-comment-nickname'
              onChange={onChangeHandlerNickname}
            />
          </div>
          {/* 댓글 본문 입력 */}
          <div className='mb-3'>
            <label className='form-label'>댓글 내용</label>
            <textarea
              name='body'
              type='text'
              value={body}
              className='form-control'
              rows='3'
              id='new-comment-body'
              onChange={onChangeHandlerBody}
            ></textarea>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            id='comment-create-btn'
          >
            댓글 작성
          </button>
        </form>
      </div>
    </div>
  );
}

export default SenteceNew;
