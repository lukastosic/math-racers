
import React, { useState, useCallback } from 'react';
// FIX: Import QuestionType to use its enum values.
import { GameSettings, GameCategory, QuestionType } from './types';
import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import GameScreen from './screens/GameScreen';
import CompletionScreen from './screens/CompletionScreen';
import ThemeToggleButton from './components/ThemeToggleButton';

type AppState = 'home' | 'setup' | 'game' | 'complete';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  const handleCategorySelect = useCallback((category: GameCategory) => {
    setGameSettings({
      category,
      questionCount: 10,
      // FIX: Use the enum member QuestionType.CLOSED instead of the string "closed".
      questionType: QuestionType.CLOSED,
    });
    setAppState('setup');
  }, []);

  const handleGameStart = useCallback((settings: GameSettings) => {
    setGameSettings(settings);
    setAppState('game');
  }, []);

  const handleGameEnd = useCallback(() => {
    setAppState('complete');
  }, []);

  const handleGoHome = useCallback(() => {
    setGameSettings(null);
    setAppState('home');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'setup':
        return gameSettings && <SetupScreen initialSettings={gameSettings} onStart={handleGameStart} onBack={handleGoHome} />;
      case 'game':
        return gameSettings && <GameScreen settings={gameSettings} onGameEnd={handleGameEnd} onGoHome={handleGoHome} />;
      case 'complete':
        return <CompletionScreen onContinue={handleGoHome} />;
      case 'home':
      default:
        return <HomeScreen onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="bg-sky-200 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 antialiased overflow-hidden">
      <div className="relative container mx-auto p-4 md:p-8">
        <ThemeToggleButton />
        {renderContent()}
      </div>
    </div>
  );
}
