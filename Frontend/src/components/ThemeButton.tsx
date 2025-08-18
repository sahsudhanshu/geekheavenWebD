import React, { useState, useEffect } from "react";

const ThemeButton: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
            if (savedTheme) {
                return savedTheme;
            }
        }
        return "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden rounded-full transition-transform duration-500 ease-in-out transform hover:scale-125"
        >
            <div className="relative w-6 h-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-transform duration-500 ease-in-out ${theme === "dark" ? "transform rotate-0 scale-100" : "transform -rotate-90 scale-0"
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m8.66-15.66l-.707.707M5.05 18.95l-.707.707M21 12h-1M4 12H3m16.95-7.05l-.707-.707M7.05 5.05l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                    />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e2939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute inset-0 w-6 h-6 text-slate-300 transition-transform duration-500 ease-in-out ${theme === "light" ? "transform rotate-0 scale-100" : "transform rotate-90 scale-0"
                    }`}>
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            </div>
        </button>
    );
};

export default ThemeButton;
