import { type PrivyUser } from './PrivyApiClient.js';
declare global {
    interface Window {
        Privy: any;
    }
}
export declare class PrivyProvider {
    private static instance;
    private privyClient;
    private currentUser;
    private isInitialized;
    static getInstance(): PrivyProvider;
    initialize(): Promise<void>;
    private handleUserLogin;
    private handleUserLogout;
    login(): Promise<void>;
    logout(): Promise<void>;
    createEmbeddedWallet(): Promise<string | null>;
    isAuthenticated(): boolean;
    getCurrentUser(): PrivyUser | null;
    getWalletAddress(): string | null;
    isReady(): boolean;
}
export declare const privyProvider: PrivyProvider;
