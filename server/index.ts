import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { GameState } from './game/GameState';
import { BotManager } from './game/BotManager';
import { GAME_CONFIG, SOCKET_EVENTS } from '../common/constants';
import { PaymentVerificationService } from './services/PaymentVerificationService';
import { serverEnvironment } from './config/environment';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Server type definitions
const SERVER_TYPES = {
    FREE: 'FREE',
    PAID_1_DOLLAR: 'PAID_1_DOLLAR'
} as const;

type ServerType = typeof SERVER_TYPES[keyof typeof SERVER_TYPES];

interface GameServerInstance {
    gameState: GameState;
    botManager: BotManager;
    serverType: ServerType;
    entryFeeUsd: number;
}

interface EnhancedPaymentData {
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

// Create multiple game instances for different payment tiers
const gameInstances: Map<ServerType, GameServerInstance> = new Map();

// Initialize payment verification service
const paymentVerificationService = new PaymentVerificationService(
    serverEnvironment.SOLANA_RPC_URL,
    serverEnvironment.HOUSE_WALLET_ADDRESS
);

console.log('🔧 Payment verification service initialized:');
console.log(`   Network: ${serverEnvironment.SOLANA_NETWORK}`);
console.log(`   RPC URL: ${serverEnvironment.SOLANA_RPC_URL}`);
console.log(`   House Wallet: ${serverEnvironment.HOUSE_WALLET_ADDRESS}`);

// Initialize game instances
gameInstances.set(SERVER_TYPES.FREE, {
    gameState: new GameState(),
    botManager: new BotManager(new GameState()),
    serverType: SERVER_TYPES.FREE,
    entryFeeUsd: 0
});

gameInstances.set(SERVER_TYPES.PAID_1_DOLLAR, {
    gameState: new GameState(),
    botManager: new BotManager(new GameState()),
    serverType: SERVER_TYPES.PAID_1_DOLLAR,
    entryFeeUsd: 1.0
});



// Fix bot manager references to use correct game state
gameInstances.forEach((instance) => {
    instance.botManager = new BotManager(instance.gameState);
});

// Track which server each player is on, along with verification data
const playerServerMap = new Map<string, { serverType: ServerType; walletAddress?: string; nickname: string }>();

// Only serve static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from dist directory
    app.use(express.static(path.join(process.cwd(), 'dist-client')));
    app.use('/common', express.static(path.join(process.cwd(), 'common')));

    // Serve index.html for all routes (for client-side routing)
    app.get('*', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'dist-client/index.html'));
    });
} else {
    // In development, just provide a simple API status endpoint
    app.get('/', (req, res) => {
        res.json({ 
            status: 'Server running',
            mode: 'development',
            message: 'Game client is served by Vite on port 5173',
            paymentSystem: {
                enabled: true,
                houseWallet: serverEnvironment.HOUSE_WALLET_ADDRESS,
                solanaNetwork: serverEnvironment.SOLANA_RPC_URL.includes('devnet') ? 'devnet' : 'mainnet'
            }
        });
    });

    // Development endpoint to test payment verification
    app.get('/api/test-payment-system', (req, res) => {
        res.json({
            paymentVerificationService: 'initialized',
            houseWallet: serverEnvironment.HOUSE_WALLET_ADDRESS,
            rpcUrl: serverEnvironment.SOLANA_RPC_URL,
            serverTypes: Object.values(SERVER_TYPES),
            message: 'Payment verification system ready'
        });
    });
}

