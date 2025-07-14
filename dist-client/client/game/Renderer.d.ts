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
    private draw3DHex;
    clear(): void;
    private applyCameraTransform;
    private resetTransform;
    drawGrid(): void;
    private getHexPoints;
    drawWorldBoundaries(): void;
    drawSnake(snake: ClientSnake): void;
    private drawSnakeEyes;
    private drawSnakeName;
    drawFood(food: ClientFood): void;
    drawUI(localPlayer: ClientSnake | null): void;
    drawLoading(): void;
    drawMinimap(players: Map<string, any>, localPlayerId: string | null): void;
    resize(width: number, height: number): void;
}
