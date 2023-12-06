import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { apiClient, authenticateApi, myPageApi } from '../api/ApiClient';
import { setCookie, getCookie, removeCookie } from '../cookies/CookieFunction';

// 인증 컨텍스트 생성
const AuthContext = createContext();

// 커스텀 훅 으로 외부로 내보내기
export const useAuth = () => useContext(AuthContext);

// 다른 컴포넌트에 공유할 상태 공급자
export const AuthProvider = ({ children }) => {
  // 상태 1. 인증여부
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [memberScore, setMemberScore] = useState(null);

  // 전달2 : 로그인 함수
  const login = async (memberEmail, memberPassword) => {
    try {
      // 서비스에 인증 요청 => JWT 토큰 응답 (비동기)
      const response = await authenticateApi(memberEmail, memberPassword);

      console.log(response);
      // 정상 응답인 경우 토큰 값을 저장한다.
      if (response.status === 200) {
        // Bearer (JWT 토큰 운반자) 인증
        const jwtToken = 'Bearer ' + response.data.token;
        console.log('인증 성공했습니다.');
        setIsAuthenticated(true);
        setToken(jwtToken);
        setCookie('tokenKey', jwtToken, {
          path: '/',
          maxAge: 3000,
        });
        // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
        apiClient.interceptors.request.use((config) => {
          console.log('인터셉터하여 헤더에 토큰 정보 추가');
          config.headers.Authorization = jwtToken;
          return config;
        });

        const info = await myPageApi();
        setRole(info.data.role);
        setIsDone(info.data.done);
        console.log(info.data.done);
        setMemberScore(info.data.quizScore);
        console.log(info.data.quizScore);
        return true;
      } else {
        console.log('인증 실패했습니다.');
        setIsAuthenticated(false);
        setToken(null);
        return false;
      }
    } catch (error) {
      alert('아이디 혹은 비밀번호를 다시 확인해주세요');
      console.log(error);
      console.log('에러가 발생하였습니다.');
    }
  };
  // 3. 로그아웃 함수 : 인증정보와 토큰 정보 해제
  const logout = () => {
    console.log('로그아웃 되었습니다.');
    removeCookie('tokenKey');
    setIsAuthenticated(false);
    setToken(null);
    axios.interceptors.request.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        role,
        isDone,
        memberScore,
        setRole,
        setMemberScore,
        setIsDone,
        getCookie,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
