import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { useParams } from 'react-router-dom';
import { getCookie } from '../cookies/CookieFunction';
import './CommentShow.css';

function CommentShow() {
  const [commentList, setCommentList] = useState([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const show = async () => {
      apiClient.interceptors.request.use((config) => {
        console.log('인터셉터하여 헤더에 토큰 정보 추가');
        config.headers.Authorization = getCookie('tokenKey');
        return config;
      });
      try {
        const response = await apiClient.get(`/api/articles/${id}/comments`);
        console.log('commentList = ', response.data);
        setCommentList(response.data);
      } catch (error) {
        console.error('show error : ', error);
      }
    };
    show();
  }, [id]);

  return (
    <div id='comments-list'>
      <div className='detail-hr'>
        댓글 {commentList && commentList.length}개
      </div>
      {commentList.length === 0 ? (
        <div>댓글이 없습니다.</div>
      ) : (
        <div>
          {commentList.map((list) => (
            <div className='commentshow-list' key={list.id}>
              <div className='commentshow-writer'>{list.member.memberName}</div>
              <div className='commentshow-body'>{list.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentShow;
