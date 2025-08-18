import API from './customFetch.tsx'

export const fetchQues = (page = 1, limit = 1000) => API.get(`/questions/?page=${page}&limit=${limit}`);
export const searchQues = ({ query, page = 1, limit = 1000, sort, signal }: { query: string; page?: number; limit?: number; sort?: string, signal?: AbortSignal }) => {
    let url = `/questions/?search=${query}&page=${page}&limit=${limit}`
    if (sort) {
        url += `&sortBy=title:${sort}`
    } 
    return API.get(url, false, signal)
};
export const fetchCategories = (page = 1, limit = 1000) => API.get(`/categories/?page=${page}&limit=${limit}`);
export const registerUser = (name: string, email: string, password: string) => API.post('/auth/register/', { name, email, password })
export const loginUser = (email: string, password: string) => API.post('/auth/login/', { email, password })
export const getUserData = () => API.get('/user/data', true)
export const toggleCompletedApi = (questionId: string) => API.post('/user/completed', { questionId }, true)
export const toggleBookmarkedApi = (questionId: string) => API.post('/user/bookmark', { questionId }, true)