import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/v1/' });
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
        req.headers.Authorization = JSON.parse(userInfo).token
    }
    return req;
})
export const fetchContent = (page = 1, limit = 1000) => API.get(`/questions/?page=${page}&limit=${limit}`);
export const registerUser = (name: string, email: string, password: string) => API.post('/auth/register/', { name, email, password })
export const loginUser = (email: string, password: string) => API.post('/auth/login/', { email, password })
export const getUserData = () => API.get('/user/data')
export const toggleCompletedApi= (questionId: string) => API.post('/user/completed', { questionId })
export const toggleBookmarkedApi = (questionId: string) => API.post('/user/bookmark', { questionId })