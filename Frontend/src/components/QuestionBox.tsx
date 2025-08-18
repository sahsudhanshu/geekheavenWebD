import React, { useState } from 'react'
import QuestionItem from './QuestionItem'
import type { Question } from './../types.ts'

const QuestionBox: React.FC<{ quesList: Question[] }> = ({ quesList }) => {
    const [questionPage, setquestionPage] = useState<number>(1);
    const [limitQues, setlimitQues] = useState<number>(5);

    const categoryStartIndex = (questionPage - 1) * limitQues;
    const totalPages = Math.ceil(quesList.length / limitQues);
    const currentPageQues = quesList.slice(categoryStartIndex, categoryStartIndex + limitQues)
    return (
        <div className="p-2 space-y-1">
            {currentPageQues.length > 0 ? (
                currentPageQues.map(q => <QuestionItem key={q._id} question={q} />)
            ) : (
                <p className="p-3 text-gray-500 dark:text-gray-50">No questions found for this category.</p>
            )}
            {totalPages >= 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-4 p-2 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setquestionPage(prev => Math.max(prev - 1, 1))}
                            disabled={questionPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition dark:bg-gray-800"
                        >Prev</button>
                        <span className="px-2 py-1 font-medium">{questionPage} / {totalPages}</span>
                        <button
                            onClick={() => setquestionPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={questionPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition dark:bg-gray-800"
                        >Next</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="categoriesPerPage" className="text-gray-700 font-medium">Questions per page:</label>
                        <input
                            id="categoriesPerPage"
                            type="number"
                            min={1}
                            value={limitQues}
                            onChange={e => {
                                let value = Number(e.target.value);
                                if (value < 1) value = 1;
                                setlimitQues(value);
                                setquestionPage(1);
                            }}
                            className="w-20 border border-gray-300 rounded px-3 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionBox