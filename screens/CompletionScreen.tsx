import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Fireworks from '../components/Fireworks';

interface CompletionScreenProps {
  onContinue: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onContinue }) => {
  const { t } = useTranslations();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-4">
      <Fireworks />
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-4 border-black dark:border-white rounded-2xl p-6 md:p-12 shadow-[10px_10px_0px_#000] dark:shadow-[10px_10px_0px_#fff]">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-green-600 dark:text-green-400 text-stroke transform -rotate-2">
          {t('completion_title')}
        </h1>
        <p className="text-xl md:text-3xl my-6 md:my-8 font-bold text-slate-700 dark:text-slate-300">{t('completion_subtitle')}</p>
        <button
          onClick={onContinue}
          className="mt-4 px-10 py-3 md:px-12 md:py-4 font-display text-2xl md:text-4xl text-white bg-blue-500 hover:bg-blue-600 border-4 border-black dark:border-white rounded-2xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
        >
          {t('completion_continue')}
        </button>
      </div>
    </div>
  );
};

// Custom text stroke style for the title
const style = document.createElement('style');
style.innerHTML = `
  .text-stroke {
    -webkit-text-stroke: 3px black;
  }
  .dark .text-stroke {
    -webkit-text-stroke: 3px white;
  }
`;
document.head.appendChild(style);

export default CompletionScreen;
