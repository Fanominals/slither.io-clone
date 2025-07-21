/**
 * Centralized Logging Configuration
 * Replaces console.log statements with structured, configurable logging
 */

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

// Log categories for better organization
export enum LogCategory {
  GAME = 'GAME',
  NETWORK = 'NETWORK',
  PAYMENT = 'PAYMENT',
  WITHDRAWAL = 'WITHDRAWAL',
  AUTH = 'AUTH',
  PERFORMANCE = 'PERFORMANCE',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  BOT = 'BOT',
  ENVIRONMENT = 'ENV',
}

// Logger configuration
interface LoggerConfig {
  level: LogLevel;
  enableColors: boolean;
  enableTimestamps: boolean;
  enableCategories: boolean;
  enableEmojis: boolean;
  production: boolean;
}

// Default configuration
const DEFAULT_CONFIG: LoggerConfig = {
  level: LogLevel.INFO,
  enableColors: true,
  enableTimestamps: true,
  enableCategories: true,
  enableEmojis: true,
  production: false,
};

// Color mappings for console output
const COLORS = {
  DEBUG: '\x1b[36m', // Cyan
  INFO: '\x1b[32m',  // Green
  WARN: '\x1b[33m',  // Yellow
  ERROR: '\x1b[31m', // Red
  RESET: '\x1b[0m',  // Reset
  BOLD: '\x1b[1m',   // Bold
  DIM: '\x1b[2m',    // Dim
};

// Emoji mappings for better visual feedback
const EMOJIS = {
  [LogLevel.DEBUG]: '🐛',
  [LogLevel.INFO]: 'ℹ️',
  [LogLevel.WARN]: '⚠️',
  [LogLevel.ERROR]: '❌',
};

// Category emojis
const CATEGORY_EMOJIS = {
  [LogCategory.GAME]: '🎮',
  [LogCategory.NETWORK]: '🌐',
  [LogCategory.PAYMENT]: '💰',
  [LogCategory.WITHDRAWAL]: '💸',
  [LogCategory.AUTH]: '🔐',
  [LogCategory.PERFORMANCE]: '⚡',
  [LogCategory.SERVER]: '🖥️',
  [LogCategory.CLIENT]: '💻',
  [LogCategory.BOT]: '🤖',
  [LogCategory.ENVIRONMENT]: '🔧',
};

// Centralized logger class
export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;

  private constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config);
    }
    return Logger.instance;
  }

  // Configure logger
  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // Set log level
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  // Enable/disable production mode
  setProduction(production: boolean): void {
    this.config.production = production;
    if (production) {
      this.config.enableColors = false;
      this.config.enableEmojis = false;
      this.config.level = LogLevel.WARN;
    }
  }

  // Format log message
  private formatMessage(
    level: LogLevel,
    message: string,
    category?: LogCategory,
    data?: any
  ): string {
    let formattedMessage = '';

    // Add timestamp
    if (this.config.enableTimestamps) {
      const timestamp = new Date().toISOString();
      formattedMessage += this.config.enableColors
        ? `${COLORS.DIM}${timestamp}${COLORS.RESET} `
        : `${timestamp} `;
    }

    // Add emoji
    if (this.config.enableEmojis) {
      formattedMessage += `${EMOJIS[level]} `;
    }

    // Add level
    const levelName = LogLevel[level];
    if (this.config.enableColors) {
      const color = COLORS[levelName as keyof typeof COLORS];
      formattedMessage += `${color}[${levelName}]${COLORS.RESET} `;
    } else {
      formattedMessage += `[${levelName}] `;
    }

    // Add category
    if (category && this.config.enableCategories) {
      const categoryEmoji = this.config.enableEmojis ? CATEGORY_EMOJIS[category] : '';
      formattedMessage += `${categoryEmoji}[${category}] `;
    }

    // Add main message
    formattedMessage += message;

    // Add data if provided
    if (data !== undefined) {
      formattedMessage += ' ' + (typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data));
    }

    return formattedMessage;
  }

  // Log at specific level
  private log(level: LogLevel, message: string, category?: LogCategory, data?: any): void {
    if (level < this.config.level) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, category, data);

    // Use appropriate console method
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
    }
  }

  // Public logging methods
  debug(message: string, category?: LogCategory, data?: any): void {
    this.log(LogLevel.DEBUG, message, category, data);
  }

  info(message: string, category?: LogCategory, data?: any): void {
    this.log(LogLevel.INFO, message, category, data);
  }

  warn(message: string, category?: LogCategory, data?: any): void {
    this.log(LogLevel.WARN, message, category, data);
  }

  error(message: string, category?: LogCategory, data?: any): void {
    this.log(LogLevel.ERROR, message, category, data);
  }

  // Convenience methods for specific categories
  game(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.GAME, data);
  }

  network(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.NETWORK, data);
  }

  payment(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.PAYMENT, data);
  }

  withdrawal(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.WITHDRAWAL, data);
  }

  auth(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.AUTH, data);
  }

  performance(message: string, level: LogLevel = LogLevel.DEBUG, data?: any): void {
    this.log(level, message, LogCategory.PERFORMANCE, data);
  }

  server(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.SERVER, data);
  }

  client(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.CLIENT, data);
  }

  bot(message: string, level: LogLevel = LogLevel.DEBUG, data?: any): void {
    this.log(level, message, LogCategory.BOT, data);
  }

  env(message: string, level: LogLevel = LogLevel.INFO, data?: any): void {
    this.log(level, message, LogCategory.ENVIRONMENT, data);
  }
}

// Create default logger instance
export const logger = Logger.getInstance();

// Environment-aware logger configuration
export const configureLogger = (environment: 'development' | 'production') => {
  const isProduction = environment === 'production';
  
  logger.configure({
    level: isProduction ? LogLevel.WARN : LogLevel.DEBUG,
    enableColors: !isProduction,
    enableEmojis: !isProduction,
    production: isProduction,
  });

  logger.env(`Logger configured for ${environment} environment`);
};

// Legacy console.log replacement functions for gradual migration
export const console_replacement = {
  log: (message: string, data?: any) => logger.info(message, undefined, data),
  info: (message: string, data?: any) => logger.info(message, undefined, data),
  warn: (message: string, data?: any) => logger.warn(message, undefined, data),
  error: (message: string, data?: any) => logger.error(message, undefined, data),
  debug: (message: string, data?: any) => logger.debug(message, undefined, data),
};

// Export singleton for easy access
export default logger; 