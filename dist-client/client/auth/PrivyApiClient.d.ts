export interface PrivyUser {
    id: string;
    created_at: string;
    linked_accounts: any[];
    embedded_wallets?: {
        address: string;
        chain_type: string;
    }[];
}
export interface PrivyAuthResponse {
    user: PrivyUser;
    token: string;
    is_new_user: boolean;
}
declare class PrivyApiClient {
    private baseUrl;
    private appId;
    private authToken;
    private currentUser;
    private authModal;
    constructor();
    login(): Promise<PrivyUser | null>;
    private createAuthModal;
    private setupModalEventListeners;
    private handleAuthMethod;
    private handleGoogleAuth;
    private handleSubmitAuth;
    private handleVerifyCode;
    private simulateAuthentication;
    private generateSolanaAddress;
    private showAuthMethods;
    private showInputContainer;
    private showVerifyContainer;
    logout(): Promise<void>;
    private restoreSession;
    isAuthenticated(): boolean;
    getCurrentUser(): PrivyUser | null;
    getWalletAddress(): string | null;
    isReady(): boolean;
}
export declare const privyApiClient: PrivyApiClient;
export {};
