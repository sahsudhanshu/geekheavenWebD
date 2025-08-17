import React, { useEffect, useState } from 'react';
import type { NavigateFunction } from '../types';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api';

type LoginPageProps = {
    navigate: NavigateFunction;
};

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { userInfo, login } = useAuth()

    useEffect(() => {
        if (userInfo) {
            navigate('home')
        }
    }, [navigate,userInfo])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(email, password);
            login(data);
            navigate('home');
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Login to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <button onClick={() => navigate('register')} className="font-medium text-indigo-600 hover:text-indigo-500">
                            create a new account
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg" onSubmit={handleSubmit}>
                    {/* ... form inputs are the same as before ... */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input id="email-address" name="email" type="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input id="password" name="password" type="password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;