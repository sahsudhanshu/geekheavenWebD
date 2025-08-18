// frontend/src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { searchQues } from '../api';
import type { Question } from '../types';
import QuestionItem from '../components/QuestionItem';
import { useAuth } from '../context/AuthContext';
import { useSpeech } from '../context/speechContext';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState(false);
    const [order, setOrder] = useState('asc');
    const [result, setResult] = useState<Question[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { showToast, currentPage } = useAuth()
    const debouncedQuery = useDebounce(query, 300);
    const { isListening, stopListening, startListening, transcript, hasRecognitionSupport } = useSpeech()

    useEffect(() => {
        if (!transcript) return;
        if (currentPage !== 'search') return;
        const text = transcript.toLowerCase().trim().replace('.', '');
        if (text.startsWith('search ')) {
            const searchTerm = text.slice(7).trim();
            if (searchTerm && searchTerm !== query) {
                setQuery(searchTerm);
            }
        }
    }, [transcript]);


    useEffect(() => {
        if (!debouncedQuery) {
            setResult([]);
            return;
        }

        const controller = new AbortController();
        const init = async () => {
            if (debouncedQuery) {
                try {
                    setIsSearchActive(true);
                    const searchParams: { query: string; sort?: string, signal: AbortSignal } = { query: debouncedQuery, signal: controller.signal };
                    if (sortBy) {
                        searchParams.sort = order;
                    }
                    const ques = (await searchQues(searchParams)).questions
                    setResult(ques);
                } catch (e: any) {
                    if (e.name !== 'AbortError') {
                        console.log(e)
                        showToast('error', 'Failed, Try Again Later!')
                    }
                }
                finally {
                    setIsSearchActive(false)
                }
            } else {
                setResult([]);
            }
        }
        init();
        return () => controller.abort();
    }, [debouncedQuery, sortBy, order]);

    const [searchPage, setSearchPage] = useState<number>(1);
    const [limitSearch, setLimitSearch] = useState<number>(10);

    const startIndex = (searchPage - 1) * limitSearch;
    const totalPages = Math.ceil(result.length / limitSearch);
    const currentPageQues = result.slice(startIndex, startIndex + limitSearch)

    return (
        <div className="container mx-auto mt-8 p-4 md:p-8 shadow-sm dark:bg-gray-950 bg-white border border-gray-200 rounded-lg dark:border-gray-950">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-50">Search Questions</h1>
                <p className="text-gray-500 mt-2 dark:text-gray-300">Find the exact problem you're looking for.</p>
            </header>

            {/* Search and Filter Controls */}
            <div className="bg-white p-4 rounded-lg mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between dark:bg-gray-950">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="w-full pl-10 pr-4 py-2 border-3 rounded-lg dark:bg-white dark:border-white"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                <div className="flex items-center space-x-4 md:ml-4">
                    {hasRecognitionSupport && (
                        <button
                            onClick={isListening ? stopListening : startListening}
                            className={`p-2 rounded-full transition ${isListening ? 'bg-red-500 text-white' : 'text-gray-800 hover:bg-gray-300 dark:text-gray-50 dark:hover:bg-gray-800'}`}

                        >
                            {/* Microphone Icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 6v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    )}
                    <input
                        type="checkbox"
                        id='sortInput'
                        className="h-5 w-5 rounded border-gray-300 text-[#236af2] focus:ring-[#1c62e5] cursor-pointer"
                        checked={sortBy}
                        onChange={(e) => setSortBy(e.target.checked)}
                    />
                    <label htmlFor='sortInput' className="text-xl dark:text-gray-50">SortBy</label>
                    <select value={order} onChange={e => setOrder(e.target.value)} className={`border rounded-lg p-2 ${!sortBy ? 'opacity-50' : ''} dark:bg-gray-50`} disabled={!sortBy}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div>
                {(isSearchActive) && <p className="text-center text-gray-500">Loading results...</p>}
                {(!isSearchActive && (query != '')) && result.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-2 dark:border-gray-900 dark:bg-gray-950">
                        {currentPageQues.map(q => <QuestionItem key={q._id} question={q} />)}
                    </div>
                )}
                {!isSearchActive && result.length === 0 && query !== '' && (
                    <div className="text-center p-8 bg-white rounded-lg shadow-md border dark:border-gray-900 dark:bg-gray-950 border-gray-200">
                        <p className="text-gray-500 dark:text-gray-50 ">No results found. Try adjusting your search.</p>
                    </div>
                )}
            </div>
            {totalPages >= 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-4 p-2 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSearchPage(prev => Math.max(prev - 1, 1))}
                            disabled={searchPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition border-3 border-[#236af2] dark:text-gray-50 dark:bg-gray-950 dark:hover:bg-gray-800"
                        >Prev</button>
                        <span className="px-2 py-1 font-medium dark:text-gray-50">{searchPage} / {totalPages}</span>
                        <button
                            onClick={() => setSearchPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={searchPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition border-3 border-[#236af2] dark:text-gray-50 dark:bg-gray-950 dark:hover:bg-gray-800"
                        >Next</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="categoriesPerPage" className="text-gray-700 font-medium dark:text-gray-50">Questions per page:</label>
                        <input
                            id="categoriesPerPage"
                            type="number"
                            min={1}
                            value={limitSearch}
                            onChange={e => {
                                let value = Number(e.target.value);
                                if (value < 1) value = 1;
                                setLimitSearch(value);
                                setSearchPage(1);
                            }}
                            className="w-20 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition dark:bg-gray-950 border-3 border-[#236af2] dark:text-gray-50"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;