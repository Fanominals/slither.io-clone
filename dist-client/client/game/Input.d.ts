import { Vector2D } from '../../common/constants.js';
export declare class Input {
    private canvas;
    private mousePosition;
    private isMouseInCanvas;
    private eventListeners;
    private isBoostingState;
    constructor(canvas: HTMLCanvasElement);
    private setupEventListeners;
    getMousePosition(): Vector2D;
    isMouseOver(): boolean;
    getAngleToMouse(playerPosition: Vector2D): number;
    getDirectionToMouse(playerPosition: Vector2D): Vector2D;
    getDistanceToMouse(playerPosition: Vector2D): number;
    setMousePosition(x: number, y: number): void;
    isMouseNear(point: Vector2D, radius: number): boolean;
    destroy(): void;
    onCanvasResize(): void;
    isBoosting(): boolean;
}
