
import React, { useEffect, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface FeedbackModalProps {
    isCorrect: boolean;
    message: string;
    onContinue: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isCorrect, message, onContinue }) => {
    const { t } = useTranslations();
    const continueButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Automatically focus the continue button when the modal appears
        continueButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                // Prevent the default action of the enter key (e.g., submitting a form behind the modal)
                event.preventDefault();
                onContinue();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Cleanup: remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onContinue]); // Re-run the effect if onContinue changes

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className={`
                relative w-full max-w-lg bg-white dark:bg-slate-800 border-8 rounded-3xl p-6 md:p-8 text-center
                transform transition-transform duration-300 scale-100
                ${isCorrect ? 'border-green-500' : 'border-red-500'}
            `}>
                <div className="text-8xl mb-4">
                    {isCorrect ? '😄' : '😢'}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6">{message}</h2>
                <button
                    ref={continueButtonRef}
                    onClick={onContinue}
                    className={`w-full py-3 font-display text-2xl md:text-3xl text-white border-4 border-black dark:border-white rounded-2xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all ${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                >
                    {isCorrect ? t('feedback_next') : t('feedback_try_again')}
                </button>
            </div>
        </div>
    );
};

export default FeedbackModal;