import React, { useState } from 'react';
import { GameSettings, QuestionType, GameCategory } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import BackButton from '../components/BackButton';
import { CATEGORIES } from '../constants';


interface SetupScreenProps {
  initialSettings: GameSettings;
  onStart: (settings: GameSettings) => void;
  onBack: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ initialSettings, onStart, onBack }) => {
  const { t } = useTranslations();
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.CLOSED);
  const [customCount, setCustomCount] = useState<string>('10');
  
  const categoryInfo = CATEGORIES.find(c => c.id === initialSettings.category);
  const categoryName = categoryInfo ? t(categoryInfo.nameKey) : initialSettings.category;

  const handleCustomCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomCount(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0 && num <= 50) {
      setQuestionCount(num);
    }
  };
  
  const handlePresetCount = (count: number) => {
      setQuestionCount(count);
      setCustomCount(count.toString());
  }

  const handleStart = () => {
    onStart({
      ...initialSettings,
      questionCount,
      questionType,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl relative">
        <BackButton onClick={onBack} />
        <div className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-4 border-black dark:border-white rounded-2xl px-8 pb-8 pt-24 md:pt-28 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff]">
          <h1 className="font-display text-4xl md:text-6xl text-center mb-6">{categoryName}</h1>

          <div className="mb-8">
            <h2 className="font-display text-3xl text-center mb-4">{t('setup_how_many_questions')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[5, 10, 15, 20].map(num => (
                <button
                  key={num}
                  onClick={() => handlePresetCount(num)}
                  className={`p-4 font-bold text-2xl border-4 border-black dark:border-white rounded-xl transition-colors ${questionCount === num ? 'bg-yellow-400 text-slate-800' : 'bg-slate-200 dark:bg-slate-700 hover:bg-yellow-300 dark:hover:bg-yellow-500'}`}
                >
                  {num}
                </button>
              ))}
            </div>
            <input
                type="number"
                value={customCount}
                onChange={handleCustomCountChange}
                min="1"
                max="50"
                className="w-full p-4 text-center text-2xl border-4 border-black dark:border-white rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white dark:bg-slate-700"
              />
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl text-center mb-4">{t('setup_question_style')}</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setQuestionType(QuestionType.CLOSED)}
                className={`w-1/2 p-4 font-bold text-xl capitalize border-4 border-black dark:border-white rounded-xl transition-colors ${questionType === QuestionType.CLOSED ? 'bg-lime-400 text-slate-800' : 'bg-slate-200 dark:bg-slate-700 hover:bg-lime-300 dark:hover:bg-lime-500'}`}
              >
                {t('question_type_closed')}
              </button>
              <button
                onClick={() => setQuestionType(QuestionType.OPEN)}
                className={`w-1/2 p-4 font-bold text-xl capitalize border-4 border-black dark:border-white rounded-xl transition-colors ${questionType === QuestionType.OPEN ? 'bg-cyan-400 text-slate-800' : 'bg-slate-200 dark:bg-slate-700 hover:bg-cyan-300 dark:hover:bg-cyan-500'}`}
              >
                {t('question_type_open')}
              </button>
            </div>
          </div>
          
          <button
            onClick={handleStart}
            className="w-full py-4 font-display text-4xl text-white bg-green-500 hover:bg-green-600 border-4 border-black dark:border-white rounded-2xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
          >
            {t('setup_start_race')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
