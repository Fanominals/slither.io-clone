/**
 * Crypto & Payment Configuration
 * All blockchain, payment, and cryptocurrency-related settings
 */

// Network definitions
export const BLOCKCHAIN_NETWORKS = {
  DEVNET: 'devnet',
  MAINNET: 'mainnet-beta'
} as const;

export type BlockchainNetwork = typeof BLOCKCHAIN_NETWORKS[keyof typeof BLOCKCHAIN_NETWORKS];

// RPC endpoint configuration
export const RPC_ENDPOINTS = {
  DEVNET: [
    'https://devnet.helius-rpc.com/?api-key=b398bdd3-2e91-4c2c-919d-9fa6cb01a90e',
    'https://api.devnet.solana.com'
  ],
  MAINNET: [
    'https://mainnet.helius-rpc.com/?api-key=b398bdd3-2e91-4c2c-919d-9fa6cb01a90e',
    'https://api.mainnet-beta.solana.com'
  ]
} as const;

// Transaction and payment configuration
export const TRANSACTION_CONFIG = {
  FEE_BUFFER: 0.000, // Additional SOL to account for transaction fees
  LAMPORTS_PER_SOL: 1_000_000_000, // Standard Solana conversion
  TIMEOUT_MS: 10000, // 10 seconds for transaction confirmation
  PAYMENT_TIMEOUT: 60000, // 60 seconds to complete payment
  MAX_RETRY_ATTEMPTS: 3, // Number of times to retry failed transactions
  RETRY_DELAY: 1000, // 1 second between retries
  CONFIRMATION_COMMITMENT: 'processed' as const, // Fastest confirmation for gaming
  MINIMUM_WALLET_BALANCE: 0.002, // Minimum SOL needed in wallet to play
} as const;

// Price caching and market data
export const PRICE_CONFIG = {
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  FALLBACK_SOL_PRICE: 175, // Fallback SOL price in USD if API fails
  TOLERANCE_MIN: 0.90, // 10% below expected (allow for price fluctuations)
  TOLERANCE_MAX: 1.10, // 10% above expected (buffer included)
  COINGECKO_API_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
} as const;

// Server tier configuration for different entry fees
export const SERVER_TIERS = {
  FREE: { entryFeeUsd: 0, displayName: 'Free Play' },
  PAID_1_DOLLAR: { entryFeeUsd: 1, displayName: '$1 Entry' }
} as const;

export type ServerTier = keyof typeof SERVER_TIERS;

// Game server types (matching server tiers)
export const GAME_SERVER_TYPES = {
  FREE: 'free',
  PAID_1_DOLLAR: 'paid_1_dollar'
} as const;

// Payment states for UI feedback
export const PAYMENT_STATES = {
  IDLE: 'idle',
  CHECKING_BALANCE: 'checking_balance',
  PREPARING_TRANSACTION: 'preparing_transaction',
  AWAITING_SIGNATURE: 'awaiting_signature',
  SENDING_TRANSACTION: 'sending_transaction',
  CONFIRMING_TRANSACTION: 'confirming_transaction',
  VERIFYING_PAYMENT: 'verifying_payment',
  COMPLETED: 'completed',
  FAILED: 'failed',
  INSUFFICIENT_FUNDS: 'insufficient_funds'
} as const;

// Withdrawal states and configuration
export const WITHDRAWAL_CONFIG = {
  HOLD_DURATION: 5000, // 5 seconds in milliseconds
  PROGRESS_CIRCLE_RADIUS: 60, // pixels
  PROGRESS_CIRCLE_THICKNESS: 8, // pixels
  PROGRESS_COLOR: '#00ff00', // green
  PROGRESS_BACKGROUND_COLOR: 'rgba(255, 255, 255, 0.2)',
  MINIMUM_WITHDRAWAL_VALUE: 0.01, // minimum SOL value to withdraw
  HOUSE_FEE_PERCENTAGE: 0.07, // 7% house fee
  UPDATE_INTERVAL: 50, // Update progress every 50ms for smooth animation
} as const;

export const WITHDRAWAL_STATES = {
  IDLE: 'idle',
  PREPARING_WITHDRAWAL: 'preparing_withdrawal',
  CHECKING_HOUSE_BALANCE: 'checking_house_balance',
  CREATING_TRANSACTION: 'creating_transaction',
  SENDING_TRANSACTION: 'sending_transaction',
  CONFIRMING_TRANSACTION: 'confirming_transaction',
  COMPLETED: 'completed',
  FAILED: 'failed',
  INSUFFICIENT_HOUSE_FUNDS: 'insufficient_house_funds'
} as const;

// Socket events for payment and withdrawal
export const PAYMENT_EVENTS = {
  SUBMIT: 'payment_submit',
  VERIFIED: 'payment_verified',
  FAILED: 'payment_failed',
  JOIN_PAID_GAME: 'join_paid_game',
  JOIN_SERVER_TYPE: 'join_server_type',
} as const;

