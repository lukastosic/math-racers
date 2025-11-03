import { GameCategory } from './types';

export const CATEGORIES: { id: GameCategory; nameKey: string; color: string; hover: string }[] = [
  { id: GameCategory.SUM_10, nameKey: 'category_sum_10', color: 'bg-yellow-400', hover: 'hover:bg-yellow-500' },
  { id: GameCategory.SUM_20, nameKey: 'category_sum_20', color: 'bg-orange-400', hover: 'hover:bg-orange-500' },
  { id: GameCategory.SUM_30, nameKey: 'category_sum_30', color: 'bg-red-500', hover: 'hover:bg-red-600' },
  { id: GameCategory.MIN_20, nameKey: 'category_min_20', color: 'bg-lime-400', hover: 'hover:bg-lime-500' },
  { id: GameCategory.MIN_30, nameKey: 'category_min_30', color: 'bg-green-500', hover: 'hover:bg-green-600' },
  { id: GameCategory.ADVANCED, nameKey: 'category_advanced', color: 'bg-purple-500', hover: 'hover:bg-purple-600' },
];

export const SUCCESS_MESSAGES: string[] = [
    "Awesome!",
    "You got it!",
    "Superstar!",
    "Amazing!",
    "Well done!",
    "Brilliant!",
    "Fantastic!",
    "Great job!",
];
