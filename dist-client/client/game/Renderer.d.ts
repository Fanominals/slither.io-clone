import { ClientSnake } from './Snake.js';
import { ClientFood } from './Food.js';
import { Camera } from './Camera.js';
export declare class Renderer {
    private canvas;
    private ctx;
    private camera;
    private gridPattern;
    constructor(canvas: HTMLCanvasElement, camera: Camera);
    private createGridPattern;
    clear(): void;
    private applyCameraTransform;
    private resetTransform;
    drawGrid(): void;
    drawWorldBoundaries(): void;
    drawSnake(snake: ClientSnake): void;
    private drawSnakeEyes;
    private drawSnakeName;
    drawFood(food: ClientFood): void;
    drawUI(localPlayer: ClientSnake | null): void;
    drawLoading(): void;
    resize(width: number, height: number): void;
}
