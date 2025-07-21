import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useSolanaWallets, useSendTransaction } from '@privy-io/react-auth/solana';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { environment } from '../config/environment';

interface SimpleTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientAddress: string;
  amount: number; // SOL amount
  onSuccess?: (signature: string) => void;
  onError?: (error: string) => void;
}

export const SimpleTransferModal: React.FC<SimpleTransferModalProps> = ({
  isOpen,
  onClose,
  recipientAddress,
  amount,
  onSuccess,
  onError
}) => {
  const { authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();
  const { sendTransaction } = useSendTransaction();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleTransfer = async () => {
    if (!authenticated) {
      setStatus('error');
      setMessage('Please log in first');
      onError?.('Please log in first');
      return;
    }

    const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
    if (!embeddedWallet) {
      setStatus('error');
      setMessage('No embedded wallet found');
      onError?.('No embedded wallet found');
      return;
    }

    setIsProcessing(true);
    setStatus('processing');

        try {
      setMessage('Preparing transaction...');
      
      // Create connection
      const connection = new Connection(environment.SOLANA_RPC_URL);

      // Create transaction
      const fromPubkey = new PublicKey(embeddedWallet.address);
      const toPubkey = new PublicKey(recipientAddress);
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: Math.floor(amount * LAMPORTS_PER_SOL),
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      setMessage('Please approve the transaction...');

      // Use Privy's built-in sendTransaction - this will show the modal!
      const receipt = await sendTransaction({
        transaction: transaction,
        connection: connection,
        address: embeddedWallet.address
      });

      setStatus('success');
      setMessage(`Transaction successful! Signature: ${receipt.signature}`);
      onSuccess?.(receipt.signature);

    } catch (error) {
      setStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Transaction failed';
      setMessage(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal" style={modalStyle}>
        <div className="modal-header" style={headerStyle}>
          <h2>Send SOL</h2>
          <button 
            onClick={onClose} 
            style={closeButtonStyle}
            disabled={isProcessing}
          >
            ×
          </button>
        </div>

        <div className="modal-content" style={contentStyle}>
          <div style={detailsStyle}>
            <p><strong>To:</strong> {recipientAddress}</p>
            <p><strong>Amount:</strong> {amount} SOL</p>
          </div>

          {status === 'processing' && (
            <div style={statusStyle}>
              <div style={spinnerStyle}></div>
              <p>{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div style={{...statusStyle, color: '#4ecdc4'}}>
              <p>✅ {message}</p>
            </div>
          )}

          {status === 'error' && (
            <div style={{...statusStyle, color: '#ff6b6b'}}>
              <p>❌ {message}</p>
            </div>
          )}

          <div style={buttonContainerStyle}>
            <button 
              onClick={onClose}
              style={cancelButtonStyle}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button 
              onClick={handleTransfer}
              style={{
                ...confirmButtonStyle, 
                opacity: isProcessing ? 0.6 : 1
              }}
              disabled={isProcessing || status === 'success'}
            >
              {isProcessing ? 'Processing...' : status === 'success' ? 'Completed' : 'Send SOL'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the modal
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  borderRadius: '12px',
  border: '1px solid #333',
  maxWidth: '400px',
  width: '90%',
  maxHeight: '80vh',
  overflow: 'auto',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #333',
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '24px',
  cursor: 'pointer',
  padding: '0',
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle: React.CSSProperties = {
  padding: '20px',
};

const detailsStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#2a2a2a',
  borderRadius: '8px',
};

const statusStyle: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#2a2a2a',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const spinnerStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  border: '2px solid #333',
  borderTop: '2px solid #4ecdc4',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'flex-end',
};

const cancelButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'transparent',
  border: '1px solid #666',
  borderRadius: '6px',
  color: '#fff',
  cursor: 'pointer',
};

const confirmButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#4ecdc4',
  border: 'none',
  borderRadius: '6px',
  color: '#000',
  cursor: 'pointer',
  fontWeight: 'bold',
}; 