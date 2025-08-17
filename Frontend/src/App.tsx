import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import type { Page } from './types';
import type { UserInfo } from './types.ts';
import { AuthContextProvider } from './context/AuthContext.tsx'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser))
    }
  }, [])

  const login = (userData: UserInfo) => {
    setUserInfo(userData)
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }

  const logout = () => {
    setUserInfo(null)
    localStorage.removeItem('userInfo')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthContextProvider value={{ userInfo, login, logout }}>
      <div className="min-h-screen">
        <Navbar navigate={navigate} />
        <main>
          {renderPage()}
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default App;