import { 
    PlayerData, 
    SnakeSegment, 
    Vector2D, 
    GAME_CONFIG,
    lerp
} from '../../common/constants.js';

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
    public score: number;
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
        this.score = playerData.score;
        this.isLocalPlayer = isLocalPlayer;

        // Initialize interpolation
        this.previousX = this.x;
        this.previousY = this.y;
        this.previousAngle = this.angle;
        this.previousSegments = [...this.segments];
        this.lastUpdateTime = Date.now();
        this.lastServerUpdateTime = Date.now();
    }

    // Update with server data
    updateFromServer(playerData: PlayerData): void {
        if (!this.alive && playerData.alive) {
            // Snake respawned
            this.alive = true;
        }

        // Store previous values for interpolation
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
        this.score = playerData.score;
        this.nickname = playerData.nickname;
        this.color = playerData.color;

        // Reset interpolation
        this.interpolationAlpha = 0;
        this.lastUpdateTime = Date.now();
        this.lastServerUpdateTime = Date.now();
    }

    // Update interpolation for smooth movement
    updateInterpolation(deltaTime: number): void {
        if (this.isLocalPlayer) {
            // For local player, use prediction to reduce jitter
            const timeSinceServerUpdate = (Date.now() - this.lastServerUpdateTime) / 1000;
            const serverUpdateInterval = 1 / GAME_CONFIG.TICK_RATE;
            
            // If we're waiting for the next server update, predict movement
            if (timeSinceServerUpdate > serverUpdateInterval * 0.5) {
                // Apply prediction for smoother local movement
                const predictionTime = Math.min(timeSinceServerUpdate - serverUpdateInterval * 0.5, serverUpdateInterval);
                const speed = GAME_CONFIG.SNAKE_SPEED * predictionTime;
                
                this.x += Math.cos(this.angle) * speed;
                this.y += Math.sin(this.angle) * speed;
            }
        } else {
            // For remote players, use smooth interpolation
            this.interpolationAlpha = Math.min(1, this.interpolationAlpha + deltaTime / GAME_CONFIG.INTERPOLATION_FACTOR);
        }
    }

    // Get interpolated position for rendering
    getInterpolatedPosition(): Vector2D {
        if (this.isLocalPlayer) {
            return { x: this.x, y: this.y };
        }

        return {
            x: lerp(this.previousX, this.x, this.interpolationAlpha),
            y: lerp(this.previousY, this.y, this.interpolationAlpha)
        };
    }

    // Get interpolated angle for rendering
    getInterpolatedAngle(): number {
        if (this.isLocalPlayer) {
            return this.angle;
        }

        // Handle angle wrapping for smooth interpolation
        let angleDiff = this.angle - this.previousAngle;
        if (angleDiff > Math.PI) {
            angleDiff -= 2 * Math.PI;
        } else if (angleDiff < -Math.PI) {
            angleDiff += 2 * Math.PI;
        }

        return this.previousAngle + angleDiff * this.interpolationAlpha;
    }

    // Get interpolated segments for rendering
    getInterpolatedSegments(): SnakeSegment[] {
        if (this.isLocalPlayer) {
            return this.segments;
        }

        const interpolatedSegments: SnakeSegment[] = [];
        const maxSegments = Math.max(this.segments.length, this.previousSegments.length);

        for (let i = 0; i < maxSegments; i++) {
            const current = this.segments[i];
            const previous = this.previousSegments[i];

            if (current && previous) {
                // Interpolate existing segments
                interpolatedSegments.push({
                    x: lerp(previous.x, current.x, this.interpolationAlpha),
                    y: lerp(previous.y, current.y, this.interpolationAlpha),
                    radius: lerp(previous.radius, current.radius, this.interpolationAlpha)
                });
            } else if (current) {
                // New segment appeared
                interpolatedSegments.push({
                    x: current.x,
                    y: current.y,
                    radius: current.radius * this.interpolationAlpha
                });
            } else if (previous) {
                // Segment disappeared
                interpolatedSegments.push({
                    x: previous.x,
                    y: previous.y,
                    radius: previous.radius * (1 - this.interpolationAlpha)
                });
            }
        }

        return interpolatedSegments;
    }

    // Get head position (interpolated)
    getHeadPosition(): Vector2D {
        const interpolatedSegments = this.getInterpolatedSegments();
        if (interpolatedSegments.length > 0) {
            return {
                x: interpolatedSegments[0].x,
                y: interpolatedSegments[0].y
            };
        }
        return this.getInterpolatedPosition();
    }

    // Get predicted position based on movement
    getPredictedPosition(deltaTime: number): Vector2D {
        const currentPos = this.getInterpolatedPosition();
        const speed = GAME_CONFIG.SNAKE_SPEED * deltaTime;
        
        return {
            x: currentPos.x + Math.cos(this.getInterpolatedAngle()) * speed,
            y: currentPos.y + Math.sin(this.getInterpolatedAngle()) * speed
        };
    }

    // Check if snake is visible in camera bounds
    isVisible(cameraX: number, cameraY: number, cameraZoom: number, screenWidth: number, screenHeight: number): boolean {
        const halfWidth = screenWidth / (2 * cameraZoom);
        const halfHeight = screenHeight / (2 * cameraZoom);
        
        const bounds = {
            left: cameraX - halfWidth,
            right: cameraX + halfWidth,
            top: cameraY - halfHeight,
            bottom: cameraY + halfHeight
        };

        const headPos = this.getHeadPosition();
        const maxRadius = this.thickness;

        return (
            headPos.x + maxRadius >= bounds.left &&
            headPos.x - maxRadius <= bounds.right &&
            headPos.y + maxRadius >= bounds.top &&
            headPos.y - maxRadius <= bounds.bottom
        );
    }

    // Get snake's current length including growth
    getCurrentLength(): number {
        return this.segments.length;
    }

    // Get display name with score
    getDisplayName(): string {
        return `${this.nickname} (${this.score})`;
    }

    // Calculate snake's total mass
    getTotalMass(): number {
        return this.length + (this.score - this.length);
    }
} 