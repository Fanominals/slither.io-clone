import { SocketManager } from './socket.js';
import { Camera } from './game/Camera.js';
import { Input } from './game/Input.js';
import { Renderer } from './game/Renderer.js';
import { ClientSnake } from './game/Snake.js';
import { ClientFood } from './game/Food.js';
import { PlayerData, FoodData, GAME_CONFIG } from '../common/constants.js';
import { authService } from './auth/AuthService.js';
import { LoginModal } from './auth/LoginModal.js';
import { UsernameModal } from './auth/UsernameModal.js';

class Game {
    private canvas!: HTMLCanvasElement;
    private socketManager!: SocketManager;
    private camera!: Camera;
    private input!: Input;
    private renderer!: Renderer;
    
    // Game state
    private players: Map<string, ClientSnake> = new Map();
    private leaderboardPlayers: Map<string, PlayerData> = new Map(); // All players for leaderboard
    private food: Map<string, ClientFood> = new Map();
    private localPlayerId: string | null = null;
    private gameRunning: boolean = false;
    private lastUpdateTime: number = 0;
    
    // Death screen data
    private finalLengthValue: number = 0;
    private startTime: number = 0;
    private endTime: number = 0;
    private eliminations: number = 0;
    
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
    private lengthText!: HTMLElement;
    private connectionStatus!: HTMLElement;
    private finalLength!: HTMLElement;
    private leaderboardList!: HTMLElement;
    private fpsCounter!: HTMLElement;
    private frameTimes: number[] = [];
    private lastFpsUpdate: number = 0;
    private fps: number = 0;
    
    // Authentication UI elements
    private authContainer!: HTMLElement;
    private userInfo!: HTMLElement;
    private userAvatar!: HTMLImageElement;
    private userName!: HTMLElement;
    private signInButton!: HTMLButtonElement;
    private signOutButton!: HTMLButtonElement;
    private loginModal!: LoginModal;
    private usernameModal!: UsernameModal;
    
    // New UI elements
    private loginPrompt!: HTMLElement;
    private savedIndicator!: HTMLElement;
    private playButtonText!: HTMLElement;
    private bettingOptions!: HTMLElement;
    private selectedBetAmount: number = 1;
    
    // Game state
    private currentNickname: string = '';
    private connected: boolean = false;
    private lastMoveTime: number = 0;
    private moveThrottle: number = 1000 / 120; // Increased from 60 to 120 FPS for more responsive input

