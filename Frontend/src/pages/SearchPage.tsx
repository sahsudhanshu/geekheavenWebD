// frontend/src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { searchQues } from '../api';
import type { Question } from '../types';
import QuestionItem from '../components/QuestionItem';
import { useAuth } from '../context/AuthContext';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState(false);
    const [order, setOrder] = useState('asc');
    const [result, setResult] = useState<Question[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const {showToast} = useAuth()
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
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
                        showToast('error','Failed, Try Again Later!')
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
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Search Questions</h1>
                <p className="text-gray-500 mt-2">Find the exact problem you're looking for.</p>
            </header>

            {/* Search and Filter Controls */}
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                <div className="flex items-center space-x-4 md:ml-4">
                    <input
                        type="checkbox"
                        id='sortInput'
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        checked={sortBy}
                        onChange={(e) => setSortBy(e.target.checked)}
                    />
                    <label htmlFor='sortInput' className="text-xl">SortBy</label>
                    <select value={order} onChange={e => setOrder(e.target.value)} className={`border rounded-lg p-2 ${!sortBy ? 'opacity-50' : ''}`} disabled={!sortBy}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div>
                {(isSearchActive) && <p className="text-center text-gray-500">Loading results...</p>}
                {(!isSearchActive && (query != '')) && result.length > 0 && (
                    <div className="bg-white border rounded-lg shadow-sm p-2">
                        {currentPageQues.map(q => <QuestionItem key={q._id} question={q} />)}
                    </div>
                )}
                {!isSearchActive && result.length === 0 && query !== '' && (
                    <div className="text-center p-8 bg-white rounded-lg border">
                        <p className="text-gray-500">No results found. Try adjusting your search.</p>
                    </div>
                )}
            </div>
            {totalPages >= 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-4 p-2 border-t border-gray-200">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSearchPage(prev => Math.max(prev - 1, 1))}
                            disabled={searchPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                        >Prev</button>
                        <span className="px-2 py-1 font-medium">{searchPage} / {totalPages}</span>
                        <button
                            onClick={() => setSearchPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={searchPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                        >Next</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="categoriesPerPage" className="text-gray-700 font-medium">Questions per page:</label>
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
                            className="w-20 border border-gray-300 rounded px-3 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;