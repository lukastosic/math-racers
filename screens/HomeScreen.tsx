
import React from 'react';
import { GameCategory } from '../types';
import { CATEGORIES } from '../constants';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSelector from '../components/LanguageSelector';
import CharacterSelector from '../components/CharacterSelector';

interface HomeScreenProps {
  onCategorySelect: (category: GameCategory) => void;
}

const CategoryCard: React.FC<{ name: string; color: string; hover: string; onClick: () => void }> = ({ name, color, hover, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full md:w-80 h-40 md:h-52 p-4 flex items-center justify-center text-white font-display text-2xl md:text-3xl text-center tracking-wider border-4 border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] transform transition-transform duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_#000] dark:hover:shadow-[10px_10px_0px_#fff] active:translate-y-2 active:translate-x-2 active:shadow-none ${color} ${hover}`}
  >
    {name}
  </button>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onCategorySelect }) => {
  const { t } = useTranslations();

  const title = t('title');
  const titleParts = title.split(' ');
  const titleFirstPart = titleParts[0];
  const titleSecondPart = titleParts.slice(1).join(' ');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <LanguageSelector />
      <CharacterSelector />
      <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-center text-white text-stroke mb-12 transform -rotate-3 leading-tight">
        <div>{titleFirstPart}</div>
        <div>{titleSecondPart}</div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={t(cat.nameKey)}
            color={cat.color}
            hover={cat.hover}
            onClick={() => onCategorySelect(cat.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Custom text stroke style for the title
const style = document.createElement('style');
style.innerHTML = `
  .text-stroke {
    -webkit-text-stroke: 3px black;
    text-shadow: 6px 6px 0px rgba(0,0,0,0.2);
  }
  .dark .text-stroke {
    -webkit-text-stroke: 3px white;
    text-shadow: none;
  }
  @media (min-width: 768px) {
    .text-stroke {
      -webkit-text-stroke: 4px black;
    }
    .dark .text-stroke {
      -webkit-text-stroke: 4px white;
    }
  }
`;
document.head.appendChild(style);

export default HomeScreen;