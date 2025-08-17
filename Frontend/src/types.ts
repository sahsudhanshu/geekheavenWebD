export type Page = 'home' | 'login' | 'register';
export type NavigateFunction = (page: Page) => void;

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface AuthContextType {
    userInfo: UserInfo | null;
    login: (userData: UserInfo) => void;
    logout: () => void;
}


export interface Question {
    _id: string;
    title: string;
    url: string;
    category: {
        _id: string;
        title: string;
    };
}

export interface ApiResponse {
    questions: Question[];
    page: number;
    pages: number;
    total: number;
}