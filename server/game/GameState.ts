import { Snake } from './Snake';
import { Food } from './Food';
import { Collision } from './Collision';
import { 
    GAME_CONFIG, 
    PlayerData, 
    FoodData, 
    Vector2D,
    generateRandomColor,
    generateId
} from '../../common/constants';

export interface GameEvent {
    type: string;
    data: any;
}

export class GameState {
    private players: Map<string, Snake> = new Map();
    private food: Map<string, Food> = new Map();
    private events: GameEvent[] = [];
    private collision: Collision;

    constructor() {
        this.collision = new Collision();
        this.initializeFoodParticles();
    }

    // Initialize food particles across the game world
    private initializeFoodParticles(): void {
        for (let i = 0; i < GAME_CONFIG.FOOD_COUNT; i++) {
            this.spawnFoodParticle();
        }
    }

    // Spawn a single food particle at random location
    private spawnFoodParticle(): void {
        const food = new Food(
            generateId(),
            Math.random() * GAME_CONFIG.WORLD_WIDTH,
            Math.random() * GAME_CONFIG.WORLD_HEIGHT,
            generateRandomColor(),
            GAME_CONFIG.FOOD_SIZE,
            GAME_CONFIG.FOOD_MASS_MIN + Math.random() * (GAME_CONFIG.FOOD_MASS_MAX - GAME_CONFIG.FOOD_MASS_MIN)
        );
        this.food.set(food.id, food);
    }

    // Add a new player to the game
    addPlayer(id: string, nickname: string): PlayerData {
        // Find safe spawn position (not inside other snakes)
        let spawnPosition = this.findSafeSpawnPosition();
        
        const snake = new Snake(
            id,
            nickname,
            spawnPosition.x,
            spawnPosition.y,
            generateRandomColor(),
            GAME_CONFIG.INITIAL_SNAKE_LENGTH,
            GAME_CONFIG.INITIAL_SNAKE_THICKNESS
        );

        this.players.set(id, snake);
        return snake.getPlayerData();
    }

    // Remove a player from the game
    removePlayer(id: string): void {
        const snake = this.players.get(id);
        if (snake) {
            // Create food particles from dead snake
            this.createFoodFromSnake(snake);
            this.players.delete(id);
        }
    }

    // Find a safe spawn position
    private findSafeSpawnPosition(): Vector2D {
        let attempts = 0;
        let position: Vector2D;
        const margin = 150; // Keep snakes away from world boundaries and border
        
        do {
            position = {
                x: margin + Math.random() * (GAME_CONFIG.WORLD_WIDTH - 2 * margin),
                y: margin + Math.random() * (GAME_CONFIG.WORLD_HEIGHT - 2 * margin)
            };
            attempts++;
        } while (attempts < 20 && this.isPositionOccupied(position));
        
        return position;
    }

    // Check if a position is occupied by a snake
    private isPositionOccupied(position: Vector2D): boolean {
        for (const snake of this.players.values()) {
            if (snake.isPositionInside(position)) {
                return true;
            }
        }
        return false;
    }

    // Update player direction
    updatePlayerDirection(id: string, angle: number, isBoosting: boolean = false): void {
        const snake = this.players.get(id);
        if (snake && snake.alive) {
            snake.setDirection(angle);
            snake.setBoosting(isBoosting);
        }
    }

    // Create food particles from a dead snake
    private createFoodFromSnake(snake: Snake): void {
        const segments = snake.getSegments();
        const foodCount = Math.floor(segments.length * GAME_CONFIG.DEATH_FOOD_MULTIPLIER);
        
        for (let i = 0; i < foodCount; i++) {
            const segment = segments[Math.floor(Math.random() * segments.length)];
            const food = new Food(
                generateId(),
                segment.x + (Math.random() - 0.5) * 50,
                segment.y + (Math.random() - 0.5) * 50,
                generateRandomColor(),
                GAME_CONFIG.FOOD_SIZE + Math.random() * 4,
                GAME_CONFIG.FOOD_MASS_MIN + Math.random() * (GAME_CONFIG.FOOD_MASS_MAX - GAME_CONFIG.FOOD_MASS_MIN)
            );
            this.food.set(food.id, food);
        }
    }

    // Main update loop
    update(deltaTime: number): void {
        // Update all snakes
        for (const snake of this.players.values()) {
            if (snake.alive) {
                snake.update(deltaTime);
                
                // Check food collision and attraction
                this.checkFoodCollisions(snake);
                
                // Check snake-to-snake collisions
                this.checkSnakeCollisions(snake);
                
                // Check world boundaries
                this.checkWorldBoundaries(snake);
            }
        }
        
        // Maintain food count
        this.maintainFoodCount();
    }

