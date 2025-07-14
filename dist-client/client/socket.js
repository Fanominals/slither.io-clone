import { SOCKET_EVENTS } from '../common/constants.js';
// Get io from the global window object
const io = window.io;
export class SocketManager {
    constructor() {
        this.connected = false;
        this.eventHandlers = new Map();
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
    setupEventHandlers() {
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
        this.socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            this.emit('connect_error', error);
        });
        // Game event handlers
        this.socket.on(SOCKET_EVENTS.GAME_STATE, (data) => {
            this.emit('game_state', data);
        });
        this.socket.on(SOCKET_EVENTS.PLAYER_JOINED, (data) => {
            this.emit('player_joined', data);
        });
        this.socket.on(SOCKET_EVENTS.PLAYER_LEFT, (data) => {
            this.emit('player_left', data);
        });
        this.socket.on(SOCKET_EVENTS.SNAKE_DIED, (data) => {
            this.emit('snake_died', data);
        });
        this.socket.on(SOCKET_EVENTS.FOOD_EATEN, (data) => {
            this.emit('food_eaten', data);
        });
    }
    connect() {
        if (!this.connected) {
            this.socket.connect();
        }
    }
    disconnect() {
        if (this.connected) {
            this.socket.disconnect();
        }
    }
    joinGame(nickname) {
        this.socket.emit(SOCKET_EVENTS.JOIN_GAME, { nickname });
    }
    sendPlayerMove(angle, isBoosting = false) {
        this.socket.emit(SOCKET_EVENTS.PLAYER_MOVE, {
            angle,
            isBoosting,
            timestamp: Date.now()
        });
    }
    on(event, callback) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(callback);
    }
    off(event, callback) {
        if (!this.eventHandlers.has(event))
            return;
        const handlers = this.eventHandlers.get(event);
        if (callback) {
            const index = handlers.indexOf(callback);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
        else {
            this.eventHandlers.set(event, []);
        }
    }
    emit(event, data) {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }
    isConnected() {
        return this.connected;
    }
    getSocket() {
        return this.socket;
    }
}
//# sourceMappingURL=socket.js.map