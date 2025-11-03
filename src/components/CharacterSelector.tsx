import React from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import { CharacterTheme } from '../types';

const CharacterSelector: React.FC = () => {
    const { character, setCharacter } = useCharacter();

    const characters = [
        { theme: 'car' as CharacterTheme, emoji: '🏎️' },
        { theme: 'princess' as CharacterTheme, emoji: '👸' },
    ];

    return (
        <div className="flex justify-center items-center gap-6 md:gap-10 my-8">
            {characters.map(char => (
                <button
                    key={char.theme}
                    onClick={() => setCharacter(char.theme)}
                    aria-pressed={character === char.theme}
                    className={`
                        w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 p-4 flex items-center justify-center 
                        border-4 border-black dark:border-white rounded-full 
                        transform transition-transform duration-200
                        hover:-translate-y-1 hover:-translate-x-1
                        active:translate-y-2 active:translate-x-2 active:shadow-none
                        ${character === char.theme 
                            ? 'bg-yellow-400 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] hover:shadow-[10px_10px_0px_#000] dark:hover:shadow-[10px_10px_0px_#fff]'
                            : 'bg-white/60 dark:bg-slate-700/60 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#000] dark:hover:shadow-[6px_6px_0px_#fff]'
                        }
                    `}
                >
                    <span className="text-6xl sm:text-7xl md:text-8xl">{char.emoji}</span>
                </button>
            ))}
        </div>
    );
};

export default CharacterSelector;
