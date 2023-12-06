import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://43.200.5.111:8080',
});

export const authenticateApi = (memberEmail, memberPassword) =>
  apiClient.post(`/authenticate`, { memberEmail, memberPassword });

export const myPageApi = () => apiClient.get('/members/info');

export const memberProfileBaseImg = () =>
  apiClient.get('/members/profile/baseimg');

export const memberProfileChange = (formData) =>
  apiClient.post('/members/profile/img', { formData });

export const studentInfo = () => apiClient.post('/teacher/main');

export const studentProfileBaseImg = () => apiClient.get('/teacher/studentImg');

export const infoChange = () => apiClient.post('/members/update');
