import { type WalletBalance } from '../wallet/WalletService.js';
import { type PrivyUser } from './PrivyApiClient.js';
declare class PrivyIntegrationService {
    private privyUser;
    private privyAuthenticated;
    private integrationListeners;
    initializeIntegration(privyUser: PrivyUser): Promise<void>;
    private updateFirebaseWithWalletInfo;
    private setupBalanceSync;
    private syncBalanceToFirebase;
    canAffordGame(): boolean;
    deductGameCost(): Promise<boolean>;
    getWalletData(): import("../wallet/WalletService.js").UserWalletData | null;
    getBalance(): WalletBalance | null;
    getSolPrice(): number;
    generateDepositQRData(): string | null;
    isFullyIntegrated(): boolean;
    getIntegrationStatus(): {
        firebaseAuth: boolean;
        username: boolean;
        privyAuth: boolean;
        embeddedWallet: boolean;
        fullyIntegrated: boolean;
    };
    onIntegrationChange(listener: (integrated: boolean) => void): () => void;
    private notifyIntegrationListeners;
    resetIntegration(): void;
    getPrivyUser(): PrivyUser | null;
    isPrivyAuthenticated(): boolean;
}
export declare const privyIntegrationService: PrivyIntegrationService;
export {};
