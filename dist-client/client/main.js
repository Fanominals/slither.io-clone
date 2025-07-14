import { SocketManager } from './socket.js';
import { Camera } from './game/Camera.js';
import { Input } from './game/Input.js';
import { Renderer } from './game/Renderer.js';
import { ClientSnake } from './game/Snake.js';
import { ClientFood } from './game/Food.js';
class Game {
    constructor() {
        // Game state
        this.players = new Map();
        this.leaderboardPlayers = new Map(); // All players for leaderboard
        this.food = new Map();
        this.localPlayerId = null;
        this.gameRunning = false;
        this.lastUpdateTime = 0;
        // Death screen data
        this.finalScoreValue = 0;
        this.finalLengthValue = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.eliminations = 0;
        this.frameTimes = [];
        this.lastFpsUpdate = 0;
        this.fps = 0;
        // Game state
        this.currentNickname = '';
        this.connected = false;
        this.lastMoveTime = 0;
        this.moveThrottle = 1000 / 120; // Increased from 60 to 120 FPS for more responsive input
        this.initializeDOM();
        this.initializeCanvas();
        this.initializeComponents();
        this.setupEventListeners();
        this.setupNetworking();
        this.startGameLoop();
    }
    initializeDOM() {
        this.menuScreen = document.getElementById('menu');
        this.gameScreen = document.getElementById('game');
        this.deathScreen = document.getElementById('deathScreen');
        this.loadingScreen = document.getElementById('loadingScreen');
        this.errorScreen = document.getElementById('errorScreen');
        this.nicknameInput = document.getElementById('nickname');
        this.playButton = document.getElementById('playButton');
        this.respawnButton = document.getElementById('respawnButton');
        this.retryButton = document.getElementById('retryButton');
        this.scoreText = document.getElementById('scoreText');
        this.lengthText = document.getElementById('lengthText');
        this.connectionStatus = document.getElementById('connectionStatus');
        this.finalScore = document.getElementById('finalScore');
        this.finalLength = document.getElementById('finalLength');
        this.leaderboardList = document.getElementById('leaderboardList');
        this.fpsCounter = document.getElementById('fpsCounter');
    }
    initializeCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.renderer) {
            this.renderer.resize(this.canvas.width, this.canvas.height);
        }
    }
    initializeComponents() {
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.input = new Input(this.canvas);
        this.renderer = new Renderer(this.canvas, this.camera);
        this.socketManager = new SocketManager();
    }
    setupEventListeners() {
        // Play button
        this.playButton.addEventListener('click', () => {
            this.startGame();
        });
        // Respawn button
        this.respawnButton.addEventListener('click', () => {
            this.respawnPlayer();
        });
        // Retry button
        this.retryButton.addEventListener('click', () => {
            this.retryConnection();
        });
        // Enter key on nickname input
        this.nicknameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.startGame();
            }
        });
        // Prevent context menu on canvas
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    setupNetworking() {
        this.socketManager.on('connected', () => {
            this.connected = true;
            this.hideLoadingScreen();
            // If we're in the process of starting a game, show the game screen
            if (this.currentNickname) {
                this.socketManager.joinGame(this.currentNickname);
                this.showGameScreen();
                this.gameRunning = true;
            }
        });
        this.socketManager.on('disconnected', () => {
            this.connected = false;
            this.showErrorScreen('Connection lost');
        });
        this.socketManager.on('connect_error', (error) => {
            this.connected = false;
            this.showErrorScreen(`Connection failed: ${error.message || 'Unknown error'}`);
        });
        this.socketManager.on('game_state', (state) => {
            this.handleGameState(state);
        });
        this.socketManager.on('leaderboard_update', (data) => {
            this.handleLeaderboardUpdate(data);
        });
        this.socketManager.on('player_joined', (data) => {
            this.handlePlayerJoined(data);
        });
        this.socketManager.on('player_left', (data) => {
            this.handlePlayerLeft(data);
        });
        this.socketManager.on('snake_died', (data) => {
            // If local player killed someone, increment eliminations
            if (data.killer === this.localPlayerId && data.playerId !== this.localPlayerId) {
                this.eliminations++;
            }
            this.handleSnakeDied(data);
        });
        this.socketManager.on('food_eaten', (data) => {
            this.handleFoodEaten(data);
        });
    }
    startGame() {
        const nickname = this.nicknameInput.value.trim();
        if (!nickname) {
            this.nicknameInput.focus();
            return;
        }
        this.currentNickname = nickname;
        this.showLoadingScreen();
        this.socketManager.connect();
        // Reset stats for new game
        this.startTime = Date.now();
        this.eliminations = 0;
        // The game screen will be shown when connection is established
        // See setupNetworking() 'connected' event handler
    }
    respawnPlayer() {
        if (this.connected) {
            this.hideDeathScreen();
            this.hideLoadingScreen(); // Make sure loading screen is hidden
            this.socketManager.joinGame(this.currentNickname);
            this.gameRunning = true;
        }
        else {
            // If not connected, try to reconnect
            this.showLoadingScreen();
            this.socketManager.connect();
        }
    }
    retryConnection() {
        this.showLoadingScreen();
        this.socketManager.disconnect();
        setTimeout(() => {
            this.socketManager.connect();
        }, 1000);
    }
    startGameLoop() {
        const gameLoop = (currentTime) => {
            if (!this.lastUpdateTime)
                this.lastUpdateTime = currentTime;
            let deltaTime = (currentTime - this.lastUpdateTime) / 1000;
            // Clamp delta time to prevent large jumps that cause jitter
            deltaTime = Math.min(deltaTime, 1 / 30); // Max 30 FPS equivalent
            this.lastUpdateTime = currentTime;
            if (this.gameRunning) {
                this.handleInput();
                this.update(deltaTime);
                this.render();
            }
            this.updateFps(currentTime);
            requestAnimationFrame(gameLoop);
        };
        requestAnimationFrame(gameLoop);
    }
    update(deltaTime) {
        // Update camera
        const localPlayer = this.getLocalPlayer();
        if (localPlayer) {
            const headPos = localPlayer.getHeadPosition();
            // If this is the first time we have a local player, snap camera to position
            if (this.camera.x === 0 && this.camera.y === 0) {
                this.camera.snapToTarget(headPos, localPlayer.getCurrentLength());
            }
            else {
                this.camera.followTarget(headPos, localPlayer.getCurrentLength());
            }
        }
        this.camera.update(deltaTime);
        // Update players
        for (const player of this.players.values()) {
            player.updateInterpolation(deltaTime);
        }
        // Update food
        for (const foodItem of this.food.values()) {
            foodItem.update(deltaTime);
        }
        // Update UI
        this.updateUI();
    }
    render() {
        this.renderer.clear();
        // Draw grid background
        this.renderer.drawGrid();
        // Draw world boundaries
        this.renderer.drawWorldBoundaries();
        // Draw food (only visible ones for performance)
        const visibleFood = this.getVisibleFood();
        for (const foodItem of visibleFood) {
            this.renderer.drawFood(foodItem);
        }
        // Draw snakes (only visible ones for performance)
        const visibleSnakes = this.getVisibleSnakes();
        for (const snake of visibleSnakes) {
            this.renderer.drawSnake(snake);
        }
        // Draw UI
        this.renderer.drawUI(this.getLocalPlayer());
    }
    handleInput() {
        if (!this.input.isMouseOver())
            return;
        const localPlayer = this.getLocalPlayer();
        if (!localPlayer || !localPlayer.alive)
            return;
        const currentTime = Date.now();
        if (currentTime - this.lastMoveTime < this.moveThrottle)
            return;
        const mousePos = this.input.getMousePosition();
        const playerScreenPos = this.camera.worldToScreen(localPlayer.getHeadPosition());
        const angle = Math.atan2(mousePos.y - playerScreenPos.y, mousePos.x - playerScreenPos.x);
        const isBoosting = this.input.isBoosting();
        this.socketManager.sendPlayerMove(angle, isBoosting);
        this.lastMoveTime = currentTime;
    }
    handleGameState(state) {
        // Update players
        for (const [id, playerData] of Object.entries(state.players)) {
            const typedPlayerData = playerData;
            if (this.players.has(id)) {
                this.players.get(id).updateFromServer(typedPlayerData);
            }
            else {
                const isLocal = id === this.localPlayerId;
                this.players.set(id, new ClientSnake(typedPlayerData, isLocal));
            }
        }
        // Remove disconnected players
        for (const playerId of this.players.keys()) {
            if (!state.players[playerId]) {
                this.players.delete(playerId);
            }
        }
        // Update food
        for (const [id, foodData] of Object.entries(state.food)) {
            const typedFoodData = foodData;
            if (this.food.has(id)) {
                this.food.get(id).updateFromServer(typedFoodData);
            }
            else {
                this.food.set(id, new ClientFood(typedFoodData));
            }
        }
        // Remove consumed food
        for (const foodId of this.food.keys()) {
            if (!state.food[foodId]) {
                this.food.delete(foodId);
            }
        }
        // Set local player ID if not set
        if (!this.localPlayerId && state.players) {
            for (const [id, playerData] of Object.entries(state.players)) {
                const typedPlayerData = playerData;
                if (typedPlayerData.nickname === this.currentNickname) {
                    this.localPlayerId = id;
                    break;
                }
            }
        }
        this.updateLeaderboard();
    }
    handleLeaderboardUpdate(data) {
        // Update the leaderboard players map with all players
        this.leaderboardPlayers.clear();
        for (const [id, playerData] of Object.entries(data.players)) {
            this.leaderboardPlayers.set(id, playerData);
        }
        this.updateLeaderboard();
    }
    handlePlayerJoined(data) {
        console.log(`Player ${data.nickname} joined`);
    }
    handlePlayerLeft(data) {
        this.players.delete(data.id);
        this.leaderboardPlayers.delete(data.id);
        console.log(`Player left: ${data.id}`);
    }
    handleSnakeDied(data) {
        if (data.playerId === this.localPlayerId) {
            // Use the final score and length from the death event data
            this.finalScoreValue = data.finalScore || 0;
            this.finalLengthValue = data.finalLength || 0;
            this.endTime = Date.now();
            this.showDeathScreen();
            this.gameRunning = false;
        }
    }
    handleFoodEaten(data) {
        this.food.delete(data.foodId);
    }
    getLocalPlayer() {
        return this.localPlayerId ? this.players.get(this.localPlayerId) || null : null;
    }
    getVisibleSnakes() {
        const visibleSnakes = [];
        const bounds = this.camera.getVisibleBounds();
        for (const snake of this.players.values()) {
            if (snake.alive && snake.isVisible(this.camera.x, this.camera.y, this.camera.zoom, this.canvas.width, this.canvas.height)) {
                visibleSnakes.push(snake);
            }
        }
        return visibleSnakes;
    }
    getVisibleFood() {
        const visibleFood = [];
        for (const food of this.food.values()) {
            if (food.isVisible(this.camera.x, this.camera.y, this.camera.zoom, this.canvas.width, this.canvas.height)) {
                visibleFood.push(food);
            }
        }
        return visibleFood;
    }
    updateUI() {
        const localPlayer = this.getLocalPlayer();
        if (localPlayer) {
            this.scoreText.textContent = `Score: ${localPlayer.score}`;
            this.lengthText.textContent = `Length: ${localPlayer.getCurrentLength()}`;
        }
    }
    updateLeaderboard() {
        // Use leaderboard players data (all players) instead of visible players
        const playersArr = Array.from(this.leaderboardPlayers.values()).filter(player => player.alive);
        // Sort by length descending
        playersArr.sort((a, b) => b.length - a.length);
        // Take top 5
        const topPlayers = playersArr.slice(0, 5);
        // Get local player id
        const localId = this.localPlayerId;
        // Medal emojis
        const medals = ['🥇', '🥈', '🥉'];
        // Clear leaderboard
        this.leaderboardList.innerHTML = '';
        // Render each player
        topPlayers.forEach((player, i) => {
            const li = document.createElement('li');
            // Medal or rank
            let medalSpan = '';
            let rankClass = '';
            if (i < 3) {
                medalSpan = `<span class="medal">${medals[i]}</span>`;
                rankClass = ['gold', 'silver', 'bronze'][i];
            }
            else {
                medalSpan = `<span class="rank">${i + 1}</span>`;
            }
            // Highlight user
            if (player.id === localId)
                li.classList.add('user');
            if (rankClass)
                li.classList.add(rankClass);
            li.innerHTML = `${medalSpan}<span class="nickname">${player.nickname}</span><span class="length">${player.length}</span>`;
            this.leaderboardList.appendChild(li);
        });
    }
    showMenuScreen() {
        this.menuScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.errorScreen.classList.add('hidden');
    }
    showGameScreen() {
        this.menuScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.errorScreen.classList.add('hidden');
        this.hideLoadingScreen();
        this.hideDeathScreen();
    }
    showDeathScreen() {
        // Time survived
        const timeSurvived = Math.max(0, Math.floor((this.endTime - this.startTime) / 1000));
        const minutes = Math.floor(timeSurvived / 60);
        const seconds = timeSurvived % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('finalTime').textContent = timeString;
        // Eliminations
        document.getElementById('finalEliminations').textContent = this.eliminations.toString();
        // Length
        document.getElementById('finalLength').textContent = this.finalLengthValue.toString();
        this.deathScreen.classList.remove('hidden');
        this.hideLoadingScreen(); // Ensure loading screen is hidden
    }
    hideDeathScreen() {
        this.deathScreen.classList.add('hidden');
    }
    showLoadingScreen() {
        this.loadingScreen.classList.remove('hidden');
    }
    hideLoadingScreen() {
        this.loadingScreen.classList.add('hidden');
    }
    showErrorScreen(message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = message;
        this.errorScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.hideLoadingScreen();
    }
    updateFps(currentTime) {
        this.frameTimes.push(currentTime);
        // Remove frames older than 1 second
        while (this.frameTimes.length > 0 && this.frameTimes[0] <= currentTime - 1000) {
            this.frameTimes.shift();
        }
        this.fps = this.frameTimes.length;
        // Update the FPS display every 200ms for stability
        if (currentTime - this.lastFpsUpdate > 200) {
            this.fpsCounter.textContent = `FPS: ${this.fps}`;
            this.lastFpsUpdate = currentTime;
        }
    }
}
// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
//# sourceMappingURL=main.js.map