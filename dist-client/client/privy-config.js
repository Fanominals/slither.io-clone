// Privy configuration
export const PRIVY_APP_ID = 'cmd5p8z42009ale0nciumeoo1'; // You'll need to set this
export const privyConfig = {
    // Enable embedded wallets
    embeddedWallets: {
        createOnLogin: 'users-without-wallets',
        requireUserPasswordOnCreate: false,
    },
    // Login methods
    loginMethods: ['email', 'google'],
    // Appearance
    appearance: {
        theme: 'dark',
        accentColor: '#ffd700',
        logo: undefined,
    },
    // Additional features
    mfa: {
        noPromptOnMfaRequired: false,
    },
};
// Solana network configuration
export const SOLANA_CONFIG = {
    DEVNET_RPC: 'https://api.devnet.solana.com',
    MAINNET_RPC: 'https://api.mainnet-beta.solana.com',
    CURRENT_NETWORK: 'devnet', // Switch to 'mainnet' for production
};
// App configuration
export const APP_CONFIG = {
    PLAY_COST_USD: 1, // $1 per play
    SOL_USD_API: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
};
//# sourceMappingURL=privy-config.js.map