import React, { useState } from 'react';
import type { NavigateFunction } from '../types';

type NavbarProps = {
    navigate: NavigateFunction;
}

const Navbar: React.FC<NavbarProps> = ({ navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side: Logo/Brand */}
                    <div className="flex-shrink-0">
                        <button onClick={() => navigate('home')} className="text-2xl font-bold text-gray-800">
                            GeekHeaven
                        </button>
                    </div>

                    {/* Right side: Desktop Menu Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => navigate('login')} className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                            Login
                        </button>
                        <button onClick={() => navigate('register')} className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                            Register
                        </button>
                    </div>
                    
                    {/* ... Mobile Menu Button (Hamburger) is the same ... */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? ( <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> ) 
                                        : ( <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg> )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => { navigate('login'); setIsMenuOpen(false); }} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                            Login
                        </button>
                        <button onClick={() => { navigate('register'); setIsMenuOpen(false); }} className="text-white bg-indigo-600 hover:bg-indigo-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                            Register
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;