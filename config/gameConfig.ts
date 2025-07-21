/**
 * Game Configuration
 * All gameplay-related settings and constants
 */

// Core gameplay mechanics
export const WORLD_CONFIG = {
  WIDTH: 8000,
  HEIGHT: 8000,
  BORDER_WIDTH: 50, // Width of the red kill border
} as const;

// Snake mechanics
export const SNAKE_CONFIG = {
  INITIAL_LENGTH: 10,
  INITIAL_THICKNESS: 40,
  SPEED: 200, // pixels per second
  BOOST_SPEED: 400, // boost speed in pixels per second
  TURN_RATE: 3.5, // radians per second
  THICKNESS_SCALE_FACTOR: 0.075, // How much thickness increases with length
  VISUAL_LENGTH_FACTOR: 0.4, // How long the snake appears visually
  SPAWN_MIN_DISTANCE: 200, // Minimum distance from any snake head for spawning
  BOOST_LENGTH_LOSS_PER_SEC: 5, // How much length is lost per second while boosting
} as const;

// Food mechanics
export const FOOD_CONFIG = {
  SIZE: 8,
  ATTRACTION_RADIUS: 50, // Radius where food starts gravitating towards snake head
  CONSUMPTION_DISTANCE: 8, // Distance at which food gets consumed
  DENSITY: 0.00005, // Number of food particles per world unit squared
  LENGTH_MIN: 1, // Length increment for small food
  LENGTH_MAX: 2, // Length increment for large food
  DEATH_FOOD_MULTIPLIER: 0.7, // How much food is dropped when snake dies
} as const;

// Camera and rendering
export const CAMERA_CONFIG = {
  SMOOTH_FACTOR: 0.25, // Camera following smoothness
  ZOOM_MIN: 0.75,
  ZOOM_MAX: 1,
  ZOOM_SCALE_FACTOR: 0.8, // How much zoom changes with snake size
  PLAYER_VIEW_RADIUS: 2000, // Half of typical max viewport width plus buffer
  MAX_RENDER_DISTANCE: 2000, // Only render objects within this distance from player
} as const;

// Server performance and networking
export const SERVER_CONFIG = {
  TICK_RATE: 60, // server updates per second
  INTERPOLATION_FACTOR: 0.08, // Client-side interpolation smoothing
  GRID_SIZE: 80,
  SPATIAL_GRID_CELL_SIZE: 500, // Cell size for spatial grid
  BOT_COUNT: 3, // Number of AI bots to spawn for testing
} as const;

// Input handling
export const INPUT_CONFIG = {
  DEADZONE: 30, // Minimum distance from snake head to mouse for movement input
  MOUSE_SENSITIVITY: 1.0,
  TOUCH_SENSITIVITY: 1.2,
  KEYBOARD_REPEAT_DELAY: 150, // milliseconds
  BOOST_KEY: 'Space',
  PAUSE_KEY: 'Escape',
  ZOOM_SENSITIVITY: 0.1,
} as const;

// UI and visual effects
export const UI_CONFIG = {
  HEADER_HEIGHT: 60,
  FOOTER_HEIGHT: 40,
  SIDEBAR_WIDTH: 300,
  ANIMATION_DURATION: 300,
  NOTIFICATION_DURATION: 3000,
  BACKGROUND_COLOR: '#1a1a2e',
  GRID_COLOR: '#16213e',
  FOOD_GLOW_INTENSITY: 1.5,
  SNAKE_GLOW_INTENSITY: 1.2,
} as const;

// Performance settings
export const PERFORMANCE_CONFIG = {
  TARGET_FPS: 60,
  MAX_DELTA_TIME: 1000 / 30, // Cap delta time to 30 FPS minimum
  PHYSICS_STEP: 1000 / 120, // 120 Hz physics simulation
  ENABLE_METRICS: false, // Will be overridden by environment
  METRICS_INTERVAL: 5000,
  ENABLE_PROFILING: true, // Will be overridden by environment
} as const;

// Network configuration
export const NETWORK_CONFIG = {
  RECONNECT_INTERVAL: 3000, // Time to wait before attempting reconnect
  MAX_RECONNECT_ATTEMPTS: 5,
  HEARTBEAT_INTERVAL: 30000, // Send heartbeat every 30 seconds
  CONNECTION_TIMEOUT: 10000, // Consider connection failed after 10 seconds
} as const;

// Audio settings
export const AUDIO_CONFIG = {
  MASTER_VOLUME: 0.7,
  SFX_VOLUME: 0.8,
  MUSIC_VOLUME: 0.5,
  MUTE_ON_FOCUS_LOSS: true,
} as const;

// Game mechanics and rules
export const GAME_RULES = {
  DISTRIBUTE_REWARDS_TO_FOOD: true, // Whether victim's networth is distributed among food particles
} as const;

// Color schemes
export const COLOR_SCHEMES = {
  SNAKE_COLORS: [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#F4D03F'
  ],
} as const;

// Consolidated game configuration
export const GAME_CONFIG = {
  ...WORLD_CONFIG,
  ...SNAKE_CONFIG,
  ...FOOD_CONFIG,
  ...CAMERA_CONFIG,
  ...SERVER_CONFIG,
  ...INPUT_CONFIG,
  ...UI_CONFIG,
  ...PERFORMANCE_CONFIG,
  ...NETWORK_CONFIG,
  ...AUDIO_CONFIG,
  ...GAME_RULES,
  ...COLOR_SCHEMES,
} as const;

// Helper functions
export function generateRandomSnakeColor(): string {
  return COLOR_SCHEMES.SNAKE_COLORS[Math.floor(Math.random() * COLOR_SCHEMES.SNAKE_COLORS.length)];
}

export function getFoodCount(): number {
  return Math.floor(WORLD_CONFIG.WIDTH * WORLD_CONFIG.HEIGHT * FOOD_CONFIG.DENSITY);
}

// Type exports for better type safety
export type GameConfig = typeof GAME_CONFIG;
export type WorldConfig = typeof WORLD_CONFIG;
export type SnakeConfig = typeof SNAKE_CONFIG;
export type FoodConfig = typeof FOOD_CONFIG;
export type CameraConfig = typeof CAMERA_CONFIG;
export type ServerConfig = typeof SERVER_CONFIG;
export type InputConfig = typeof INPUT_CONFIG;
export type UIConfig = typeof UI_CONFIG;
export type PerformanceConfig = typeof PERFORMANCE_CONFIG;
export type NetworkConfig = typeof NETWORK_CONFIG;
export type AudioConfig = typeof AUDIO_CONFIG;
export type GameRules = typeof GAME_RULES;
export type ColorSchemes = typeof COLOR_SCHEMES; 