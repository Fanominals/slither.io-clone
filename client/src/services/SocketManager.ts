import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '../../../common/constants';

export type SocketEventHandler = (...args: any[]) => void;

export class SocketManager {
    private socket: Socket | null = null;
    private connected: boolean = false;
    private eventHandlers: Map<string, SocketEventHandler[]> = new Map();

    constructor() {
        // Don't initialize socket in constructor for React
    }

    public connect(): void {
        if (this.socket) {
            this.socket.disconnect();
        }

        // In development, connect to server directly. In production, connect to same origin
        const isDevelopment = window.location.hostname === 'localhost';
        const socketUrl = isDevelopment ? 'http://localhost:3000' : '';

        this.socket = io(socketUrl, {
            autoConnect: false,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 10,
            timeout: 20000,
            forceNew: true,
            transports: ["polling", "websocket"]
        });

        this.setupEventHandlers();
        this.socket.connect();
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.connected = false;
    }

    public isConnected(): boolean {
        return this.connected;
    }

    public on(event: string, handler: SocketEventHandler): void {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event)!.push(handler);
    }

    public off(event: string, handler?: SocketEventHandler): void {
        if (!this.eventHandlers.has(event)) return;
        
        if (handler) {
            const handlers = this.eventHandlers.get(event)!;
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        } else {
            this.eventHandlers.delete(event);
        }
    }

    public joinGame(nickname: string): void {
        if (this.socket && this.connected) {
            this.socket.emit(SOCKET_EVENTS.JOIN_GAME, { nickname });
        }
    }

    public joinPaidGame(serverId: string, walletAddress: string, nickname: string): void {
        if (this.socket && this.connected) {
            console.log(`Joining paid game: ${serverId} with wallet: ${walletAddress} and nickname: ${nickname}`);
            this.socket.emit(SOCKET_EVENTS.JOIN_PAID_GAME, { serverId, walletAddress, nickname });
        } else {
            console.error('Cannot join paid game: socket not connected');
        }
    }

    public sendPlayerMove(angle: number, isBoosting: boolean): void {
        if (this.socket && this.connected) {
            this.socket.emit(SOCKET_EVENTS.PLAYER_MOVE, {
                angle,
                isBoosting,
                timestamp: Date.now()
            });
        }
    }

    public submitPayment(paymentData: {
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
    }): void {
        if (this.socket && this.connected) {
            this.socket.emit(SOCKET_EVENTS.SUBMIT_PAYMENT, paymentData);
        }
    }

    public onPaymentVerified(callback: () => void): void {
        this.on(SOCKET_EVENTS.PAYMENT_VERIFIED, callback);
    }

    public onPaymentFailed(callback: (error: string) => void): void {
        this.on(SOCKET_EVENTS.PAYMENT_FAILED, callback);
    }

    private setupEventHandlers(): void {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.connected = true;
            this.emit('connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.connected = false;
            this.emit('disconnected');
        });

        this.socket.on('connect_error', (error: any) => {
            console.error('Connection error:', error);
            this.emit('connect_error', error);
        });

        // Game event handlers
        this.socket.on(SOCKET_EVENTS.GAME_STATE, (data: any) => {
            this.emit(SOCKET_EVENTS.GAME_STATE, data);
        });

        this.socket.on(SOCKET_EVENTS.LEADERBOARD_UPDATE, (data: any) => {
            this.emit(SOCKET_EVENTS.LEADERBOARD_UPDATE, data);
        });

        this.socket.on(SOCKET_EVENTS.PLAYER_JOINED, (data: any) => {
            this.emit(SOCKET_EVENTS.PLAYER_JOINED, data);
        });

        this.socket.on(SOCKET_EVENTS.PLAYER_LEFT, (data: any) => {
            this.emit(SOCKET_EVENTS.PLAYER_LEFT, data);
        });

        this.socket.on(SOCKET_EVENTS.SNAKE_DIED, (data: any) => {
            this.emit(SOCKET_EVENTS.SNAKE_DIED, data);
        });

        this.socket.on(SOCKET_EVENTS.FOOD_EATEN, (data: any) => {
            this.emit(SOCKET_EVENTS.FOOD_EATEN, data);
        });

        // Payment event handlers
        this.socket.on(SOCKET_EVENTS.PAYMENT_VERIFIED, () => {
            this.emit(SOCKET_EVENTS.PAYMENT_VERIFIED);
        });

        this.socket.on(SOCKET_EVENTS.PAYMENT_FAILED, (error: string) => {
            this.emit(SOCKET_EVENTS.PAYMENT_FAILED, error);
        });
    }

    private emit(event: string, ...args: any[]): void {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(...args));
        }
    }
}

// Create a singleton instance
export const socketManager = new SocketManager();
