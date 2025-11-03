
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GameSettings, Question, QuestionType, GameCategory } from '../types';
import { useQuestionGenerator } from '../hooks/useQuestionGenerator';
import { useTranslations } from '../hooks/useTranslations';
import { useCharacter } from '../contexts/CharacterContext';

import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import FeedbackModal from '../components/FeedbackModal';

interface GameScreenProps {
  settings: GameSettings;
  onGameEnd: () => void;
  onGoHome: () => void;
}

const QuestionDisplay: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full bg-white dark:bg-slate-700 p-8 border-4 border-black dark:border-white rounded-2xl mb-8">
    <p className="font-display text-5xl md:text-7xl text-center text-blue-600 dark:text-blue-400 tracking-wider">{text}</p>
  </div>
);

const AnswerOptions: React.FC<{ options: (string | number)[], onSelect: (answer: string | number) => void }> = ({ options, onSelect }) => (
  <div className="grid grid-cols-2 gap-4 md:gap-6">
    {options.map((option, index) => (
      <button 
        key={index} 
        onClick={() => onSelect(option)}
        className="p-6 font-bold text-3xl md:text-4xl text-slate-800 bg-orange-400 hover:bg-orange-500 border-4 border-black dark:border-white rounded-2xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
      >
        {option}
      </button>
    ))}
  </div>
);

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isAdvanced: boolean;
  confirmText: string;
}

const AnswerInput = React.forwardRef<HTMLInputElement, AnswerInputProps>(
  ({ onSubmit, isAdvanced, confirmText }, ref) => {
    const [answer, setAnswer] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (answer.trim()) {
        onSubmit(answer.trim());
        setAnswer('');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
        <input
          ref={ref}
          type="text"
          inputMode={isAdvanced ? 'text' : 'numeric'}
          pattern={isAdvanced ? undefined : '[0-9]*'}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-full p-4 text-center text-3xl border-4 border-black dark:border-white rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white dark:bg-slate-700 ${isAdvanced ? 'md:w-3/4' : 'md:w-1/2'}`}
        />
        <button type="submit" className="w-full md:w-auto px-8 py-4 font-display text-3xl text-white bg-green-500 hover:bg-green-600 border-4 border-black dark:border-white rounded-2xl shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all">
          {confirmText}
        </button>
      </form>
    );
  }
);
AnswerInput.displayName = 'AnswerInput';

const GameScreen: React.FC<GameScreenProps> = ({ settings, onGameEnd, onGoHome }) => {
  const { t } = useTranslations();
  const { character } = useCharacter();
  const questions = useQuestionGenerator(settings);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const successMessages: string[] = t('success_messages');
  const successMessage = useMemo(() => successMessages[Math.floor(Math.random() * successMessages.length)], [currentQuestionIndex, successMessages]);

  useEffect(() => {
    // If the feedback modal is gone, and the current question is an open one, focus the input.
    if (feedback === null && settings.questionType === QuestionType.OPEN) {
      // Use a minimal timeout to ensure the element is focusable after other DOM changes.
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [feedback, currentQuestionIndex, settings.questionType]);

  if (questions.length === 0) {
    return <div>{t('game_loading')}</div>;
  }
  
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string | number) => {
    const isCorrect = currentQuestion.correctAnswers.some(correct => 
      String(correct).toLowerCase() === String(answer).toLowerCase()
    );
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  };
  
  const handleNext = () => {
    setFeedback(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onGameEnd();
    }
  };
  
  const handleTryAgain = () => {
    setFeedback(null);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen py-6">
      <div className="w-full max-w-4xl">
        <BackButton onClick={onGoHome} />
        <ProgressBar current={currentQuestionIndex} total={questions.length} theme={character} />

        <div className="mt-8">
            <QuestionDisplay text={currentQuestion.text} />
            {settings.questionType === QuestionType.CLOSED && currentQuestion.options ? (
                <AnswerOptions options={currentQuestion.options} onSelect={handleAnswer} />
            ) : (
                <AnswerInput 
                  ref={inputRef}
                  onSubmit={handleAnswer} 
                  isAdvanced={settings.category === GameCategory.ADVANCED}
                  confirmText={t('game_confirm')}
                />
            )}
        </div>
      </div>
      
      {feedback && (
          <FeedbackModal 
              isCorrect={feedback === 'correct'}
              message={feedback === 'correct' ? successMessage : t('feedback_try_again')}
              onContinue={feedback === 'correct' ? handleNext : handleTryAgain}
          />
      )}
    </div>
  );
};

export default GameScreen;
