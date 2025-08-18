import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchQues } from '../api';
import type { Category, Question } from '../types';
import { useAuth } from '../context/AuthContext';
import Categories from '../components/Category';

const HomePage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { setLoadingFunc, loading, userInfo, showToast } = useAuth();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingFunc(true);
                const [quesRes, categoryRes] = await Promise.all([fetchQues(), fetchCategories()]);
                setQuestions(quesRes.questions);
                setCategories(categoryRes.categories);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data. Server Error!');
                showToast('error', 'Failed to fetch data. Server Error!')
            } finally {
                setLoadingFunc(false);
            }
        };
        loadData();
    }, []);

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
                    GeekHeaven Problem Set
                </h1>
                <p className="text-gray-500 mt-2 dark:text-gray-300">
                    {userInfo ? `Welcome back, ${userInfo.name}! Let's get started.` : 'Your comprehensive guide to mastering DSA'}
                </p>
            </header>

            {loading ? (
                <div className="flex justify-center items-center min-h-[100px]">
                    <span className="loader"></span>
                </div>
            ) : (
                <Categories categories={categories} questions={questions} />
            )}

        </div>
    );
};

export default HomePage;
