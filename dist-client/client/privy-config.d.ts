export declare const PRIVY_APP_ID = "cmd5p8z42009ale0nciumeoo1";
export declare const privyConfig: {
    embeddedWallets: {
        createOnLogin: string;
        requireUserPasswordOnCreate: boolean;
    };
    loginMethods: string[];
    appearance: {
        theme: "dark";
        accentColor: string;
        logo: undefined;
    };
    mfa: {
        noPromptOnMfaRequired: boolean;
    };
};
export declare const SOLANA_CONFIG: {
    readonly DEVNET_RPC: "https://api.devnet.solana.com";
    readonly MAINNET_RPC: "https://api.mainnet-beta.solana.com";
    readonly CURRENT_NETWORK: "devnet" | "mainnet";
};
export declare const APP_CONFIG: {
    readonly PLAY_COST_USD: 1;
    readonly SOL_USD_API: "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";
};