// Socket.IO connection handling
io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // Handle player joining the game
    socket.on(SOCKET_EVENTS.JOIN_GAME, (data: { nickname: string }) => {
        try {
            // Join free server by default
            const serverInstance = gameInstances.get(SERVER_TYPES.FREE)!;
            const player = serverInstance.gameState.addPlayer(socket.id, data.nickname);
            playerServerMap.set(socket.id, { serverType: SERVER_TYPES.FREE, nickname: data.nickname });
            
            console.log(`Player ${data.nickname} joined FREE server with socket ID: ${socket.id}`);
            
            // Send full game state to new player
            socket.emit(SOCKET_EVENTS.GAME_STATE, serverInstance.gameState.getSerializableState());
            
            // Notify other players on the same server
            socket.broadcast.emit(SOCKET_EVENTS.PLAYER_JOINED, {
                id: socket.id,
                nickname: data.nickname,
                player: player
            });
        } catch (error) {
            console.error('Error joining game:', error);
        }
    });

    // Handle joining paid game
    socket.on(SOCKET_EVENTS.JOIN_PAID_GAME, (data: { serverId: string; walletAddress: string; nickname: string }) => {
        try {
            const { serverId, walletAddress, nickname } = data;
            let serverType: ServerType;
            
            // Map server ID to server type
            switch (serverId) {
                case 'premium-1':
                    serverType = SERVER_TYPES.PAID_1_DOLLAR;
                    break;
                default:
                    console.error('Invalid server ID:', serverId);
                    return;
            }
            
            const serverInstance = gameInstances.get(serverType)!;
            // Use nickname for display, but store wallet address for verification
            const player = serverInstance.gameState.addPlayer(socket.id, nickname);
            
            // Store wallet address separately for verification purposes
            playerServerMap.set(socket.id, { 
                serverType, 
                walletAddress,
                nickname 
            });
            
            console.log(`Player ${nickname} (${walletAddress}) joined ${serverType} server with socket ID: ${socket.id}`);
                
                // Send full game state to new player
                socket.emit(SOCKET_EVENTS.GAME_STATE, serverInstance.gameState.getSerializableState());
                
                // Notify other players on the same server
                socket.broadcast.emit(SOCKET_EVENTS.PLAYER_JOINED, {
                    id: socket.id,
                    nickname: nickname,
                    player: player
                });
        } catch (error) {
            console.error('Error joining paid game:', error);
        }
    });

    // Handle enhanced payment submission with comprehensive verification
    socket.on(SOCKET_EVENTS.SUBMIT_PAYMENT, async (data: EnhancedPaymentData) => {
        console.log('📥 Server received enhanced PAYMENT_SUBMIT event:', {
            signature: data.signature,
            serverId: data.serverId,
            entryFeeSol: data.entryFeeSol,
            walletAddress: data.walletAddress,
            hasTransactionData: !!data.transactionData,
            hasParsedResult: !!data.parsedResult,
            actualFees: data.actualFees
        });
        
        try {
            // Verify server ID is valid
            const validServerIds = ['premium-1'];
            if (!validServerIds.includes(data.serverId)) {
                console.error('❌ Invalid server ID:', data.serverId);
                socket.emit(SOCKET_EVENTS.PAYMENT_FAILED, 'Invalid server ID');
                return;
            }

            // Get expected fee for this server
            let expectedFee: number;
            switch (data.serverId) {
                case 'premium-1':
                    expectedFee = 1.0;
                    break;
                default:
                    throw new Error('Invalid server ID');
            }

            console.log(`🔍 Starting verification for ${data.serverId} (expected: $${expectedFee})`);

            // Perform comprehensive payment verification
            const verificationResult = await paymentVerificationService.verifyPayment(data);

            if (verificationResult.success) {
                console.log('✅ Payment verification successful:', {
                    signature: data.signature,
                    server: data.serverId,
                    amount: verificationResult.details.actualAmountTransferred,
                    fees: verificationResult.details.actualFeePaid,
                    allChecks: {
                        signatureValid: verificationResult.details.signatureValid,
                        amountValid: verificationResult.details.amountValid,
                        recipientValid: verificationResult.details.recipientValid,
                        feesReasonable: verificationResult.details.feesReasonable,
                        transactionConfirmed: verificationResult.details.transactionConfirmed
                    }
                });

                // Store successful payment for audit trail
                console.log('💾 Payment audit log:', {
                    timestamp: new Date().toISOString(),
                    signature: data.signature,
                    walletAddress: data.walletAddress,
                    serverId: data.serverId,
                    amountSol: verificationResult.details.actualAmountTransferred,
                    feesSol: verificationResult.details.actualFeePaid
                });

                // Emit success
                socket.emit(SOCKET_EVENTS.PAYMENT_VERIFIED, {
                    signature: data.signature,
                    verificationDetails: verificationResult.details
                });

            } else {
                console.error('❌ Payment verification failed:', {
                    signature: data.signature,
                    error: verificationResult.error,
                    details: verificationResult.details
                });

                // Emit failure with detailed error
                socket.emit(SOCKET_EVENTS.PAYMENT_FAILED, {
                    error: verificationResult.error,
                    details: verificationResult.details,
                    signature: data.signature
                });
            }

        } catch (error) {
            console.error('❌ Payment verification system error:', {
                signature: data.signature,
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            });

            socket.emit(SOCKET_EVENTS.PAYMENT_FAILED, {
                error: 'Payment verification system error',
                signature: data.signature
            });
        }
    });

    // Handle player movement
    socket.on(SOCKET_EVENTS.PLAYER_MOVE, (data: { angle: number, isBoosting: boolean, timestamp: number }) => {
        try {
            const playerData = playerServerMap.get(socket.id);
            if (playerData) {
                const serverInstance = gameInstances.get(playerData.serverType)!;
                serverInstance.gameState.updatePlayerDirection(socket.id, data.angle, data.isBoosting);
            }
        } catch (error) {
            console.error('Error updating player direction:', error);
        }
    });

    // Handle disconnection
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log(`Player disconnected: ${socket.id}`);
        
        try {
            const playerData = playerServerMap.get(socket.id);
            if (playerData) {
                const serverInstance = gameInstances.get(playerData.serverType)!;
                serverInstance.gameState.removePlayer(socket.id);
                playerServerMap.delete(socket.id);
                
                // Notify other players on the same server
                socket.to(socket.id).emit(SOCKET_EVENTS.PLAYER_LEFT, {
                    id: socket.id
                });
            }
        } catch (error) {
            console.error('Error removing player:', error);
        }
    });
});

