import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export const authenticateApi = (memberEmail, memberPassword) =>
  apiClient.post(`/authenticate`, { memberEmail, memberPassword });

export const myPageApi = () => apiClient.get('/members/info');

export const memberProfileBaseImg = () => apiClient.get('/members/profile/baseimg');