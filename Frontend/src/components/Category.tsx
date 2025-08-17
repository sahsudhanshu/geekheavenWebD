import React, { useState } from 'react';
import type { Category , Question } from '../types';
import QuestionItem from './QuestionItem';

type AccordionProps = {
    categories: Category[];
    questions: Question[];
};

const Accordion: React.FC<AccordionProps> = ({ categories, questions }) => {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(categories[0]?._id || null);

    const toggleCategory = (categoryId: string) => {
        setOpenCategoryId(prevId => (prevId === categoryId ? null : categoryId));
    };

    return (
        <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg bg-white shadow-sm">
            {categories.map((category) => {
                const isOpen = openCategoryId === category._id;
                const questionsForCategory = questions.filter(q => category.questions.includes(q._id));

                return (
                    <div key={category._id} className="border-b border-gray-200 last:border-b-0">
                        <button
                            onClick={() => toggleCategory(category._id)}
                            className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
                        >
                            <span>{category.title} ({questionsForCategory.length})</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
                            <div className="p-2">
                                {questionsForCategory.length > 0 ? (
                                    questionsForCategory.map(q => <QuestionItem key={q._id} question={q} />)
                                ) : (
                                    <p className="p-3 text-gray-500">No questions found for this category.</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;