import type { PrivyClientConfig } from '@privy-io/react-auth';

const HELIUS_API_KEY = 'b398bdd3-2e91-4c2c-919d-9fa6cb01a90e';

export const privyConfig: PrivyClientConfig = {
  
  // Appearance configuration to match the slither.io theme
  appearance: {
    theme: 'dark',
    accentColor: '#4ecdc4',
    logo: undefined,
    showWalletLoginFirst: false,
  },
  
  // Authentication methods - remove 'wallet' to prevent external wallet connections
  loginMethods: ['email', 'google'],
  
  // Embedded wallet configuration - ONLY Solana
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    // Disable Ethereum wallets
    ethereum: {
      createOnLogin: 'off',
    },
    // Enable ONLY Solana wallets
    solana: {
      createOnLogin: 'users-without-wallets',
    },
  },
  
  // Configure Solana RPC endpoints to use only Helius
  solanaClusters: [
    {
      name: 'mainnet-beta',
      rpcUrl: `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`,
    },
    {
      name: 'devnet', 
      rpcUrl: `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`,
    },
  ],
  
  // Additional security
  mfa: {
    noPromptOnMfaRequired: false,
  },
  
  // Legal requirements
  legal: {
    termsAndConditionsUrl: undefined,
    privacyPolicyUrl: undefined,
  },
}; 