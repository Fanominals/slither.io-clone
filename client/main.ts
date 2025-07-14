import { SocketManager } from './socket.js';
import { Camera } from './game/Camera.js';
import { Input } from './game/Input.js';
import { Renderer } from './game/Renderer.js';
import { ClientSnake } from './game/Snake.js';
import { ClientFood } from './game/Food.js';
import { PlayerData, FoodData, GAME_CONFIG } from './constants.js';

class Game {
    private canvas!: HTMLCanvasElement;
    private socketManager!: SocketManager;
    private camera!: Camera;
    private input!: Input;
    private renderer!: Renderer;
    
    // Game state
    private players: Map<string, ClientSnake> = new Map();
    private food: Map<string, ClientFood> = new Map();
    private localPlayerId: string | null = null;
    private gameRunning: boolean = false;
    private lastUpdateTime: number = 0;
    
    // UI elements
    private menuScreen!: HTMLElement;
    private gameScreen!: HTMLElement;
    private deathScreen!: HTMLElement;
    private loadingScreen!: HTMLElement;
    private errorScreen!: HTMLElement;
    private nicknameInput!: HTMLInputElement;
    private playButton!: HTMLButtonElement;
    private respawnButton!: HTMLButtonElement;
    private retryButton!: HTMLButtonElement;
    private scoreText!: HTMLElement;
    private lengthText!: HTMLElement;
    private connectionStatus!: HTMLElement;
    private finalScore!: HTMLElement;
    private finalLength!: HTMLElement;
    private leaderboardList!: HTMLElement;
    
    // Game state
    private currentNickname: string = '';
    private connected: boolean = false;
    private lastMoveTime: number = 0;
    private moveThrottle: number = 1000 / 60; // 60 FPS for movement updates

    constructor() {
        this.initializeDOM();
        this.initializeCanvas();
        this.initializeComponents();
        this.setupEventListeners();
        this.setupNetworking();
        this.startGameLoop();
    }

    private initializeDOM(): void {
        this.menuScreen = document.getElementById('menu')!;
        this.gameScreen = document.getElementById('game')!;
        this.deathScreen = document.getElementById('deathScreen')!;
        this.loadingScreen = document.getElementById('loadingScreen')!;
        this.errorScreen = document.getElementById('errorScreen')!;
        this.nicknameInput = document.getElementById('nickname') as HTMLInputElement;
        this.playButton = document.getElementById('playButton') as HTMLButtonElement;
        this.respawnButton = document.getElementById('respawnButton') as HTMLButtonElement;
        this.retryButton = document.getElementById('retryButton') as HTMLButtonElement;
        this.scoreText = document.getElementById('scoreText')!;
        this.lengthText = document.getElementById('lengthText')!;
        this.connectionStatus = document.getElementById('connectionStatus')!;
        this.finalScore = document.getElementById('finalScore')!;
        this.finalLength = document.getElementById('finalLength')!;
        this.leaderboardList = document.getElementById('leaderboardList')!;
    }

    private initializeCanvas(): void {
        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        if (this.renderer) {
            this.renderer.resize(this.canvas.width, this.canvas.height);
        }
    }

    private initializeComponents(): void {
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.input = new Input(this.canvas);
        this.renderer = new Renderer(this.canvas, this.camera);
        this.socketManager = new SocketManager();
    }

