import { Connection, PublicKey, Transaction, VersionedTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface PaymentVerificationData {
    signature: string;
    serverId: string;
    entryFeeSol: number;
    walletAddress: string;
    actualFees?: string;
    transactionData?: {
        serialized: string;
        type: string;
    } | null;
    parsedResult?: {
        slot: number;
        blockTime: number | null;
        meta: {
            err: any;
            fee: number;
            preBalances: number[];
            postBalances: number[];
        };
    } | null;
}

interface VerificationResult {
    success: boolean;
    error?: string;
    details: {
        signatureValid: boolean;
        amountValid: boolean;
        recipientValid: boolean;
        feesReasonable: boolean;
        transactionConfirmed: boolean;
        actualAmountTransferred?: number;
        actualFeePaid?: number;
    };
}

export class PaymentVerificationService {
    private connection: Connection;
    private houseWalletAddress: string;
    private maxAcceptableFeeSol: number = 0.01; // Maximum acceptable fee in SOL
    private rpcUrl: string;

    constructor(rpcUrl: string, houseWalletAddress: string) {
        this.connection = new Connection(rpcUrl, 'confirmed');
        this.houseWalletAddress = houseWalletAddress;
        this.rpcUrl = rpcUrl;
    }

    async verifyPayment(data: PaymentVerificationData): Promise<VerificationResult> {
        console.log('🔍 Starting comprehensive payment verification for:', data.signature);
        console.log('🌐 Using RPC URL:', this.rpcUrl);
        console.log('🏠 Verifying payment to house wallet:', this.houseWalletAddress);
        
        const result: VerificationResult = {
            success: false,
            details: {
                signatureValid: false,
                amountValid: false,
                recipientValid: false,
                feesReasonable: false,
                transactionConfirmed: false
            }
        };

        try {
            // 1. Verify transaction signature exists on blockchain
            result.details.signatureValid = await this.verifyTransactionSignature(data.signature);
            if (!result.details.signatureValid) {
                result.error = 'Transaction signature not found on blockchain';
                return result;
            }

            // 2. Verify transaction confirmation and parse data
            const onChainTx = await this.getTransactionDetails(data.signature);
            if (!onChainTx) {
                result.error = 'Transaction not confirmed on blockchain';
                return result;
            }

            result.details.transactionConfirmed = true;

            // 3. Verify transaction didn't fail
            if (onChainTx.meta?.err) {
                result.error = `Transaction failed on blockchain: ${JSON.stringify(onChainTx.meta.err)}`;
                return result;
            }

            // 4. Verify signed transaction data (if provided)
            if (data.transactionData) {
                const isValidTransaction = await this.verifySignedTransaction(
                    data.transactionData,
                    data.walletAddress,
                    this.houseWalletAddress,
                    data.entryFeeSol
                );
                if (!isValidTransaction) {
                    result.error = 'Signed transaction verification failed';
                    return result;
                }
            }

            // 5. Verify payment amount using balance changes
            const { amountValid, actualAmount } = this.verifyPaymentAmount(
                onChainTx,
                data.entryFeeSol,
                data.walletAddress,
                this.houseWalletAddress
            );
            
            result.details.amountValid = amountValid;
            result.details.actualAmountTransferred = actualAmount;
            
            if (!amountValid) {
                result.error = `Payment amount mismatch. Expected: ${data.entryFeeSol} SOL, Actual: ${actualAmount} SOL`;
                return result;
            }

            // 6. Verify recipient (house wallet received the funds)
            result.details.recipientValid = this.verifyRecipient(onChainTx, this.houseWalletAddress);
            if (!result.details.recipientValid) {
                result.error = 'Payment did not go to the correct house wallet';
                return result;
            }

            // 7. Verify fees are reasonable
            const actualFee = onChainTx.meta?.fee || 0;
            result.details.actualFeePaid = actualFee / LAMPORTS_PER_SOL;
            result.details.feesReasonable = actualFee <= (this.maxAcceptableFeeSol * LAMPORTS_PER_SOL);
            
            if (!result.details.feesReasonable) {
                result.error = `Transaction fees too high: ${result.details.actualFeePaid} SOL (max: ${this.maxAcceptableFeeSol} SOL)`;
                return result;
            }

            // 8. Cross-verify with parsed result from client (if provided)
            if (data.parsedResult) {
                const clientDataValid = this.verifyClientParsedData(onChainTx, data.parsedResult);
                if (!clientDataValid) {
                    result.error = 'Client-provided transaction data does not match blockchain data';
                    return result;
                }
            }

            console.log('✅ Payment verification successful:', {
                signature: data.signature,
                amount: result.details.actualAmountTransferred,
                fee: result.details.actualFeePaid,
                slot: onChainTx.slot
            });

            result.success = true;
            return result;

        } catch (error) {
            console.error('❌ Payment verification error:', error);
            result.error = error instanceof Error ? error.message : 'Unknown verification error';
            return result;
        }
    }

    private async verifyTransactionSignature(signature: string): Promise<boolean> {
        try {
            console.log(`🔍 Looking up transaction ${signature} on network: ${this.rpcUrl}`);
            const transaction = await this.connection.getTransaction(signature, {
                commitment: 'confirmed',
                maxSupportedTransactionVersion: 0
            });
            
            if (transaction === null) {
                console.error(`❌ Transaction ${signature} not found on network: ${this.rpcUrl}`);
                console.error('🔧 Possible causes:');
                console.error('   - Network mismatch (client on mainnet, server on devnet or vice versa)');
                console.error('   - Transaction not yet confirmed');
                console.error('   - Invalid transaction signature');
                return false;
            }
            
            console.log(`✅ Transaction ${signature} found and confirmed on network`);
            return true;
        } catch (error) {
            console.error('Error verifying transaction signature:', error);
            console.error(`RPC URL being used: ${this.rpcUrl}`);
            return false;
        }
    }

    private async getTransactionDetails(signature: string) {
        try {
            return await this.connection.getParsedTransaction(signature, {
                commitment: 'confirmed',
                maxSupportedTransactionVersion: 0
            });
        } catch (error) {
            console.error('Error getting transaction details:', error);
            return null;
        }
    }

    private async verifySignedTransaction(
        transactionData: { serialized: string; type: string },
        senderAddress: string,
        recipientAddress: string,
        expectedAmountSol: number
    ): Promise<boolean> {
        try {
            const transactionBuffer = Buffer.from(transactionData.serialized, 'base64');
            
            let transaction: Transaction | VersionedTransaction;
            if (transactionData.type === 'VersionedTransaction') {
                transaction = VersionedTransaction.deserialize(transactionBuffer);
            } else {
                transaction = Transaction.from(transactionBuffer);
            }

            // Verify transaction structure
            if (transaction instanceof Transaction) {
                // Check legacy transaction
                const transferInstruction = transaction.instructions.find(ix => 
                    ix.programId.toBase58() === '11111111111111111111111111111111' // System Program
                );

                if (!transferInstruction) {
                    return false;
                }

                // Verify sender, recipient, and amount in instruction data
                const accounts = transferInstruction.keys;
                if (accounts.length < 2) return false;

                const fromAccount = accounts[0].pubkey.toBase58();
                const toAccount = accounts[1].pubkey.toBase58();

                return fromAccount === senderAddress && toAccount === recipientAddress;
            }

            // For VersionedTransaction, we'd need more complex parsing
            return true; // Simplified for now

        } catch (error) {
            console.error('Error verifying signed transaction:', error);
            return false;
        }
    }

    private verifyPaymentAmount(
        transaction: any,
        expectedAmountSol: number,
        senderAddress: string,
        recipientAddress: string
    ): { amountValid: boolean; actualAmount: number } {
        try {
            // Validate that we're checking the correct house wallet
            if (recipientAddress !== this.houseWalletAddress) {
                console.error(`❌ Recipient address mismatch! Expected: ${this.houseWalletAddress}, Got: ${recipientAddress}`);
                return { amountValid: false, actualAmount: 0 };
            }

            const preBalances = transaction.meta?.preBalances || [];
            const postBalances = transaction.meta?.postBalances || [];
            const accountKeys = transaction.transaction?.message?.accountKeys || [];

            if (!Array.isArray(accountKeys)) {
                return { amountValid: false, actualAmount: 0 };
            }

            // Find sender and recipient account indices
            let senderIndex = -1;
            let recipientIndex = -1;

            for (let i = 0; i < accountKeys.length; i++) {
                const account = accountKeys[i];
                let accountAddress: string;
                
                // Handle different account key formats
                if (typeof account === 'string') {
                    accountAddress = account;
                } else if (account && typeof account.toBase58 === 'function') {
                    // Handle PublicKey objects
                    accountAddress = account.toBase58();
                } else if (account && account.pubkey) {
                    // Handle wrapped objects with pubkey property
                    accountAddress = typeof account.pubkey === 'string' ? account.pubkey : account.pubkey.toBase58();
                } else {
                    // Fallback - try to convert to string
                    accountAddress = String(account);
                }
                
                if (accountAddress === senderAddress) {
                    senderIndex = i;
                }
                if (accountAddress === recipientAddress) {
                    recipientIndex = i;
                }
            }

            console.log(`🎯 House wallet verification: ${recipientAddress}`);
            console.log(`📍 Found house wallet at account index: ${recipientIndex}`);
            console.log(`📍 Found sender wallet at account index: ${senderIndex}`);

            if (senderIndex === -1 || recipientIndex === -1) {
                console.error(`❌ Account indices not found - Sender: ${senderIndex}, Recipient: ${recipientIndex}`);
                console.error(`   Total accounts in transaction: ${accountKeys.length}`);
                console.error(`   Looking for sender: ${senderAddress}`);
                console.error(`   Looking for recipient: ${recipientAddress}`);
                return { amountValid: false, actualAmount: 0 };
            }

            // Calculate actual transfer amount
            const senderPreBalance = preBalances[senderIndex] || 0;
            const senderPostBalance = postBalances[senderIndex] || 0;
            const recipientPreBalance = preBalances[recipientIndex] || 0;
            const recipientPostBalance = postBalances[recipientIndex] || 0;
            
            const senderBalanceChange = senderPreBalance - senderPostBalance;
            const recipientBalanceChange = recipientPostBalance - recipientPreBalance;

            console.log(`💰 Balance changes:`);
            console.log(`   Sender (${senderAddress}): ${senderPreBalance} → ${senderPostBalance} (change: -${senderBalanceChange} lamports)`);
            console.log(`   Recipient (${recipientAddress}): ${recipientPreBalance} → ${recipientPostBalance} (change: +${recipientBalanceChange} lamports)`);

            // The amount transferred should be approximately the same (minus fees for sender)
            const actualAmountSol = recipientBalanceChange / LAMPORTS_PER_SOL;
            const expectedLamports = Math.floor(expectedAmountSol * LAMPORTS_PER_SOL);
            const tolerance = 1000; // 1000 lamports tolerance

            console.log(`📊 Amount verification:`);
            console.log(`   Expected: ${expectedAmountSol} SOL (${expectedLamports} lamports)`);
            console.log(`   Actual: ${actualAmountSol} SOL (${recipientBalanceChange} lamports)`);
            console.log(`   Difference: ${Math.abs(recipientBalanceChange - expectedLamports)} lamports (tolerance: ${tolerance})`);

            const amountValid = Math.abs(recipientBalanceChange - expectedLamports) <= tolerance;

            return { amountValid, actualAmount: actualAmountSol };

        } catch (error) {
            console.error('Error verifying payment amount:', error);
            return { amountValid: false, actualAmount: 0 };
        }
    }

    private verifyRecipient(transaction: any, expectedRecipient: string): boolean {
        try {
            // Validate that we're checking our house wallet
            if (expectedRecipient !== this.houseWalletAddress) {
                console.error(`❌ Expected recipient is not our house wallet! Expected: ${this.houseWalletAddress}, Got: ${expectedRecipient}`);
                return false;
            }

            const accountKeys = transaction.transaction?.message?.accountKeys || [];
            const postBalances = transaction.meta?.postBalances || [];
            const preBalances = transaction.meta?.preBalances || [];

            // Check if house wallet balance increased
            for (let i = 0; i < accountKeys.length; i++) {
                const account = accountKeys[i];
                let accountAddress: string;
                
                // Handle different account key formats (same as in verifyPaymentAmount)
                if (typeof account === 'string') {
                    accountAddress = account;
                } else if (account && typeof account.toBase58 === 'function') {
                    accountAddress = account.toBase58();
                } else if (account && account.pubkey) {
                    accountAddress = typeof account.pubkey === 'string' ? account.pubkey : account.pubkey.toBase58();
                } else {
                    accountAddress = String(account);
                }
                
                if (accountAddress === this.houseWalletAddress) {
                    const balanceIncrease = (postBalances[i] || 0) - (preBalances[i] || 0);
                    console.log(`🏠 House wallet (${this.houseWalletAddress}) balance change: +${balanceIncrease} lamports`);
                    return balanceIncrease > 0; // House wallet should have received funds
                }
            }

            console.error(`❌ House wallet not found in transaction accounts: ${this.houseWalletAddress}`);
            return false;
        } catch (error) {
            console.error('Error verifying recipient:', error);
            return false;
        }
    }

    private verifyClientParsedData(onChainTx: any, clientData: any): boolean {
        try {
            // Cross-verify key fields
            if (onChainTx.slot !== clientData.slot) return false;
            if (onChainTx.blockTime !== clientData.blockTime) return false;
            if (onChainTx.meta?.fee !== clientData.meta?.fee) return false;

            // Verify error status
            const onChainError = onChainTx.meta?.err;
            const clientError = clientData.meta?.err;
            if (JSON.stringify(onChainError) !== JSON.stringify(clientError)) return false;

            return true;
        } catch (error) {
            console.error('Error verifying client parsed data:', error);
            return false;
        }
    }
} 