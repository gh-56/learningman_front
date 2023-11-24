import { useEffect, useState } from 'react';
import { apiClient, myPageApi } from '../api/ApiClient';
import { getCookie } from '../cookies/CookieFunction';

function MemberInfo() {
  const [memberDto, setMemberDto] = useState(null);
  const callApi = async () => {
    apiClient.interceptors.request.use((config) => {
      console.log('인터셉터하여 헤더에 토큰 정보 추가');
      config.headers.Authorization = getCookie('tokenKey');
      return config;
    });
    const response = await myPageApi();
    console.log(response);
    setMemberDto(response.data);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      {memberDto && (
        <div>
          <h2>회원정보</h2>
          <div>이메일 : {memberDto.memberEmail}</div>
          <div>이름 : {memberDto.memberName}</div>
        </div>
      )}
    </div>
  );
}

export default MemberInfo;
