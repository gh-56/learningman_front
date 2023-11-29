import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentNew from './CommentNew';
import { apiClient } from '../api/ApiClient';

function ArticleDetail() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState('');

  const details = async () => {
    try {
      const response = await apiClient.get(`/api/articles/${id}`);
      console.log(response.data);
      setQuizData(response.data);
    } catch (error) {
      console.error('details error : ', error);
    }
  };
  useEffect(() => {
    details();
  }, []);
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
            <th>{quizData.id}</th>
            <td>{quizData.title}</td>
            <td>{quizData.content}</td>
          </tr>
        </tbody>
      </table>
      <CommentNew />
    </div>
  );
}

export default ArticleDetail;
