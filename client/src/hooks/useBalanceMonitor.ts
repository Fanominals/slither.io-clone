import { useState, useEffect, useCallback, useRef } from 'react';
import { getCurrentRpcEndpoints } from '../config/network';
import { getSolPrice } from '../utils/priceCache';

interface BalanceState {
  balance: number;
  balanceFormatted: string;
  usdValue: number;
  usdFormatted: string;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface BalanceChange {
  previousBalance: number;
  currentBalance: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'none';
  timestamp: Date;
}

interface UseBalanceMonitorOptions {
  /** Polling interval in milliseconds when tab is active */
  activeInterval?: number;
  /** Polling interval in milliseconds when tab is inactive */
  inactiveInterval?: number;
  /** Whether to automatically start monitoring */
  autoStart?: boolean;
  /** Callback when balance changes */
  onBalanceChange?: (change: BalanceChange) => void;
  /** Callback when funds are received (balance increases) */
  onFundsReceived?: (change: BalanceChange) => void;
}

interface UseBalanceMonitorReturn extends BalanceState {
  /** Manually refresh balance */
  refresh: () => Promise<void>;
  /** Start monitoring */
  startMonitoring: () => void;
  /** Stop monitoring */
  stopMonitoring: () => void;
  /** Whether monitoring is active */
  isMonitoring: boolean;
  /** Start rapid monitoring (for after transactions) */
  startRapidMonitoring: (durationMs?: number) => void;
}

/**
 * Custom hook for real-time Solana balance monitoring
 * Fetches balance directly from blockchain with automatic change detection
 */
export const useBalanceMonitor = (
  walletAddress: string | null,
  options: UseBalanceMonitorOptions = {}
): UseBalanceMonitorReturn => {
  const {
    activeInterval = 60000,  // 1 minute default
    inactiveInterval = 120000, // 2 minutes default
    autoStart = true,
    onBalanceChange,
    onFundsReceived,
  } = options;

  // State
  const [balanceState, setBalanceState] = useState<BalanceState>({
    balance: 0,
    balanceFormatted: '0.0000 SOL',
    usdValue: 0,
    usdFormatted: '$0.00',
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isTabActive, setIsTabActive] = useState(!document.hidden);

  // Refs
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const rapidIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousBalanceRef = useRef<number>(0);

  // Remove local price caching - now handled by centralized price manager

  /**
   * Fetch balance from Solana RPC
   */
  const fetchBalance = useCallback(async (): Promise<number> => {
    if (!walletAddress) throw new Error('No wallet address provided');

    const rpcEndpoints = getCurrentRpcEndpoints();
    const rpcPayload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getBalance',
      params: [walletAddress, { commitment: 'confirmed' }],
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
          if (response.status === 429 || response.status === 403) {
            throw new Error('Rate limited');
          }
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(`RPC error: ${data.error.message}`);
        }

        if (typeof data.result?.value === 'number') {
          return data.result.value / 1_000_000_000; // Convert lamports to SOL
        }
        
        throw new Error('Invalid RPC response');
      } catch (error) {
        console.warn(`RPC endpoint ${endpoint} failed:`, error);
        continue;
      }
    }

    throw new Error('All RPC endpoints failed');
  }, [walletAddress]);

  /**
   * Update balance state with change detection
   */
  const updateBalance = useCallback(async (): Promise<void> => {
    if (!walletAddress) {
      setBalanceState(prev => ({
        ...prev,
        balance: 0,
        balanceFormatted: '0.0000 SOL',
        usdValue: 0,
        usdFormatted: '$0.00',
        isLoading: false,
        error: null,
      }));
      return;
    }

    try {
      setBalanceState(prev => ({ ...prev, error: null }));

      // Fetch balance and price concurrently
      const [balance, solPrice] = await Promise.all([
        fetchBalance(),
        getSolPrice(),
      ]);

      const usdValue = balance * solPrice;
      const newState: BalanceState = {
        balance,
        balanceFormatted: `${balance.toFixed(4)} SOL`,
        usdValue,
        usdFormatted: `$${usdValue.toFixed(2)}`,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      };

      // Detect balance changes
      const previousBalance = previousBalanceRef.current;
      if (Math.abs(balance - previousBalance) > 0.0001) {
        const change = balance - previousBalance;
        const changeType = change > 0 ? 'increase' : 'decrease';
        
        const balanceChange: BalanceChange = {
          previousBalance,
          currentBalance: balance,
          change,
          changeType,
          timestamp: new Date(),
        };

        console.log(`💸 Balance ${changeType}: ${previousBalance.toFixed(4)} → ${balance.toFixed(4)} SOL (${change > 0 ? '+' : ''}${change.toFixed(4)})`);

        // Call callbacks
        if (onBalanceChange) {
          onBalanceChange(balanceChange);
        }

        if (changeType === 'increase' && onFundsReceived) {
          onFundsReceived(balanceChange);
        }

        previousBalanceRef.current = balance;
      }

      setBalanceState(newState);

    } catch (error) {
      console.error('Failed to update balance:', error);
      setBalanceState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch balance',
      }));
    }
  }, [walletAddress, fetchBalance, onBalanceChange, onFundsReceived]);

  /**
   * Start monitoring with dynamic intervals
   */
  const startMonitoring = useCallback(() => {
    if (isMonitoring || !walletAddress) return;

    setIsMonitoring(true);
    
    const setupInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const interval = isTabActive ? activeInterval : inactiveInterval;
      console.log(`🔄 Starting balance monitoring every ${interval/1000}s (tab ${isTabActive ? 'active' : 'inactive'})`);
      
      intervalRef.current = setInterval(updateBalance, interval);
    };

    // Initial update
    updateBalance();
    setupInterval();

  }, [isMonitoring, walletAddress, updateBalance, isTabActive, activeInterval, inactiveInterval]);

  /**
   * Stop monitoring
   */
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (rapidIntervalRef.current) {
      clearInterval(rapidIntervalRef.current);
      rapidIntervalRef.current = null;
    }

    console.log('⏹️ Balance monitoring stopped');
  }, []);

     /**
    * Start enhanced monitoring (useful after transactions)
    * Uses 30-second intervals with cached price to avoid API rate limiting
    */
   const startRapidMonitoring = useCallback((durationMs: number = 300000) => {
     if (rapidIntervalRef.current) {
       clearInterval(rapidIntervalRef.current);
     }

     console.log(`🚀 Starting enhanced balance monitoring for ${durationMs/1000}s (30s intervals, cached price)`);
     
     const enhancedUpdate = async () => {
       if (!walletAddress) return;

       try {
         // Fetch balance and use cached price to avoid rate limiting
         const [balance, solPrice] = await Promise.all([
           fetchBalance(),
           getSolPrice(), // Uses cache if available
         ]);

         const usdValue = balance * solPrice;
         const newState: BalanceState = {
           balance,
           balanceFormatted: `${balance.toFixed(4)} SOL`,
           usdValue,
           usdFormatted: `$${usdValue.toFixed(2)}`,
           isLoading: false,
           error: null,
           lastUpdated: new Date(),
         };

         // Detect balance changes
         const previousBalance = previousBalanceRef.current;
         if (Math.abs(balance - previousBalance) > 0.0001) {
           const change = balance - previousBalance;
           const changeType = change > 0 ? 'increase' : 'decrease';
           
           const balanceChange: BalanceChange = {
             previousBalance,
             currentBalance: balance,
             change,
             changeType,
             timestamp: new Date(),
           };

           console.log(`💸 Balance ${changeType}: ${previousBalance.toFixed(4)} → ${balance.toFixed(4)} SOL (${change > 0 ? '+' : ''}${change.toFixed(4)})`);

           if (onBalanceChange) {
             onBalanceChange(balanceChange);
           }

           if (changeType === 'increase' && onFundsReceived) {
             onFundsReceived(balanceChange);
           }

           previousBalanceRef.current = balance;
         }

         setBalanceState(newState);

       } catch (error) {
         console.warn('Failed to update balance during enhanced monitoring:', error);
       }
     };
     
     rapidIntervalRef.current = setInterval(enhancedUpdate, 30000); // 30-second intervals

     // Stop enhanced monitoring after duration
     setTimeout(() => {
       if (rapidIntervalRef.current) {
         clearInterval(rapidIntervalRef.current);
         rapidIntervalRef.current = null;
         console.log('⏰ Enhanced balance monitoring completed');
       }
     }, durationMs);

   }, [walletAddress, fetchBalance, onBalanceChange, onFundsReceived]);

  /**
   * Manual refresh
   */
  const refresh = useCallback(async () => {
    setBalanceState(prev => ({ ...prev, isLoading: true }));
    await updateBalance();
  }, [updateBalance]);

  // Tab visibility effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isActive = !document.hidden;
      setIsTabActive(isActive);

      if (isActive && isMonitoring && walletAddress) {
        console.log('👀 Tab became active - refreshing balance');
        updateBalance();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isMonitoring, walletAddress, updateBalance]);

  // Restart monitoring when tab activity changes
  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    }
  }, [isTabActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start monitoring
  useEffect(() => {
    if (autoStart && walletAddress && !isMonitoring) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [walletAddress, autoStart]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset when wallet address changes
  useEffect(() => {
    if (walletAddress) {
      previousBalanceRef.current = 0;
      setBalanceState(prev => ({ ...prev, isLoading: true }));
    }
  }, [walletAddress]);

  return {
    ...balanceState,
    refresh,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
    startRapidMonitoring,
  };
}; 