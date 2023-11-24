import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
});

export const authenticateApi = (memberEmail, memberPassword) => 
    apiClient.post(`/authenticate`, {memberEmail, memberPassword});

export const myPageApi = () => apiClient.get('/members/info');
