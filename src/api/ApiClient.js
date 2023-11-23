import axios from 'axios';

// API 요청을 할 Client 생성 및 응답해줄 BackEnd url 정의
export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export const authenticateApi = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });

export const profileInfoApi = () => apiClient.get('/members/profile');
