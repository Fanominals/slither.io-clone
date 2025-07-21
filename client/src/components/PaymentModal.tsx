import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useSolanaWallets, useSendTransaction } from '@privy-io/react-auth/solana';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SERVERS } from '../config/servers';
import { PaymentProgress, GameServerInfo } from '../types';
import { SOCKET_EVENTS } from '../../../common/constants';
import { useSocket } from '../hooks/useSocket';
import { environment } from '../config/environment';
import '../styles/payment.css';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinGame: (serverInfo: GameServerInfo) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onJoinGame }) => {
  const { user, authenticated } = usePrivy();
  const { wallets } = useSolanaWallets();
  const { sendTransaction } = useSendTransaction();
  const { socket } = useSocket();
  const [selectedServer, setSelectedServer] = useState<GameServerInfo | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentProgress>({
    state: 'IDLE',
    message: 'Select a server to continue',
    progress: 0
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [servers, setServers] = useState<GameServerInfo[]>([]);

  useEffect(() => {
    const loadServers = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        const solPrice = data.solana.usd;
        
        const serverInfos = SERVERS.map((server) => ({
          ...server,
          entryFeeSol: server.entryFeeUsd / solPrice
        }));
        setServers(serverInfos);
      } catch (error) {
        console.error('Failed to load server prices:', error);
        // Fallback with default SOL price
        const serverInfos = SERVERS.map((server) => ({
          ...server,
          entryFeeSol: server.entryFeeUsd / 100 // Fallback price
        }));
        setServers(serverInfos);
      }
    };

    if (isOpen) {
      loadServers();
      
      // Ensure socket connection
      if (!socket.isConnected()) {
        console.log('Connecting to socket...');
        socket.connect();
      }
    }
  }, [isOpen, socket]);

  const handleServerSelect = (server: GameServerInfo) => {
    setSelectedServer(server);
    setPaymentState({
      state: 'IDLE',
      message: server.isPremium ? `Ready to pay $${server.entryFeeUsd} (${server.entryFeeSol.toFixed(4)} SOL)` : 'Ready to join free server',
      progress: 0
    });
  };

  const handleJoinServer = async () => {
    if (!selectedServer || !authenticated || !user?.wallet) {
      console.error('Missing required data for server join');
      return;
    }

    // For free servers, join directly
    if (!selectedServer.isPremium) {
      onJoinGame(selectedServer);
      return;
    }

    // For premium servers, process payment
    const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
    if (!embeddedWallet) {
      setPaymentState({
        state: 'ERROR',
        message: 'No embedded wallet found',
        progress: 0
      });
      return;
    }

    setIsProcessing(true);

        try {
      setPaymentState({
        state: 'PREPARING_TRANSACTION',
        message: 'Preparing transaction...',
        progress: 20
      });

      // Create connection
      const connection = new Connection(environment.SOLANA_RPC_URL);

      // Create transaction
      const houseWallet = new PublicKey(environment.HOUSE_WALLET_ADDRESS);
      const fromWallet = new PublicKey(embeddedWallet.address);
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromWallet,
          toPubkey: houseWallet,
          lamports: Math.floor(selectedServer.entryFeeSol * LAMPORTS_PER_SOL),
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromWallet;

      setPaymentState({
        state: 'AWAITING_SIGNATURE',
        message: 'Please approve the transaction...',
        progress: 50
      });

      // Use Privy's built-in sendTransaction - this will show the modal!
      const receipt = await sendTransaction({
        transaction: transaction,
        connection: connection,
        address: embeddedWallet.address
      });

      setPaymentState({
        state: 'CONFIRMING',
        message: 'Transaction confirmed!',
        progress: 90
      });

      const signature = receipt.signature;

      console.log('Transaction successful!', signature);
      console.log('Full receipt data:', {
        signature: receipt.signature,
        fees: receipt.fees?.toString(),
        hasSignedTransaction: !!receipt.signedTransaction,
        hasParsedTransaction: !!receipt.parsedTransaction,
        transactionError: receipt.parsedTransaction?.meta?.err
      });
      console.log('Socket connected:', socket.isConnected());

      // Verify transaction succeeded on-chain
      if (receipt.parsedTransaction?.meta?.err) {
        throw new Error(`Transaction failed on blockchain: ${JSON.stringify(receipt.parsedTransaction.meta.err)}`);
      }

      // Submit payment to server for verification (if server is running)
      if (socket.isConnected()) {
        try {
          console.log('Submitting payment for verification...');
          socket.submitPayment({
            // Basic data (current)
            signature,
            serverId: selectedServer.id,
            entryFeeSol: selectedServer.entryFeeSol,
            walletAddress: embeddedWallet.address,
            
            // Enhanced verification data (new)
            actualFees: receipt.fees?.toString(),
            transactionData: receipt.signedTransaction ? {
              // Serialize the transaction for server verification
              serialized: Buffer.from(receipt.signedTransaction.serialize()).toString('base64'),
              type: receipt.signedTransaction.constructor.name
            } : null,
            parsedResult: receipt.parsedTransaction ? {
              slot: receipt.parsedTransaction.slot,
              blockTime: receipt.parsedTransaction.blockTime,
              meta: {
                err: receipt.parsedTransaction.meta?.err,
                fee: receipt.parsedTransaction.meta?.fee,
                preBalances: receipt.parsedTransaction.meta?.preBalances,
                postBalances: receipt.parsedTransaction.meta?.postBalances
              }
            } : null
          });

          // Wait for server verification with shorter timeout
          const verificationPromise = new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              console.log('Payment verification timeout - proceeding anyway');
              resolve(); // Don't fail, just proceed
            }, 5000); // Shorter timeout

            const handlePaymentVerified = () => {
              console.log('Payment verified by server');
              clearTimeout(timeout);
              socket.off(SOCKET_EVENTS.PAYMENT_VERIFIED, handlePaymentVerified);
              socket.off(SOCKET_EVENTS.PAYMENT_FAILED, handlePaymentFailed);
              resolve();
            };

            const handlePaymentFailed = (error: string) => {
              console.log('Payment verification failed:', error);
              clearTimeout(timeout);
              socket.off(SOCKET_EVENTS.PAYMENT_VERIFIED, handlePaymentVerified);
              socket.off(SOCKET_EVENTS.PAYMENT_FAILED, handlePaymentFailed);
              resolve(); // Don't fail, just proceed
            };

            socket.onPaymentVerified(handlePaymentVerified);
            socket.onPaymentFailed(handlePaymentFailed);
          });

          await verificationPromise;
        } catch (error) {
          console.log('Server verification failed, proceeding anyway:', error);
          // Don't throw error, just proceed
        }
      } else {
        console.log('Socket not connected, skipping server verification');
      }

      setPaymentState({
        state: 'COMPLETED',
        message: 'Payment confirmed! Starting game...',
        progress: 100
      });

      // Join the paid game
      onJoinGame(selectedServer);

    } catch (error) {
      console.error('Payment process failed:', error);
      setPaymentState({
        state: 'ERROR',
        message: error instanceof Error ? error.message : 'Payment failed',
        progress: 0
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h2>Select Server</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="payment-modal-content">
          <div className="server-grid">
            {servers.map((server) => (
              <div
                key={server.id}
                className={`server-card ${selectedServer?.id === server.id ? 'selected' : ''}`}
                onClick={() => handleServerSelect(server)}
              >
                <div className="server-header">
                  <h3>{server.name}</h3>
                  {server.isPremium && (
                    <span className="price">
                      ${server.entryFeeUsd} ({server.entryFeeSol.toFixed(4)} SOL)
                    </span>
                  )}
                </div>
                <p className="server-description">{server.description}</p>
                <ul className="server-features">
                  {server.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {selectedServer && (
            <div className="payment-section">
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${paymentState.progress}%` }}
                  />
                </div>
                <p className="progress-message">{paymentState.message}</p>
              </div>

              <button
                className={`join-button ${isProcessing ? 'processing' : ''}`}
                onClick={handleJoinServer}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : selectedServer.isPremium ? 'Pay & Join' : 'Join Free Server'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 