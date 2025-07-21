export const environment = {
  // Solana Configuration
  SOLANA_RPC_URL: import.meta.env.VITE_SOLANA_RPC_URL!,
  HOUSE_WALLET_ADDRESS: import.meta.env.VITE_HOUSE_WALLET_ADDRESS!,
  ENTRY_FEE_USD: parseFloat(import.meta.env.VITE_ENTRY_FEE_USD!),
  SOL_PRICE_CACHE_DURATION: parseInt(import.meta.env.VITE_SOL_PRICE_CACHE_DURATION!),
  
  // Network Configuration
  SOLANA_NETWORK: import.meta.env.VITE_SOLANA_NETWORK!,
  
  // Game Configuration
  GAME_SERVER_URL: import.meta.env.VITE_GAME_SERVER_URL!,
  
  // Privy Configuration
  PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID!,
  
  // Development Configuration
  NODE_ENV: import.meta.env.NODE_ENV!,
  IS_DEVELOPMENT: import.meta.env.NODE_ENV === 'development',
  IS_PRODUCTION: import.meta.env.NODE_ENV === 'production',
} as const; 