import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameScreenProps, PlayerData, FoodData } from '../../types';
import { GameCanvas } from '../GameCanvas';
import { HUD } from '../../ui/hud/HUD';
import { Leaderboard } from '../../ui/leaderboard/Leaderboard';
import { DeathScreen } from './DeathScreen';
import { LoadingScreen } from './LoadingScreen';
import { useSocket } from '../../hooks/useSocket';
import { useGameState } from '../../hooks/useGameState';
import { useInput } from '../../hooks/useInput';
import { Camera } from '../../game/Camera';
import { Renderer } from '../../game/Renderer';
import { SOCKET_EVENTS, GAME_CONFIG } from '../../common/constants';
import { formatTime } from '../../utils';

export const GameScreen: React.FC<GameScreenProps> = ({ nickname, onGameEnd }) => {
    const [loading, setLoading] = useState(true);
    const [showDeathScreen, setShowDeathScreen] = useState(false);
    const [gameStartTime, setGameStartTime] = useState(Date.now());
    const [deathTime, setDeathTime] = useState<number | null>(null);
    const [eliminations, setEliminations] = useState(0);
    const [finalLength, setFinalLength] = useState(0);
    const [fps, setFps] = useState(0);
    const [leaderboardPlayers, setLeaderboardPlayers] = useState<PlayerData[]>([]);

    // Game engine references
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cameraRef = useRef<Camera | null>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const lastMoveTime = useRef(0);
    const moveThrottle = 1000 / 120; // 120 FPS for responsive input
    const connectedRef = useRef(false); // Track connection state

    // FPS tracking
    const frameTimes = useRef<number[]>([]);
    const lastFpsUpdate = useRef(0);
    const localPlayerIdRef = useRef<string | null>(null);

    // Custom hooks
    const socket = useSocket();
    const gameState = useGameState();
    const input = useInput(canvasRef.current, cameraRef.current);

    // Initialize connection ONCE - only depends on nickname
    useEffect(() => {
        if (connectedRef.current) return; // Prevent multiple connections
        
        console.log('Connecting to server...');
        socket.connect();
        connectedRef.current = true;

        const handleConnected = () => {
            console.log('Connected successfully, joining game...');
            setLoading(false);
            socket.joinGame(nickname);
            gameState.setGameRunning(true);
            setGameStartTime(Date.now());
            setEliminations(0);
        };

        const handleDisconnected = () => {
            console.log('Disconnected from server');
            connectedRef.current = false;
            gameState.setConnected(false);
        };

        const handleError = (error: any) => {
            console.error('Connection error:', error);
            setLoading(false);
            connectedRef.current = false;
            onGameEnd(); // Go back to menu on connection error
        };

        socket.on('connected', handleConnected);
        socket.on('disconnected', handleDisconnected);
        socket.on('connect_error', handleError);

        return () => {
            console.log('Cleaning up socket connection...');
            socket.off('connected');
            socket.off('disconnected');
            socket.off('connect_error');
            connectedRef.current = false;
        };
    }, [nickname]); // Only depend on nickname - stable dependencies only

    // Set up game event handlers - separate useEffect
    useEffect(() => {
        const handleGameState = (state: any) => {
            gameState.updateGameState(state);
            
            // Set local player ID if not set
            if (!gameState.gameState.localPlayerId && state.players) {
                for (const [id, playerData] of Object.entries(state.players)) {
                    const typedPlayerData = playerData as PlayerData;
                    if (typedPlayerData.nickname === nickname) {
                        gameState.setLocalPlayerId(id);
                        localPlayerIdRef.current = id; // Store in ref for persistence
                        break;
                    }
                }
            }
        };

        const handleLeaderboardUpdate = (data: any) => {
            const players = Object.values(data.players) as PlayerData[];
            setLeaderboardPlayers(players);
        };

        const handlePlayerJoined = (data: any) => {
            // Player joined event handled silently
        };

        const handlePlayerLeft = (data: any) => {
            gameState.removePlayer(data.id);
        };

        const handleSnakeDied = (data: any) => {
            // Use the ref value which persists even when game state changes
            const currentLocalPlayerId = localPlayerIdRef.current || gameState.gameState.localPlayerId;
            
            if (data.playerId === currentLocalPlayerId) {
                // Local player died
                setFinalLength(data.finalLength || 0);
                setDeathTime(Date.now()); // Freeze the time when player dies
                setShowDeathScreen(true);
                gameState.setGameRunning(false);
            } else if (data.killer === currentLocalPlayerId) {
                // Local player killed someone
                setEliminations(prev => prev + 1);
            }
        };

        const handleFoodEaten = (data: any) => {
            gameState.removeFood(data.foodId);
        };

        socket.on(SOCKET_EVENTS.GAME_STATE, handleGameState);
        socket.on(SOCKET_EVENTS.LEADERBOARD_UPDATE, handleLeaderboardUpdate);
        socket.on(SOCKET_EVENTS.PLAYER_JOINED, handlePlayerJoined);
        socket.on(SOCKET_EVENTS.PLAYER_LEFT, handlePlayerLeft);
        socket.on(SOCKET_EVENTS.SNAKE_DIED, handleSnakeDied);
        socket.on(SOCKET_EVENTS.FOOD_EATEN, handleFoodEaten);

        return () => {
            socket.off(SOCKET_EVENTS.GAME_STATE);
            socket.off(SOCKET_EVENTS.LEADERBOARD_UPDATE);
            socket.off(SOCKET_EVENTS.PLAYER_JOINED);
            socket.off(SOCKET_EVENTS.PLAYER_LEFT);
            socket.off(SOCKET_EVENTS.SNAKE_DIED);
            socket.off(SOCKET_EVENTS.FOOD_EATEN);
        };
    }, [nickname]); // Only depend on nickname

    // Handle input for player movement - FIXED with proper dependencies
    useEffect(() => {
        // Input effect triggered - removed console log to reduce spam

        if (!gameState.gameState.gameRunning) {
            return;
        }

        const localPlayer = gameState.gameState.localPlayerId 
            ? gameState.gameState.players.get(gameState.gameState.localPlayerId)
            : null;

        if (!localPlayer || !localPlayer.alive) {
            return;
        }

        const currentTime = Date.now();
        if (currentTime - lastMoveTime.current < moveThrottle) return;

        // Use world coordinates instead of screen coordinates
        const mouseWorldPos = input.getMouseWorldPosition();
        if (!mouseWorldPos) {
            return;
        }

        const playerHeadPos = localPlayer.getHeadPosition();
        const dx = mouseWorldPos.x - playerHeadPos.x;
        const dy = mouseWorldPos.y - playerHeadPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Dynamic deadzone based on snake thickness
        const dynamicDeadzone = Math.max(30, Math.min(100, localPlayer.thickness * 1.5));

        // Check deadzone - don't send movement if mouse is too close
        if (distance < dynamicDeadzone) {
            return;
        }

        const angle = Math.atan2(dy, dx);
        const isBoosting = input.inputState.isBoosting;

        // Sending move command
        socket.sendPlayerMove(angle, isBoosting);
        lastMoveTime.current = currentTime;
    }, [
        gameState.gameState.gameRunning,
        gameState.gameState.localPlayerId,
        input.inputState.mousePosition.x, // Track mouse position changes
        input.inputState.mousePosition.y,
        input.inputState.isBoosting,
        socket
    ]); // FIXED: Added proper dependencies

    // FPS tracking
    const updateFps = useCallback((currentTime: number) => {
        frameTimes.current.push(currentTime);
        
        // Remove frames older than 1 second
        while (frameTimes.current.length > 0 && frameTimes.current[0] <= currentTime - 1000) {
            frameTimes.current.shift();
        }
        
        const currentFps = frameTimes.current.length;
        
        // Update FPS display every 200ms for stability
        if (currentTime - lastFpsUpdate.current > 200) {
            setFps(currentFps);
            lastFpsUpdate.current = currentTime;
        }
    }, []);

    // Start FPS tracking
    useEffect(() => {
        let animationId: number;
        
        const fpsLoop = (currentTime: number) => {
            updateFps(currentTime);
            animationId = requestAnimationFrame(fpsLoop);
        };
        
        animationId = requestAnimationFrame(fpsLoop);
        
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [updateFps]);

    const handleCanvasReady = useCallback((canvas: HTMLCanvasElement, camera: Camera, renderer: Renderer) => {
        canvasRef.current = canvas;
        cameraRef.current = camera;
        rendererRef.current = renderer;
        // REMOVED: Don't create duplicate Input instance - useInput hook handles this
    }, []);

    const handleRespawn = useCallback(() => {
        setShowDeathScreen(false);
        setDeathTime(null); // Reset death time
        setLoading(true);
        socket.joinGame(nickname);
        gameState.setGameRunning(true);
        setGameStartTime(Date.now());
        setEliminations(0);
        setLoading(false);
        
        // Reset input state to clear any boosting state
        input.resetBoostingState();
    }, [socket, nickname, gameState, input.resetBoostingState]);

    const getLocalPlayerLength = () => {
        const localPlayer = gameState.gameState.localPlayerId 
            ? gameState.gameState.players.get(gameState.gameState.localPlayerId)
            : null;
        return localPlayer ? localPlayer.getCurrentLength() : 10;
    };

    const getTimeAlive = () => {
        // If player is dead, use the death time to calculate final time
        const endTime = deathTime || Date.now();
        const timeAlive = Math.max(0, endTime - gameStartTime);
        return formatTime(timeAlive);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="game-screen">
            <GameCanvas
                players={gameState.gameState.players}
                food={gameState.gameState.food}
                localPlayerId={gameState.gameState.localPlayerId}
                onCanvasReady={handleCanvasReady}
                onResize={input.onCanvasResize}
            />
            
            <HUD length={getLocalPlayerLength()} fps={fps} />
            
            <Leaderboard 
                players={leaderboardPlayers} 
                localPlayerId={gameState.gameState.localPlayerId} 
            />

            {showDeathScreen && (
                <DeathScreen
                    finalLength={finalLength}
                    timeAlive={getTimeAlive()}
                    eliminations={eliminations}
                    onRespawn={handleRespawn}
                />
            )}
        </div>
    );
};
