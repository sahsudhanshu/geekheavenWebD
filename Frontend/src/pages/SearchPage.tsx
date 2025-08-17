// frontend/src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { searchQues } from '../api';
import type { Question } from '../types';
import QuestionItem from '../components/QuestionItem';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState(false);
    const [order, setOrder] = useState('asc');
    const [result, setResult] = useState<Question[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        const init = async () => {
            try {
                setIsSearchActive(true);
                const searchParams: { query: string; sort?: string } = { query };
                if (sortBy) {
                    searchParams.sort = order;
                }
                const ques = (await searchQues(searchParams)).data.questions
                setResult(ques);
            } catch (e) {
                console.log(e)
            }
            finally {
                setIsSearchActive(false)
            }
        }
        init()
    }, [debouncedQuery, sortBy, order]);

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
                {isSearchActive && <p className="text-center text-gray-500">Loading results...</p>}
                {!isSearchActive && result.length > 0 && (
                    <div className="bg-white border rounded-lg shadow-sm p-2">
                        {result.map(q => <QuestionItem key={q._id} question={q} />)}
                    </div>
                )}
                {!isSearchActive && result.length === 0 && (
                    <div className="text-center p-8 bg-white rounded-lg border">
                        <p className="text-gray-500">No results found. Try adjusting your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;