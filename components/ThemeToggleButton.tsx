import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslations } from '../hooks/useTranslations';

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslations();

    const label = theme === 'light' 
        ? t('theme_toggle_label_light') 
        : t('theme_toggle_label_dark');

    return (
        <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-20 p-3 bg-white dark:bg-slate-800 border-4 border-black dark:border-white rounded-full shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label={label}
        >
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggleButton;
