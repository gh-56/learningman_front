import {createContext, useContext, useState } from 'react';
import { apiClient, authenticateApi } from '../api/ApiClient';
import axios from 'axios';

// 인증 컨텍스트 생성
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = async (username, password) =>{
        try{
            const response = await authenticateApi(username, password);
            console.log(response);

            if(response.status === 200){
                const jwtToken = 'Bearer' + response.data.token;
                console.log('인증 성공했습니다');
                setIsAuthenticated(true);
                setToken(jwtToken);
                console.log(jwtToken);

                apiClient.interceptors.request.use((config) => {
                    console.log('인터셉터하여 헤더에 토큰 정보 추가');
                    config.headers.Authorization = jwtToken;
                    return config;
                });
                return true;
            } else{
                console.log('인증 실패했습니다');
                setIsAuthenticated(false);
                setToken(null);
                return false;
            }
        } catch(error){
            console.log(error);
            console.log("에러 발생");
        }
    };

    const logout = () =>{
        console.log("로그아웃되었습니다");
        setIsAuthenticated(false);
        setToken(null);
        axios.interceptors.request.clear();
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}