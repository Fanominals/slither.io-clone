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

// React Component Props Types
export interface GameScreenProps {
    nickname: string;
    onGameEnd: () => void;
}

export interface MenuScreenProps {
    onStartGame: (nickname: string) => void;
}

export interface DeathScreenProps {
    finalLength: number;
    timeAlive: string;
    eliminations: number;
    onRespawn: () => void;
}

export interface LoadingScreenProps {
    message?: string;
}

export interface ErrorScreenProps {
    message: string;
    onRetry: () => void;
}

export interface LeaderboardProps {
    players: PlayerData[];
    localPlayerId: string | null;
}

export interface HUDProps {
    length: number;
    fps: number;
}

// Game Engine Types
export interface GameEngineState {
    players: Map<string, any>; // ClientSnake objects, using any to avoid circular imports
    food: Map<string, any>; // ClientFood objects, using any to avoid circular imports
    localPlayerId: string | null;
    gameRunning: boolean;
    connected: boolean;
}

export interface InputState {
    mousePosition: Vector2D;
    isBoosting: boolean;
    isMouseOver: boolean;
}

// Hook Return Types
export interface UseGameStateReturn {
    gameState: GameEngineState;
    updateGameState: (newState: any) => void;
    setLocalPlayerId: (playerId: string | null) => void;
    setGameRunning: (running: boolean) => void;
    setConnected: (connected: boolean) => void;
    removeFood: (foodId: string) => void;
    removePlayer: (playerId: string) => void;
    resetGame: () => void;
}

export interface UseSocketReturn {
    socket: any;
    connected: boolean;
    error: string | null;
    connect: () => void;
    disconnect: () => void;
    joinGame: (nickname: string) => void;
    sendPlayerMove: (angle: number, isBoosting: boolean) => void;
    on: (event: string, handler: (...args: any[]) => void) => void;
    off: (event: string) => void;
}

export interface UseInputReturn {
    inputState: InputState;
    getMouseWorldPosition: () => Vector2D | null;
    getAngleToMouse: (playerPosition: Vector2D) => number;
    getDistanceToMouse: (playerPosition: Vector2D) => number;
    isMouseNear: (point: Vector2D, radius: number) => boolean;
    onCanvasResize: () => void;
    resetBoostingState: () => void;
} 