import { SOLANA_CONFIG, APP_CONFIG } from '../privy-config.js';
// Use global Solana object from CDN
const { Connection, PublicKey, LAMPORTS_PER_SOL } = window.Solana;
class WalletService {
    constructor() {
        this.currentSolPrice = 0;
        this.priceUpdateInterval = null;
        this.walletData = null;
        this.balanceListeners = [];
        // Initialize Solana connection
        const rpcUrl = SOLANA_CONFIG.CURRENT_NETWORK === 'mainnet'
            ? SOLANA_CONFIG.MAINNET_RPC
            : SOLANA_CONFIG.DEVNET_RPC;
        this.connection = new Connection(rpcUrl, 'confirmed');
        // Start SOL price monitoring
        this.startPriceMonitoring();
    }
    // Initialize wallet for a user
    async initializeWallet(walletAddress) {
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
    getWalletData() {
        return this.walletData;
    }
    // Get current balance
    getBalance() {
        return this.walletData?.balance || null;
    }
    // Check if user has sufficient balance for game cost
    canAffordGame() {
        if (!this.walletData)
            return false;
        const gameTestInSol = this.usdToSol(APP_CONFIG.PLAY_COST_USD);
        return this.walletData.balance.sol >= gameTestInSol;
    }
    // Deduct game cost from balance
    async deductGameCost() {
        if (!this.canAffordGame())
            return false;
        const gameCostInSol = this.usdToSol(APP_CONFIG.PLAY_COST_USD);
        // Create transaction record
        const transaction = {
            id: `game_${Date.now()}`,
            type: 'game_cost',
            amount: gameCostInSol,
            usdAmount: APP_CONFIG.PLAY_COST_USD,
            timestamp: new Date(),
            status: 'confirmed'
        };
        // Update balance
        this.walletData.balance.sol -= gameCostInSol;
        this.walletData.balance.usd = this.solToUsd(this.walletData.balance.sol);
        this.walletData.balance.lastUpdated = new Date();
        this.walletData.transactions.unshift(transaction);
        // Notify listeners
        this.notifyBalanceListeners();
        // TODO: Also update Firebase user profile with new balance
        // await this.updateFirebaseBalance();
        return true;
    }
    // Monitor wallet balance changes
    async startBalanceMonitoring() {
        // Check balance every 30 seconds
        setInterval(async () => {
            await this.updateBalance();
        }, 30000);
    }
    // Update balance from blockchain
    async updateBalance() {
        if (!this.walletData)
            return;
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
        }
        catch (error) {
            console.error('Error updating balance:', error);
        }
    }
    // Handle new deposit
    handleNewDeposit(amount) {
        if (!this.walletData)
            return;
        const transaction = {
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
    async startPriceMonitoring() {
        // Update price immediately
        await this.updateSolPrice();
        // Update price every 5 minutes
        this.priceUpdateInterval = window.setInterval(async () => {
            await this.updateSolPrice();
        }, 5 * 60 * 1000);
    }
    // Fetch current SOL price
    async updateSolPrice() {
        try {
            const response = await fetch(APP_CONFIG.SOL_USD_API);
            const data = await response.json();
            this.currentSolPrice = data.solana.usd;
        }
        catch (error) {
            console.error('Error fetching SOL price:', error);
            // Fallback price if API fails
            this.currentSolPrice = this.currentSolPrice || 20; // Default fallback
        }
    }
    // Convert SOL to USD
    solToUsd(solAmount) {
        return solAmount * this.currentSolPrice;
    }
    // Convert USD to SOL
    usdToSol(usdAmount) {
        return this.currentSolPrice > 0 ? usdAmount / this.currentSolPrice : 0;
    }
    // Get current SOL price
    getSolPrice() {
        return this.currentSolPrice;
    }
    // Balance change listeners
    onBalanceChange(listener) {
        this.balanceListeners.push(listener);
        // Return unsubscribe function
        return () => {
            const index = this.balanceListeners.indexOf(listener);
            if (index > -1) {
                this.balanceListeners.splice(index, 1);
            }
        };
    }
    notifyBalanceListeners() {
        if (this.walletData?.balance) {
            this.balanceListeners.forEach(listener => listener(this.walletData.balance));
        }
    }
    // Generate QR code data for deposits
    generateDepositQRData() {
        if (!this.walletData)
            return null;
        // For Solana, we can create a payment request URL
        const solanaUrl = `solana:${this.walletData.walletAddress}`;
        return solanaUrl;
    }
    // Utility method to validate Solana address format
    isValidSolanaAddress(address) {
        try {
            new PublicKey(address);
            return true;
        }
        catch {
            return false;
        }
    }
    // Cleanup
    cleanup() {
        if (this.priceUpdateInterval) {
            clearInterval(this.priceUpdateInterval);
            this.priceUpdateInterval = null;
        }
        this.balanceListeners = [];
    }
}
// Create singleton instance
export const walletService = new WalletService();
//# sourceMappingURL=WalletService.js.map