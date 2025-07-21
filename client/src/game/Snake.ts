import { 
    PlayerData, 
    SnakeSegment, 
    Vector2D
} from '../types';
import { 
    GAME_CONFIG,
    lerp
} from '../../../common/constants';

export class ClientSnake {
    public id: string;
    public nickname: string;
    public color: string;
    public x: number;
    public y: number;
    public angle: number;
    public length: number;
    public thickness: number;
    public segments: SnakeSegment[];
    public alive: boolean;
    public isBoosting: boolean;
    public isLocalPlayer: boolean;

    // Interpolation properties
    private previousX: number;
    private previousY: number;
    private previousAngle: number;
    private previousSegments: SnakeSegment[];
    private interpolationAlpha: number = 0;
    private lastUpdateTime: number = 0;
    private lastServerUpdateTime: number = 0;

    constructor(playerData: PlayerData, isLocalPlayer: boolean = false) {
        this.id = playerData.id;
        this.nickname = playerData.nickname;
        this.color = playerData.color;
        this.x = playerData.x;
        this.y = playerData.y;
        this.angle = playerData.angle;
        this.length = playerData.length;
        this.thickness = playerData.thickness;
        this.segments = [...playerData.segments];
        this.alive = playerData.alive;
        this.isBoosting = playerData.isBoosting || false;
        this.isLocalPlayer = isLocalPlayer;

        // Initialize interpolation
        this.previousX = this.x;
        this.previousY = this.y;
        this.previousAngle = this.angle;
        this.previousSegments = [...this.segments];
    }

    public updateFromServer(playerData: PlayerData): void {
        // Store previous position for interpolation
        this.previousX = this.x;
        this.previousY = this.y;
        this.previousAngle = this.angle;
        this.previousSegments = [...this.segments];

        // Update with new server data
        this.x = playerData.x;
        this.y = playerData.y;
        this.angle = playerData.angle;
        this.length = playerData.length;
        this.thickness = playerData.thickness;
        this.segments = [...playerData.segments];
        this.alive = playerData.alive;
        this.isBoosting = playerData.isBoosting || false;

        // Reset interpolation
        this.interpolationAlpha = 0;
        this.lastServerUpdateTime = Date.now();
    }

    public updateInterpolation(deltaTime: number): void {
        if (!this.alive) return;

        // For local player, don't interpolate as it would cause lag
        if (this.isLocalPlayer) {
            this.interpolationAlpha = 1;
            return;
        }

        // Calculate interpolation progress
        const timeSinceUpdate = Date.now() - this.lastServerUpdateTime;
        const serverTickInterval = 1000 / GAME_CONFIG.TICK_RATE;
        this.interpolationAlpha = Math.min(1, timeSinceUpdate / serverTickInterval);
    }

    public getHeadPosition(): Vector2D {
        if (this.interpolationAlpha >= 1 || this.isLocalPlayer) {
            return { x: this.x, y: this.y };
        }

        // Interpolate position
        const interpX = lerp(this.previousX, this.x, this.interpolationAlpha);
        const interpY = lerp(this.previousY, this.y, this.interpolationAlpha);
        
        return { x: interpX, y: interpY };
    }

    public getInterpolatedAngle(): number {
        if (this.interpolationAlpha >= 1 || this.isLocalPlayer) {
            return this.angle;
        }

        // Handle angle wrapping for interpolation
        let targetAngle = this.angle;
        let sourceAngle = this.previousAngle;
        
        const angleDiff = targetAngle - sourceAngle;
        if (Math.abs(angleDiff) > Math.PI) {
            if (angleDiff > 0) {
                sourceAngle += 2 * Math.PI;
            } else {
                targetAngle += 2 * Math.PI;
            }
        }

        return lerp(sourceAngle, targetAngle, this.interpolationAlpha);
    }

    public getInterpolatedSegments(): SnakeSegment[] {
        if (this.interpolationAlpha >= 1 || this.isLocalPlayer || this.previousSegments.length === 0) {
            return this.segments;
        }

        // Interpolate segments if we have the same number
        if (this.segments.length === this.previousSegments.length) {
            return this.segments.map((segment, index) => {
                const prevSegment = this.previousSegments[index];
                return {
                    x: lerp(prevSegment.x, segment.x, this.interpolationAlpha),
                    y: lerp(prevSegment.y, segment.y, this.interpolationAlpha),
                    radius: lerp(prevSegment.radius, segment.radius, this.interpolationAlpha)
                };
            });
        }

        return this.segments;
    }

    public getCurrentLength(): number {
        return Math.round(this.length);
    }

    public isVisible(cameraX: number, cameraY: number, zoom: number, viewWidth: number, viewHeight: number): boolean {
        if (!this.alive) return false;

        const headPos = this.getHeadPosition();
        const margin = this.thickness * 2; // Add some margin for partially visible snakes
        
        // Convert camera bounds to world coordinates
        const leftBound = cameraX - (viewWidth / zoom) / 2 - margin;
        const rightBound = cameraX + (viewWidth / zoom) / 2 + margin;
        const topBound = cameraY - (viewHeight / zoom) / 2 - margin;
        const bottomBound = cameraY + (viewHeight / zoom) / 2 + margin;

        // Check if snake head is within bounds
        if (headPos.x >= leftBound && headPos.x <= rightBound && 
            headPos.y >= topBound && headPos.y <= bottomBound) {
            return true;
        }

        // Check if any segment is visible
        const segments = this.getInterpolatedSegments();
        for (const segment of segments) {
            if (segment.x >= leftBound && segment.x <= rightBound && 
                segment.y >= topBound && segment.y <= bottomBound) {
                return true;
            }
        }

        return false;
    }
} 