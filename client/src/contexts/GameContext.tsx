import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameServerInfo } from '../types';

interface GameContextType {
  currentScreen: 'menu' | 'game' | 'death' | 'loading' | 'error';
  selectedServer: GameServerInfo | null;
  setCurrentScreen: (screen: 'menu' | 'game' | 'death' | 'loading' | 'error') => void;
  setSelectedServer: (server: GameServerInfo | null) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'game' | 'death' | 'loading' | 'error'>('menu');
  const [selectedServer, setSelectedServer] = useState<GameServerInfo | null>(null);

  const resetGame = () => {
    setCurrentScreen('menu');
    setSelectedServer(null);
  };

  return (
    <GameContext.Provider value={{
      currentScreen,
      selectedServer,
      setCurrentScreen,
      setSelectedServer,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}; 