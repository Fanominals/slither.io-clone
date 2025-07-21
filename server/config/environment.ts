import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

// Load environment files in priority order: .env.local > .env.{NODE_ENV} > .env
function loadEnvironmentFiles() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const envFiles = [
    '.env.local',                    // Highest priority
    `.env.${nodeEnv}`,              // Environment-specific
    '.env'                          // Fallback
  ];

  for (const envFile of envFiles) {
    const envPath = resolve(process.cwd(), envFile);
    if (existsSync(envPath)) {
      config({ path: envPath, override: false }); // Don't override already set variables
      console.log(`📁 Loaded environment file: ${envFile}`);
    }
  }
}

// Load environment files before accessing process.env
loadEnvironmentFiles();

export const serverEnvironment = {
  // Server Configuration
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Solana Configuration (using VITE_ prefixed variables for consistency)
  SOLANA_RPC_URL: process.env.VITE_SOLANA_RPC_URL!,
  SOLANA_NETWORK: process.env.VITE_SOLANA_NETWORK!,
  HOUSE_WALLET_ADDRESS: process.env.VITE_HOUSE_WALLET_ADDRESS!,
  
  // Game Configuration
  MAX_PLAYERS_PER_SERVER: parseInt(process.env.MAX_PLAYERS_PER_SERVER || '100', 10),
  BOT_COUNT: parseInt(process.env.BOT_COUNT || '10', 10),
  
  // Development Configuration
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const; 