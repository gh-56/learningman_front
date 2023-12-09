import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentNew from './CommentNew';
import { apiClient } from '../api/ApiClient';
import CommentShow from './CommentShow';
import './ArticleDetail.css';

function ArticleDetail() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState('');

  const details = async () => {
    try {
      const response = await apiClient.get(`/api/articles/${id}`);
      console.log('quizData : ', response.data);
      setQuizData(response.data);
    } catch (error) {
      console.error('details error : ', error);
    }
  };
  useEffect(() => {
    details();
  }, []);
  return (
    <div className='comment-container'>
      <table className='table'>
        <div>
          <h2>{quizData.title}</h2>
        </div>
        <div>
          <div>{quizData.content}</div>
        </div>
      </table>
      <CommentShow />
      <CommentNew />
    </div>
  );
}

export default ArticleDetail;
