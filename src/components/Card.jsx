import axios from 'axios';
import MemberInfo from '../pages/MemberInfo';
import React, { useEffect, useState } from 'react';
import { apiClient, myPageApi } from '../api/ApiClient';
import { getCookie } from '../cookies/CookieFunction';
import { memberProfileBaseImg, memberProfileChange } from '../api/ApiClient';
import basicImg from '../baseImg/basicImg.jpg';
import { useAuth } from '../security/AuthContext';
import TeacherMain from '../pages/TeacherMain';
import './Card.css';
import StudentMain from '../pages/StudentMain';
import serverConfig from '../config/serverConfig';

function Card() {
  const [baseImg, setBaseImg] = useState(null);
  const { role, setRole } = useAuth();
  const [memberDto, setMemberDto] = useState(null);

  const callApi = async () => {
    // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });

    const response = await myPageApi();

    console.log(response);
    setRole(response.data.role);
    setMemberDto(response.data);
  };

  const baseProfileImg = async () => {
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });

    try {
      const response = await memberProfileBaseImg();
      setBaseImg(response.data);
    } catch (error) {
      console.error('baseProfileImg: ', error);
    }
  };

  useEffect(() => {
    baseProfileImg();
    callApi();
  }, []);

  return (
    <div>
      <div className='cards'>
        <div className='card'>
          {baseImg !== null ? (
            <img
              src={serverConfig.serverUrl + `:8080${baseImg}`}
              className='card-img-top'
              alt='현재 프로필 이미지 없음'
            />
          ) : (
            <img
              src={basicImg}
              className='card-img-top'
              alt='기본 프로필 이미지 없음'
            />
          )}
          <div className='card-body'>
            {memberDto && (
              <div>
                <h2 className='card-h2'>{memberDto.memberName}</h2>
                {/* <div>이름 : </div> */}
                <div>이메일 : {memberDto.memberEmail}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {role === 'TEACHER' ? (
        <TeacherMain />
      ) : (
        <div>
          <StudentMain />
        </div>
      )}
    </div>
  );
}

export default Card;
