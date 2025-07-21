/**
 * Socket Events Configuration
 * Centralized definition of all Socket.IO events used between client and server
 */

// Core game events
export const CORE_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_GAME: 'join_game',
  LEAVE_GAME: 'leave_game',
  GAME_STATE: 'game_state',
  PLAYER_MOVE: 'player_move',
} as const;

// Player lifecycle events
export const PLAYER_EVENTS = {
  PLAYER_JOINED: 'player_joined',
  PLAYER_LEFT: 'player_left',
  SNAKE_DIED: 'snake_died',
  FOOD_EATEN: 'food_eaten',
  KILL_REWARD: 'kill_reward',
} as const;

// Leaderboard and UI events
export const UI_EVENTS = {
  LEADERBOARD_UPDATE: 'leaderboard_update',
} as const;

// Payment and transaction events
export const PAYMENT_EVENTS = {
  PAYMENT_SUBMIT: 'payment_submit',
  PAYMENT_VERIFIED: 'payment_verified',
  PAYMENT_FAILED: 'payment_failed',
  JOIN_PAID_GAME: 'join_paid_game',
  JOIN_SERVER_TYPE: 'join_server_type',
} as const;

// Withdrawal events
export const WITHDRAWAL_EVENTS = {
  WITHDRAWAL_START: 'withdrawal_start',
  WITHDRAWAL_PROGRESS: 'withdrawal_progress',
  WITHDRAWAL_COMPLETE: 'withdrawal_complete',
  WITHDRAWAL_CANCELLED: 'withdrawal_cancelled',
  WITHDRAWAL_FAILED: 'withdrawal_failed',
  PLAYER_WITHDRAWN: 'player_withdrawn',
} as const;

// Network update types
export const UPDATE_TYPES = {
  FULL_STATE: 'full_state',
  DELTA_STATE: 'delta_state',
  PLAYER_UPDATE: 'player_update',
  FOOD_UPDATE: 'food_update',
} as const;

// Consolidated socket events
export const SOCKET_EVENTS = {
  ...CORE_EVENTS,
  ...PLAYER_EVENTS,
  ...UI_EVENTS,
  ...PAYMENT_EVENTS,
  ...WITHDRAWAL_EVENTS,
} as const;

// Type exports for better type safety
export type CoreEvents = typeof CORE_EVENTS;
export type PlayerEvents = typeof PLAYER_EVENTS;
export type UIEvents = typeof UI_EVENTS;
export type PaymentEvents = typeof PAYMENT_EVENTS;
export type WithdrawalEvents = typeof WITHDRAWAL_EVENTS;
export type UpdateTypes = typeof UPDATE_TYPES;
export type SocketEvents = typeof SOCKET_EVENTS;

// Event payload type definitions for better type safety
export interface SocketEventPayloads {
  [SOCKET_EVENTS.CONNECTION]: undefined;
  [SOCKET_EVENTS.DISCONNECT]: string; // reason
  [SOCKET_EVENTS.JOIN_GAME]: { nickname: string };
  [SOCKET_EVENTS.LEAVE_GAME]: undefined;
  [SOCKET_EVENTS.GAME_STATE]: any; // GameState data
  [SOCKET_EVENTS.PLAYER_MOVE]: { x: number; y: number; boost?: boolean };
  [SOCKET_EVENTS.PLAYER_JOINED]: { id: string; nickname: string };
  [SOCKET_EVENTS.PLAYER_LEFT]: { id: string };
  [SOCKET_EVENTS.SNAKE_DIED]: { playerId: string; finalLength: number };
  [SOCKET_EVENTS.FOOD_EATEN]: { playerId: string; foodId: string };
  [SOCKET_EVENTS.KILL_REWARD]: { killerId: string; victimId: string; rewardAmount: number };
  [SOCKET_EVENTS.LEADERBOARD_UPDATE]: any[]; // Leaderboard data
  [SOCKET_EVENTS.PAYMENT_SUBMIT]: { signature: string; serverTier: string; playerAddress: string };
  [SOCKET_EVENTS.PAYMENT_VERIFIED]: { success: boolean; playerAddress: string };
  [SOCKET_EVENTS.PAYMENT_FAILED]: { error: string; playerAddress: string };
  [SOCKET_EVENTS.JOIN_PAID_GAME]: { nickname: string; paymentSignature: string };
  [SOCKET_EVENTS.JOIN_SERVER_TYPE]: { nickname: string; serverType: string };
  [SOCKET_EVENTS.WITHDRAWAL_START]: { playerId: string };
  [SOCKET_EVENTS.WITHDRAWAL_PROGRESS]: { playerId: string; progress: number };
  [SOCKET_EVENTS.WITHDRAWAL_COMPLETE]: { playerId: string; amount: number };
  [SOCKET_EVENTS.WITHDRAWAL_CANCELLED]: { playerId: string };
  [SOCKET_EVENTS.WITHDRAWAL_FAILED]: { playerId: string; error: string };
  [SOCKET_EVENTS.PLAYER_WITHDRAWN]: { playerId: string; networth: number };
} 