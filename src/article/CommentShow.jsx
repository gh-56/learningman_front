import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/ApiClient';

function CommentShow() {
  const [commentList, setCommentList] = useState([]);

  const show = async () => {
    try {
      const response = await apiClient.get('/api/articles');
      console.log(response.data);
      setCommentList(response.data);
    } catch (error) {
      console.error('show error : ', error);
    }
  };
  useEffect(() => {
    show();
  }, []);
  return <div>CommentShow</div>;
}

export default CommentShow;
