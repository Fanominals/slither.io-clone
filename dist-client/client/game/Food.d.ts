import { FoodData, Vector2D } from '../../common/constants.js';
export declare class ClientFood {
    id: string;
    x: number;
    y: number;
    color: string;
    size: number;
    mass: number;
    pulseAnimation: number;
    glowIntensity: number;
    constructor(foodData: FoodData);
    updateFromServer(foodData: FoodData): void;
    update(deltaTime: number): void;
    getAnimatedSize(): number;
    getPosition(): Vector2D;
    isVisible(cameraX: number, cameraY: number, cameraZoom: number, screenWidth: number, screenHeight: number): boolean;
    getRenderColor(): string;
    getMass(): number;
    getDistanceTo(point: Vector2D): number;
    contains(point: Vector2D): boolean;
    getBoundingBox(): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
