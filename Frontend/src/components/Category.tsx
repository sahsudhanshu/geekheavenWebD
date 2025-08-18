import React, { useEffect, useState } from 'react';
import type { Category, Question } from '../types';
import QuestionBox from './QuestionBox';
import { useAuth } from '../context/AuthContext';
import { useSpeech } from '../context/speechContext';
type CategoriesProps = {
    categories: Category[];
    questions: Question[];
};

const Categories: React.FC<CategoriesProps> = ({ categories, questions }) => {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(categories[0]?._id || null);
    const [categoryPage, setCategoryPage] = useState<number>(1);
    const [limitCategory, setLimitCategory] = useState<number>(7);

    const categoryStartIndex = (categoryPage - 1) * limitCategory;
    const totalPages = Math.ceil(categories.length / limitCategory);
    const currentPageCategories = categories.slice(categoryStartIndex, categoryStartIndex + limitCategory)
    const toggleCategory = (categoryId: string) => {
        setOpenCategoryId(prevId => (prevId === categoryId ? null : categoryId));
    };

    const { currentPage } = useAuth()
    const { transcript } = useSpeech()

    useEffect(() => {
        if (!transcript) return;
        if (currentPage !== 'home') return;
        const text = transcript.toLowerCase().trim().replace('.', '');
        if (text === 'next category') {
            setCategoryPage(prev => Math.min(prev + 1, totalPages))
        } else if (text === 'previous category') {
            setCategoryPage(prev => Math.max(prev - 1, 1))
        } else if (text.startsWith('set categories per page to ')) {
            const number = Number(text.slice(26))
            if (!isNaN(number)) {
                setLimitCategory(number)
            }
        } else if (text === 'open first category') {
            setOpenCategoryId(categories[0]._id || null)
        } else if (text === 'open last category') {
            setOpenCategoryId(categories[categoryStartIndex + limitCategory - 1]._id || null)
        } else if (text === 'open next category' && openCategoryId) {
            const idx = categories.findIndex(cat => cat._id === openCategoryId);
            if (idx !== -1 && idx < categories.length - 1) {
                setOpenCategoryId(categories[idx + 1]._id);
            }
        } else if (text === 'open previous category' && openCategoryId) {
            const idx = categories.findIndex(cat => cat._id === openCategoryId);
            if (idx > 0) {
                setOpenCategoryId(categories[idx - 1]._id);
            }
        } else if (text === 'close category' && openCategoryId){
            setOpenCategoryId(null)
        } 
    }, [transcript]);

    return (
        <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg bg-white shadow-sm dark:border-gray-950 dark:bg-gray-950" >
            {currentPageCategories.map((category) => {
                const isOpen = openCategoryId === category._id;
                const quesList = questions.filter(q => category.questions.includes(q._id));

                return (
                    <div key={category._id} className="border-b border-gray-200 last:border-b-0 dark:border-gray-800">
                        <button
                            onClick={() => toggleCategory(category._id)}
                            className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none dark:hover:bg-gray-900"
                        >
                            <span className='dark:text-gray-100'>{category.title} ({quesList.length})</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} dark:text-gray-50`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
                        >
                            <QuestionBox quesList={quesList} />
                        </div>
                    </div>
                );
            })}
            {totalPages >= 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-4 p-2 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCategoryPage(prev => Math.max(prev - 1, 1))}
                            disabled={categoryPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition border-3 border-[#236af2] dark:text-gray-50 dark:bg-gray-950 dark:hover:bg-gray-800"
                        >Prev</button>
                        <span className="px-2 py-1 font-medium dark:text-gray-50">{categoryPage} / {totalPages}</span>
                        <button
                            onClick={() => setCategoryPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={categoryPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition border-3 border-[#236af2] dark:text-gray-50 dark:bg-gray-950 dark:hover:bg-gray-800"
                        >Next</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="categoriesPerPage" className="text-gray-700 font-medium dark:text-gray-50">Categories per page:</label>
                        <input
                            id="categoriesPerPage"
                            type="number"
                            min={1}
                            value={limitCategory}
                            onChange={e => {
                                let value = Number(e.target.value);
                                if (value < 1) value = 1;
                                setLimitCategory(value);
                                setCategoryPage(1);
                            }}
                            className="w-20 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition dark:bg-gray-950 border-3 border-[#236af2] dark:text-gray-50"
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

export default Categories;