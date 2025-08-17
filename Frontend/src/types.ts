export type Page = 'home' | 'login' | 'register' | 'dashboard';
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
    toggleCompleted: (questionId: string) => void;
    toggleBookmark: (questionId: string, question: Question) => void;
    completedQues: string[];
    bookmarkedQues: Question[];
    loading: boolean;
}
export interface Question {
    _id: string;
    title: string;
    url: string;
}
export interface Category {
    _id: string;
    title: string;
    questions: string[]
}

export interface ApiResponse {
    questions: Question[];
    page: number;
    pages: number;
    total: number;
}