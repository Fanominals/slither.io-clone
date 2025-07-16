export interface WalletBalance {
    sol: number;
    usd: number;
    lastUpdated: Date;
}
export interface TransactionHistory {
    id: string;
    type: 'deposit' | 'withdrawal' | 'game_cost';
    amount: number;
    usdAmount: number;
    timestamp: Date;
    status: 'pending' | 'confirmed' | 'failed';
    transactionHash?: string;
}
export interface UserWalletData {
    walletAddress: string;
    balance: WalletBalance;
    transactions: TransactionHistory[];
}
declare class WalletService {
    private connection;
    private currentSolPrice;
    private priceUpdateInterval;
    private walletData;
    private balanceListeners;
    constructor();
    initializeWallet(walletAddress: string): Promise<void>;
    getWalletData(): UserWalletData | null;
    getBalance(): WalletBalance | null;
    canAffordGame(): boolean;
    deductGameCost(): Promise<boolean>;
    private startBalanceMonitoring;
    private updateBalance;
    private handleNewDeposit;
    private startPriceMonitoring;
    private updateSolPrice;
    private solToUsd;
    private usdToSol;
    getSolPrice(): number;
    onBalanceChange(listener: (balance: WalletBalance) => void): () => void;
    private notifyBalanceListeners;
    generateDepositQRData(): string | null;
    private isValidSolanaAddress;
    cleanup(): void;
}
export declare const walletService: WalletService;
export {};
