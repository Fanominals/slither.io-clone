/**
 * Unified Environment Manager
 * Centralized environment configuration that works for both client and server
 */

// Environment types
export type AppEnvironment = 'development' | 'production';
export type SolanaNetwork = 'devnet' | 'mainnet';
export type DatabaseMode = 'local' | 'remote';

// Base environment configuration interface
export interface BaseEnvironmentConfig {
  app: AppEnvironment;
  solanaNetwork: SolanaNetwork;
  isDevMode: boolean;
  isProdMode: boolean;
}

// Client-specific environment configuration
export interface ClientEnvironmentConfig extends BaseEnvironmentConfig {
  type: 'client';
  networkConfig: {
    name: string;
    rpcEndpoints: string[];
    explorerUrl: string;
    faucetUrl?: string;
    isDevnet: boolean;
  };
  gameConfig: {
    houseWallet: string;
    entryFeeUsd: number;
  };
}

// Server-specific environment configuration
export interface ServerEnvironmentConfig extends BaseEnvironmentConfig {
  type: 'server';
  port: number;
  database: {
    mode: DatabaseMode;
    url?: string;
    maxConnections: number;
  };
  game: {
    tickRate: number;
    maxPlayersPerServer: number;
    botCount: number;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  performance: {
    enableMetrics: boolean;
    metricsInterval: number;
    enableProfiling: boolean;
  };
  security: {
    corsOrigins: string[];
    rateLimit: {
      windowMs: number;
      max: number;
    };
  };
  staticFiles: {
    enabled: boolean;
    path: string;
    maxAge: number;
  };
}

// Union type for all environment configurations
export type EnvironmentConfig = ClientEnvironmentConfig | ServerEnvironmentConfig;

// Abstract base environment manager
export abstract class BaseEnvironmentManager<T extends EnvironmentConfig> {
  protected config: T;

  constructor() {
    this.config = this.detectEnvironment();
  }

  protected abstract detectEnvironment(): T;

  // Common getters
  get environment(): AppEnvironment {
    return this.config.app;
  }

  get solanaNetwork(): SolanaNetwork {
    return this.config.solanaNetwork;
  }

  get isDevelopment(): boolean {
    return this.config.isDevMode;
  }

  get isProduction(): boolean {
    return this.config.isProdMode;
  }

  get isDevnet(): boolean {
    return this.config.solanaNetwork === 'devnet';
  }

  get isMainnet(): boolean {
    return this.config.solanaNetwork === 'mainnet';
  }

  // Get full configuration
  getConfig(): T {
    return { ...this.config };
  }

  // Get display string for current mode
  getModeString(): string {
    const appMode = this.config.app.toUpperCase();
    const network = this.config.solanaNetwork.toUpperCase();
    return `${appMode} (${network})`;
  }

  // Get emoji for current mode
  getModeEmoji(): string {
    if (this.config.isDevMode && this.config.solanaNetwork === 'devnet') {
      return '🧪'; // Full development
    } else if (this.config.isProdMode && this.config.solanaNetwork === 'mainnet') {
      return '🚀'; // Full production
    } else if (this.config.isDevMode && this.config.solanaNetwork === 'mainnet') {
      return '⚠️'; // Dev build on mainnet
    } else {
      return '🔧'; // Prod build on devnet
    }
  }

  // Abstract logging method to be implemented by subclasses
  abstract logStatus(): void;

  // Common validation
  validateEnvironment(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.app) {
      errors.push('App environment not defined');
    }

    if (!this.config.solanaNetwork) {
      errors.push('Solana network not defined');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Common recommendations
  getRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.isDevelopment && this.isMainnet) {
      recommendations.push('⚠️ You\'re in development mode but using MAINNET. Consider using DEVNET for testing.');
    }
    
    if (this.isProduction && this.isDevnet) {
      recommendations.push('⚠️ You\'re in production mode but using DEVNET. Switch to MAINNET for live deployment.');
    }
    
    if (this.isDevelopment && this.isDevnet) {
      recommendations.push('✅ Perfect setup for development! Free transactions and hot reloading.');
    }
    
    if (this.isProduction && this.isMainnet) {
      recommendations.push('🚀 Production ready! Optimized build with real SOL transactions.');
    }
    
    return recommendations;
  }
}

// Helper functions for environment variable parsing
export const EnvUtils = {
  getString: (key: string, defaultValue: string, source: Record<string, string | undefined> = process.env): string => {
    return source[key] || defaultValue;
  },

  getNumber: (key: string, defaultValue: number, source: Record<string, string | undefined> = process.env): number => {
    const value = source[key];
    return value ? parseInt(value, 10) : defaultValue;
  },

  getBoolean: (key: string, defaultValue: boolean, source: Record<string, string | undefined> = process.env): boolean => {
    const value = source[key];
    return value ? value.toLowerCase() === 'true' : defaultValue;
  },

  getArray: (key: string, defaultValue: string[], source: Record<string, string | undefined> = process.env): string[] => {
    const value = source[key];
    return value ? value.split(',').map(s => s.trim()) : defaultValue;
  },

  // Client-side environment variable access
  getClientEnv: () => {
    if (typeof window !== 'undefined') {
      // Browser environment - use import.meta.env for Vite
      return (import.meta as any).env || {};
    }
    return {};
  },

  // Server-side environment variable access
  getServerEnv: () => {
    if (typeof process !== 'undefined' && process.env) {
      return process.env;
    }
    return {};
  },
};

// Multi-file environment loading for server (similar to existing server implementation)
export class EnvironmentLoader {
  static loadEnvironmentFiles(): void {
    // Only run on server-side
    if (typeof process === 'undefined' || typeof require === 'undefined') {
      return;
    }

    try {
      const dotenv = require('dotenv');
      const path = require('path');
      const fs = require('fs');

      const rootDir = process.cwd();
      const nodeEnv = process.env.NODE_ENV || 'development';
      
      // Define files in priority order (first found wins for each variable)
      const envFiles = [
        '.env.local',                    // Local overrides (highest priority)
        `.env.${nodeEnv}`,              // Environment-specific
        '.env'                          // Base configuration (fallback)
      ];
      
      const loadedFiles: string[] = [];
      
      console.log(`🔧 Loading environment files for: ${nodeEnv.toUpperCase()}`);
      
      // Load each file if it exists
      envFiles.forEach((file) => {
        const filePath = path.join(rootDir, file);
        
        if (fs.existsSync(filePath)) {
          const result = dotenv.config({ path: filePath });
          
          if (result.error) {
            console.warn(`⚠️  Warning: Could not parse ${file}: ${result.error.message}`);
          } else {
            loadedFiles.push(file);
            console.log(`✅ Loaded environment file: ${file}`);
          }
        } else {
          console.log(`⏭️  Skipped missing file: ${file}`);
        }
      });
      
      if (loadedFiles.length === 0) {
        console.warn('⚠️  Warning: No environment files found! Using system environment variables only.');
      } else {
        console.log(`📋 Successfully loaded ${loadedFiles.length} environment file(s): ${loadedFiles.join(', ')}`);
      }
      
      console.log(''); // Add spacing before other logs
    } catch (error) {
      console.warn('⚠️ Could not load environment files:', error);
    }
  }
}

// Initialize environment loading for server-side
if (typeof process !== 'undefined') {
  EnvironmentLoader.loadEnvironmentFiles();
} 