    private setupEventListeners(): void {
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

    private setupNetworking(): void {
        this.socketManager.on('connected', () => {
            this.connected = true;
            this.updateConnectionStatus(true);
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
            this.updateConnectionStatus(false);
            this.showErrorScreen('Connection lost');
        });

        this.socketManager.on('connect_error', (error: any) => {
            this.connected = false;
            this.updateConnectionStatus(false);
            this.showErrorScreen(`Connection failed: ${error.message || 'Unknown error'}`);
        });

        this.socketManager.on('game_state', (state: any) => {
            this.handleGameState(state);
        });

        this.socketManager.on('player_joined', (data: any) => {
            this.handlePlayerJoined(data);
        });

        this.socketManager.on('player_left', (data: any) => {
            this.handlePlayerLeft(data);
        });

        this.socketManager.on('snake_died', (data: any) => {
            this.handleSnakeDied(data);
        });

        this.socketManager.on('food_eaten', (data: any) => {
            this.handleFoodEaten(data);
        });
    }

    private startGame(): void {
        const nickname = this.nicknameInput.value.trim();
        if (!nickname) {
            this.nicknameInput.focus();
            return;
        }

        this.currentNickname = nickname;
        this.showLoadingScreen();
        this.socketManager.connect();
        
        // The game screen will be shown when connection is established
        // See setupNetworking() 'connected' event handler
    }

    private respawnPlayer(): void {
        if (this.connected) {
            this.hideDeathScreen();
            this.hideLoadingScreen(); // Make sure loading screen is hidden
            this.socketManager.joinGame(this.currentNickname);
            this.gameRunning = true;
        } else {
            // If not connected, try to reconnect
            this.showLoadingScreen();
            this.socketManager.connect();
        }
    }

    private retryConnection(): void {
        this.showLoadingScreen();
        this.socketManager.disconnect();
        setTimeout(() => {
            this.socketManager.connect();
        }, 1000);
    }

    private startGameLoop(): void {
        const gameLoop = (currentTime: number) => {
            const deltaTime = (currentTime - this.lastUpdateTime) / 1000;
            this.lastUpdateTime = currentTime;

            if (this.gameRunning) {
                this.update(deltaTime);
                this.render();
                this.handleInput();
            }

            requestAnimationFrame(gameLoop);
        };

        requestAnimationFrame(gameLoop);
    }

    private update(deltaTime: number): void {
        // Update camera
        const localPlayer = this.getLocalPlayer();
        if (localPlayer) {
            const headPos = localPlayer.getHeadPosition();
            this.camera.followTarget(headPos, localPlayer.getCurrentLength());
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

    private render(): void {
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

    private handleInput(): void {
        if (!this.input.isMouseOver()) return;
        
        const localPlayer = this.getLocalPlayer();
        if (!localPlayer || !localPlayer.alive) return;

        const currentTime = Date.now();
        if (currentTime - this.lastMoveTime < this.moveThrottle) return;

        const mousePos = this.input.getMousePosition();
        const playerScreenPos = this.camera.worldToScreen(localPlayer.getHeadPosition());
        
        const angle = Math.atan2(
            mousePos.y - playerScreenPos.y,
            mousePos.x - playerScreenPos.x
        );

        const isBoosting = this.input.isBoosting();
        this.socketManager.sendPlayerMove(angle, isBoosting);
        this.lastMoveTime = currentTime;
    }

    private handleGameState(state: any): void {
        // Update players
        for (const [id, playerData] of Object.entries(state.players)) {
            const typedPlayerData = playerData as PlayerData;
            
            if (this.players.has(id)) {
                this.players.get(id)!.updateFromServer(typedPlayerData);
            } else {
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
            const typedFoodData = foodData as FoodData;
            
            if (this.food.has(id)) {
                this.food.get(id)!.updateFromServer(typedFoodData);
            } else {
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
                const typedPlayerData = playerData as PlayerData;
                if (typedPlayerData.nickname === this.currentNickname) {
                    this.localPlayerId = id;
                    break;
                }
            }
        }
        this.updateLeaderboard();
    }

    private handlePlayerJoined(data: any): void {
        console.log(`Player ${data.nickname} joined`);
    }

    private handlePlayerLeft(data: any): void {
        this.players.delete(data.id);
        console.log(`Player left: ${data.id}`);
    }

    private handleSnakeDied(data: any): void {
        if (data.playerId === this.localPlayerId) {
            this.showDeathScreen();
            this.gameRunning = false;
        }
    }

    private handleFoodEaten(data: any): void {
        this.food.delete(data.foodId);
    }

    private getLocalPlayer(): ClientSnake | null {
        return this.localPlayerId ? this.players.get(this.localPlayerId) || null : null;
    }

    private getVisibleSnakes(): ClientSnake[] {
        const visibleSnakes: ClientSnake[] = [];
        const bounds = this.camera.getVisibleBounds();
        
        for (const snake of this.players.values()) {
            if (snake.alive && snake.isVisible(
                this.camera.x, this.camera.y, this.camera.zoom,
                this.canvas.width, this.canvas.height
            )) {
                visibleSnakes.push(snake);
            }
        }
        
        return visibleSnakes;
    }

    private getVisibleFood(): ClientFood[] {
        const visibleFood: ClientFood[] = [];
        
        for (const food of this.food.values()) {
            if (food.isVisible(
                this.camera.x, this.camera.y, this.camera.zoom,
                this.canvas.width, this.canvas.height
            )) {
                visibleFood.push(food);
            }
        }
        
        return visibleFood;
    }

    private updateUI(): void {
        const localPlayer = this.getLocalPlayer();
        if (localPlayer) {
            this.scoreText.textContent = `Score: ${localPlayer.score}`;
            this.lengthText.textContent = `Length: ${localPlayer.getCurrentLength()}`;
        }
    }

    private updateLeaderboard(): void {
        // Gather all players as array
        const playersArr = Array.from(this.players.values());
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
                rankClass = ['gold','silver','bronze'][i];
            } else {
                medalSpan = `<span class="rank">${i+1}</span>`;
            }
            // Highlight user
            if (player.id === localId) li.classList.add('user');
            if (rankClass) li.classList.add(rankClass);
            li.innerHTML = `${medalSpan}<span class="nickname">${player.nickname}</span><span class="length">${player.length}</span>`;
            this.leaderboardList.appendChild(li);
        });
    }

    private showMenuScreen(): void {
        this.menuScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.errorScreen.classList.add('hidden');
    }

    private showGameScreen(): void {
        this.menuScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.errorScreen.classList.add('hidden');
        this.hideLoadingScreen();
        this.hideDeathScreen();
    }

    private showDeathScreen(): void {
        const localPlayer = this.getLocalPlayer();
        if (localPlayer) {
            this.finalScore.textContent = localPlayer.score.toString();
            this.finalLength.textContent = localPlayer.getCurrentLength().toString();
        }
        this.deathScreen.classList.remove('hidden');
        this.hideLoadingScreen(); // Ensure loading screen is hidden
    }

    private hideDeathScreen(): void {
        this.deathScreen.classList.add('hidden');
    }

    private showLoadingScreen(): void {
        this.loadingScreen.classList.remove('hidden');
    }

    private hideLoadingScreen(): void {
        this.loadingScreen.classList.add('hidden');
    }

    private showErrorScreen(message: string): void {
        const errorMessage = document.getElementById('errorMessage')!;
        errorMessage.textContent = message;
        this.errorScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.hideLoadingScreen();
    }

    private updateConnectionStatus(connected: boolean): void {
        const statusIndicator = this.connectionStatus.querySelector('.status-indicator')!;
        const statusText = this.connectionStatus.querySelector('span')!;
        
        if (connected) {
            statusIndicator.classList.remove('disconnected');
            statusText.textContent = 'Connected';
        } else {
            statusIndicator.classList.add('disconnected');
            statusText.textContent = 'Disconnected';
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Game();
}); 