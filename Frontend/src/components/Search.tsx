import React, { useEffect, useState } from 'react'
import type { Question } from '../types'
import { useDebounce } from '../hooks/useDebounce';
import { searchQues } from '../api';
import QuestionItem from './QuestionItem';

const Search: React.FC = () => {
    const [query, setQuery] = useState<string>('')
    const [result, setResult] = useState<Question[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [sortingEnabled, isSortingEnabled] = useState(false)
    const [sortingType, setSortingType] = useState('asec')

    const debouncedQuery = useDebounce(query, 300)

    useEffect(() => {
        const inti = async () => {
            try {
                if (debouncedQuery) {
                    setIsSearchActive(true)
                    const ques = (await searchQues(query)).data.questions
                    setResult(ques);
                } else {
                    setResult([])
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsSearchActive(false)
            }
        }
        inti()
    })

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 pt-[20vh] transition-opacity duration-300"        >
            <div
                className="relative w-full max-w-2xl transform rounded-lg bg-white shadow-2xl transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for a question..."
                        className="w-full rounded-t-lg border-0 border-b border-gray-200 p-4 text-lg focus:ring-indigo-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="max-h-[50vh] overflow-y-auto">
                    {isSearchActive && <p className="p-4 text-center text-gray-500">Searching...</p>}
                    {!isSearchActive && result.length > 0 && (
                        <div className="p-2">
                            {result.map(q => <QuestionItem key={q._id} question={q} />)}
                        </div>
                    )}
                    {!isSearchActive && debouncedQuery && result.length === 0 && (
                        <p className="p-4 text-center text-gray-500">No results found for "{debouncedQuery}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};
    

export default Search