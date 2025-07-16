import { Snake } from './Snake';
import { Food } from './Food';
import { Collision } from './Collision';
import { SpatialGrid } from './SpatialGrid';
import { 
    GAME_CONFIG, 
    PlayerData, 
    FoodData, 
    Vector2D,
    generateRandomColor,
    generateId,
    getFoodCount
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
    private segmentGrid: SpatialGrid<{ snakeId: string, segment: any }>;
    private foodGrid: SpatialGrid<Food>;

    constructor() {
        this.collision = new Collision();
        this.segmentGrid = new SpatialGrid(GAME_CONFIG.SPATIAL_GRID_CELL_SIZE);
        this.foodGrid = new SpatialGrid(GAME_CONFIG.SPATIAL_GRID_CELL_SIZE);
        this.initializeFoodParticles();
    }

    // Initialize food particles across the game world
    private initializeFoodParticles(): void {
        for (let i = 0; i < getFoodCount(); i++) {
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
            GAME_CONFIG.FOOD_LENGTH_MIN + Math.random() * (GAME_CONFIG.FOOD_LENGTH_MAX - GAME_CONFIG.FOOD_LENGTH_MIN)
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

    // Check if a position is occupied by a snake (near any head)
    private isPositionOccupied(position: Vector2D): boolean {
        for (const snake of this.players.values()) {
            if (!snake.alive) continue;
            const head = snake.getHead();
            const dx = position.x - head.x;
            const dy = position.y - head.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < GAME_CONFIG.SNAKE_SPAWN_MIN_DIST * GAME_CONFIG.SNAKE_SPAWN_MIN_DIST) {
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
                GAME_CONFIG.FOOD_LENGTH_MIN + Math.random() * (GAME_CONFIG.FOOD_LENGTH_MAX - GAME_CONFIG.FOOD_LENGTH_MIN)
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
            }
        }
        // Rebuild spatial grids
        this.segmentGrid.clear();
        this.foodGrid.clear();
        for (const [id, snake] of this.players) {
            if (!snake.alive) continue;
            const segments = snake.getSegments();
            for (const segment of segments) {
                this.segmentGrid.insert(segment.x, segment.y, { snakeId: id, segment });
            }
        }
        for (const food of this.food.values()) {
            this.foodGrid.insert(food.x, food.y, food);
        }
        // Check food collision and attraction, snake collisions, and world boundaries
        for (const snake of this.players.values()) {
            if (snake.alive) {
                this.checkFoodCollisions(snake);
                this.checkSnakeCollisions(snake);
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
        // Only check food within view radius
        const nearbyFood = this.foodGrid.queryRadius(head.x, head.y, GAME_CONFIG.PLAYER_VIEW_RADIUS);
        for (const food of nearbyFood) {
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
                snake.grow(food.lengthIncrement);
                foodToRemove.push(food.id);
                this.events.push({
                    type: 'food_eaten',
                    data: {
                        playerId: snake.id,
                        foodId: food.id,
                        lengthIncrement: food.lengthIncrement
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
        // Only check segments within view radius
        const nearbySegments = this.segmentGrid.queryRadius(head.x, head.y, GAME_CONFIG.PLAYER_VIEW_RADIUS, obj => obj.segment);
        for (const { snakeId, segment } of nearbySegments) {
            if (snakeId !== snake.id) {
                if (this.collision.checkSnakeCollision(head, [segment])) {
                    // Capture final length before death (use rounded value)
                    const finalLength = Math.floor(snake.length);
                    snake.die();
                    this.createFoodFromSnake(snake);
                    this.events.push({
                        type: 'snake_died',
                        data: {
                            playerId: snake.id,
                            killer: snakeId,
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
            // Capture final length before death (use rounded value)
            const finalLength = Math.floor(snake.length);
            snake.die();
            this.createFoodFromSnake(snake);
            this.events.push({
                type: 'snake_died',
                data: {
                    playerId: snake.id,
                    killer: null,
                    finalLength: finalLength
                }
            });
        }
    }

    // Maintain food count by spawning new particles
    private maintainFoodCount(): void {
        while (this.food.size < getFoodCount()) {
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

    // Get visible state for a specific player using the spatial grid
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
        
        // Use grid to get nearby segments
        const nearbySegments = this.segmentGrid.queryRadius(head.x, head.y, radius, obj => obj.segment);
        const visibleSnakeIds = new Set<string>();
        
        // Check each segment to see if it's within the view radius
        for (const { snakeId, segment } of nearbySegments) {
            const dx = segment.x - head.x;
            const dy = segment.y - head.y;
            if (dx * dx + dy * dy <= radius * radius) {
                visibleSnakeIds.add(snakeId);
            }
        }
        
        // Include all snakes that have any segment within the view radius
        // This ensures the entire snake is visible if any part of it is in range
        for (const id of visibleSnakeIds) {
            const snake = this.players.get(id);
            if (snake && snake.alive) {
                players[id] = snake.getPlayerData();
            }
        }
        
        // Always include the local player
        players[playerId] = player.getPlayerData();
        
        // Use grid to get nearby food
        const nearbyFood = this.foodGrid.queryRadius(head.x, head.y, radius);
        for (const foodItem of nearbyFood) {
            const dx = foodItem.x - head.x;
            const dy = foodItem.y - head.y;
            if (dx * dx + dy * dy <= radius * radius) {
                food[foodItem.id] = foodItem.getFoodData();
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

    // Get a player (snake) by ID
    public getPlayer(id: string) {
        return this.players.get(id);
    }
} 