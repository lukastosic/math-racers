import React from 'react';
import { CharacterTheme } from '../types';

interface ProgressBarProps {
    current: number;
    total: number;
    theme: CharacterTheme;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, theme }) => {
    const progressPercentage = total > 0 ? (current / total) * 100 : 0;

    const themeConfig = {
        car: {
            runner: '🏎️',
            runnerLabel: 'toy car',
            runnerTransform: 'scaleX(-1)',
            finish: '🏁',
            finishLabel: 'chequered flag',
            gradient: 'from-yellow-400 to-orange-500'
        },
        princess: {
            runner: '👸',
            runnerLabel: 'princess',
            runnerTransform: '',
            finish: '🏰',
            finishLabel: 'castle',
            gradient: 'from-pink-400 to-purple-500'
        }
    };

    const currentTheme = themeConfig[theme];
    
    return (
        <div className="w-full my-4">
            {/* Container for racer and finish line icons, positioned above the bar */}
            <div className="relative h-24 md:h-36">
                {/* Runner Icon */}
                <div 
                    className="absolute bottom-0 transition-all duration-500" 
                    style={{
                        left: `${progressPercentage}%`,
                        transform: `translateX(-${progressPercentage}%) ${currentTheme.runnerTransform}`
                    }}
                >
                    <span className={`text-6xl md:text-8xl inline-block`} role="img" aria-label={currentTheme.runnerLabel}>{currentTheme.runner}</span>
                </div>

                {/* Finish Line Icon */}
                <div className="absolute bottom-0 right-0">
                     <span className="text-6xl md:text-8xl" role="img" aria-label={currentTheme.finishLabel}>{currentTheme.finish}</span>
                </div>
            </div>
            
            {/* The actual progress bar */}
            <div className="h-4 bg-gray-300 dark:bg-gray-700 border-4 border-black dark:border-white rounded-full overflow-hidden">
                <div 
                    className={`h-full bg-gradient-to-r ${currentTheme.gradient} transition-all duration-500`}
                    style={{ width: `${progressPercentage}%`}}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;