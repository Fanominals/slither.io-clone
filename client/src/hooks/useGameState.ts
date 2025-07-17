import { useState, useCallback } from 'react';
import { PlayerData, FoodData, GameEngineState, UseGameStateReturn } from '../types';
import { ClientSnake } from '../game/Snake';
import { ClientFood } from '../game/Food';

export function useGameState(): UseGameStateReturn {
    const [gameState, setGameState] = useState<GameEngineState>({
        players: new Map(),
        food: new Map(),
        localPlayerId: null,
        gameRunning: false,
        connected: false
    });

    const updateGameState = useCallback((newState: any) => {
        setGameState(prevState => {
            const updatedState = { ...prevState };

            // Update players
            if (newState.players) {
                const newPlayers = new Map<string, ClientSnake>();
                
                for (const [id, playerData] of Object.entries(newState.players)) {
                    const typedPlayerData = playerData as PlayerData;
                    
                    if (updatedState.players.has(id)) {
                        const existingSnake = updatedState.players.get(id)!;
                        existingSnake.updateFromServer(typedPlayerData);
                        newPlayers.set(id, existingSnake);
                    } else {
                        const isLocal = id === updatedState.localPlayerId;
                        newPlayers.set(id, new ClientSnake(typedPlayerData, isLocal));
                    }
                }

                // Remove disconnected players
                for (const playerId of updatedState.players.keys()) {
                    if (!newState.players[playerId]) {
                        // Player disconnected - they will be removed by not being added to newPlayers
                    }
                }

                updatedState.players = newPlayers;
            }

            // Update food
            if (newState.food) {
                const newFood = new Map<string, ClientFood>();
                
                for (const [id, foodData] of Object.entries(newState.food)) {
                    const typedFoodData = foodData as FoodData;
                    
                    if (updatedState.food.has(id)) {
                        const existingFood = updatedState.food.get(id)!;
                        existingFood.updateFromServer(typedFoodData);
                        newFood.set(id, existingFood);
                    } else {
                        newFood.set(id, new ClientFood(typedFoodData));
                    }
                }

                updatedState.food = newFood;
            }

            // Update other properties
            if (newState.gameRunning !== undefined) {
                updatedState.gameRunning = newState.gameRunning;
            }
            if (newState.connected !== undefined) {
                updatedState.connected = newState.connected;
            }
            // Only update localPlayerId if it's explicitly provided and not null
            if (newState.localPlayerId !== undefined && newState.localPlayerId !== null) {
                console.log('🔧 Updating local player ID from game state:', newState.localPlayerId);
                updatedState.localPlayerId = newState.localPlayerId;
            }

            return updatedState;
        });
    }, []);

    const setLocalPlayerId = useCallback((playerId: string | null) => {
        console.log('🔧 Setting local player ID:', playerId);
        setGameState(prevState => ({
            ...prevState,
            localPlayerId: playerId
        }));
    }, []);

    const setGameRunning = useCallback((running: boolean) => {
        setGameState(prevState => ({
            ...prevState,
            gameRunning: running
        }));
    }, []);

    const setConnected = useCallback((connected: boolean) => {
        setGameState(prevState => ({
            ...prevState,
            connected
        }));
    }, []);

    const removeFood = useCallback((foodId: string) => {
        setGameState(prevState => {
            const newFood = new Map(prevState.food);
            newFood.delete(foodId);
            return {
                ...prevState,
                food: newFood
            };
        });
    }, []);

    const removePlayer = useCallback((playerId: string) => {
        setGameState(prevState => {
            const newPlayers = new Map(prevState.players);
            newPlayers.delete(playerId);
            return {
                ...prevState,
                players: newPlayers
            };
        });
    }, []);

    const resetGame = useCallback(() => {
        console.log('🔧 Resetting game state - clearing local player ID');
        setGameState({
            players: new Map(),
            food: new Map(),
            localPlayerId: null,
            gameRunning: false,
            connected: false
        });
    }, []);

    return {
        gameState,
        updateGameState,
        setLocalPlayerId,
        setGameRunning,
        setConnected,
        removeFood,
        removePlayer,
        resetGame
    };
} 