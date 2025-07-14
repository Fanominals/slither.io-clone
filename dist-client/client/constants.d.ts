export declare const GAME_CONFIG: {
    readonly WORLD_WIDTH: 4000;
    readonly WORLD_HEIGHT: 4000;
    readonly CAMERA_SMOOTH_FACTOR: 0.1;
    readonly ZOOM_MIN: 0.65;
    readonly ZOOM_MAX: 1.2;
    readonly ZOOM_SCALE_FACTOR: 0.8;
    readonly INTERPOLATION_FACTOR: 0.15;
};
export interface Vector2D {
    x: number;
    y: number;
}
export interface SnakeSegment {
    x: number;
    y: number;
    radius: number;
}
export interface PlayerData {
    id: string;
    nickname: string;
    color: string;
    x: number;
    y: number;
    angle: number;
    length: number;
    thickness: number;
    segments: SnakeSegment[];
    alive: boolean;
    score: number;
}
export interface FoodData {
    id: string;
    x: number;
    y: number;
    color: string;
    size: number;
    mass: number;
}
export declare function distance(a: Vector2D, b: Vector2D): number;
export declare function normalizeAngle(angle: number): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function lerp(a: number, b: number, t: number): number;
