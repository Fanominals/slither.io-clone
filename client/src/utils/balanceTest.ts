/**
 * Balance Test Utility
 * 
 * This utility helps test and monitor real-time balance updates
 * Useful for development and debugging balance polling functionality
 */

import { getCurrentRpcEndpoints } from '../config/network';

export interface BalanceTestResult {
  timestamp: Date;
  balance: number;
  balanceFormatted: string;
  rpcEndpoint: string;
  responseTime: number;
}

export class BalanceMonitor {
  private walletAddress: string;
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private onBalanceChange: ((result: BalanceTestResult) => void) | null = null;
  private lastKnownBalance: number = 0;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  /**
   * Fetch balance from Solana RPC
   */
  async fetchBalance(): Promise<BalanceTestResult> {
    const rpcEndpoints = getCurrentRpcEndpoints();
    const startTime = Date.now();
    
    const rpcPayload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getBalance',
      params: [this.walletAddress, { commitment: 'confirmed' }],
    };

    for (const endpoint of rpcEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(rpcPayload),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(`RPC error: ${data.error.message}`);
        }

        const balance = data.result.value / 1_000_000_000; // Convert lamports to SOL
        const responseTime = Date.now() - startTime;

        return {
          timestamp: new Date(),
          balance,
          balanceFormatted: `${balance.toFixed(4)} SOL`,
          rpcEndpoint: endpoint,
          responseTime,
        };
      } catch (error) {
        console.warn(`RPC endpoint ${endpoint} failed:`, error);
        continue;
      }
    }

    throw new Error('All RPC endpoints failed');
  }

  /**
   * Start monitoring balance changes
   */
  startMonitoring(intervalMs: number = 5000, onBalanceChange?: (result: BalanceTestResult) => void): void {
    if (this.isMonitoring) {
      console.warn('Balance monitoring is already active');
      return;
    }

    this.isMonitoring = true;
    this.onBalanceChange = onBalanceChange || null;

    console.log(`🔄 Starting balance monitoring every ${intervalMs/1000}s for ${this.walletAddress}`);

    const monitor = async () => {
      try {
        const result = await this.fetchBalance();
        
        // Check for balance changes
        if (Math.abs(result.balance - this.lastKnownBalance) > 0.0001) {
          const changeType = result.balance > this.lastKnownBalance ? 'INCREASED' : 'DECREASED';
          const changeAmount = Math.abs(result.balance - this.lastKnownBalance);
          
          console.log(`💸 Balance ${changeType}: ${this.lastKnownBalance.toFixed(4)} → ${result.balance.toFixed(4)} SOL (+${changeAmount.toFixed(4)})`);
          
          this.lastKnownBalance = result.balance;
          
          if (this.onBalanceChange) {
            this.onBalanceChange(result);
          }
        }

        console.log(`💰 Current balance: ${result.balanceFormatted} (${result.responseTime}ms response time)`);
        
      } catch (error) {
        console.error('❌ Balance fetch failed:', error);
      }
    };

    // Initial check
    monitor();

    // Set up interval
    this.monitoringInterval = setInterval(monitor, intervalMs);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) {
      return;
    }

    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    console.log('⏹️ Balance monitoring stopped');
  }

  /**
   * Check if monitoring is active
   */
  isActive(): boolean {
    return this.isMonitoring;
  }

  /**
   * Get current wallet address
   */
  getWalletAddress(): string {
    return this.walletAddress;
  }

  /**
   * Update wallet address
   */
  setWalletAddress(address: string): void {
    this.walletAddress = address;
    this.lastKnownBalance = 0; // Reset balance tracking
  }
}

/**
 * Utility function to quickly test balance for a wallet address
 */
export const testWalletBalance = async (walletAddress: string): Promise<void> => {
  console.log(`🧪 Testing balance for wallet: ${walletAddress}`);
  
  const monitor = new BalanceMonitor(walletAddress);
  
  try {
    const result = await monitor.fetchBalance();
    console.log(`✅ Balance test successful:`, {
      balance: result.balanceFormatted,
      responseTime: `${result.responseTime}ms`,
      endpoint: result.rpcEndpoint,
      timestamp: result.timestamp.toISOString(),
    });
  } catch (error) {
    console.error(`❌ Balance test failed:`, error);
  }
};

/**
 * Utility to simulate balance monitoring (useful for development)
 */
export const simulateBalanceMonitoring = (walletAddress: string, durationSeconds: number = 60): void => {
  console.log(`🎭 Simulating balance monitoring for ${durationSeconds}s`);
  
  const monitor = new BalanceMonitor(walletAddress);
  
  monitor.startMonitoring(2000, (result) => {
    console.log(`📊 Balance update detected:`, result);
  });

  // Auto-stop after duration
  setTimeout(() => {
    monitor.stopMonitoring();
    console.log(`⏰ Balance monitoring simulation completed`);
  }, durationSeconds * 1000);
};

// Global instance for browser console access
if (typeof window !== 'undefined') {
  (window as any).balanceMonitor = {
    testWalletBalance,
    simulateBalanceMonitoring,
    BalanceMonitor,
  };
} 