    // Check food collisions and attraction
    private checkFoodCollisions(snake: Snake): void {
        const head = snake.getHead();
        const foodToRemove: string[] = [];
        
        for (const food of this.food.values()) {
            const distance = Math.sqrt(
                Math.pow(head.x - food.x, 2) + 
                Math.pow(head.y - food.y, 2)
            );
            
            // Food attraction - move food towards snake head within attraction radius
            if (distance <= GAME_CONFIG.FOOD_ATTRACTION_RADIUS && distance > GAME_CONFIG.FOOD_CONSUMPTION_DISTANCE) {
                const dx = head.x - food.x;
                const dy = head.y - food.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                
                if (length > 0) {
                    // Simple smooth movement towards snake head
                    const moveSpeed = 8; // pixels per update - smooth but visible
                    const moveX = (dx / length) * moveSpeed;
                    const moveY = (dy / length) * moveSpeed;
                    
                    food.x += moveX;
                    food.y += moveY;
                }
            }
            
            // Food consumption
            if (distance <= GAME_CONFIG.FOOD_CONSUMPTION_DISTANCE) {
                snake.grow(food.mass);
                foodToRemove.push(food.id);
                
                this.events.push({
                    type: 'food_eaten',
                    data: {
                        playerId: snake.id,
                        foodId: food.id,
                        mass: food.mass
                    }
                });
            }
        }
        
        // Remove consumed food
        foodToRemove.forEach(id => this.food.delete(id));
    }

    // Check snake-to-snake collisions
    private checkSnakeCollisions(snake: Snake): void {
        const head = snake.getHead();
        
        for (const otherSnake of this.players.values()) {
            if (otherSnake.id !== snake.id && otherSnake.alive) {
                // Check collision with other snake's body
                if (this.collision.checkSnakeCollision(head, otherSnake.getSegments())) {
                    // Capture final score and length before death
                    const finalScore = snake.score;
                    const finalLength = snake.length;
                    
                    snake.die();
                    this.createFoodFromSnake(snake);
                    
                    this.events.push({
                        type: 'snake_died',
                        data: {
                            playerId: snake.id,
                            killer: otherSnake.id,
                            finalScore: finalScore,
                            finalLength: finalLength
                        }
                    });
                    break;
                }
            }
        }
    }

    // Check world boundaries
    private checkWorldBoundaries(snake: Snake): void {
        const head = snake.getHead();
        const borderBuffer = GAME_CONFIG.BORDER_WIDTH * 0.5; // Allow snake to enter border area slightly
        
        if (head.x < -borderBuffer || head.x > GAME_CONFIG.WORLD_WIDTH + borderBuffer || 
            head.y < -borderBuffer || head.y > GAME_CONFIG.WORLD_HEIGHT + borderBuffer) {
            
            console.log(`Snake ${snake.nickname} hit kill border! Head position: (${head.x}, ${head.y}), World: ${GAME_CONFIG.WORLD_WIDTH}x${GAME_CONFIG.WORLD_HEIGHT}`);
            
            // Capture final score and length before death
            const finalScore = snake.score;
            const finalLength = snake.length;
            
            snake.die();
            this.createFoodFromSnake(snake);
            
            this.events.push({
                type: 'snake_died',
                data: {
                    playerId: snake.id,
                    killer: null,
                    finalScore: finalScore,
                    finalLength: finalLength
                }
            });
        }
    }

    // Maintain food count by spawning new particles
    private maintainFoodCount(): void {
        while (this.food.size < GAME_CONFIG.FOOD_COUNT) {
            this.spawnFoodParticle();
        }
    }

    // Get serializable game state for clients
    getSerializableState(): any {
        const players: any = {};
        const food: any = {};
        
        for (const [id, snake] of this.players) {
            players[id] = snake.getPlayerData();
        }
        
        for (const [id, foodItem] of this.food) {
            food[id] = foodItem.getFoodData();
        }
        
        return {
            players,
            food,
            timestamp: Date.now()
        };
    }

    // Get serializable game state for a specific player (only visible entities)
    getVisibleStateForPlayer(playerId: string): any {
        const player = this.players.get(playerId);
        if (!player || !player.alive) {
            // Fallback to empty state if player not found or dead
            return { players: {}, food: {}, timestamp: Date.now() };
        }
        const head = player.getHead();
        const radius = GAME_CONFIG.PLAYER_VIEW_RADIUS;
        const players: any = {};
        const food: any = {};

        // Include all snakes whose head is within radius of this player's head
        for (const [id, snake] of this.players) {
            if (!snake.alive) continue;
            const snakeHead = snake.getHead();
            const dx = snakeHead.x - head.x;
            const dy = snakeHead.y - head.y;
            if (dx * dx + dy * dy <= radius * radius) {
                players[id] = snake.getPlayerData();
            }
        }
        // Always include the local player
        players[playerId] = player.getPlayerData();

        // Include food within radius
        for (const [id, foodItem] of this.food) {
            const dx = foodItem.x - head.x;
            const dy = foodItem.y - head.y;
            if (dx * dx + dy * dy <= radius * radius) {
                food[id] = foodItem.getFoodData();
            }
        }
        return {
            players,
            food,
            timestamp: Date.now()
        };
    }

    // Get all players for leaderboard (regardless of distance)
    getAllPlayersForLeaderboard(): any {
        const players: any = {};
        
        for (const [id, snake] of this.players) {
            if (snake.alive) {
                players[id] = snake.getPlayerData();
            }
        }
        
        return {
            players,
            timestamp: Date.now()
        };
    }

    // Get events that occurred during update
    getEvents(): GameEvent[] {
        return this.events;
    }

    // Clear events after processing
    clearEvents(): void {
        this.events = [];
    }
} 