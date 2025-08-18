import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { HomePage, DashboardPage, LoginPage, RegisterPage } from './pages/index.ts'
import type { Page, Question } from './types';
import type { UserInfo } from './types.ts';
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SpeechContextProvider } from './context/speechContext.tsx'
import { getUserData, toggleBookmarkedApi, toggleCompletedApi } from './api/index.ts';
import Background from './components/Background.tsx'
import SearchPage from './pages/SearchPage.tsx';
import Toast from './components/Toast.tsx';
import { useSpeechRecognition } from './hooks/useSpeechReco.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [completedQues, setCompletedQues] = useState<string[]>([]);
  const [bookmarkedQues, setBookmarkedQues] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };
  const setLoadingFunc = (value: boolean) => {
    setLoading(value)
  }

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      setCompletedQues(data.completedQues || []);
      setBookmarkedQues(data.bookmarkedQues || []);
    } catch (error) {
      console.error("Failed to fetch user data on login", error);
    }
  };

  const login = async (userData: UserInfo) => {
    setUserInfo(userData)
    localStorage.setItem('userInfo', JSON.stringify(userData))
    fetchUserData()
  }

  const logout = () => {
    setUserInfo(null)
    localStorage.removeItem('userInfo')
  }

  const toggleBookmark = async (questionId: string, question: Question) => {
    setBookmarkedQues(prev =>
      prev.some(q => q._id === questionId)
        ? prev.filter(q => q._id !== questionId)
        : [...prev, question]
    );
    try {
      await toggleBookmarkedApi(questionId);
    } catch (error) {
      console.error('Failed to update progress', error);
      fetchUserData();
    }
  }

  const toggleCompleted = async (questionId: string) => {
    setCompletedQues(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
    try {
      await toggleCompletedApi(questionId);
    } catch (error) {
      console.error('Failed to update progress', error);
      fetchUserData();
    }
  }
  useEffect(() => {
    const init = async () => {
      setLoadingFunc(true)
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
        await fetchUserData();
      }
      setLoadingFunc(false)
    }
    init()
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'search':
        return <SearchPage />
      case 'home':
      default:
        return <HomePage />;
    }
  };

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (type: "success" | "error" | "info", msg: string) => {
    setToast({ message: msg, type });
  };
  return (
    <AuthContextProvider value={{ userInfo, login, logout, toggleCompleted, toggleBookmark, completedQues, bookmarkedQues, setLoadingFunc, loading, showToast }} >
      <SpeechContextProvider value={useSpeechRecognition()}>
        <div className="min-h-screen">
          <Navbar navigate={navigate} />
          <Background />
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
          <main>
            {renderPage()}
          </main>
        </div>
      </SpeechContextProvider>
    </AuthContextProvider>
  )

}
export default App;