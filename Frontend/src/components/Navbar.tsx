import React, { useState } from 'react';
import type { NavigateFunction } from '../types';
import { useAuth } from '../context/AuthContext';

type NavbarProps = {
    navigate: NavigateFunction;
}

const Navbar: React.FC<NavbarProps> = ({ navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userInfo, logout } = useAuth()

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('home');
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <button onClick={() => navigate('home')} className="transition-transform duration-500 ease-in-out transform hover:scale-125 text-2xl font-bold text-gray-800">
                            GeekHeaven
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {/* <button
                            onClick={() => navigate('search')}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                            title="Search"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button> */}
                        <button
                            onClick={() => navigate('search')}
                            className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            title="Search Questions"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        {userInfo ? (
                            <>
                                <span className="text-gray-700">Welcome, {userInfo.name}</span>
                                <button onClick={() => navigate('dashboard')} className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium ">
                                    Dashboard
                                </button>
                                <button onClick={handleLogout} className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('login')} className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125">
                                    Login
                                </button>
                                <button onClick={() => navigate('register')} className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-transform duration-500 ease-in-out transform hover:scale-125">
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>)
                                : (<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>)}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                        {
                            (userInfo) ? (<>
                                <span className="text-gray-700">Welcome, {userInfo.name}</span>
                                <button onClick={() => navigate('dashboard')} className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </button>
                                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-white bg-indigo-600 hover:bg-indigo-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                                    Logout
                                </button></>
                            ) : (<>
                                <button onClick={() => { navigate('login'); setIsMenuOpen(false); }} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                                    Login
                                </button>
                                <button onClick={() => { navigate('register'); setIsMenuOpen(false); }} className="text-white bg-indigo-600 hover:bg-indigo-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                                    Register
                                </button>
                            </>)
                        }
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;