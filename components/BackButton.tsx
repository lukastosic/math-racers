import React from 'react';

interface BackButtonProps {
    onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
    <button onClick={onClick} className="absolute top-4 left-4 md:top-8 md:left-8 z-10 p-3 bg-white dark:bg-slate-800 border-4 border-black dark:border-white rounded-full shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    </button>
);

export default BackButton;
