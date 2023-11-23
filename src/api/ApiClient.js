import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
});

export const authenticateApi = (username, password) => 
    apiClient.post(`/authenticate`, {username, password});

export const myPageApi = () => apiClient.get('/member/myPage');