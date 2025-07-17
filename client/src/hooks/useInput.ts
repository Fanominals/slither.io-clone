import { useEffect, useRef, useState, useCallback } from 'react';
import { Vector2D, InputState, UseInputReturn } from '../types';
import { Input } from '../game/Input';
import { Camera } from '../game/Camera';

export function useInput(canvas: HTMLCanvasElement | null, camera: Camera | null): UseInputReturn {
    const inputRef = useRef<Input | null>(null);
    const lastMouseOverState = useRef<boolean>(false);
    const [inputState, setInputState] = useState<InputState>({
        mousePosition: { x: 0, y: 0 },
        isBoosting: false,
        isMouseOver: false
    });

    // Initialize input when canvas is available
    useEffect(() => {
        if (canvas && !inputRef.current) {
            const input = new Input(canvas);
            inputRef.current = input;

            // Set up event-driven input state updates
            const updateInputState = () => {
                const newState = {
                    mousePosition: input.getMousePosition(),
                    isBoosting: input.isBoosting(),
                    isMouseOver: input.isMouseOver()
                };
                
                // Update mouse over state
                lastMouseOverState.current = newState.isMouseOver;
                
                setInputState(newState);
            };

            // Add event listeners for real-time updates
            const handleMouseMove = () => updateInputState();
            const handleMouseEnter = () => updateInputState();
            const handleMouseLeave = () => updateInputState();
            const handleMouseDown = () => updateInputState();
            const handleMouseUp = () => updateInputState();
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.code === 'Space') updateInputState();
            };
            const handleKeyUp = (e: KeyboardEvent) => {
                if (e.code === 'Space') updateInputState();
            };

            // Add event listeners
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseenter', handleMouseEnter);
            canvas.addEventListener('mouseleave', handleMouseLeave);
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);

            // Initial state update
            updateInputState();

            // Return cleanup function
            return () => {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseenter', handleMouseEnter);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('keyup', handleKeyUp);
                input.destroy();
                inputRef.current = null;
            };
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.destroy();
                inputRef.current = null;
            }
        };
    }, [canvas]);

    const getMouseWorldPosition = useCallback((): Vector2D | null => {
        if (!inputRef.current || !camera) return null;
        
        const mousePos = inputRef.current.getMousePosition();
        return camera.screenToWorld(mousePos);
    }, [camera]);

    const getAngleToMouse = useCallback((playerPosition: Vector2D): number => {
        if (!inputRef.current) return 0;
        return inputRef.current.getAngleToMouse(playerPosition);
    }, []);

    const getDistanceToMouse = useCallback((playerPosition: Vector2D): number => {
        if (!inputRef.current) return 0;
        return inputRef.current.getDistanceToMouse(playerPosition);
    }, []);

    const isMouseNear = useCallback((point: Vector2D, radius: number): boolean => {
        if (!inputRef.current) return false;
        return inputRef.current.isMouseNear(point, radius);
    }, []);

    const onCanvasResize = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.onCanvasResize();
        }
    }, []);

    const resetBoostingState = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.resetBoostingState();
            // Update the input state to reflect the change
            setInputState(prev => ({
                ...prev,
                isBoosting: false
            }));
        }
    }, []);

    return {
        inputState,
        getMouseWorldPosition,
        getAngleToMouse,
        getDistanceToMouse,
        isMouseNear,
        onCanvasResize,
        resetBoostingState
    };
} 