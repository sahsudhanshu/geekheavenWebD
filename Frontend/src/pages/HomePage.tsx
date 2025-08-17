import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchQues } from '../api';
import type { Category, Question } from '../types';
import { useAuth } from '../context/AuthContext';
import Accordion from '../components/Category';

const HomePage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { userInfo } = useAuth()

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [ quesRes, categoryRes ] = await Promise.all([fetchQues(),fetchCategories()]);
                setQuestions(quesRes.data.questions);
                setCategories(categoryRes.data.categories)
                setError(null);
            } catch (err) {
                setError('Failed to fetch data. Is the backend server running?');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">GeekHeaven Problem Set</h1>
                <p className="text-gray-500 mt-2">
                    {userInfo ? `Welcome back, ${userInfo.name}! Let's get started.` : 'Your comprehensive guide to mastering DSA'}
                </p>
            </header>

            {/* This is the new list view */}
            <Accordion categories={categories} questions={questions} />

        </div>
    );
};

export default HomePage;