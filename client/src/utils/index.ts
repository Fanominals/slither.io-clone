import { Vector2D } from '../types';

export function distance(a: Vector2D, b: Vector2D): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// SOL to USD conversion utilities
export class SolanaPrice {
  private static cachedPrice: number | null = null;
  private static lastFetch: number = 0;
  private static readonly CACHE_DURATION = 60000; // 1 minute cache

  /**
   * Fetches the current SOL price in USD from CoinGecko API
   */
  static async getCurrentSolPrice(): Promise<number> {
    const now = Date.now();
    
    // Return cached price if it's still fresh
    if (this.cachedPrice && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.cachedPrice;
    }

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      
      if (data?.solana?.usd) {
        this.cachedPrice = data.solana.usd;
        this.lastFetch = now;
        return data.solana.usd;
      }
      
      // Fallback price if API fails
      return 150; // Reasonable fallback
    } catch (error) {
      console.warn('Failed to fetch SOL price:', error);
      // Return cached price or fallback
      return this.cachedPrice !== null ? this.cachedPrice : 150;
    }
  }

  /**
   * Converts SOL amount to USD
   */
  static solToUsd(solAmount: number, solPrice: number): number {
    return solAmount * solPrice;
  }

  /**
   * Formats USD amount for display
   */
  static formatUsd(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  /**
   * Formats SOL amount for display
   */
  static formatSol(amount: number): string {
    return `${amount.toFixed(4)} SOL`;
  }
}

// Wallet balance formatting utilities
export const formatWalletBalance = {
  /**
   * Formats SOL balance with USD equivalent
   */
  async formatBalance(solBalance: number): Promise<{
    sol: string;
    usd: string;
    solNumeric: number;
    usdNumeric: number;
  }> {
    const solPrice = await SolanaPrice.getCurrentSolPrice();
    const usdValue = SolanaPrice.solToUsd(solBalance, solPrice);
    
    return {
      sol: SolanaPrice.formatSol(solBalance),
      usd: SolanaPrice.formatUsd(usdValue),
      solNumeric: solBalance,
      usdNumeric: usdValue,
    };
  },
}; 