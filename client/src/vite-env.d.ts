/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRIVY_APP_ID: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SOLANA_RPC_URL: string;
  readonly VITE_HOUSE_WALLET_ADDRESS: string;
  readonly VITE_ENTRY_FEE_USD: string;
  readonly VITE_SOL_PRICE_CACHE_DURATION: string;
  readonly VITE_SOLANA_NETWORK: string;
  readonly VITE_GAME_SERVER_URL: string;
  readonly NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 