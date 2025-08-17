import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/v1' });
export const fetchContent = (page = 1, limit = 1000) => API.get(`/questions/?page=${page}&limit=${limit}`);
export const registerUser = (name: string, email: string, password: string) => API.post('/auth/register/', { name, email, password })
export const loginUser = (email: string, password: string) => API.post('/auth/login/', { email, password })