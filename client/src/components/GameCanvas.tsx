import React, { useRef, useEffect, useCallback } from 'react';
import { Camera } from '../game/Camera';
import { Renderer } from '../game/Renderer';
import { ClientSnake } from '../game/Snake';
import { ClientFood } from '../game/Food';

interface GameCanvasProps {
    players: Map<string, ClientSnake>;
    food: Map<string, ClientFood>;
    localPlayerId: string | null;
    onCanvasReady: (canvas: HTMLCanvasElement, camera: Camera, renderer: Renderer) => void;
    onResize?: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
    players,
    food,
    localPlayerId,
    onCanvasReady,
    onResize
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cameraRef = useRef<Camera | null>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const animationFrameRef = useRef<number>();
    const lastUpdateTimeRef = useRef<number>(0);

    // Initialize canvas, camera, and renderer
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            if (cameraRef.current) {
                cameraRef.current.setSize(canvas.width, canvas.height);
            }
            if (rendererRef.current) {
                rendererRef.current.resize(canvas.width, canvas.height);
            }
            if (onResize) {
                onResize();
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize camera and renderer
        cameraRef.current = new Camera(canvas.width, canvas.height);
        rendererRef.current = new Renderer(canvas, cameraRef.current);

        // Notify parent that canvas is ready
        onCanvasReady(canvas, cameraRef.current, rendererRef.current);

        // Prevent context menu on canvas
        const preventContextMenu = (e: Event) => e.preventDefault();
        canvas.addEventListener('contextmenu', preventContextMenu);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('contextmenu', preventContextMenu);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [onCanvasReady, onResize]);

    // Game rendering loop
    const render = useCallback((currentTime: number) => {
        if (!cameraRef.current || !rendererRef.current) return;

        const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000;
        lastUpdateTimeRef.current = currentTime;

        // Update camera
        const localPlayer = localPlayerId ? players.get(localPlayerId) : null;
        if (localPlayer) {
            const headPos = localPlayer.getHeadPosition();
            
            // If this is the first time we have a local player, snap camera to position
            if (cameraRef.current.x === 0 && cameraRef.current.y === 0) {
                cameraRef.current.snapToTarget(headPos, localPlayer.getCurrentLength());
            } else {
                cameraRef.current.followTarget(headPos, localPlayer.getCurrentLength());
            }
        }
        cameraRef.current.update(deltaTime);

        // Update players
        for (const player of players.values()) {
            player.updateInterpolation(deltaTime);
        }

        // Update food
        for (const foodItem of food.values()) {
            foodItem.update(deltaTime);
        }

        // Render
        rendererRef.current.clear();
        rendererRef.current.drawGrid();
        rendererRef.current.drawWorldBoundaries();

        // Draw food (only visible ones for performance)
        const visibleFood: ClientFood[] = [];
        for (const foodItem of food.values()) {
            if (foodItem.isVisible(
                cameraRef.current.x,
                cameraRef.current.y,
                cameraRef.current.zoom,
                canvasRef.current!.width,
                canvasRef.current!.height
            )) {
                visibleFood.push(foodItem);
            }
        }
        for (const foodItem of visibleFood) {
            rendererRef.current.drawFood(foodItem);
        }

        // Draw snakes (only visible ones for performance)
        const visibleSnakes: ClientSnake[] = [];
        for (const snake of players.values()) {
            if (snake.alive && snake.isVisible(
                cameraRef.current.x,
                cameraRef.current.y,
                cameraRef.current.zoom,
                canvasRef.current!.width,
                canvasRef.current!.height
            )) {
                visibleSnakes.push(snake);
            }
        }
        for (const snake of visibleSnakes) {
            rendererRef.current.drawSnake(snake);
        }

        // Draw UI
        rendererRef.current.drawUI(localPlayer || null);

        // Draw minimap
        rendererRef.current.drawMinimap(players, localPlayerId);

        animationFrameRef.current = requestAnimationFrame(render);
    }, [players, food, localPlayerId]);

    // Start rendering when data is available
    useEffect(() => {
        if (players.size > 0 || food.size > 0) {
            if (!animationFrameRef.current) {
                animationFrameRef.current = requestAnimationFrame(render);
            }
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = undefined;
            }
        };
    }, [render, players.size, food.size]);

    return (
        <>
            <canvas 
                ref={canvasRef}
                id="gameCanvas"
                style={{ 
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 5  // Increased from 1 to ensure mouse events work
                }}
            />
            {/* Minimap canvas */}
            <canvas 
                id="minimap" 
                width="160" 
                height="120"
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 10,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px'
                }}
            />
        </>
    );
}; 