// Game loop - runs at configured tick rate for all server instances
setInterval(() => {
    try {
        // Update all server instances
        gameInstances.forEach((instance) => {
            instance.gameState.update(1 / GAME_CONFIG.TICK_RATE);
            instance.botManager.update(1 / GAME_CONFIG.TICK_RATE);
        });

        // Send per-player visible state based on their server
        for (const [id, socket] of io.sockets.sockets) {
            const playerData = playerServerMap.get(id);
            if (playerData) {
                const serverInstance = gameInstances.get(playerData.serverType)!;
                const state = serverInstance.gameState.getVisibleStateForPlayer(id);
                socket.emit(SOCKET_EVENTS.GAME_STATE, state);
            }
        }

        // Send leaderboard updates for each server
        gameInstances.forEach((instance) => {
            const leaderboardData = instance.gameState.getAllPlayersForLeaderboard();
            // Send to players on this specific server
            // This is a simplified version - in practice you'd need to track which players are on which server
            io.emit(SOCKET_EVENTS.LEADERBOARD_UPDATE, leaderboardData);
        });

        // Handle events for each server instance
        gameInstances.forEach((instance) => {
            const events = instance.gameState.getEvents();
            events.forEach((event: { type: string; data: any }) => {
                switch (event.type) {
                    case 'snake_died':
                        io.emit(SOCKET_EVENTS.SNAKE_DIED, event.data);
                        break;
                    case 'food_eaten':
                        io.emit(SOCKET_EVENTS.FOOD_EATEN, event.data);
                        break;
                }
            });
            instance.gameState.clearEvents();
        });
    } catch (error) {
        console.error('Error in game loop:', error);
    }
}, 1000 / GAME_CONFIG.TICK_RATE);

// Start server
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';
server.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Game world: ${GAME_CONFIG.WORLD_WIDTH}x${GAME_CONFIG.WORLD_HEIGHT}`);
    console.log(`Tick rate: ${GAME_CONFIG.TICK_RATE} FPS`);
    console.log(`Server instances: ${Array.from(gameInstances.keys()).join(', ')}`);
});
