import React, { useMemo } from 'react';
import { GameSettings, Question, GameCategory, QuestionType, AdvancedQuestion } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

import { ADVANCED_QUESTIONS as ADVANCED_EN } from '../../public/locales/constants/advanced-en';
import { ADVANCED_QUESTIONS as ADVANCED_NL } from '../../public/locales/constants/advanced-nl';
import { ADVANCED_QUESTIONS as ADVANCED_DE } from '../../public/locales/constants/advanced-de';
import { ADVANCED_QUESTIONS as ADVANCED_SR_LATN } from '../../public/locales/constants/advanced-sr-Latn';
import { ADVANCED_QUESTIONS as ADVANCED_SR_CYRL } from '../../public/locales/constants/advanced-sr-Cyrl';


const ALL_ADVANCED_QUESTIONS: { [key: string]: AdvancedQuestion[] } = {
  en: ADVANCED_EN,
  nl: ADVANCED_NL,
  de: ADVANCED_DE,
  'sr-Latn': ADVANCED_SR_LATN,
  'sr-Cyrl': ADVANCED_SR_CYRL,
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const useQuestionGenerator = (settings: GameSettings | null): Question[] => {
  const { locale } = useLanguage();

  return useMemo(() => {
    if (!settings) return [];
    
    const ADVANCED_QUESTIONS = ALL_ADVANCED_QUESTIONS[locale] || ALL_ADVANCED_QUESTIONS['en'];
    const shuffledAdvancedQuestions = shuffleArray(ADVANCED_QUESTIONS);

    const { category, questionCount, questionType } = settings;
    const questions: Question[] = [];

    const generateOptions = (correctAnswer: number | string): (string | number)[] => {
        const options = new Set<string | number>([correctAnswer]);
        // This logic is only for numeric (non-advanced) questions.
        if (typeof correctAnswer === 'number') {
            while (options.size < 4) {
                const wrongOption1 = correctAnswer + getRandomInt(1, 5);
                const wrongOption2 = Math.max(0, correctAnswer - getRandomInt(1, 5));
                if (wrongOption1 !== correctAnswer) options.add(wrongOption1);
                if (options.size < 4 && wrongOption2 !== correctAnswer) options.add(wrongOption2);
                if (options.size < 4) options.add(getRandomInt(0, Math.max(20, correctAnswer + 5)));
            }
        } else {
            // Fallback for any unexpected string-based answers, though this block should no longer be hit by Advanced questions.
             while(options.size < 4){
                 options.add(`Wrong Option ${options.size}`);
             }
        }

        return shuffleArray(Array.from(options));
    };

    for (let i = 0; i < questionCount; i++) {
      let question: Question | null = null;
      const id = `${category}-${i}-${new Date().getTime()}`;
      
      switch (category) {
        case GameCategory.SUM_10:
        case GameCategory.SUM_20:
        case GameCategory.SUM_30: {
          const limit = category === GameCategory.SUM_10 ? 10 : category === GameCategory.SUM_20 ? 20 : 30;
          const numOperands = getRandomInt(2, 3);
          let operands: number[] = [];
          let answer: number;

          let attempts = 0;
          const maxAttempts = 20;

          do {
            operands = [];
            const minAnswer = numOperands === 3 ? 2 : 0;
            answer = getRandomInt(minAnswer, limit);

            let sumSoFar = 0;
            for (let j = 0; j < numOperands - 1; j++) {
                const operand = getRandomInt(0, answer - sumSoFar);
                operands.push(operand);
                sumSoFar += operand;
            }
            operands.push(answer - sumSoFar);
            
            attempts++;
          } while (
            numOperands === 3 &&
            operands.filter(op => op === 0).length > 1 &&
            attempts < maxAttempts
          );

          const shuffledOperands = shuffleArray(operands);

          question = {
            id,
            text: `${shuffledOperands.join(' + ')} = ?`,
            correctAnswers: [answer],
          };
          break;
        }

        case GameCategory.MIN_20:
        case GameCategory.MIN_30: {
          const limit = category === GameCategory.MIN_20 ? 20 : 30;
          const num1 = getRandomInt(1, limit);
          const num2 = getRandomInt(0, num1);
          const answer = num1 - num2;
          question = {
            id,
            text: `${num1} - ${num2} = ?`,
            correctAnswers: [answer],
          };
          break;
        }

        case GameCategory.ADVANCED: {
          // Use the pre-shuffled array and loop over if needed.
          const advQ = shuffledAdvancedQuestions[i % shuffledAdvancedQuestions.length];
          question = {
            id,
            text: advQ.question,
            correctAnswers: advQ.answers.filter(a => a.correct).map(a => a.answer),
          };
          // For advanced questions, we use the pre-defined answers as options.
          if (questionType === QuestionType.CLOSED) {
            question.options = shuffleArray(advQ.answers.map(a => a.answer));
          }
          break;
        }
      }

      if (question) {
        // Generate options for non-advanced questions, or if they haven't been set.
        if (questionType === QuestionType.CLOSED && !question.options) {
          question.options = generateOptions(question.correctAnswers[0]);
        }
        questions.push(question);
      }
    }
    return questions;
  }, [settings, locale]);
};
