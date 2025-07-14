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
    public score: number;
    public mass: number;
    public hasStartedMoving: boolean = false;

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
        this.score = 0;
        this.mass = initialLength;

        this.initializeSegments();
    }

    // Initialize segments based on initial length
    private initializeSegments(): void {
        this.segments = [];
        for (let i = 0; i < this.length; i++) {
            const segmentRadius = this.calculateSegmentRadius(i);
            this.segments.push({
                x: this.x - i * GAME_CONFIG.SEGMENT_SPACING,
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

        // Update thickness based on mass
        this.thickness = GAME_CONFIG.INITIAL_SNAKE_THICKNESS + 
                        (this.mass - GAME_CONFIG.INITIAL_SNAKE_LENGTH) * GAME_CONFIG.THICKNESS_SCALE_FACTOR;
        
        // Update score
        this.score = Math.floor(this.mass);

        // Only move if the snake has started moving (user has provided input)
        if (this.hasStartedMoving) {
            // Move head
            const speed = GAME_CONFIG.SNAKE_SPEED * deltaTime;
            this.x += Math.cos(this.angle) * speed;
            this.y += Math.sin(this.angle) * speed;

            // Update segments to follow head
            this.updateSegments();
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
            if (distance > GAME_CONFIG.SEGMENT_SPACING) {
                const moveRatio = (distance - GAME_CONFIG.SEGMENT_SPACING) / distance;
                current.x += dx * moveRatio;
                current.y += dy * moveRatio;
            }
            
            // Update radius
            current.radius = this.calculateSegmentRadius(i);
        }
    }

    // Set movement direction
    setDirection(angle: number): void {
        this.angle = normalizeAngle(angle);
        this.hasStartedMoving = true;
    }

    // Grow the snake by adding mass
    grow(mass: number): void {
        this.mass += mass;
        const newLength = Math.floor(this.mass);
        
        // Add new segments if length increased
        while (this.segments.length < newLength) {
            const lastSegment = this.segments[this.segments.length - 1];
            const newSegment: SnakeSegment = {
                x: lastSegment.x,
                y: lastSegment.y,
                radius: this.calculateSegmentRadius(this.segments.length)
            };
            this.segments.push(newSegment);
        }
        
        this.length = newLength;
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
            length: this.length,
            thickness: this.thickness,
            segments: this.segments,
            alive: this.alive,
            score: this.score
        };
    }
} 