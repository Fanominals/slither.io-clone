// Game Configuration Constants
export const GAME_CONFIG = {
    WORLD_WIDTH: 4000,
    WORLD_HEIGHT: 4000,
    INITIAL_SNAKE_LENGTH: 10,
    INITIAL_SNAKE_THICKNESS: 40,
    SNAKE_SPEED: 200, // pixels per second
    SNAKE_BOOST_SPEED: 400, // boost speed in pixels per second
    FOOD_SIZE: 8,
    FOOD_ATTRACTION_RADIUS: 50, // Radius where food starts gravitating towards snake head  
    FOOD_CONSUMPTION_DISTANCE: 8, // Distance at which food gets consumed (much smaller)
    FOOD_COUNT: 800,
    GRID_SIZE: 80,
    TICK_RATE: 60, // server updates per second (increased from 30 to 60)
    CAMERA_SMOOTH_FACTOR: 0.25, // Increased from 0.15 for more responsive camera
    ZOOM_MIN: 0.6,
    ZOOM_MAX: 0.8,
    ZOOM_SCALE_FACTOR: 0.8, // How much zoom changes with snake size
    THICKNESS_SCALE_FACTOR: 0.075, // How much thickness increases with length (0.1 = 10% of length)
    VISUAL_LENGTH_FACTOR: 0.4, // How long the snake appears visually (1.0 = 1 segment per length unit)
    FOOD_LENGTH_MIN: 1, // Length increment for small food
    FOOD_LENGTH_MAX: 2, // Length increment for large food
    DEATH_FOOD_MULTIPLIER: 0.7, // How much food is dropped when snake dies
    INTERPOLATION_FACTOR: 0.08, // Reduced from 0.15 for smoother interpolation
    BORDER_WIDTH: 50, // Width of the red kill border
    SNAKE_TURN_RATE: 3.5, // radians per second
    PLAYER_VIEW_RADIUS: 1000, // Only send entities within this radius of the player's head
    BOT_COUNT: 10, // Number of AI bots to spawn for testing
} as const;

// Socket.IO Event Names
export const SOCKET_EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    JOIN_GAME: 'join_game',
    LEAVE_GAME: 'leave_game',
    PLAYER_MOVE: 'player_move',
    GAME_STATE: 'game_state',
    LEADERBOARD_UPDATE: 'leaderboard_update',
    SNAKE_DIED: 'snake_died',
    FOOD_EATEN: 'food_eaten',
    PLAYER_JOINED: 'player_joined',
    PLAYER_LEFT: 'player_left'
} as const;

// Network Update Types
export const UPDATE_TYPES = {
    FULL_STATE: 'full_state',
    DELTA_STATE: 'delta_state',
    PLAYER_UPDATE: 'player_update',
    FOOD_UPDATE: 'food_update'
} as const;

// Game State Types
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
}

export interface FoodData {
    id: string;
    x: number;
    y: number;
    color: string;
    size: number;
    lengthIncrement: number;
}

export interface GameState {
    players: Map<string, PlayerData>;
    food: Map<string, FoodData>;
    timestamp: number;
}

export interface ClientMessage {
    type: string;
    data: any;
    timestamp: number;
}

export interface ServerMessage {
    type: string;
    data: any;
    timestamp: number;
}

export interface JoinGameMessage {
    nickname: string;
}

export interface PlayerMoveMessage {
    angle: number;
    isBoosting: boolean;
    timestamp: number;
}

// Utility Functions
export function generateRandomColor(): string {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#F4D03F'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

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