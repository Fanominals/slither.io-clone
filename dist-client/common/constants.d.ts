export declare const GAME_CONFIG: {
    readonly WORLD_WIDTH: 8000;
    readonly WORLD_HEIGHT: 8000;
    readonly INITIAL_SNAKE_LENGTH: 10;
    readonly INITIAL_SNAKE_THICKNESS: 40;
    readonly SNAKE_SPEED: 200;
    readonly SNAKE_BOOST_SPEED: 400;
    readonly FOOD_SIZE: 8;
    readonly FOOD_ATTRACTION_RADIUS: 50;
    readonly FOOD_CONSUMPTION_DISTANCE: 8;
    readonly FOOD_DENSITY: 0.00005;
    readonly GRID_SIZE: 80;
    readonly TICK_RATE: 60;
    readonly CAMERA_SMOOTH_FACTOR: 0.25;
    readonly ZOOM_MIN: 0.75;
    readonly ZOOM_MAX: 1;
    readonly ZOOM_SCALE_FACTOR: 0.8;
    readonly THICKNESS_SCALE_FACTOR: 0.075;
    readonly VISUAL_LENGTH_FACTOR: 0.4;
    readonly FOOD_LENGTH_MIN: 1;
    readonly FOOD_LENGTH_MAX: 2;
    readonly DEATH_FOOD_MULTIPLIER: 0.7;
    readonly INTERPOLATION_FACTOR: 0.08;
    readonly BORDER_WIDTH: 50;
    readonly SNAKE_TURN_RATE: 3.5;
    readonly PLAYER_VIEW_RADIUS: 2000;
    readonly BOT_COUNT: 1;
    readonly SPATIAL_GRID_CELL_SIZE: 500;
    readonly SNAKE_SPAWN_MIN_DIST: 200;
    readonly BOOST_LENGTH_LOSS_PER_SEC: 5;
    readonly INPUT_DEADZONE: 30;
};
export declare const SOCKET_EVENTS: {
    readonly CONNECTION: "connection";
    readonly DISCONNECT: "disconnect";
    readonly JOIN_GAME: "join_game";
    readonly LEAVE_GAME: "leave_game";
    readonly PLAYER_MOVE: "player_move";
    readonly GAME_STATE: "game_state";
    readonly LEADERBOARD_UPDATE: "leaderboard_update";
    readonly SNAKE_DIED: "snake_died";
    readonly FOOD_EATEN: "food_eaten";
    readonly PLAYER_JOINED: "player_joined";
    readonly PLAYER_LEFT: "player_left";
};
export declare const UPDATE_TYPES: {
    readonly FULL_STATE: "full_state";
    readonly DELTA_STATE: "delta_state";
    readonly PLAYER_UPDATE: "player_update";
    readonly FOOD_UPDATE: "food_update";
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
    isBoosting: boolean;
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
export declare function generateRandomColor(): string;
export declare function generateId(): string;
export declare function distance(a: Vector2D, b: Vector2D): number;
export declare function normalizeAngle(angle: number): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function lerp(a: number, b: number, t: number): number;
export declare function getFoodCount(): number;
