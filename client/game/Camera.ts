import { GAME_CONFIG, Vector2D, clamp, lerp } from '../../common/constants.js';

export class Camera {
    public x: number = 0;
    public y: number = 0;
    public zoom: number = 1;
    public targetX: number = 0;
    public targetY: number = 0;
    public targetZoom: number = 1;
    public width: number;
    public height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    // Update camera position and zoom smoothly
    update(deltaTime: number): void {
        // Smooth camera movement
        this.x = lerp(this.x, this.targetX, GAME_CONFIG.CAMERA_SMOOTH_FACTOR);
        this.y = lerp(this.y, this.targetY, GAME_CONFIG.CAMERA_SMOOTH_FACTOR);
        this.zoom = lerp(this.zoom, this.targetZoom, GAME_CONFIG.CAMERA_SMOOTH_FACTOR);
    }

    // Follow a target position (usually the player's snake head)
    followTarget(target: Vector2D, snakeLength: number): void {
        this.targetX = target.x;
        this.targetY = target.y;
        
        // Calculate zoom based on snake length
        const zoomFactor = Math.max(0.3, 1 - (snakeLength * GAME_CONFIG.ZOOM_SCALE_FACTOR / 100));
        this.targetZoom = clamp(zoomFactor, GAME_CONFIG.ZOOM_MIN, GAME_CONFIG.ZOOM_MAX);
    }

    // Convert world coordinates to screen coordinates
    worldToScreen(worldPos: Vector2D): Vector2D {
        return {
            x: (worldPos.x - this.x) * this.zoom + this.width / 2,
            y: (worldPos.y - this.y) * this.zoom + this.height / 2
        };
    }

    // Convert screen coordinates to world coordinates
    screenToWorld(screenPos: Vector2D): Vector2D {
        return {
            x: (screenPos.x - this.width / 2) / this.zoom + this.x,
            y: (screenPos.y - this.height / 2) / this.zoom + this.y
        };
    }

    // Get the visible world bounds
    getVisibleBounds(): { left: number; right: number; top: number; bottom: number } {
        const halfWidth = this.width / (2 * this.zoom);
        const halfHeight = this.height / (2 * this.zoom);
        
        return {
            left: this.x - halfWidth,
            right: this.x + halfWidth,
            top: this.y - halfHeight,
            bottom: this.y + halfHeight
        };
    }

    // Check if a world position is visible on screen
    isVisible(worldPos: Vector2D, radius: number = 0): boolean {
        const bounds = this.getVisibleBounds();
        return (
            worldPos.x + radius >= bounds.left &&
            worldPos.x - radius <= bounds.right &&
            worldPos.y + radius >= bounds.top &&
            worldPos.y - radius <= bounds.bottom
        );
    }

    // Set camera size (for canvas resize)
    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    // Get camera transformation matrix for rendering
    getTransform(): { translateX: number; translateY: number; scale: number } {
        return {
            translateX: this.width / 2 - this.x * this.zoom,
            translateY: this.height / 2 - this.y * this.zoom,
            scale: this.zoom
        };
    }

    // Smoothly zoom to a specific level
    zoomTo(targetZoom: number): void {
        this.targetZoom = clamp(targetZoom, GAME_CONFIG.ZOOM_MIN, GAME_CONFIG.ZOOM_MAX);
    }

    // Get the current zoom level
    getZoom(): number {
        return this.zoom;
    }

    // Get camera center position
    getCenter(): Vector2D {
        return {
            x: this.x,
            y: this.y
        };
    }
} 