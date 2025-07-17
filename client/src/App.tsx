import React, { useState } from 'react';
import { MenuScreen } from './components/screens/MenuScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ErrorScreen } from './components/screens/ErrorScreen';

type AppState = 'menu' | 'game' | 'error';

interface ErrorState {
    message: string;
}

export const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('menu');
    const [nickname, setNickname] = useState<string>('');
    const [error, setError] = useState<ErrorState | null>(null);

    const handleStartGame = (playerNickname: string) => {
        setNickname(playerNickname);
        setAppState('game');
        setError(null);
    };

    const handleGameEnd = () => {
        setAppState('menu');
        setNickname('');
        setError(null);
    };

    const handleError = (errorMessage: string) => {
        setError({ message: errorMessage });
        setAppState('error');
    };

    const handleRetry = () => {
        setError(null);
        setAppState('menu');
    };

    return (
        <div className="app">
            {appState === 'menu' && (
                <MenuScreen onStartGame={handleStartGame} />
            )}
            
            {appState === 'game' && (
                <GameScreen 
                    nickname={nickname} 
                    onGameEnd={handleGameEnd}
                />
            )}
            
            {appState === 'error' && error && (
                <ErrorScreen 
                    message={error.message} 
                    onRetry={handleRetry}
                />
            )}
        </div>
    );
}; 