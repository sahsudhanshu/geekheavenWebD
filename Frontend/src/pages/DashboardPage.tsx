import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/Progressbar';
import { fetchQues } from '../api';
import QuestionBox from '../components/QuestionBox';

const DashboardPage: React.FC = () => {
    const { completedQues, setLoadingFunc, bookmarkedQues, showToast } = useAuth();
    const [totalQues, setTotalQues] = useState<number>(0)
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingFunc(true);
                const [res] = await Promise.all([fetchQues()]);
                setTotalQues(res.questions.length)
            } catch (err) {
                showToast('error', 'Failed to fetch data. Server Error!')
            } finally {
                setLoadingFunc(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="container mx-auto mt-8 p-4 md:p-8 shadow-sm dark:bg-gray-950 bg-white border border-gray-200 rounded-lg dark:border-gray-950">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-50">Your Dashboard</h1>
                <p className="text-gray-500 mt-2 dark:text-gray-300">Track your progress and review your bookmarks.</p>
            </header>

            <div className="mb-12">
                <ProgressBar value={completedQues.length} max={totalQues} />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-gray-50">Bookmarked Questions</h2>

                <QuestionBox quesList={bookmarkedQues}/>
            </div>
        </div>
    );
};

export default DashboardPage;