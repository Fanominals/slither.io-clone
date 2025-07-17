/**
 * Solana Network Configuration
 * 
 * 🔧 HOW TO SWITCH NETWORKS:
 * 1. Change CURRENT_NETWORK below to 'devnet' or 'mainnet'
 * 2. Save the file - the app will automatically use the new network
 * 
 * 'devnet' = Development/testing (free transactions)
 * 'mainnet' = Production (real SOL transactions)
 */

export type NetworkEnvironment = 'mainnet' | 'devnet';

// 🚀 CHANGE THIS TO SWITCH NETWORKS
// Set to 'devnet' for development, 'mainnet' for production
const CURRENT_NETWORK: NetworkEnvironment = 'mainnet';

// Helius API Configuration
const HELIUS_API_KEY = 'b398bdd3-2e91-4c2c-919d-9fa6cb01a90e';

export const SOLANA_NETWORK_CONFIG = {
  mainnet: {
    name: 'Solana Mainnet',
    endpoints: [
      `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, // Helius Primary
    ],
    explorerUrl: 'https://explorer.solana.com',
  },
  devnet: {
    name: 'Solana Devnet',
    endpoints: [
      `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, // Helius Primary
    ],
    explorerUrl: 'https://explorer.solana.com/?cluster=devnet',
  },
} as const;

/**
 * Get the current network configuration
 */
export const getCurrentNetworkConfig = () => {
  return SOLANA_NETWORK_CONFIG[CURRENT_NETWORK];
};

/**
 * Get the current RPC endpoints
 */
export const getCurrentRpcEndpoints = () => {
  return getCurrentNetworkConfig().endpoints;
};

/**
 * Check if we're on devnet
 */
export const isDevnet = (): boolean => {
  return (CURRENT_NETWORK as NetworkEnvironment) === 'devnet';
};

/**
 * Check if we're on mainnet
 */
export const isMainnet = (): boolean => {
  return (CURRENT_NETWORK as NetworkEnvironment) === 'mainnet';
};

/**
 * Get explorer URL for a transaction or address
 */
export const getExplorerUrl = (txOrAddress: string, type: 'tx' | 'address' = 'address') => {
  const baseUrl = getCurrentNetworkConfig().explorerUrl;
  if (type === 'tx') {
    return `${baseUrl}/tx/${txOrAddress}`;
  }
  return `${baseUrl}/address/${txOrAddress}`;
}; 