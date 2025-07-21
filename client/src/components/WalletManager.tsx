import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface WalletManagerProps {
  onWalletReady?: () => void;
}

export const WalletManager: React.FC<WalletManagerProps> = ({ onWalletReady }) => {
  const { user, logout, ready } = usePrivy();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateNewWallet = async () => {
    setIsProcessing(true);
    try {
      // Log out completely to clear existing wallet
      await logout();
      
      // Wait a moment for logout to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // The user will need to log back in, which should create a new Solana wallet
      console.log('Logged out successfully. Please log back in to create a new Solana wallet.');
      
      if (onWalletReady) {
        onWalletReady();
      }
    } catch (error) {
      console.error('Error creating new wallet:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isWrongWalletType = () => {
    if (!user?.wallet) return false;
    const wallet = user.wallet as any;
    return wallet.chainType === 'ethereum' || wallet.address?.startsWith('0x');
  };

  if (!ready) {
    return (
      <div className="wallet-manager">
        <div className="wallet-manager-content">
          <div className="loading-spinner"></div>
          <span>Loading wallet...</span>
        </div>
      </div>
    );
  }

  if (isWrongWalletType()) {
    return (
      <div className="wallet-manager">
        <div className="wallet-manager-content">
          <div className="wallet-error">
            <h3>⚠️ Wrong Wallet Type Detected</h3>
            <p>You currently have an Ethereum wallet, but this game requires a Solana wallet.</p>
            <p>Current wallet: {user?.wallet?.address}</p>
            <button 
              className="create-wallet-btn"
              onClick={handleCreateNewWallet}
              disabled={isProcessing}
            >
              {isProcessing ? 'Creating New Wallet...' : 'Create New Solana Wallet'}
            </button>
            <p className="wallet-note">
              This will log you out and create a new Solana wallet when you log back in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}; 