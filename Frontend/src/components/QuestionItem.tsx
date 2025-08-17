import React from 'react';
import type { Question } from '../types';
import { useAuth } from '../context/AuthContext';

type QuestionItemProps = {
    question: Question;
};

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {

    const { userInfo, completedQues, bookmarkedQues, toggleBookmark, toggleCompleted } = useAuth()

    const isCompleted = completedQues.includes(question._id)
    const isBookmarked = bookmarkedQues.some(q => q._id === question._id)

    return (
        <div>
            <div>
                {
                    userInfo ? (<input
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        checked={isCompleted}
                        onChange={() => toggleCompleted(question._id)}
                    />) : (null)
                }
                <a
                    href={question.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-700 ${isCompleted ? 'line-through text-gray-400' : ''}`}
                >
                    {question.title}
                </a>
            </div>
            {userInfo ? (
                <button
                    onClick={() => toggleBookmark(question._id, question)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-indigo-600"
                    title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                >
                    <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-6 w-6" fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>
            ) : null}
        </div>
    );
};

export default QuestionItem;
