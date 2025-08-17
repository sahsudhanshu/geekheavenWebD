import React, { useState } from 'react';
import type { Category, Question } from '../types';
import QuestionBox from './QuestionBox';
type CategoriesProps = {
    categories: Category[];
    questions: Question[];
};

const Categories: React.FC<CategoriesProps> = ({ categories, questions }) => {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(categories[0]?._id || null);
    const [categoryPage, setCategoryPage] = useState<number>(1);
    const [limitCategory, setLimitCategory] = useState<number>(5);

    const categoryStartIndex = (categoryPage - 1) * limitCategory;
    const totalPages = Math.ceil(categories.length / limitCategory);
    const currentPageCategories = categories.slice(categoryStartIndex, categoryStartIndex + limitCategory)
    const toggleCategory = (categoryId: string) => {
        setOpenCategoryId(prevId => (prevId === categoryId ? null : categoryId));
    };
    return (
        <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg bg-white shadow-sm" >
            {currentPageCategories.map((category) => {
                const isOpen = openCategoryId === category._id;
                const quesList = questions.filter(q => category.questions.includes(q._id));

                return (
                    <div key={category._id} className="border-b border-gray-200 last:border-b-0">
                        <button
                            onClick={() => toggleCategory(category._id)}
                            className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
                        >
                            <span>{category.title} ({quesList.length})</span>
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
                            <QuestionBox quesList={quesList} />
                        </div>
                    </div>
                );
            })}
            {totalPages >= 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-4 p-2 border-t border-gray-200">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCategoryPage(prev => Math.max(prev - 1, 1))}
                            disabled={categoryPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                        >Prev</button>
                        <span className="px-2 py-1 font-medium">{categoryPage} / {totalPages}</span>
                        <button
                            onClick={() => setCategoryPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={categoryPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                        >Next</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="categoriesPerPage" className="text-gray-700 font-medium">Categories per page:</label>
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
                            className="w-20 border border-gray-300 rounded px-3 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

export default Categories;
// import React, { useState } from 'react';
// import type { Category, Question } from '../types';
// import QuestionItem from './QuestionItem';

// type CategoriesProps = {
//   categories: Category[];
//   questions: Question[];
// };

// const CATEGORIES_PER_PAGE = 3; // Number of categories per page
// const QUESTIONS_PER_PAGE = 5;  // Number of questions per category

// const Categories: React.FC<CategoriesProps> = ({ categories, questions }) => {
//   const [openCategoryId, setOpenCategoryId] = useState<string | null>(categories[0]?._id || null);
//   const [categoryPage, setCategoryPage] = useState<number>(1);
//   const [questionPageMap, setQuestionPageMap] = useState<{ [key: string]: number }>({});

//   const toggleCategory = (categoryId: string) => {
//     setOpenCategoryId(prevId => (prevId === categoryId ? null : categoryId));
//   };

//   const handleQuestionPageChange = (categoryId: string, direction: 'prev' | 'next', totalPages: number) => {
//     setQuestionPageMap(prev => {
//       const currentPage = prev[categoryId] || 1;
//       let newPage = currentPage;
//       if (direction === 'prev' && currentPage > 1) newPage--;
//       if (direction === 'next' && currentPage < totalPages) newPage++;
//       return { ...prev, [categoryId]: newPage };
//     });
//   };

//   const totalCategoryPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE);
//   const categoryStartIndex = (categoryPage - 1) * CATEGORIES_PER_PAGE;
//   const paginatedCategories = categories.slice(categoryStartIndex, categoryStartIndex + CATEGORIES_PER_PAGE);

//   return (
//     <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg bg-white shadow-sm">
//       {paginatedCategories.map(category => {
//         const isOpen = openCategoryId === category._id;
//         const questionsForCategory = questions.filter(q => category.questions.includes(q._id));
//         const totalQuestionPages = Math.ceil(questionsForCategory.length / QUESTIONS_PER_PAGE);
//         const currentQuestionPage = questionPageMap[category._id] || 1;
//         const questionStartIndex = (currentQuestionPage - 1) * QUESTIONS_PER_PAGE;
//         const paginatedQuestions = questionsForCategory.slice(questionStartIndex, questionStartIndex + QUESTIONS_PER_PAGE);

//         return (
//           <div key={category._id} className="border-b border-gray-200 last:border-b-0">
//             <button
//               onClick={() => toggleCategory(category._id)}
//               className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
//             >
//               <span>{category.title} ({questionsForCategory.length})</span>
//               <svg
//                 className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>

//             <div
//               className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
//             >
//               <div className="p-2">
//                 {paginatedQuestions.length > 0 ? (
//                   paginatedQuestions.map(q => <QuestionItem key={q._id} question={q} />)
//                 ) : (
//                   <p className="p-3 text-gray-500">No questions found for this category.</p>
//                 )}

//                 {/* Question Pagination */}
//                 {totalQuestionPages > 1 && (
//                   <div className="flex justify-end gap-2 mt-2">
//                     <button
//                       onClick={() => handleQuestionPageChange(category._id, 'prev', totalQuestionPages)}
//                       disabled={currentQuestionPage === 1}
//                       className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                     >
//                       Prev
//                     </button>
//                     <span className="px-2 py-1">
//                       {currentQuestionPage} / {totalQuestionPages}
//                     </span>
//                     <button
//                       onClick={() => handleQuestionPageChange(category._id, 'next', totalQuestionPages)}
//                       disabled={currentQuestionPage === totalQuestionPages}
//                       className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {/* Category Pagination */}
//       {totalCategoryPages > 1 && (
//         <div className="flex justify-center gap-2 mt-4">
//           <button
//             onClick={() => setCategoryPage(prev => Math.max(prev - 1, 1))}
//             disabled={categoryPage === 1}
//             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="px-2 py-1">
//             {categoryPage} / {totalCategoryPages}
//           </span>
//           <button
//             onClick={() => setCategoryPage(prev => Math.min(prev + 1, totalCategoryPages))}
//             disabled={categoryPage === totalCategoryPages}
//             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Categories;
