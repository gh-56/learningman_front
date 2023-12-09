import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../cookies/CookieFunction';
import { apiClient, myPageApi } from '../api/ApiClient';

function SentenceShow() {
  const [sentenceList, setSentenceList] = useState([]);
  const [memberInfo, setMemberInfo] = useState('');
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
        const response = await apiClient.get(`/api/words/${id}/sentence`);
        console.log('sentenceList', response.data);
        setSentenceList(response.data);
      } catch (error) {
        console.error('show error : ', error);
      }
    };
    const myInfo = async () => {
      try {
        const response = await myPageApi();
        console.log('myInfo ', response.data);
        setMemberInfo(response.data);
      } catch (error) {
        console.error('myInfo error', error);
      }
    };
    show();
    myInfo();
  }, [id]);
  return (
    <div id='comments-list'>
      {sentenceList.map((list) => (
        <div className='card m-2' key={list.id}>
          <div className='card-header'>작성자: {memberInfo.memberName}</div>
          <div className='card-body'>{list.body}</div>
        </div>
      ))}
    </div>
  );
}

export default SentenceShow;
