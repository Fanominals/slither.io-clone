import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePrivy, useWallets, useSolanaWallets } from '@privy-io/react-auth';
import { useFundWallet } from '@privy-io/react-auth/solana';
import { getCurrentRpcEndpoints, getCurrentNetworkConfig, isDevnet } from '../config/network';
import { getSolPrice } from '../utils/priceCache';
import '../styles/network.css';

interface WalletBalanceProps {
  className?: string;
}

interface BalanceInfo {
  sol: string;
  usd: string;
  solNumeric: number;
  usdNumeric: number;
}

// Get RPC endpoints from config (Helius + Official endpoints)
const SOLANA_RPC_ENDPOINTS = getCurrentRpcEndpoints();

// Polling intervals (in milliseconds)
const POLLING_INTERVALS = {
  ACTIVE: 60000,    // 1 minute when tab is active
  INACTIVE: 120000, // 2 minutes when tab is inactive
  AFTER_TRANSACTION: 60000, // 1 minute right after a transaction
} as const;

export const WalletBalance: React.FC<WalletBalanceProps> = ({ className = '' }) => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { wallets: solanaWallets } = useSolanaWallets();
  const { fundWallet } = useFundWallet();
  const [balance, setBalance] = useState<BalanceInfo>({ 
    sol: '0.0000 SOL', 
    usd: '$0.00', 
    solNumeric: 0, 
    usdNumeric: 0 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isTabActive, setIsTabActive] = useState(true);
  
  // Refs for cleanup and state management
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousBalanceRef = useRef<number>(0);

  // Get current network info
  const networkConfig = getCurrentNetworkConfig();
  
  // Get the active Solana wallet
  const activeWallet = solanaWallets[0] || wallets.find(wallet => 
    wallet.address && !wallet.address.startsWith('0x')
  ) || wallets[0];

  // Import price manager (moved to top of file)
  // const { getSolPrice } = solPriceManager;

  /**
   * Fetch SOL balance from Solana RPC with enhanced retry logic
   */
  const fetchSolanaBalance = async (address: string): Promise<number> => {
    const rpcPayload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'getBalance',
      params: [address, { commitment: 'confirmed' }], // Use confirmed commitment for balance consistency
    };
    
    let lastError: Error | null = null;
    
    for (let i = 0; i < SOLANA_RPC_ENDPOINTS.length; i++) {
      const endpoint = SOLANA_RPC_ENDPOINTS[i];
      
      try {
        console.log(`🌐 Fetching balance from RPC (${i + 1}/${SOLANA_RPC_ENDPOINTS.length}):`, endpoint);
        
        // Add delay between requests for rate limiting
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'SlitherIO-Game/1.0',
          },
          body: JSON.stringify(rpcPayload),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        // Handle rate limiting
        if (response.status === 403 || response.status === 429) {
          throw new Error(`Rate limited (${response.status}) - trying next endpoint`);
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.error) {
          if (data.error.code === -32429) {
            throw new Error('RPC rate limited - trying next endpoint');
          }
          throw new Error(`RPC error: ${data.error.message}`);
        }
        
        if (typeof data.result?.value === 'number') {
          const solBalance = data.result.value / 1_000_000_000;
          console.log('💰 SOL balance:', solBalance.toFixed(4), 'SOL', `(via ${endpoint})`);
          return solBalance;
        } else {
          throw new Error('Invalid RPC response format');
        }
      } catch (endpointError) {
        lastError = endpointError as Error;
        console.warn(`❌ RPC endpoint ${endpoint} failed:`, endpointError);
        continue;
      }
    }
    
    throw lastError || new Error('All Solana RPC endpoints failed');
  };

  /**
   * Format balance data for display
   */
  const formatBalanceData = (solBalance: number, solPrice: number): BalanceInfo => {
    const usdValue = solBalance * solPrice;
    
    return {
      sol: `${solBalance.toFixed(4)} SOL`,
      usd: `$${usdValue.toFixed(2)}`,
      solNumeric: solBalance,
      usdNumeric: usdValue,
    };
  };

  /**
   * Enhanced balance fetch with change detection
   */
  const fetchBalance = useCallback(async (showLoadingState: boolean = false): Promise<void> => {
    if (!activeWallet?.address) {
      setBalance({ sol: '0.0000 SOL', usd: '$0.00', solNumeric: 0, usdNumeric: 0 });
      setIsLoading(false);
      return;
    }

    try {
      if (showLoadingState) {
        setIsRefreshing(true);
      }
      setError(null);
      
      console.log(`🔗 Fetching balance for: ${activeWallet.address} (${networkConfig.name})`);
      
      // Fetch balance and price concurrently
      const [balanceResult, priceResult] = await Promise.allSettled([
        fetchSolanaBalance(activeWallet.address),
        getSolPrice(),
      ]);
      
      // Handle balance result
      if (balanceResult.status === 'rejected') {
        console.error('Failed to fetch SOL balance:', balanceResult.reason);
        throw new Error('Unable to fetch wallet balance');
      }
      
      // Handle price result (use fallback if failed)
      const solPrice = priceResult.status === 'fulfilled' 
        ? priceResult.value 
        : 175;
      
      const currentBalance = balanceResult.value;
      const formattedBalance = formatBalanceData(currentBalance, solPrice);
      
      // Detect balance changes
      if (Math.abs(currentBalance - previousBalanceRef.current) > 0.0001) {
        console.log(`💸 Balance changed: ${previousBalanceRef.current.toFixed(4)} → ${currentBalance.toFixed(4)} SOL`);
        previousBalanceRef.current = currentBalance;
        
        // If balance increased, show a positive feedback
        if (currentBalance > previousBalanceRef.current) {
          console.log('📈 Balance increased! Funds received.');
        }
      }
      
      setBalance(formattedBalance);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to load wallet balance');
      
      // Retry logic with exponential backoff
      const retryDelay = Math.min(5000 * Math.pow(2, 0), 30000); // Start with 5s, max 30s
      retryTimeoutRef.current = setTimeout(() => {
        fetchBalance(false);
      }, retryDelay);
      
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [activeWallet?.address, networkConfig.name]);

  /**
   * Setup dynamic polling based on tab visibility
   */
  const setupPolling = useCallback(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!activeWallet?.address || !authenticated) return;

    // Choose interval based on tab visibility
    const interval = isTabActive ? POLLING_INTERVALS.ACTIVE : POLLING_INTERVALS.INACTIVE;
    
    console.log(`🔄 Setting up polling every ${interval/1000}s (tab ${isTabActive ? 'active' : 'inactive'})`);
    
    intervalRef.current = setInterval(() => {
      fetchBalance(false);
    }, interval);

  }, [activeWallet?.address, authenticated, isTabActive, fetchBalance]);

  /**
   * Manual refresh with user feedback
   */
  const handleRefresh = async (): Promise<void> => {
    await fetchBalance(true);
  };

  /**
   * Enhanced add funds with balance monitoring
   */
  const handleAddFunds = async (): Promise<void> => {
    if (!activeWallet?.address) {
      console.error('No active wallet found');
      return;
    }

    try {
      console.log('🏦 Opening Privy funding dialog...');

      await fundWallet(activeWallet.address, {
        defaultFundingMethod: 'manual',
        uiConfig: {
          receiveFundsTitle: 'Send from your own wallet',
          receiveFundsSubtitle: 'Get QR code & address (Receive funds)',
        },
      });
      
             // Start enhanced monitoring after funding dialog
       console.log('🚀 Monitoring for incoming funds every 30 seconds (using cached SOL price)...');
       
       // Check every 30 seconds for the next 5 minutes for incoming funds
       let rapidCheckCount = 0;
       const rapidInterval = setInterval(async () => {
         rapidCheckCount++;
         
         try {
           // Only fetch balance, use cached SOL price to avoid rate limiting
           const [balanceResult, priceResult] = await Promise.allSettled([
             fetchSolanaBalance(activeWallet.address),
             getSolPrice(), // This will use cache if available
           ]);
           
           if (balanceResult.status === 'fulfilled') {
             const solPrice = priceResult.status === 'fulfilled' ? priceResult.value : 175;
             const currentBalance = balanceResult.value;
             const formattedBalance = formatBalanceData(currentBalance, solPrice);
             
             // Detect balance changes
             if (Math.abs(currentBalance - previousBalanceRef.current) > 0.0001) {
               console.log(`💸 Balance changed: ${previousBalanceRef.current.toFixed(4)} → ${currentBalance.toFixed(4)} SOL`);
               previousBalanceRef.current = currentBalance;
               
               if (currentBalance > previousBalanceRef.current) {
                 console.log('📈 Funds received!');
               }
             }
             
             setBalance(formattedBalance);
             setLastUpdated(new Date());
           }
         } catch (error) {
           console.warn('Failed to check balance during fund monitoring:', error);
         }
         
         // Stop checking after 10 attempts (5 minutes total)
         if (rapidCheckCount >= 10) {
           clearInterval(rapidInterval);
           console.log('⏰ Fund monitoring completed (checked 10 times over 5 minutes)');
         }
       }, 30000); // 30-second intervals
      
    } catch (error) {
      console.error('Error with funding dialog:', error);
      
      // Fallback: show manual funding message
      const message = `To add funds to your Solana wallet:\n\n1. Send SOL to: ${activeWallet.address}\n2. Or use the QR code in your wallet app\n\nAddress copied to clipboard!`;
      navigator.clipboard.writeText(activeWallet.address);
      alert(message);
    }
  };

  /**
   * Handle cash out
   */
  const handleCashOut = (): void => {
    if (activeWallet && balance.solNumeric > 0) {
      alert('Cash out functionality coming soon! You can manually transfer SOL from your wallet for now.');
    }
  };

  /**
   * Copy wallet address to clipboard
   */
  const handleCopyAddress = (): void => {
    if (activeWallet?.address) {
      navigator.clipboard.writeText(activeWallet.address);
      alert('Wallet address copied to clipboard!');
    }
  };

  // Tab visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isActive = !document.hidden;
      setIsTabActive(isActive);
      
      if (isActive && authenticated && activeWallet?.address) {
        console.log('👀 Tab became active - refreshing balance immediately');
        fetchBalance(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [authenticated, activeWallet?.address, fetchBalance]);

  // Initial balance fetch
  useEffect(() => {
    if (ready && authenticated && activeWallet?.address) {
      fetchBalance(true);
    } else if (ready && (!authenticated || !activeWallet)) {
      setBalance({ sol: '0.0000 SOL', usd: '$0.00', solNumeric: 0, usdNumeric: 0 });
      setIsLoading(false);
    }
  }, [ready, authenticated, activeWallet?.address, fetchBalance]);

  // Setup polling
  useEffect(() => {
    setupPolling();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [setupPolling]);

  // Loading states
  if (!ready) {
    return (
      <div className={`wallet-balance ${className}`}>
        <div className="wallet-balance-content">
          <div className="balance-loading">
            <div className="loading-spinner"></div>
            <span>Loading wallet...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className={`wallet-balance ${className}`}>
        <div className="wallet-balance-content">
          <div className="balance-error">
            <span>⚠️ Please log in to view wallet</span>
          </div>
        </div>
      </div>
    );
  }

  if (!activeWallet) {
    return (
      <div className={`wallet-balance ${className}`}>
        <div className="wallet-balance-content">
          <div className="balance-error">
            <span>⚠️ No Solana wallet connected</span>
            <p style={{fontSize: '12px', color: '#ccc', marginTop: '8px'}}>
              Please connect a Solana wallet to continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Format last updated time
  const formatLastUpdated = (date: Date | null): string => {
    if (!date) return '';
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 10) return 'just now';
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return date.toLocaleTimeString();
  };

  // Main component render
  return (
    <div className={`wallet-balance ${className}`}>
      <div className="wallet-balance-header">
        <div className="wallet-balance-title">
          <span className="wallet-icon">💳</span>
          Wallet Balance
          {isDevnet() && <span className="network-badge devnet">DEVNET</span>}
          <button 
            className="refresh-button" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh balance"
          >
            {isRefreshing ? '⟳' : '↻'}
          </button>
        </div>
      </div>

      <div className="wallet-balance-content">
        {isLoading ? (
          <div className="balance-loading">
            <div className="loading-spinner"></div>
            <span>Loading balance...</span>
          </div>
        ) : error ? (
          <div className="balance-error">
            <span>⚠️ {error}</span>
            <button onClick={handleRefresh} className="retry-button">
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="balance-display">
              <div className="usd-balance">{balance.usd}</div>
              <div className="sol-balance">{balance.sol}</div>
              <div className="balance-note">
                Real-time balance updates • {isTabActive ? 'Live' : 'Background mode'}
                <br />
                <small>
                  Connected to {networkConfig.name}
                  {lastUpdated && ` • Updated ${formatLastUpdated(lastUpdated)}`}
                </small>
              </div>
            </div>

            <div className="wallet-actions">
              <button 
                className="wallet-action-btn add-funds-btn"
                onClick={handleAddFunds}
              >
                <span className="btn-icon">⬇</span>
                Add Funds
              </button>

              <button 
                className="wallet-action-btn cash-out-btn"
                onClick={handleCashOut}
                disabled={balance.solNumeric === 0}
              >
                <span className="btn-icon">⬆</span>
                Cash Out
              </button>

              <button 
                className="wallet-action-btn address-btn"
                onClick={handleCopyAddress}
              >
                <span className="btn-icon">📋</span>
                Copy Address
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 