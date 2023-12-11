import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../api/ApiClient';
import { getCookie } from '../cookies/CookieFunction';
import './CommentNew.css';

function CommentNew() {
  const { id } = useParams();
  const [body, setBody] = useState(null);

  const formSubmit = async (e) => {
    e.preventDefault();
    if (body === null || body === ' ') {
      alert('댓글을 작성해 주십시오');
    } else {
      apiClient.interceptors.request.use((config) => {
        console.log('인터셉터하여 헤더에 토큰 정보 추가');
        config.headers.Authorization = getCookie('tokenKey');
        return config;
      });
      apiClient
        .post(`/api/articles/${id}/comments`, {
          body: body,
          articleId: id,
        })
        .then((response) => {
          console.log('comment : ', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onChangeHandlerBody = (e) => {
    setBody(e.target.value);
  };
  return (
    <div className='comment-new'>
      <div className='comment-new-body'>
        {/* 댓글 작성 폼 */}
        <form onSubmit={formSubmit}>
          {/* 댓글 본문 입력 */}
          <div className='comment-new-div'>
            <textarea
              name='body'
              type='text'
              value={body}
              className='comment-new-textarea'
              placeholder='댓글을 입력해 주세요'
              rows='3'
              id='new-comment-body'
              onChange={onChangeHandlerBody}
            ></textarea>
          </div>
          <button
            type='submit'
            className='comment-create-btn'
            id='comment-create-btn'
          >
            댓글 작성
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentNew;
