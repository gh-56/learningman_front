import React, { useEffect, useState } from 'react';
import { apiClient, myPageApi } from '../api/ApiClient';
import { Await, useParams } from 'react-router-dom';
import { getCookie } from '../cookies/CookieFunction';
import './CommentShow.css';

function CommentShow() {
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState(null);
  const [editCommentState, setEditCommentState] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const params = useParams();
  const id = params.id;
  const [myId, setMyId] = useState();

  const myInfo = async () => {
    const response = await myPageApi();
    console.log(response);
    setMyId(response.data.memberId);
  };

  const onClickEditComment = (list) => {
    setEditCommentContent(list.body);
    setEditCommentId(list.id);
    setEditCommentState(true);
  };

  const onChangeEditComment = (e) => {
    setEditCommentContent(e.target.value);
  };

  const onClickDeleteComment = async (list) => {
    console.log(list.id);
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const response = await apiClient
        .post(
          '/api/deletecomment',
          {
            id: list.id,
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
      alert('삭제되었습니다');
    }
  };

  const onClickEditCommentDone = async (e) => {
    // e.preventDefault();
    if (editCommentContent === null || editCommentContent.trim() === '') {
      alert('댓글을 작성해주십시오');
    } else {
      const response = await apiClient
        .post(
          '/api/editcomment',
          {
            id: editCommentId,
            body: editCommentContent,
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
    }
  };

  const onClickEditCommentCancel = () => {
    setEditCommentState(false);
  };

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
    myInfo();
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
              {editCommentState && editCommentId === list.id ? (
                <input
                  type='text'
                  value={editCommentContent}
                  onChange={onChangeEditComment}
                />
              ) : (
                <div className='commentshow-body'>{list.body}</div>
              )}
              {list.member.memberId === myId ? (
                editCommentState ? (
                  <div>
                    <button onClick={() => onClickEditCommentDone(list)}>
                      수정 완료
                    </button>
                    <button onClick={() => onClickEditCommentCancel(list)}>
                      취소
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => onClickEditComment(list)}>
                      수정
                    </button>
                    <button onClick={() => onClickDeleteComment(list)}>
                      삭제
                    </button>
                  </div>
                )
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentShow;
