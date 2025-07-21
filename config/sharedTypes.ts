/**
 * Shared Types Configuration
 * Common type definitions used by both client and server
 */

// Basic geometric types
export interface Vector2D {
  x: number;
  y: number;
}

export interface SnakeSegment {
  x: number;
  y: number;
  radius: number;
}

// Player and game entity types
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
  hasStartedMoving: boolean;
  isBoosting: boolean;
  killRewards: number; // Total rewards earned from kills in USD
}

export interface FoodData {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  lengthIncrement: number;
  monetaryValue: number; // USD value of this food particle (0 for regular food)
}

// Game state and events
export interface GameEvent {
  type: string;
  playerId?: string;
  data?: any;
  timestamp: number;
}

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  length: number;
  killRewards: number;
  rank: number;
}

// Payment and transaction types
export interface PaymentTransaction {
  signature: string;
  amount: number;
  from: string;
  to: string;
  timestamp: number;
  confirmations: number;
  status: 'pending' | 'confirmed' | 'finalized' | 'failed';
}

export interface PaymentVerificationResult {
  isValid: boolean;
  error?: string;
  amount?: number;
  from?: string;
  to?: string;
  transactionSignature?: string;
  explorerUrl?: string;
}

export interface PaymentTransactionDetails {
  signature: string;
  playerAddress: string;
  expectedAmountUsd: number;
  solPriceUsed?: number;
  serverTier: string;
  timestamp: number;
}

// Game server information
export interface GameServerInfo {
  id: string;
  name: string;
  type: string;
  entryFeeUsd: number;
  entryFeeSol: number;
  playerCount: number;
  maxPlayers: number;
  isActive: boolean;
}

// Withdrawal types
export interface WithdrawalResult {
  success: boolean;
  transactionSignature?: string;
  finalValue: number; // Total value withdrawn (USD for paid servers, 0 for free)
  entryFee: number; // Original entry fee
  returnMultiplier: number; // Multiplier on initial investment
  houseFee: number; // House fee percentage
  serverType: string; // Server type to determine currency display
  error?: string;
}

// Environment and configuration types
export type AppEnvironment = 'development' | 'production';
export type SolanaNetwork = 'devnet' | 'mainnet';
export type DatabaseMode = 'local' | 'remote';

// Hook and component state types
export interface BalanceInfo {
  balance: number;
  usdValue: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number;
}

export interface GameStateHook {
  players: Map<string, any>;
  food: Map<string, any>;
  leaderboard: LeaderboardEntry[];
  localPlayerId: string | null;
  isGameRunning: boolean;
  gameStartTime: number;
  setGameRunning: (running: boolean) => void;
  setGameStartTime: (time: number) => void;
}

// Input and control types
export interface InputState {
  mousePosition: Vector2D;
  isBoosting: boolean;
  keys: Set<string>;
}

// Rendering and visual types
export interface RenderContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  camera: {
    x: number;
    y: number;
    zoom: number;
  };
}

// Performance monitoring types
export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  networkLatency: number;
  memoryUsage?: number;
  timestamp: number;
}

// Bot personality and AI types
export interface BotPersonality {
  aggressiveness: number; // 0-1, how likely to chase other snakes
  caution: number; // 0-1, how much to avoid threats
  foodPriority: number; // 0-1, how much to prioritize food over safety
  boostFrequency: number; // 0-1, how often to use boost
}

// Spatial grid and collision types
export interface GridCell {
  snakes: Set<string>;
  food: Set<string>;
}

export interface CollisionInfo {
  hasCollision: boolean;
  collidedWith?: string;
  collisionPoint?: Vector2D;
}

// Utility function types
export type GenerateId = () => string;
export type GenerateColor = () => string;
export type NormalizeAngle = (angle: number) => number;
export type Clamp = (value: number, min: number, max: number) => number;
export type Lerp = (a: number, b: number, t: number) => number;

// Configuration access types for type-safe config access
export interface ConfigAccessor<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  validate(): boolean;
}

// Error types
export interface GameError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

// Network and connection types
export interface ConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  reconnectAttempts: number;
  lastConnected?: number;
  error?: string;
}

// Validation schema types (for future Zod integration)
export interface ValidationSchema<T> {
  parse(data: unknown): T;
  safeParse(data: unknown): { success: boolean; data?: T; error?: any };
}

// Export all types as a single namespace for organized imports
export * from './gameConfig';
export * from './cryptoConfig';

// Re-export socketEvents with explicit naming to resolve conflicts
export {
  CORE_EVENTS,
  PLAYER_EVENTS,
  UI_EVENTS,
  UPDATE_TYPES,
  SOCKET_EVENTS,
  SocketEventPayloads,
  type CoreEvents,
  type PlayerEvents,
  type UIEvents,
  type UpdateTypes,
  type SocketEvents
} from './socketEvents'; 