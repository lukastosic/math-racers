export enum GameCategory {
  SUM_10 = "SUM_10",
  SUM_20 = "SUM_20",
  SUM_30 = "SUM_30",
  MIN_20 = "MIN_20",
  MIN_30 = "MIN_30",
  ADVANCED = "ADVANCED",
}

export enum QuestionType {
  OPEN = "open form",
  CLOSED = "closed form",
}

export type CharacterTheme = 'car' | 'princess';

export interface AdvancedQuestion {
  question: string;
  answers: {
    answer: string;
    correct: boolean;
  }[];
}

export interface Question {
  id: string;
  text: string;
  correctAnswers: (string | number)[];
  options?: (string | number)[];
}

export interface GameSettings {
  category: GameCategory;
  questionCount: number;
  questionType: QuestionType;
}
