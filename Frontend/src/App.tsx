import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import type { Page, Question } from './types';
import type { UserInfo } from './types.ts';
import { AuthContextProvider } from './context/AuthContext.tsx'
import { getUserData, toggleBookmarkedApi, toggleCompletedApi } from './api/index.ts';
import DashboardPage from './pages/DashboardPage.tsx';
import AnimatedBlobBackground from './components/BgDesign.tsx'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [completedQues, setCompletedQues] = useState<string[]>([]);
  const [bookmarkedQues, setBookmarkedQues] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const fetchUserData = async () => {
    try {
      const { data } = await getUserData();
      setCompletedQues(data.completedQues || []);
      setBookmarkedQues(data.bookmarkedQues || []);
    } catch (error) {
      console.error("Failed to fetch user data on login", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
      fetchUserData();
    }
    setLoading(false)
  }, []);

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

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Application...</div>
  }

  return (
    <AuthContextProvider value={{ userInfo, login, logout, toggleCompleted, toggleBookmark, completedQues, bookmarkedQues, loading }}>
      <div className="min-h-screen">
        <Navbar navigate={navigate} />
        <AnimatedBlobBackground />
        <main>
          {renderPage()}
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default App;