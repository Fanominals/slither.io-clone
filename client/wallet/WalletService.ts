import { SOLANA_CONFIG, APP_CONFIG } from '../privy-config.js';

// Use global Solana object from CDN
const { Connection, PublicKey, LAMPORTS_PER_SOL } = window.Solana;

export interface WalletBalance {
  sol: number;
  usd: number;
  lastUpdated: Date;
}

export interface TransactionHistory {
  id: string;
  type: 'deposit' | 'withdrawal' | 'game_cost';
  amount: number; // in SOL
  usdAmount: number; // USD equivalent at time of transaction
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  transactionHash?: string;
}

export interface UserWalletData {
  walletAddress: string;
  balance: WalletBalance;
  transactions: TransactionHistory[];
}

class WalletService {
  private connection: any;
  private currentSolPrice: number = 0;
  private priceUpdateInterval: number | null = null;
  private walletData: UserWalletData | null = null;
  private balanceListeners: ((balance: WalletBalance) => void)[] = [];

  constructor() {
    // Initialize Solana connection
    const rpcUrl = SOLANA_CONFIG.CURRENT_NETWORK === 'mainnet' 
      ? SOLANA_CONFIG.MAINNET_RPC 
      : SOLANA_CONFIG.DEVNET_RPC;
    this.connection = new Connection(rpcUrl, 'confirmed');
    
    // Start SOL price monitoring
    this.startPriceMonitoring();
  }

  // Initialize wallet for a user
  async initializeWallet(walletAddress: string): Promise<void> {
    this.walletData = {
      walletAddress,
      balance: {
        sol: 0,
        usd: 0,
        lastUpdated: new Date()
      },
      transactions: []
    };

    // Start monitoring this wallet
    await this.updateBalance();
    this.startBalanceMonitoring();
  }

  // Get current wallet data
  getWalletData(): UserWalletData | null {
    return this.walletData;
  }

  // Get current balance
  getBalance(): WalletBalance | null {
    return this.walletData?.balance || null;
  }

  // Check if user has sufficient balance for game cost
  canAffordGame(): boolean {
    if (!this.walletData) return false;
    const gameTestInSol = this.usdToSol(APP_CONFIG.PLAY_COST_USD);
    return this.walletData.balance.sol >= gameTestInSol;
  }

  // Deduct game cost from balance
  async deductGameCost(): Promise<boolean> {
    if (!this.canAffordGame()) return false;
    
    const gameCostInSol = this.usdToSol(APP_CONFIG.PLAY_COST_USD);
    
    // Create transaction record
    const transaction: TransactionHistory = {
      id: `game_${Date.now()}`,
      type: 'game_cost',
      amount: gameCostInSol,
      usdAmount: APP_CONFIG.PLAY_COST_USD,
      timestamp: new Date(),
      status: 'confirmed'
    };

    // Update balance
    this.walletData!.balance.sol -= gameCostInSol;
    this.walletData!.balance.usd = this.solToUsd(this.walletData!.balance.sol);
    this.walletData!.balance.lastUpdated = new Date();
    this.walletData!.transactions.unshift(transaction);

    // Notify listeners
    this.notifyBalanceListeners();

    // TODO: Also update Firebase user profile with new balance
    // await this.updateFirebaseBalance();

    return true;
  }

  // Monitor wallet balance changes
  private async startBalanceMonitoring(): Promise<void> {
    // Check balance every 30 seconds
    setInterval(async () => {
      await this.updateBalance();
    }, 30000);
  }

  // Update balance from blockchain
  private async updateBalance(): Promise<void> {
    if (!this.walletData) return;

    try {
      // Validate wallet address format before creating PublicKey
      if (!this.isValidSolanaAddress(this.walletData.walletAddress)) {
        console.warn('Invalid Solana address format:', this.walletData.walletAddress);
        return;
      }

      const publicKey = new PublicKey(this.walletData.walletAddress);
      const balance = await this.connection.getBalance(publicKey);
      const solBalance = balance / LAMPORTS_PER_SOL;

      // Check if balance has changed (indicating a deposit)
      const previousSol = this.walletData.balance.sol;
      if (solBalance !== previousSol && solBalance > previousSol) {
        // New deposit detected
        const depositAmount = solBalance - previousSol;
        this.handleNewDeposit(depositAmount);
      }

      // Update balance
      this.walletData.balance.sol = solBalance;
      this.walletData.balance.usd = this.solToUsd(solBalance);
      this.walletData.balance.lastUpdated = new Date();

      // Notify listeners
      this.notifyBalanceListeners();

    } catch (error) {
      console.error('Error updating balance:', error);
    }
  }

  // Handle new deposit
  private handleNewDeposit(amount: number): void {
    if (!this.walletData) return;

    const transaction: TransactionHistory = {
      id: `deposit_${Date.now()}`,
      type: 'deposit',
      amount,
      usdAmount: this.solToUsd(amount),
      timestamp: new Date(),
      status: 'confirmed'
    };

    this.walletData.transactions.unshift(transaction);
    
    // TODO: Update Firebase with new transaction
    console.log(`New deposit detected: ${amount} SOL ($${this.solToUsd(amount).toFixed(2)})`);
  }

  // SOL price monitoring
  private async startPriceMonitoring(): Promise<void> {
    // Update price immediately
    await this.updateSolPrice();
    
    // Update price every 5 minutes
    this.priceUpdateInterval = window.setInterval(async () => {
      await this.updateSolPrice();
    }, 5 * 60 * 1000);
  }

  // Fetch current SOL price
  private async updateSolPrice(): Promise<void> {
    try {
      const response = await fetch(APP_CONFIG.SOL_USD_API);
      const data = await response.json();
      this.currentSolPrice = data.solana.usd;
    } catch (error) {
      console.error('Error fetching SOL price:', error);
      // Fallback price if API fails
      this.currentSolPrice = this.currentSolPrice || 20; // Default fallback
    }
  }

  // Convert SOL to USD
  private solToUsd(solAmount: number): number {
    return solAmount * this.currentSolPrice;
  }

  // Convert USD to SOL
  private usdToSol(usdAmount: number): number {
    return this.currentSolPrice > 0 ? usdAmount / this.currentSolPrice : 0;
  }

  // Get current SOL price
  getSolPrice(): number {
    return this.currentSolPrice;
  }

  // Balance change listeners
  onBalanceChange(listener: (balance: WalletBalance) => void): () => void {
    this.balanceListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.balanceListeners.indexOf(listener);
      if (index > -1) {
        this.balanceListeners.splice(index, 1);
      }
    };
  }

  private notifyBalanceListeners(): void {
    if (this.walletData?.balance) {
      this.balanceListeners.forEach(listener => listener(this.walletData!.balance));
    }
  }

  // Generate QR code data for deposits
  generateDepositQRData(): string | null {
    if (!this.walletData) return null;
    
    // For Solana, we can create a payment request URL
    const solanaUrl = `solana:${this.walletData.walletAddress}`;
    return solanaUrl;
  }

  // Utility method to validate Solana address format
  private isValidSolanaAddress(address: string): boolean {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }

  // Cleanup
  cleanup(): void {
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval);
      this.priceUpdateInterval = null;
    }
    this.balanceListeners = [];
  }
}

// Create singleton instance
export const walletService = new WalletService(); 