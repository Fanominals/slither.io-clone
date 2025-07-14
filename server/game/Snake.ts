import { 
    GAME_CONFIG, 
    PlayerData, 
    SnakeSegment, 
    Vector2D,
    normalizeAngle,
    clamp
} from '../../common/constants';

export class Snake {
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
    public hasStartedMoving: boolean = false;
    public isBoosting: boolean = false;
    public boostTimer: number = 0; // Tracks time spent boosting
    private lastAngleUpdate: number = Date.now();

    constructor(
        id: string,
        nickname: string,
        x: number,
        y: number,
        color: string,
        initialLength: number,
        initialThickness: number
    ) {
        this.id = id;
        this.nickname = nickname;
        this.color = color;
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.length = initialLength;
        this.thickness = initialThickness;
        this.segments = [];
        this.alive = true;

        this.initializeSegments();
    }

    // Initialize segments based on initial length
    private initializeSegments(): void {
        this.segments = [];
        const visualLength = Math.floor(this.length * GAME_CONFIG.VISUAL_LENGTH_FACTOR);
        for (let i = 0; i < visualLength; i++) {
            const segmentRadius = this.calculateSegmentRadius(i);
            this.segments.push({
                x: this.x - i * 12, // Fixed spacing of 12 pixels
                y: this.y,
                radius: segmentRadius
            });
        }
    }

    // Calculate segment radius based on position (head is largest)
    private calculateSegmentRadius(index: number): number {
        const baseRadius = this.thickness / 2;
        const headBonus = index === 0 ? 2 : 0; // Head is slightly larger
        const positionFactor = 1 - (index / this.length) * 0.3; // Gradual taper
        return baseRadius * positionFactor + headBonus;
    }

    // Update snake position and segments
    update(deltaTime: number): void {
        if (!this.alive) return;

        // Update thickness based on actual length (not growth)
        this.thickness = GAME_CONFIG.INITIAL_SNAKE_THICKNESS + 
                        (this.length * GAME_CONFIG.THICKNESS_SCALE_FACTOR);

        // Only move if the snake has started moving (user has provided input)
        if (this.hasStartedMoving) {
            // Move head - use boost speed if boosting
            const baseSpeed = this.isBoosting ? GAME_CONFIG.SNAKE_BOOST_SPEED : GAME_CONFIG.SNAKE_SPEED;
            const speed = baseSpeed * deltaTime;
            this.x += Math.cos(this.angle) * speed;
            this.y += Math.sin(this.angle) * speed;

            // Update segments to follow head
            this.updateSegments();
        }

        // --- Boosting length reduction logic ---
        if (this.isBoosting && this.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH) {
            this.boostTimer += deltaTime;
            if (this.boostTimer >= 1) {
                // Reduce score length by 2 per second
                this.length = Math.max(this.length - 2, GAME_CONFIG.INITIAL_SNAKE_LENGTH);
                
                // Calculate target visual length and remove excess segments
                const targetVisualLength = Math.floor(this.length * GAME_CONFIG.VISUAL_LENGTH_FACTOR);
                while (this.segments.length > targetVisualLength && this.segments.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH) {
                    this.segments.pop();
                }
                
                this.boostTimer = 0;
            }
        } else {
            this.boostTimer = 0;
        }
    }

    // Update segments to follow the head smoothly
    private updateSegments(): void {
        if (this.segments.length === 0) return;

        // Update head position
        this.segments[0].x = this.x;
        this.segments[0].y = this.y;
        this.segments[0].radius = this.calculateSegmentRadius(0);

        // Update following segments
        for (let i = 1; i < this.segments.length; i++) {
            const current = this.segments[i];
            const target = this.segments[i - 1];
            
            // Calculate direction to target
            const dx = target.x - current.x;
            const dy = target.y - current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Move towards target if too far
            if (distance > 12) { // Fixed spacing of 12 pixels
                const moveRatio = (distance - 12) / distance;
                current.x += dx * moveRatio;
                current.y += dy * moveRatio;
            }
            
            // Update radius
            current.radius = this.calculateSegmentRadius(i);
        }
    }

    // Set movement direction
    setDirection(angle: number): void {
        const now = Date.now();
        const deltaTime = (now - this.lastAngleUpdate) / 1000;
        this.lastAngleUpdate = now;
        const maxTurn = GAME_CONFIG.SNAKE_TURN_RATE * deltaTime;
        let angleDiff = normalizeAngle(angle - this.angle);
        if (Math.abs(angleDiff) > maxTurn) {
            angleDiff = Math.sign(angleDiff) * maxTurn;
        }
        this.angle = normalizeAngle(this.angle + angleDiff);
        this.hasStartedMoving = true;
    }

    setBoosting(boosting: boolean): void {
        this.isBoosting = boosting;
    }

    // Grow the snake by adding length
    grow(lengthIncrement: number): void {
        // Add to the score length (for leaderboard)
        this.length += lengthIncrement;
        
        // Calculate how many visual segments we should have now
        const targetVisualLength = Math.floor(this.length * GAME_CONFIG.VISUAL_LENGTH_FACTOR);
        
        // Add new segments if needed
        while (this.segments.length < targetVisualLength) {
            const lastSegment = this.segments[this.segments.length - 1];
            const newSegment: SnakeSegment = {
                x: lastSegment.x,
                y: lastSegment.y,
                radius: this.calculateSegmentRadius(this.segments.length)
            };
            this.segments.push(newSegment);
        }
    }

    // Kill the snake
    die(): void {
        this.alive = false;
    }

    // Get head segment
    getHead(): SnakeSegment {
        return this.segments[0];
    }

    // Get all segments
    getSegments(): SnakeSegment[] {
        return this.segments;
    }

    // Check if a position is inside the snake
    isPositionInside(position: Vector2D): boolean {
        for (const segment of this.segments) {
            const distance = Math.sqrt(
                Math.pow(position.x - segment.x, 2) + 
                Math.pow(position.y - segment.y, 2)
            );
            if (distance < segment.radius) {
                return true;
            }
        }
        return false;
    }

    // Get player data for network transmission
    getPlayerData(): PlayerData {
        return {
            id: this.id,
            nickname: this.nickname,
            color: this.color,
            x: this.x,
            y: this.y,
            angle: this.angle,
            length: Math.floor(this.length),
            thickness: this.thickness,
            segments: this.segments,
            alive: this.alive
        };
    }
} 