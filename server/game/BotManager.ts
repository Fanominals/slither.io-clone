import { GameState } from './GameState';
import { GAME_CONFIG, generateId } from '../../common/constants';

const BOT_COUNT = GAME_CONFIG.BOT_COUNT; // Number of bots to spawn
const BOT_PREFIX = 'bot-';
const BOT_NICKNAMES = [
    'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet',
    'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango',
    'Uniform', 'Victor', 'Whiskey', 'Xray', 'Yankee', 'Zulu'
];

interface BotState {
    id: string;
    angle: number;
    changeTimer: number;
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
        this.bots.set(id, {
            id,
            angle: Math.random() * Math.PI * 2,
            changeTimer: Math.random() * 2 + 1 // 1-3 seconds before changing direction
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

            // Border avoidance
            const margin = 100;
            let avoid = false;
            if (snake.x < margin) { bot.angle = 0; avoid = true; }
            else if (snake.x > GAME_CONFIG.WORLD_WIDTH - margin) { bot.angle = Math.PI; avoid = true; }
            if (snake.y < margin) { bot.angle = Math.PI / 2; avoid = true; }
            else if (snake.y > GAME_CONFIG.WORLD_HEIGHT - margin) { bot.angle = -Math.PI / 2; avoid = true; }

            // Random walk (if not currently avoiding border)
            if (!avoid) {
                bot.changeTimer -= deltaTime;
                if (bot.changeTimer <= 0) {
                    bot.angle += (Math.random() - 0.5) * Math.PI / 2; // Small random turn
                    bot.changeTimer = Math.random() * 2 + 1;
                }
            }

            this.gameState.updatePlayerDirection(bot.id, bot.angle, false);
        }
    }
} 