export const WITHDRAWAL_EVENTS = {
  START: 'withdrawal_start',
  PROGRESS: 'withdrawal_progress',
  COMPLETE: 'withdrawal_complete',
  CANCELLED: 'withdrawal_cancelled',
  FAILED: 'withdrawal_failed',
  PLAYER_WITHDRAWN: 'player_withdrawn'
} as const;

// Explorer configuration
export const EXPLORER_CONFIG = {
  SOLSCAN_BASE_URL: 'https://solscan.io',
  TRANSACTION_PATH: '/tx/',
  DEVNET_PARAM: '?cluster=devnet',
} as const;

// Consolidated crypto configuration
export const CRYPTO_CONFIG = {
  ...BLOCKCHAIN_NETWORKS,
  ...RPC_ENDPOINTS,
  ...TRANSACTION_CONFIG,
  ...PRICE_CONFIG,
  ...SERVER_TIERS,
  ...GAME_SERVER_TYPES,
  ...PAYMENT_STATES,
  ...WITHDRAWAL_CONFIG,
  ...WITHDRAWAL_STATES,
  ...PAYMENT_EVENTS,
  ...WITHDRAWAL_EVENTS,
  ...EXPLORER_CONFIG,
} as const;

// Type exports for better type safety
export type CryptoConfig = typeof CRYPTO_CONFIG;
export type TransactionConfig = typeof TRANSACTION_CONFIG;
export type PriceConfig = typeof PRICE_CONFIG;
export type ServerTiers = typeof SERVER_TIERS;
export type GameServerTypes = typeof GAME_SERVER_TYPES;
export type PaymentStates = typeof PAYMENT_STATES;
export type WithdrawalConfig = typeof WITHDRAWAL_CONFIG;
export type WithdrawalStates = typeof WITHDRAWAL_STATES;
export type PaymentEvents = typeof PAYMENT_EVENTS;
export type WithdrawalEvents = typeof WITHDRAWAL_EVENTS;
export type ExplorerConfig = typeof EXPLORER_CONFIG;

// Utility class for crypto operations
export class CryptoUtils {
  /**
   * Calculate expected SOL amount including transaction fee buffer
   */
  static calculateExpectedSolAmount(usdAmount: number, solPrice: number): number {
    const baseSolAmount = usdAmount / solPrice;
    return baseSolAmount + TRANSACTION_CONFIG.FEE_BUFFER;
  }

  /**
   * Calculate USD value of SOL amount
   */
  static calculateUsdValue(solAmount: number, solPrice: number): number {
    return solAmount * solPrice;
  }

  /**
   * Check if payment amount is within acceptable tolerance
   */
  static isPaymentAmountValid(
    receivedUsd: number, 
    expectedUsd: number, 
    includeBuffer: boolean = true
  ): boolean {
    const targetAmount = includeBuffer 
      ? CryptoUtils.calculateUsdValue(
          CryptoUtils.calculateExpectedSolAmount(expectedUsd, 1), 
          1
        ) * expectedUsd // Adjust for buffer
      : expectedUsd;
        
    const minAcceptable = targetAmount * PRICE_CONFIG.TOLERANCE_MIN;
    const maxAcceptable = targetAmount * PRICE_CONFIG.TOLERANCE_MAX;
    
    return receivedUsd >= minAcceptable && receivedUsd <= maxAcceptable;
  }

  /**
   * Get explorer URL for transaction
   */
  static getExplorerUrl(signature: string, network: BlockchainNetwork): string {
    const path = `${EXPLORER_CONFIG.TRANSACTION_PATH}${signature}`;
    const clusterParam = network === BLOCKCHAIN_NETWORKS.DEVNET ? EXPLORER_CONFIG.DEVNET_PARAM : '';
    return `${EXPLORER_CONFIG.SOLSCAN_BASE_URL}${path}${clusterParam}`;
  }

  /**
   * Get RPC endpoints for network
   */
  static getRpcEndpoints(network: BlockchainNetwork): readonly string[] {
    return network === BLOCKCHAIN_NETWORKS.DEVNET 
      ? RPC_ENDPOINTS.DEVNET 
      : RPC_ENDPOINTS.MAINNET;
  }

  /**
   * Format SOL amount for display
   */
  static formatSolAmount(amount: number): string {
    return amount.toFixed(6);
  }

  /**
   * Format USD amount for display
   */
  static formatUsdAmount(amount: number): string {
    return amount.toFixed(2);
  }

  /**
   * Get house wallet address for network
   * SECURITY: This method throws an error to prevent use of hardcoded addresses
   * House wallet must be provided via environment variables
   */
  static getHouseWallet(network: BlockchainNetwork): string {
    throw new Error(
      'House wallet addresses must be loaded from environment variables only. ' +
      'Use VITE_HOUSE_WALLET (client) or configure server environment manager to load from .env files. ' +
      'Do not use hardcoded wallet addresses for security reasons.'
    );
  }
} 