// Client-specific constants (ES modules)
export const GAME_CONFIG = {
    WORLD_WIDTH: 4000,
    WORLD_HEIGHT: 4000,
    CAMERA_SMOOTH_FACTOR: 0.1,
    ZOOM_MIN: 0.65,
    ZOOM_MAX: 1.2,
    ZOOM_SCALE_FACTOR: 0.8,
    INTERPOLATION_FACTOR: 0.15
} as const;

// Client-specific types
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

// Utility functions for client
export function distance(a: Vector2D, b: Vector2D): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function normalizeAngle(angle: number): number {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
} 