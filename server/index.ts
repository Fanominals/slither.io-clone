import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { GameState } from './game/GameState';
import { GAME_CONFIG, SOCKET_EVENTS } from '../common/constants';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, '../dist/client')));
app.use('/common', express.static(path.join(__dirname, '../dist/common')));

// Game state instance
const gameState = new GameState();

// Socket.IO connection handling
io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // Handle player joining the game
    socket.on(SOCKET_EVENTS.JOIN_GAME, (data: { nickname: string }) => {
        try {
            const player = gameState.addPlayer(socket.id, data.nickname);
            console.log(`Player ${data.nickname} joined the game`);
            
            // Send full game state to new player
            socket.emit(SOCKET_EVENTS.GAME_STATE, gameState.getSerializableState());
            
            // Notify other players
            socket.broadcast.emit(SOCKET_EVENTS.PLAYER_JOINED, {
                id: socket.id,
                nickname: data.nickname,
                player: player
            });
        } catch (error) {
            console.error('Error joining game:', error);
        }
    });

    // Handle player movement
    socket.on(SOCKET_EVENTS.PLAYER_MOVE, (data: { angle: number, isBoosting: boolean, timestamp: number }) => {
        try {
            gameState.updatePlayerDirection(socket.id, data.angle, data.isBoosting);
        } catch (error) {
            console.error('Error updating player direction:', error);
        }
    });

    // Handle disconnection
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log(`Player disconnected: ${socket.id}`);
        
        try {
            gameState.removePlayer(socket.id);
            
            // Notify other players
            socket.broadcast.emit(SOCKET_EVENTS.PLAYER_LEFT, {
                id: socket.id
            });
        } catch (error) {
            console.error('Error removing player:', error);
        }
    });
});

// Game loop - runs at configured tick rate
setInterval(() => {
    try {
        gameState.update(1 / GAME_CONFIG.TICK_RATE);
        
        // Send game state to all players
        const state = gameState.getSerializableState();
        io.emit(SOCKET_EVENTS.GAME_STATE, state);
        
        // Handle any events that occurred during update
        const events = gameState.getEvents();
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
        
        gameState.clearEvents();
    } catch (error) {
        console.error('Error in game loop:', error);
    }
}, 1000 / GAME_CONFIG.TICK_RATE);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Game world: ${GAME_CONFIG.WORLD_WIDTH}x${GAME_CONFIG.WORLD_HEIGHT}`);
    console.log(`Tick rate: ${GAME_CONFIG.TICK_RATE} FPS`);
}); 