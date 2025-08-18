import React, { useEffect, useState } from 'react';
import type { NavigateFunction } from '../types';
import { useAuth } from '../context/AuthContext';
import ThemeButton from './ThemeButton';
import { useSpeech } from '../context/speechContext';
import VoiceControlButton from './mic';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        showToast('success', 'Successfully Logged Out!')
        navigate('home');
    }
    const { userInfo, logout, showToast, navigate, currentPage } = useAuth()
    const { transcript, hasRecognitionSupport } = useSpeech()

    useEffect(() => {
        if (!transcript) return;
        const text = transcript.toLowerCase().trim().replace('.', '');
        if (text.startsWith('open ')) {
            const pageName = text.slice(5).trim();
            const validPages = ['home', 'dashboard', 'login', 'register', 'search'];
            if (pageName && validPages.includes(pageName) && currentPage !== pageName) {
                navigate(pageName);
            }
        }
        if (text === 'user logout') {
            if (userInfo) {
                handleLogout()
            }
        }
    }, [transcript]);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <button onClick={() => navigate('home')} className="transition-transform duration-500 ease-in-out transform hover:scale-125 text-2xl font-bold text-gray-800 dark:text-gray-100">
                            QuesHaven
                        </button>
                    </div>
                    <button
                        onClick={() => navigate('search')}
                        className="fixed bottom-8 right-8 bg-[#236af2] text-white p-4 rounded-full shadow-lg hover:bg-[#1c62e5] transition-transform duration-500 ease-in-out transform hover:scale-125 focus:outline-none  focus:ring-[#1c62e5] "

                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <div
                        className="fixed bottom-25 right-8 bg-[#236af2] text-white p-2 rounded-full shadow-lg hover:bg-[#1c62e5]transition-transform duration-500 ease-in-out transform hover:scale-125 focus:outline-none focus:ring-[#1c62e5]"
                    >
                        {(hasRecognitionSupport && <VoiceControlButton />)}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {userInfo ? (
                            <>
                                <span className="text-gray-700 dark:text-gray-100 text-base font-medium">Welcome, {userInfo.name.toUpperCase()}</span>
                                <ThemeButton />
                                <button onClick={() => navigate('home')} className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125 dark:text-gray-100 dark:hover:bg-gray-950 border-3 border-[#236af2]">
                                    Questions
                                </button>
                                <button onClick={() => navigate('dashboard')}
                                    className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125 dark:text-gray-100 dark:hover:bg-gray-950 border-3 border-[#236af2]">
                                    Dashboard
                                </button>
                                <button onClick={handleLogout} className="text-gray-800 hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125 dark:text-gray-100 dark:hover:bg-red-800 border-3 border-[#236af2] dark:hover:border-red-800 hover:border-red-500" >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <ThemeButton />
                                <button onClick={() => navigate('register')} className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125 dark:text-gray-100 dark:hover:bg-gray-950 border-3 border-[#236af2]">
                                    Questions
                                </button>
                                <button onClick={() => navigate('login')} className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125 dark:text-gray-100 dark:hover:bg-gray-950 border-3 border-[#236af2]">
                                    Login
                                </button>
                                <button onClick={() => navigate('register')} className="text-white bg-[#236af2] hover:bg-[#1c62e5] px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125 dark:hover:bg-gray-950 border-3 border-[#236af2]">
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <ThemeButton />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none  dark:text-gray-100 dark:hover:bg-gray-950 transition-all duration-500 ease-in-out transform hover:scale-110 border-3 border-[#236af2]"
                        >
                            {isMenuOpen ? (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>)
                                : (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>)}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-950 shadow-md transition-all duration-300 ease-in-out transform origin-top ${isMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
                }`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                    {
                        (userInfo) ? (<>
                            <span className="text-gray-700 dark:text-gray-100 text-base font-medium">Welcome, {userInfo.name.toUpperCase()}</span>
                            <button onClick={() => navigate('dashboard')} className="text-gray-800 hover:bg-gray-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium dark:text-gray-100  dark:hover:bg-gray-900 border-3 border-[#236af2]">
                                Dashboard
                            </button>
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-gray-800 hover:bg-red-500 text-left px-3 py-2 rounded-md text-base font-medium dark:text-gray-100 dark:hover:bg-red-800 border-3 border-[#236af2] dark:hover:border-red-800">
                                Logout
                            </button></>
                        ) : (<>
                            <button onClick={() => { navigate('login'); setIsMenuOpen(false); }} className="text-gray-800 hover:bg-gray-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium dark:text-gray-100  dark:hover:bg-gray-900 border-3 border-[#236af2]">
                                Login
                            </button>
                            <button onClick={() => { navigate('register'); setIsMenuOpen(false); }} className="text-white bg-[#236af2] hover:bg-[#1c62e5] block w-full text-left px-3 py-2 rounded-md text-base font-medium border-3 border-[#236af2] ">
                                Register
                            </button>
                        </>)
                    }
                </div>
            </div>

        </nav>
    );
};

export default Navbar;