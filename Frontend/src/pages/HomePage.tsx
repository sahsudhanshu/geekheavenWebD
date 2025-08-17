import React, { useState, useEffect } from 'react';
import { fetchContent } from '../api';
import type { Question } from '../types';
import QuestionItem from '../components/QuestionItem';

const HomePage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const contentRes = await fetchContent();
                setQuestions(contentRes.data.questions);
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
                <p className="text-gray-500 mt-2">Your comprehensive guide to mastering DSA</p>
            </header>
            
            {/* This is the new list view */}
            <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-2">
                    {questions.map(question => (
                        <QuestionItem key={question._id} question={question} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;