/**
 * Main Configuration Index
 * Centralized access point for all configuration modules
 */

// Import all configuration modules
import { GAME_CONFIG, GameConfig } from './gameConfig';
import { CRYPTO_CONFIG, CryptoConfig, CryptoUtils } from './cryptoConfig';
import { SOCKET_EVENTS, SocketEvents, SocketEventPayloads } from './socketEvents';
import { logger, Logger, LogLevel, LogCategory, configureLogger } from './logging';

// Re-export all configurations for easy access
export { GAME_CONFIG, GameConfig } from './gameConfig';
export { CRYPTO_CONFIG, CryptoConfig, CryptoUtils } from './cryptoConfig';
export { SOCKET_EVENTS, SocketEvents, SocketEventPayloads } from './socketEvents';
export { logger, Logger, LogLevel, LogCategory, configureLogger } from './logging';
export * from './sharedTypes';

// Explicitly export environmentManager types to avoid conflicts
export {
  BaseEnvironmentManager,
  ClientEnvironmentConfig,
  ServerEnvironmentConfig,
  EnvironmentConfig,
  EnvUtils,
  EnvironmentLoader
} from './environmentManager';

// Consolidated configuration object
export const CONFIG = {
  GAME: GAME_CONFIG,
  CRYPTO: CRYPTO_CONFIG,
  EVENTS: SOCKET_EVENTS,
} as const;

// Type-safe configuration accessor class
export class ConfigManager {
  private static instance: ConfigManager;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  // Game configuration getters
  getGameConfig(): GameConfig {
    return GAME_CONFIG;
  }

  getGameSetting<K extends keyof GameConfig>(key: K): GameConfig[K] {
    return GAME_CONFIG[key];
  }

  // Crypto configuration getters
  getCryptoConfig(): CryptoConfig {
    return CRYPTO_CONFIG;
  }

  getCryptoSetting<K extends keyof CryptoConfig>(key: K): CryptoConfig[K] {
    return CRYPTO_CONFIG[key];
  }

  // Socket events getters
  getSocketEvents(): SocketEvents {
    return SOCKET_EVENTS;
  }

  // Utility methods
  isValidEvent(event: string): boolean {
    return Object.values(SOCKET_EVENTS).includes(event as any);
  }

  // Environment-aware configuration
  getEnvironmentConfig(environment: 'development' | 'production') {
    return {
      game: {
        ...GAME_CONFIG,
        // Override performance settings based on environment
        ENABLE_METRICS: environment === 'production',
        ENABLE_PROFILING: environment === 'development',
        BOT_COUNT: environment === 'development' ? 10 : 50,
        TICK_RATE: environment === 'development' ? 30 : 60,
      },
      crypto: CRYPTO_CONFIG,
      events: SOCKET_EVENTS,
    };
  }

  // Validation methods
  validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate game configuration
    if (GAME_CONFIG.WIDTH <= 0 || GAME_CONFIG.HEIGHT <= 0) {
      errors.push('World dimensions must be positive');
    }

    if (GAME_CONFIG.TICK_RATE <= 0 || GAME_CONFIG.TICK_RATE > 120) {
      errors.push('Tick rate must be between 1 and 120');
    }

    // Validate crypto configuration
    if (CRYPTO_CONFIG.FALLBACK_SOL_PRICE <= 0) {
      errors.push('Fallback SOL price must be positive');
    }

    if (CRYPTO_CONFIG.TOLERANCE_MIN >= CRYPTO_CONFIG.TOLERANCE_MAX) {
      errors.push('Price tolerance min must be less than max');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const configManager = ConfigManager.getInstance();

// Utility functions for common operations
export const Utils = {
  crypto: CryptoUtils,
  
  // Game utility functions
  generateRandomColor: () => {
    const colors = GAME_CONFIG.SNAKE_COLORS;
    return colors[Math.floor(Math.random() * colors.length)];
  },

  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  normalizeAngle: (angle: number) => {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  },

  clamp: (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  },

  lerp: (a: number, b: number, t: number) => {
    return a + (b - a) * t;
  },

  getFoodCount: () => {
    return Math.floor(GAME_CONFIG.WIDTH * GAME_CONFIG.HEIGHT * GAME_CONFIG.DENSITY);
  },
};

// Default export for convenience
export default {
  CONFIG,
  configManager,
  Utils,
}; 