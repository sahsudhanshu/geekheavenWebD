import React, { useState, useEffect } from "react";

/**
 * A theme toggle button with a smooth sun/moon icon transition.
 * It persists the theme choice in localStorage.
 */
const ThemeButton: React.FC = () => {
    // State to manage the current theme ('light' or 'dark').
    // It tries to load the saved theme from localStorage or defaults to 'light'.
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
            if (savedTheme) {
                return savedTheme;
            }
        }
        return "light";
    });

    // Effect to apply the 'dark' class to the root HTML element when the theme changes.
    // This enables Tailwind's dark mode variants.
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        // Save the current theme to localStorage.
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggles the theme between 'light' and 'dark'.
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            // Accessibility label for screen readers.
            aria-label="Toggle theme"
            // Styling for the button with transitions for a smooth look and feel.
            className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
            {/* Container for the icons to manage their animations. */}
            <div className="relative w-6 h-6">
                {/* Sun Icon SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-transform duration-500 ease-in-out ${
                        theme === "dark" ? "transform rotate-0 scale-100" : "transform -rotate-90 scale-0"
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

                {/* Moon Icon SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`absolute inset-0 w-6 h-6 text-slate-300 transition-transform duration-500 ease-in-out ${
                        theme === "light" ? "transform rotate-0 scale-100" : "transform rotate-90 scale-0"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM5.106 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </button>
    );
};

export default ThemeButton;
