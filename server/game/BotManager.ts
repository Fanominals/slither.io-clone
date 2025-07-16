import { GameState } from './GameState';
import { GAME_CONFIG, generateId, Vector2D, distance, normalizeAngle } from '../../common/constants';

const BOT_COUNT = GAME_CONFIG.BOT_COUNT;
const BOT_PREFIX = 'bot-';
const BOT_NICKNAMES = [
    'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet',
    'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango',
    'Uniform', 'Victor', 'Whiskey', 'Xray', 'Yankee', 'Zulu'
];

interface BotState {
    id: string;
    angle: number;
    targetAngle: number;
    changeTimer: number;
    lastFoodSeen: number;
    lastThreatSeen: number;
    boostCooldown: number;
    wanderTimer: number;
    personality: BotPersonality;
}

interface BotPersonality {
    aggressiveness: number; // 0-1, how likely to chase other snakes
    caution: number; // 0-1, how much to avoid threats
    foodPriority: number; // 0-1, how much to prioritize food over safety
    boostFrequency: number; // 0-1, how often to use boost
}

interface ThreatInfo {
    distance: number;
    angle: number;
    snakeId: string;
    isLarger: boolean;
}

interface FoodInfo {
    distance: number;
    angle: number;
    value: number; // length increment
}

export class BotManager {
    private bots: Map<string, BotState> = new Map();
    private gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.maintainBotCount();
    }

    private spawnBot() {
        const id = BOT_PREFIX + generateId();
        const nickname = BOT_NICKNAMES[Math.floor(Math.random() * BOT_NICKNAMES.length)] + 'Bot';
        this.gameState.addPlayer(id, nickname);
        
        // Generate random personality
        const personality: BotPersonality = {
            aggressiveness: Math.random() * 0.7, // Most bots are not very aggressive
            caution: 0.3 + Math.random() * 0.6, // Most bots are somewhat cautious
            foodPriority: 0.4 + Math.random() * 0.5, // Moderate to high food priority
            boostFrequency: 0.2 + Math.random() * 0.6 // Moderate boost usage
        };

        this.bots.set(id, {
            id,
            angle: Math.random() * Math.PI * 2,
            targetAngle: 0,
            changeTimer: Math.random() * 2 + 1,
            lastFoodSeen: 0,
            lastThreatSeen: 0,
            boostCooldown: 0,
            wanderTimer: Math.random() * 3 + 2,
            personality
        });
    }

    private maintainBotCount() {
        // Remove dead bots from tracking
        for (const [id, bot] of this.bots.entries()) {
            const snake = this.gameState.getPlayer(id);
            if (!snake || !snake.alive) {
                this.bots.delete(id);
            }
        }
        // Spawn new bots if needed
        while (this.bots.size < BOT_COUNT) {
            this.spawnBot();
        }
    }

    update(deltaTime: number) {
        this.maintainBotCount();
        
        for (const bot of this.bots.values()) {
            const snake = this.gameState.getPlayer(bot.id);
            if (!snake || !snake.alive) continue;

            // Update timers
            bot.changeTimer -= deltaTime;
            bot.boostCooldown = Math.max(0, bot.boostCooldown - deltaTime);
            bot.wanderTimer -= deltaTime;

            // Get nearby threats and food
            const threats = this.getNearbyThreats(snake);
            const food = this.getNearbyFood(snake);
            
            // Update last seen timers
            if (threats.length > 0) bot.lastThreatSeen = 0;
            else bot.lastThreatSeen += deltaTime;
            
            if (food.length > 0) bot.lastFoodSeen = 0;
            else bot.lastFoodSeen += deltaTime;

            // Determine behavior based on situation
            const behavior = this.determineBehavior(bot, threats, food, snake);
            
            // Execute behavior
            this.executeBehavior(bot, behavior, deltaTime);
            
            // Update snake direction and boost
            this.gameState.updatePlayerDirection(bot.id, bot.angle, behavior.shouldBoost);
        }
    }

    private getNearbyThreats(snake: any): ThreatInfo[] {
        const head = snake.getHead();
        const threats: ThreatInfo[] = [];
        
        // Get all players within view radius
        for (const [id, otherSnake] of this.gameState['players'].entries()) {
            if (id === snake.id || !otherSnake.alive) continue;
            
            const otherHead = otherSnake.getHead();
            const dist = distance(head, otherHead);
            
            if (dist <= GAME_CONFIG.PLAYER_VIEW_RADIUS) {
                const angle = Math.atan2(otherHead.y - head.y, otherHead.x - head.x);
                const isLarger = otherSnake.length > snake.length;
                
                threats.push({
                    distance: dist,
                    angle: angle,
                    snakeId: id,
                    isLarger: isLarger
                });
            }
        }
        
        return threats.sort((a, b) => a.distance - b.distance);
    }

    private getNearbyFood(snake: any): FoodInfo[] {
        const head = snake.getHead();
        const food: FoodInfo[] = [];
        
        // Query food grid for nearby food
        const nearbyFood = this.gameState['foodGrid'].queryRadius(head.x, head.y, GAME_CONFIG.PLAYER_VIEW_RADIUS);
        
        for (const foodItem of nearbyFood) {
            const dist = distance(head, { x: foodItem.x, y: foodItem.y });
            const angle = Math.atan2(foodItem.y - head.y, foodItem.x - head.x);
            
            food.push({
                distance: dist,
                angle: angle,
                value: foodItem.lengthIncrement
            });
        }
        
        return food.sort((a, b) => a.distance - b.distance);
    }

    private determineBehavior(bot: BotState, threats: ThreatInfo[], food: FoodInfo[], snake: any): {
        targetAngle: number;
        shouldBoost: boolean;
        priority: string;
    } {
        const head = snake.getHead();
        let targetAngle = bot.angle;
        let shouldBoost = false;
        let priority = 'wander';

        // Check for immediate threats (very close larger snakes)
        const immediateThreats = threats.filter(t => 
            t.isLarger && t.distance < 150 && bot.personality.caution > 0.3
        );

        if (immediateThreats.length > 0) {
            // Emergency escape - boost away from closest threat
            const closestThreat = immediateThreats[0];
            targetAngle = normalizeAngle(closestThreat.angle + Math.PI); // Move away
            shouldBoost = bot.boostCooldown <= 0 && snake.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH;
            priority = 'escape';
        }
        // Check for moderate threats (close snakes that might be dangerous)
        else if (threats.length > 0 && bot.personality.caution > 0.5) {
            const moderateThreats = threats.filter(t => 
                t.distance < 300 && (t.isLarger || t.distance < 100)
            );
            
            if (moderateThreats.length > 0) {
                // Avoid threats while still looking for opportunities
                const avoidanceAngle = this.calculateAvoidanceAngle(head, moderateThreats);
                targetAngle = avoidanceAngle;
                shouldBoost = bot.boostCooldown <= 0 && 
                             snake.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH &&
                             bot.personality.boostFrequency > 0.5;
                priority = 'avoid';
            }
        }

        // If no immediate threats, look for food
        if (priority === 'wander' && food.length > 0 && bot.personality.foodPriority > 0.3) {
            const bestFood = this.selectBestFood(food, threats, bot.personality);
            if (bestFood) {
                targetAngle = bestFood.angle;
                shouldBoost = bot.boostCooldown <= 0 && 
                             snake.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH &&
                             bot.personality.boostFrequency > 0.4 &&
                             bestFood.distance > 200; // Only boost for distant food
                priority = 'food';
            }
        }

        // If no food nearby, look for smaller snakes to chase (if aggressive)
        if (priority === 'wander' && bot.personality.aggressiveness > 0.6) {
            const smallerSnakes = threats.filter(t => !t.isLarger && t.distance < 400);
            if (smallerSnakes.length > 0) {
                const closestSmall = smallerSnakes[0];
                targetAngle = closestSmall.angle;
                shouldBoost = bot.boostCooldown <= 0 && 
                             snake.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH &&
                             bot.personality.boostFrequency > 0.6;
                priority = 'hunt';
            }
        }

        // Border avoidance
        const borderAvoidance = this.calculateBorderAvoidance(head);
        if (borderAvoidance !== null) {
            targetAngle = borderAvoidance;
            shouldBoost = bot.boostCooldown <= 0 && snake.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH;
            priority = 'border';
        }

        // Wander behavior if nothing else
        if (priority === 'wander') {
            if (bot.wanderTimer <= 0) {
                bot.targetAngle += (Math.random() - 0.5) * Math.PI / 3;
                bot.wanderTimer = Math.random() * 4 + 2;
            }
            targetAngle = bot.targetAngle;
        }

        return { targetAngle, shouldBoost, priority };
    }

    private calculateAvoidanceAngle(head: Vector2D, threats: ThreatInfo[]): number {
        // Calculate weighted avoidance direction
        let avoidX = 0;
        let avoidY = 0;
        
        for (const threat of threats) {
            const weight = 1 / (threat.distance + 1); // Closer threats have more weight
            const avoidAngle = normalizeAngle(threat.angle + Math.PI);
            avoidX += Math.cos(avoidAngle) * weight;
            avoidY += Math.sin(avoidAngle) * weight;
        }
        
        return Math.atan2(avoidY, avoidX);
    }

    private selectBestFood(food: FoodInfo[], threats: ThreatInfo[], personality: BotPersonality): FoodInfo | null {
        // Score each food item based on distance, value, and safety
        let bestFood: FoodInfo | null = null;
        let bestScore = -Infinity;
        
        for (const foodItem of food) {
            let score = foodItem.value / (foodItem.distance + 1); // Higher value, closer distance = better
            
            // Penalize food near threats
            for (const threat of threats) {
                const threatToFoodDist = Math.abs(threat.angle - foodItem.angle) * foodItem.distance;
                if (threatToFoodDist < 200 && threat.isLarger) {
                    score *= (1 - personality.caution);
                }
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestFood = foodItem;
            }
        }
        
        return bestFood;
    }

    private calculateBorderAvoidance(head: Vector2D): number | null {
        const margin = 150;
        let avoidAngle: number | null = null;
        
        if (head.x < margin) {
            avoidAngle = 0; // Move right
        } else if (head.x > GAME_CONFIG.WORLD_WIDTH - margin) {
            avoidAngle = Math.PI; // Move left
        } else if (head.y < margin) {
            avoidAngle = Math.PI / 2; // Move down
        } else if (head.y > GAME_CONFIG.WORLD_HEIGHT - margin) {
            avoidAngle = -Math.PI / 2; // Move up
        }
        
        return avoidAngle;
    }

    private executeBehavior(bot: BotState, behavior: { targetAngle: number; shouldBoost: boolean; priority: string }, deltaTime: number) {
        // Smoothly turn towards target angle
        const angleDiff = normalizeAngle(behavior.targetAngle - bot.angle);
        const maxTurn = GAME_CONFIG.SNAKE_TURN_RATE * deltaTime;
        
        if (Math.abs(angleDiff) > maxTurn) {
            bot.angle += Math.sign(angleDiff) * maxTurn;
        } else {
            bot.angle = behavior.targetAngle;
        }
        
        bot.angle = normalizeAngle(bot.angle);
        
        // Handle boost cooldown
        if (behavior.shouldBoost) {
            bot.boostCooldown = 2; // 2 second cooldown between boosts
        }
    }
} 