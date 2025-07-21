import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { environment } from '../config/environment';
import { PaymentProgress } from '../types';

export class SolanaPaymentService {
  private connection: Connection;
  private solPriceCache: { price: number; timestamp: number } | null = null;

  constructor() {
    this.connection = new Connection(environment.SOLANA_RPC_URL);
  }

  private async getSolPrice(): Promise<number> {
    const now = Date.now();
    
    // Return cached price if still valid
    if (this.solPriceCache && (now - this.solPriceCache.timestamp) < environment.SOL_PRICE_CACHE_DURATION) {
      return this.solPriceCache.price;
    }

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      const price = data.solana.usd;
      
      this.solPriceCache = { price, timestamp: now };
      return price;
    } catch (error) {
      console.error('Failed to fetch SOL price:', error);
      // Fallback to a reasonable default
      return 100;
    }
  }

  async calculateEntryFeeSol(entryFeeUsd: number): Promise<number> {
    const solPrice = await this.getSolPrice();
    return entryFeeUsd / solPrice;
  }

  async checkWalletBalance(walletAddress: string): Promise<number> {
    try {
      console.log('Checking balance for wallet:', walletAddress);
      const publicKey = new PublicKey(walletAddress);
      const balance = await this.connection.getBalance(publicKey);
      console.log('Wallet balance:', balance / LAMPORTS_PER_SOL, 'SOL');
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Failed to check wallet balance:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to check wallet balance: ${error.message}`);
      }
      throw new Error('Failed to check wallet balance');
    }
  }

  private async createPaymentTransaction(walletAddress: string, entryFeeSol: number): Promise<Transaction> {
    const houseWallet = new PublicKey(environment.HOUSE_WALLET_ADDRESS);
    const fromWallet = new PublicKey(walletAddress);
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromWallet,
        toPubkey: houseWallet,
        lamports: entryFeeSol * LAMPORTS_PER_SOL,
      })
    );

    const { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromWallet;

    return transaction;
  }

  async processPayment(
    walletAddress: string,
    entryFeeUsd: number,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    onProgress: (progress: PaymentProgress) => void
  ): Promise<string> {
    try {
      // Validate wallet address format
      if (!walletAddress || typeof walletAddress !== 'string') {
        throw new Error('Invalid wallet address provided');
      }

      // Validate Solana address format (base58, 32-44 chars)
      if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress)) {
        throw new Error(`Invalid Solana wallet address format: ${walletAddress}`);
      }

      console.log('Processing payment for wallet:', walletAddress);

      // Step 1: Initialize
      onProgress({
        state: 'INITIALIZING',
        message: 'Initializing payment...',
        progress: 5
      });

      // Step 2: Check balance
      onProgress({
        state: 'CHECKING_BALANCE',
        message: 'Checking wallet balance...',
        progress: 10
      });

      const balance = await this.checkWalletBalance(walletAddress);
      const entryFeeSol = await this.calculateEntryFeeSol(entryFeeUsd);

      if (balance < entryFeeSol) {
        throw new Error(`Insufficient balance. Required: ${entryFeeSol.toFixed(4)} SOL, Available: ${balance.toFixed(4)} SOL`);
      }

      // Step 3: Prepare transaction
      onProgress({
        state: 'PREPARING_TRANSACTION',
        message: 'Preparing transaction...',
        progress: 25
      });

      const transaction = await this.createPaymentTransaction(walletAddress, entryFeeSol);

      // Step 4: Process transaction
      onProgress({
        state: 'AWAITING_SIGNATURE',
        message: 'Processing transaction...',
        progress: 40
      });

      const signedTransaction = await signTransaction(transaction);

      // Step 5: Send transaction
      onProgress({
        state: 'SENDING_TRANSACTION',
        message: 'Broadcasting to Solana network...',
        progress: 60
      });

      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize());

      // Step 6: Confirm transaction
      onProgress({
        state: 'CONFIRMING',
        message: 'Waiting for transaction confirmation...',
        progress: 80
      });

      const confirmation = await this.connection.confirmTransaction(signature, 'confirmed');

      if (confirmation.value.err) {
        throw new Error('Transaction failed to confirm');
      }

      // Step 7: Complete
      onProgress({
        state: 'COMPLETED',
        message: 'Payment confirmed! Starting game...',
        progress: 100
      });

      return signature;
    } catch (error) {
      onProgress({
        state: 'ERROR',
        message: error instanceof Error ? error.message : 'Payment failed',
        progress: 0
      });
      throw error;
    }
  }
} 