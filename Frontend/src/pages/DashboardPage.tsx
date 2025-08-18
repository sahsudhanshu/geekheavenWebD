import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/Progressbar';
import QuestionItem from '../components/QuestionItem';
import type { Question } from '../types';
import { fetchQues } from '../api';

const DashboardPage: React.FC = () => {
    const { completedQues, setLoadingFunc, bookmarkedQues } = useAuth();
    const [totalQues, setTotalQues] = useState<number>(0)
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingFunc(true);
                const [res] = await Promise.all([fetchQues()]);
                setTotalQues(res.questions.length)
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingFunc(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Dashboard</h1>
                <p className="text-gray-500 mt-2">Track your progress and review your bookmarks.</p>
            </header>

            <div className="mb-12">
                <ProgressBar value={completedQues.length} max={totalQues} />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Bookmarked Questions</h2>
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    {bookmarkedQues.length > 0 ? (
                        <div className="p-2 space-y-1">
                            {bookmarkedQues.map((question: Question) => (
                                <QuestionItem key={question._id} question={question} />
                            ))}
                        </div>
                    ) : (
                        <p className="p-6 text-gray-500 text-center">You haven't bookmarked any questions yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;