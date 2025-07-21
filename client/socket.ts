import { SOCKET_EVENTS } from '../common/constants.js';

// Use the global io object loaded from the script tag
declare global {
    interface Window {
        io: any;
    }
}

// Get io from the global window object
const io = window.io;

export class SocketManager {
    private socket: any;
    private connected: boolean = false;
    private eventHandlers: Map<string, Function[]> = new Map();

    constructor() {
        this.socket = io({
            autoConnect: false,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            transports: ["websocket"]
        });

        this.setupEventHandlers();
    }

    private setupEventHandlers(): void {
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
            this.emit('game_state', data);
        });

        this.socket.on(SOCKET_EVENTS.LEADERBOARD_UPDATE, (data: any) => {
            this.emit('leaderboard_update', data);
        });

        this.socket.on(SOCKET_EVENTS.PLAYER_JOINED, (data: any) => {
            this.emit('player_joined', data);
        });

        this.socket.on(SOCKET_EVENTS.PLAYER_LEFT, (data: any) => {
            this.emit('player_left', data);
        });

        this.socket.on(SOCKET_EVENTS.SNAKE_DIED, (data: any) => {
            this.emit('snake_died', data);
        });

        this.socket.on(SOCKET_EVENTS.FOOD_EATEN, (data: any) => {
            this.emit('food_eaten', data);
        });

        // Payment event handlers
        this.socket.on(SOCKET_EVENTS.PAYMENT_VERIFIED, (data: any) => {
            console.log('Payment verified by server');
            this.emit('payment_verified', data);
        });

        this.socket.on(SOCKET_EVENTS.PAYMENT_FAILED, (data: any) => {
            console.log('Payment verification failed:', data);
            this.emit('payment_failed', data);
        });
    }

    connect(): void {
        if (!this.connected) {
            this.socket.connect();
        }
    }

    disconnect(): void {
        if (this.connected) {
            this.socket.disconnect();
        }
    }

    joinGame(nickname: string): void {
        this.socket.emit(SOCKET_EVENTS.JOIN_GAME, { nickname });
    }

    joinPaidGame(serverId: string, walletAddress: string): void {
        console.log(`Joining paid game: ${serverId} with wallet: ${walletAddress}`);
        this.socket.emit(SOCKET_EVENTS.JOIN_PAID_GAME, { serverId, walletAddress });
    }

    sendPlayerMove(angle: number, isBoosting: boolean = false): void {
        this.socket.emit(SOCKET_EVENTS.PLAYER_MOVE, { 
            angle, 
            isBoosting,
            timestamp: Date.now() 
        });
    }

    on(event: string, callback: Function): void {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event)!.push(callback);
    }

    off(event: string, callback?: Function): void {
        if (!this.eventHandlers.has(event)) return;
        
        const handlers = this.eventHandlers.get(event)!;
        if (callback) {
            const index = handlers.indexOf(callback);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        } else {
            this.eventHandlers.set(event, []);
        }
    }

    private emit(event: string, data?: any): void {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }

    isConnected(): boolean {
        return this.connected;
    }

    getSocket(): any {
        return this.socket;
    }
} 