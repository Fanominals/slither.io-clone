/**
 * Centralized SOL Price Caching System
 * 
 * This utility manages SOL price fetching and caching to prevent
 * excessive API calls to CoinGecko and avoid rate limiting.
 */

interface PriceCache {
  price: number;
  timestamp: number;
  isStale: boolean;
}

interface PriceFetchState {
  isLoading: boolean;
  promise: Promise<number> | null;
}

class SolPriceManager {
  private cache: PriceCache | null = null;
  private fetchState: PriceFetchState = { isLoading: false, promise: null };
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  private readonly FALLBACK_PRICE = 175; // Reasonable fallback price
  private readonly API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';

  /**
   * Get cached price if available and not stale
   */
  private getCachedPrice(): number | null {
    if (!this.cache) return null;
    
    const isExpired = Date.now() - this.cache.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.isStale = true;
      return null;
    }
    
    return this.cache.price;
  }

  /**
   * Fetch fresh price from CoinGecko API
   */
  private async fetchFreshPrice(): Promise<number> {
    console.log('💰 Fetching fresh SOL price from CoinGecko...');
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'User-Agent': 'SlitherIO-Game/1.0'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limited by CoinGecko API');
        }
        throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const price = data.solana?.usd;
      
      if (typeof price !== 'number' || price <= 0) {
        throw new Error('Invalid price data received');
      }
      
      // Update cache
      this.cache = {
        price,
        timestamp: Date.now(),
        isStale: false,
      };
      
      console.log(`📈 SOL price updated: $${price.toFixed(2)} (cached for 5 minutes)`);
      return price;
      
    } catch (error) {
      console.warn('⚠️ Failed to fetch SOL price:', error);
      
      // If we have stale cache, use it
      if (this.cache && this.cache.isStale) {
        console.log(`🔄 Using stale cached price: $${this.cache.price.toFixed(2)}`);
        return this.cache.price;
      }
      
      // Otherwise use fallback
      console.log(`🆘 Using fallback price: $${this.FALLBACK_PRICE.toFixed(2)}`);
      return this.FALLBACK_PRICE;
    }
  }

  /**
   * Get SOL price (cached or fresh)
   * Returns cached price if available, otherwise fetches fresh price
   */
  async getPrice(): Promise<number> {
    // Try cached price first
    const cachedPrice = this.getCachedPrice();
    if (cachedPrice !== null) {
      console.log(`💾 Using cached SOL price: $${cachedPrice.toFixed(2)}`);
      return cachedPrice;
    }

    // If already fetching, wait for existing request
    if (this.fetchState.isLoading && this.fetchState.promise) {
      console.log('⏳ Waiting for existing price fetch...');
      return this.fetchState.promise;
    }

    // Start new fetch
    this.fetchState.isLoading = true;
    this.fetchState.promise = this.fetchFreshPrice();

    try {
      const price = await this.fetchState.promise;
      return price;
    } finally {
      this.fetchState.isLoading = false;
      this.fetchState.promise = null;
    }
  }

  /**
   * Force refresh the price (ignores cache)
   */
  async refreshPrice(): Promise<number> {
    console.log('🔄 Forcing SOL price refresh...');
    this.cache = null; // Clear cache
    return this.getPrice();
  }

  /**
   * Get current cached price without fetching
   */
  getCurrentPrice(): number | null {
    return this.cache?.price || null;
  }

  /**
   * Check if price cache is stale
   */
  isCacheStale(): boolean {
    if (!this.cache) return true;
    return Date.now() - this.cache.timestamp > this.CACHE_DURATION;
  }

  /**
   * Get cache age in seconds
   */
  getCacheAge(): number {
    if (!this.cache) return 0;
    return Math.floor((Date.now() - this.cache.timestamp) / 1000);
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache = null;
    console.log('🗑️ SOL price cache cleared');
  }
}

// Create singleton instance
export const solPriceManager = new SolPriceManager();

// Convenience functions for easy importing
export const getSolPrice = () => solPriceManager.getPrice();
export const refreshSolPrice = () => solPriceManager.refreshPrice();
export const getCurrentSolPrice = () => solPriceManager.getCurrentPrice();
export const isSolPriceCacheStale = () => solPriceManager.isCacheStale();

// Global access for debugging
if (typeof window !== 'undefined') {
  (window as any).solPriceManager = solPriceManager;
} 