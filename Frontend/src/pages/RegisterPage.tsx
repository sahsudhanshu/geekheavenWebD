import React, { useEffect, useState } from 'react';
import type { NavigateFunction } from '../types';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api';

type RegisterPageProps = {
    navigate: NavigateFunction;
};

const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userInfo, login, showToast } = useAuth()
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})

    useEffect(() => {
        if (userInfo) {
            navigate('home')
        }
    }, [navigate, userInfo])

    const validate = () => {
        const newErrors: { name?: string; email?: string; password?: string } = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!name.trim()) newErrors.name = "Name is required"
        if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address"
        if (password.length < 6) newErrors.password = "Password must be at least 6 characters"

        setErrors(newErrors)
        showToast('error','Enter Correct Details!')
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const data = await registerUser(name, email, password)
            login(data)
            navigate('home')
            showToast('success', 'Registration Successful!')
        } catch (e: any) {
            console.log(e)
            navigate('login')
            localStorage.setItem('email', email)
            showToast('error', e.message)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-gray-50 rounded-md dark:bg-gray-950">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight dark:text-gray-50 text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <button onClick={() => navigate('login')} className="font-medium text-[#236af2] hover:[#1c62e5]">
                            Sign in
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg dark:bg-gray-950" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-0.5">
                        {/* Name */}
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={`relative block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#1c62e5] focus:ring-[#1c62e5] dark:bg-white sm:text-sm border-2 ${errors.name ? 'border-red-500 dark:border-red-800' : ''}`}
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <span className="text-red-500 dark:border-red-800 text-sm ml-1 block">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                className={`relative block w-full rounded-md border-2 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#1c62e5] focus:ring-[#1c62e5] dark:bg-white sm:text-sm ${errors.email ? 'border-red-500 dark:border-red-800' : ''}`}
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className="text-red-500 dark:border-red-800 text-sm ml-1 block">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`relative block w-full rounded-md border-2 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#1c62e5] focus:ring-[#1c62e5] dark:bg-white sm:text-sm ${errors.password ? 'border-red-500 dark:border-red-800' : ''}`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <span className="text-red-500 dark:border-red-800 text-sm ml-1 block">{errors.password}</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-[#236af2] py-2 px-4 text-sm font-medium text-white hover:bg-[#1c62e5] focus:outline-none focus:ring-2 focus:ring-[#1c62e5] focus:ring-offset-2">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
