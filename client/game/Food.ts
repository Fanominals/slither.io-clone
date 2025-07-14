import { FoodData, Vector2D } from '../../common/constants.js';

export class ClientFood {
    public id: string;
    public x: number;
    public y: number;
    public color: string;
    public size: number;
    public mass: number;
    public pulseAnimation: number = 0;
    public glowIntensity: number = 0.5;

    constructor(foodData: FoodData) {
        this.id = foodData.id;
        this.x = foodData.x;
        this.y = foodData.y;
        this.color = foodData.color;
        this.size = foodData.size;
        this.mass = foodData.mass;
    }

    // Update food with server data
    updateFromServer(foodData: FoodData): void {
        this.x = foodData.x;
        this.y = foodData.y;
        this.color = foodData.color;
        this.size = foodData.size;
        this.mass = foodData.mass;
    }

    // Update animation
    update(deltaTime: number): void {
        // Pulse animation for visual appeal
        this.pulseAnimation += deltaTime * 3;
        if (this.pulseAnimation > Math.PI * 2) {
            this.pulseAnimation -= Math.PI * 2;
        }

        // Glow intensity variation
        this.glowIntensity = 0.3 + Math.sin(this.pulseAnimation) * 0.2;
    }

    // Get current animated size
    getAnimatedSize(): number {
        const pulseFactor = 1 + Math.sin(this.pulseAnimation) * 0.1;
        return this.size * pulseFactor;
    }

    // Get current position
    getPosition(): Vector2D {
        return {
            x: this.x,
            y: this.y
        };
    }

    // Check if food is visible in camera bounds
    isVisible(cameraX: number, cameraY: number, cameraZoom: number, screenWidth: number, screenHeight: number): boolean {
        const halfWidth = screenWidth / (2 * cameraZoom);
        const halfHeight = screenHeight / (2 * cameraZoom);
        
        const bounds = {
            left: cameraX - halfWidth,
            right: cameraX + halfWidth,
            top: cameraY - halfHeight,
            bottom: cameraY + halfHeight
        };

        const margin = this.size * 2; // Add margin for better culling
        
        return (
            this.x + margin >= bounds.left &&
            this.x - margin <= bounds.right &&
            this.y + margin >= bounds.top &&
            this.y - margin <= bounds.bottom
        );
    }

    // Get the render color with glow effect
    getRenderColor(): string {
        // Convert hex color to RGB for glow effect
        const hex = this.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${this.glowIntensity})`;
    }

    // Get the food's mass value
    getMass(): number {
        return this.mass;
    }

    // Get distance to a point
    getDistanceTo(point: Vector2D): number {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Check if point is within food bounds
    contains(point: Vector2D): boolean {
        return this.getDistanceTo(point) <= this.size;
    }

    // Get bounding box for efficient collision detection
    getBoundingBox(): { left: number; right: number; top: number; bottom: number } {
        return {
            left: this.x - this.size,
            right: this.x + this.size,
            top: this.y - this.size,
            bottom: this.y + this.size
        };
    }
} 