    constructor() {
        this.initializeDOM();
        this.initializeCanvas();
        this.initializeComponents();
        this.setupEventListeners();
        this.setupNetworking();
        this.updateAuthUI(); // Initialize auth UI
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
        this.lengthText = document.getElementById('lengthText')!;
        this.connectionStatus = document.getElementById('connectionStatus')!;
        this.finalLength = document.getElementById('finalLength')!;
        this.leaderboardList = document.getElementById('leaderboardList')!;
        this.fpsCounter = document.getElementById('fpsCounter')!;
        
        // Authentication UI elements
        this.authContainer = document.getElementById('authContainer')!;
        this.userInfo = document.getElementById('userInfo')!;
        this.userAvatar = document.getElementById('userAvatar') as HTMLImageElement;
        this.userName = document.getElementById('userName')!;
        this.signInButton = document.getElementById('signInButton') as HTMLButtonElement;
        this.signOutButton = document.getElementById('signOutButton') as HTMLButtonElement;
        
        // New UI elements
        this.loginPrompt = document.getElementById('loginPrompt')!;
        this.savedIndicator = document.getElementById('savedIndicator')!;
        this.playButtonText = document.getElementById('playButtonText')!;
        this.bettingOptions = document.getElementById('bettingOptions')!;
        
        // Initialize modals
        this.loginModal = new LoginModal();
        this.usernameModal = new UsernameModal();
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
        // Play button - now requires authentication and username
        this.playButton.addEventListener('click', () => {
            if (!authService.isAuthenticated()) {
                this.loginModal.show(() => {
                    this.updateAuthUI();
                });
            } else if (!authService.hasUsernameSet()) {
                this.usernameModal.show((username) => {
                    this.updateAuthUI();
                });
            } else {
                this.startGame();
            }
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

        // Authentication event listeners
        this.signInButton.addEventListener('click', () => {
            this.loginModal.show(() => {
                this.updateAuthUI();
            });
        });

        this.signOutButton.addEventListener('click', async () => {
            try {
                await authService.signOut();
                this.updateAuthUI();
            } catch (error) {
                console.error('Sign out failed:', error);
            }
        });

        // Betting options event listeners
        this.bettingOptions.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('bet-button')) {
                // Remove selected class from all buttons
                this.bettingOptions.querySelectorAll('.bet-button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                // Add selected class to clicked button
                target.classList.add('selected');
                // Update selected bet amount
                this.selectedBetAmount = parseInt(target.getAttribute('data-amount') || '1');
            }
        });

        // Login prompt click
        this.loginPrompt.addEventListener('click', () => {
            if (!authService.isAuthenticated()) {
                this.loginModal.show(() => {
                    this.updateAuthUI();
                });
            } else if (!authService.hasUsernameSet()) {
                this.usernameModal.show((username) => {
                    this.updateAuthUI();
                });
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
            this.hideLoadingScreen();
            
            // If we're in the process of starting a game, show the game screen
            if (this.currentNickname) {
                this.socketManager.joinGame(this.currentNickname);
                this.showGameScreen();
                this.gameRunning = true;
            }
        });

        // Setup authentication state listener
        authService.onAuthStateChanged((user) => {
            this.updateAuthUI();
        });

        this.socketManager.on('disconnected', () => {
            this.connected = false;
            this.showErrorScreen('Connection lost');
        });

        this.socketManager.on('connect_error', (error: any) => {
            this.connected = false;
            this.showErrorScreen(`Connection failed: ${error.message || 'Unknown error'}`);
        });

        this.socketManager.on('game_state', (state: any) => {
            this.handleGameState(state);
        });

        this.socketManager.on('leaderboard_update', (data: any) => {
            this.handleLeaderboardUpdate(data);
        });

        this.socketManager.on('player_joined', (data: any) => {
            this.handlePlayerJoined(data);
        });

        this.socketManager.on('player_left', (data: any) => {
            this.handlePlayerLeft(data);
        });

        this.socketManager.on('snake_died', (data: any) => {
            // If local player killed someone, increment eliminations
            if (data.killer === this.localPlayerId && data.playerId !== this.localPlayerId) {
                this.eliminations++;
            }
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
        
        // Reset stats for new game
        this.startTime = Date.now();
        this.eliminations = 0;
        // The game screen will be shown when connection is established
        // See setupNetworking() 'connected' event handler
    }

    private respawnPlayer(): void {
        if (this.connected) {
            this.hideDeathScreen();
            this.hideLoadingScreen(); // Make sure loading screen is hidden
            this.socketManager.joinGame(this.currentNickname);
            this.gameRunning = true;
            this.startTime = Date.now(); // Reset time alive for new round
            this.eliminations = 0; // Reset eliminations for new round
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
            if (!this.lastUpdateTime) this.lastUpdateTime = currentTime;
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

    private update(deltaTime: number): void {
        // Update camera
        const localPlayer = this.getLocalPlayer();
        if (localPlayer) {
            const headPos = localPlayer.getHeadPosition();
            
            // If this is the first time we have a local player, snap camera to position
            if (this.camera.x === 0 && this.camera.y === 0) {
                this.camera.snapToTarget(headPos, localPlayer.getCurrentLength());
            } else {
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
        // Draw minimap (all players, local player highlighted)
        this.renderer.drawMinimap(this.players, this.localPlayerId);
    }

    private handleInput(): void {
        if (!this.input.isMouseOver()) return;
        
        const localPlayer = this.getLocalPlayer();
        if (!localPlayer || !localPlayer.alive) return;

        const currentTime = Date.now();
        if (currentTime - this.lastMoveTime < this.moveThrottle) return;

        const mousePos = this.input.getMousePosition();
        const playerHeadPos = localPlayer.getHeadPosition();
        
        // Convert mouse position to world coordinates
        const mouseWorldPos = this.camera.screenToWorld(mousePos);
        
        // Calculate distance from mouse to player head in world coordinates
        const dx = mouseWorldPos.x - playerHeadPos.x;
        const dy = mouseWorldPos.y - playerHeadPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate dynamic deadzone based on snake thickness (minimum 30, maximum 100)
        const dynamicDeadzone = Math.max(30, Math.min(100, localPlayer.thickness * 1.5));
        
        // Check deadzone - don't send movement if mouse is too close
        if (distance < dynamicDeadzone) {
            return;
        }
        
        const angle = Math.atan2(dy, dx);
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

    private handleLeaderboardUpdate(data: any): void {
        // Update the leaderboard players map with all players
        this.leaderboardPlayers.clear();
        for (const [id, playerData] of Object.entries(data.players)) {
            this.leaderboardPlayers.set(id, playerData as PlayerData);
        }
        this.updateLeaderboard();
    }

    private handlePlayerJoined(data: any): void {
        console.log(`Player ${data.nickname} joined`);
    }

    private handlePlayerLeft(data: any): void {
        this.players.delete(data.id);
        this.leaderboardPlayers.delete(data.id);
        console.log(`Player left: ${data.id}`);
    }

    private handleSnakeDied(data: any): void {
        if (data.playerId === this.localPlayerId) {
            // Use the final length from the death event data (already rounded from server)
            this.finalLengthValue = data.finalLength || 0;
            this.endTime = Date.now();
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
            this.lengthText.textContent = `Length: ${localPlayer.getCurrentLength()}`;
        }
    }

    private forceUsernameRefresh(newUsername: string): void {
        console.log('Force refreshing username to:', newUsername);
        
        // Update the login text immediately
        const loginText = this.loginPrompt.querySelector('.login-text') as HTMLElement;
        if (loginText) {
            loginText.textContent = `Playing as: ${newUsername}`;
            console.log('Updated login text to:', loginText.textContent);
        } else {
            console.error('Could not find login text element');
        }
        
        // Update the nickname input for the game
        if (this.nicknameInput) {
            this.nicknameInput.value = newUsername;
            console.log('Updated nickname input to:', this.nicknameInput.value);
        } else {
            console.error('Could not find nickname input element');
        }
        
        // Force update the cached profile in AuthService
        authService.updateCachedUsername(newUsername);
        
        console.log('Username display force updated successfully');
    }

    private setupUsernameClickHandler(): void {
        const loginText = this.loginPrompt.querySelector('.login-text') as HTMLElement;
        
        // Remove any existing click handlers by removing and re-adding the class
        loginText.onclick = null;
        
        // Add new click handler
        loginText.onclick = () => {
            this.usernameModal.show((username) => {
                console.log('Username callback called with:', username);
                
                // Immediately update the display with the new username
                this.forceUsernameRefresh(username);
                
                console.log('Username display forcefully updated to:', username);
            });
        };
    }

    private updateAuthUI(): void {
        const user = authService.getCurrentUser();
        const userProfile = authService.getUserProfile();

        if (user && userProfile) {
            // User is signed in
            this.signInButton.classList.add('hidden');
            this.signOutButton.classList.remove('hidden');
            this.userInfo.classList.remove('hidden');

            // Update user info
            this.userName.textContent = userProfile.displayName || user.email || 'User';
            this.userAvatar.src = userProfile.photoURL || '';
            this.userAvatar.alt = userProfile.displayName || 'User Avatar';

            if (authService.hasUsernameSet()) {
                // User has username set - ready to play
                this.savedIndicator.classList.remove('hidden');
                this.playButton.classList.remove('disabled');
                this.playButtonText.textContent = 'Play';
                this.playButton.querySelector('.play-icon')!.textContent = '🎮';
                
                // Update login prompt text and make it clickable
                const loginText = this.loginPrompt.querySelector('.login-text') as HTMLElement;
                loginText.textContent = `Playing as: ${userProfile.username}`;
                loginText.classList.add('clickable-username');
                
                // Only setup click handler if it's not already set up
                if (!loginText.onclick) {
                    this.setupUsernameClickHandler();
                }

                // Pre-fill nickname with username for game
                if (userProfile.username) {
                    this.nicknameInput.value = userProfile.username;
                }
            } else {
                // User signed in but needs to set username
                this.savedIndicator.classList.add('hidden');
                this.playButton.classList.add('disabled');
                this.playButtonText.textContent = 'Set Username to Play';
                this.playButton.querySelector('.play-icon')!.textContent = '📝';
                
                // Update login prompt text
                const loginText = this.loginPrompt.querySelector('.login-text') as HTMLElement;
                loginText.textContent = 'Set your username to play';
                loginText.classList.remove('clickable-username');
            }
        } else {
            // User is signed out
            this.signInButton.classList.remove('hidden');
            this.signOutButton.classList.add('hidden');
            this.userInfo.classList.add('hidden');

            // Update new UI elements for signed-out state
            this.savedIndicator.classList.add('hidden');
            this.playButton.classList.add('disabled');
            this.playButtonText.textContent = 'Login to Play';
            this.playButton.querySelector('.play-icon')!.textContent = '🔒';
            
            // Reset login prompt text
            const loginText = this.loginPrompt.querySelector('.login-text') as HTMLElement;
            loginText.textContent = 'Login to set your name';
            loginText.classList.remove('clickable-username');
        }
    }

    private updateLeaderboard(): void {
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
        // Time survived
        const timeSurvived = Math.max(0, Math.floor((this.endTime - this.startTime) / 1000));
        const minutes = Math.floor(timeSurvived / 60);
        const seconds = timeSurvived % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        (document.getElementById('finalTime') as HTMLElement).textContent = timeString;
        // Eliminations
        (document.getElementById('finalEliminations') as HTMLElement).textContent = this.eliminations.toString();
        // Length (already rounded in handleSnakeDied)
        (document.getElementById('finalLength') as HTMLElement).textContent = this.finalLengthValue.toString();
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

    private updateFps(currentTime: number): void {
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