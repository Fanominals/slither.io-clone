import { authService } from './AuthService.js';
import { walletService, type WalletBalance } from '../wallet/WalletService.js';
import { db, doc, updateDoc } from '../firebase-config.js';
import { privyApiClient, type PrivyUser } from './PrivyApiClient.js';

class PrivyIntegrationService {
  private privyUser: PrivyUser | null = null;
  private privyAuthenticated: boolean = false;
  private integrationListeners: ((integrated: boolean) => void)[] = [];

  // Initialize integration after both Firebase and Privy are ready
  async initializeIntegration(privyUser: PrivyUser): Promise<void> {
    this.privyUser = privyUser;
    this.privyAuthenticated = true;

    // Check if user has an embedded wallet
    if (privyUser.embedded_wallets?.[0]?.address) {
      const walletAddress = privyUser.embedded_wallets[0].address;
      
      // Initialize wallet service with the user's address
      await walletService.initializeWallet(walletAddress);
      
      // Update Firebase profile with wallet info
      await this.updateFirebaseWithWalletInfo(walletAddress);
      
      // Setup balance sync
      this.setupBalanceSync();
      
      console.log(`Wallet initialized: ${walletAddress}`);
    } else {
      console.warn('User does not have an embedded wallet');
    }

    this.notifyIntegrationListeners();
  }

  // Update Firebase user profile with wallet information
  private async updateFirebaseWithWalletInfo(walletAddress: string): Promise<void> {
    const firebaseUser = authService.getCurrentUser();
    if (!firebaseUser) return;

    try {
      const userProfile = authService.getUserProfile();
      if (userProfile) {
        await updateDoc(doc(db, 'users', firebaseUser.uid), {
          walletAddress: walletAddress,
          walletIntegrated: true,
          walletIntegratedAt: new Date()
        });

        // Update local profile cache
        await authService.refreshUserProfile();
      }
    } catch (error) {
      console.error('Error updating Firebase with wallet info:', error);
    }
  }

  // Setup real-time balance sync between wallet service and Firebase
  private setupBalanceSync(): void {
    walletService.onBalanceChange(async (balance: WalletBalance) => {
      await this.syncBalanceToFirebase(balance);
    });
  }

  // Sync wallet balance to Firebase
  private async syncBalanceToFirebase(balance: WalletBalance): Promise<void> {
    const firebaseUser = authService.getCurrentUser();
    if (!firebaseUser) return;

    try {
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        solBalance: balance.sol,
        lastBalanceUpdate: balance.lastUpdated,
        lastSolPrice: walletService.getSolPrice()
      });

      // Update local profile cache
      await authService.refreshUserProfile();
      
    } catch (error) {
      console.error('Error syncing balance to Firebase:', error);
    }
  }

  // Check if user can afford to play
  canAffordGame(): boolean {
    return walletService.canAffordGame();
  }

  // Deduct game cost
  async deductGameCost(): Promise<boolean> {
    const success = await walletService.deductGameCost();
    
    if (success) {
      // Update Firebase with new balance after deduction
      const balance = walletService.getBalance();
      if (balance) {
        await this.syncBalanceToFirebase(balance);
      }
    }
    
    return success;
  }

  // Get current wallet data
  getWalletData() {
    return walletService.getWalletData();
  }

  // Get current balance
  getBalance() {
    return walletService.getBalance();
  }



  // Get SOL price
  getSolPrice(): number {
    return walletService.getSolPrice();
  }

  // Generate deposit QR data
  generateDepositQRData(): string | null {
    return walletService.generateDepositQRData();
  }

  // Check if user is fully integrated (Firebase + Privy + Wallet)
  isFullyIntegrated(): boolean {
    // If user has Privy authentication with embedded wallet, they're fully integrated
    if (this.privyAuthenticated && this.privyUser?.embedded_wallets?.[0]?.address) {
      return true;
    }
    
    // Fallback: check traditional Firebase auth + username
    return (
      authService.isAuthenticated() && 
      authService.hasUsernameSet()
    );
  }

  // Get integration status
  getIntegrationStatus() {
    return {
      firebaseAuth: authService.isAuthenticated(),
      username: authService.hasUsernameSet(),
      privyAuth: this.privyAuthenticated,
      embeddedWallet: this.privyUser?.embedded_wallets?.[0]?.address != null,
      fullyIntegrated: this.isFullyIntegrated()
    };
  }

  // Listeners for integration status changes
  onIntegrationChange(listener: (integrated: boolean) => void): () => void {
    this.integrationListeners.push(listener);
    
    return () => {
      const index = this.integrationListeners.indexOf(listener);
      if (index > -1) {
        this.integrationListeners.splice(index, 1);
      }
    };
  }

  private notifyIntegrationListeners(): void {
    const integrated = this.isFullyIntegrated();
    this.integrationListeners.forEach(listener => listener(integrated));
  }

  // Reset integration state (on logout)
  resetIntegration(): void {
    this.privyUser = null;
    this.privyAuthenticated = false;
    walletService.cleanup();
    this.notifyIntegrationListeners();
  }

  // Get Privy user
  getPrivyUser(): PrivyUser | null {
    return this.privyUser;
  }

  // Check if Privy is authenticated
  isPrivyAuthenticated(): boolean {
    return this.privyAuthenticated;
  }
}

// Create singleton instance
export const privyIntegrationService = new PrivyIntegrationService(); 