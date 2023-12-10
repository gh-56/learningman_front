import React, { useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { setCookie, getCookie, removeCookie } from '../cookies/CookieFunction';
import './ArticleRegister.css';

function ArticleRegister({
  editState,
  setEditState,
  editContent,
  setEditContent,
  editTitle,
  setEditTitle,
  editArticleId,
  setEditArticleId,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    await apiClient
      .post(
        '/api/articles',
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: getCookie('tokenKey'),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formEdit = async (e) => {
    e.preventDefault();
    await apiClient
      .post(
        '/api/editarticles',
        {
          id: editArticleId,
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: getCookie('tokenKey'),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
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
  const onChangeHandlerEditTitle = (e) => {
    setEditTitle(e.target.value);
  };
  const onChangeHandlerEditContent = (e) => {
    setEditContent(e.target.value);
  };

  return (
    <div className='article-item2'>
      <h2 className='title-add-article'>글 쓰기</h2>
      {editState ? (
        <form onSubmit={formEdit}>
          <div className='mb-3'>
            <label className='form-label'>제목</label>
            <input
              name='title'
              type='text'
              className='form-control'
              value={editTitle}
              onChange={onChangeHandlerEditTitle}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>내용</label>
            <textarea
              name='content'
              type='text'
              className='form-control'
              value={editContent}
              rows='5'
              onChange={onChangeHandlerEditContent}
            ></textarea>
          </div>
          <button type='submit' className='article-register-button'>
            수정하기
          </button>
        </form>
      ) : (
        <form onSubmit={formSubmit}>
          <div className='mb-3'>
            <label className='form-label'>제목</label>
            <input
              name='title'
              type='text'
              className='form-control'
              value={title}
              onChange={onChangeHandlerTitle}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>내용</label>
            <textarea
              name='content'
              type='text'
              className='form-control'
              value={content}
              rows='5'
              onChange={onChangeHandlerContent}
            ></textarea>
          </div>
          <button type='submit' className='article-register-button'>
            등록하기
          </button>
        </form>
      )}
    </div>
  );
}

export default ArticleRegister;
