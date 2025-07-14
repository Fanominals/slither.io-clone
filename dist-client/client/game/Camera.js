import { GAME_CONFIG, clamp, lerp } from '../../common/constants.js';
export class Camera {
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.targetX = 0;
        this.targetY = 0;
        this.targetZoom = 1;
        this.width = width;
        this.height = height;
    }
    // Update camera position and zoom smoothly
    update(deltaTime) {
        // Smooth camera movement
        this.x = lerp(this.x, this.targetX, GAME_CONFIG.CAMERA_SMOOTH_FACTOR);
        this.y = lerp(this.y, this.targetY, GAME_CONFIG.CAMERA_SMOOTH_FACTOR);
        this.zoom = lerp(this.zoom, this.targetZoom, GAME_CONFIG.CAMERA_SMOOTH_FACTOR);
    }
    // Follow a target position (usually the player's snake head)
    followTarget(target, snakeLength) {
        this.targetX = target.x;
        this.targetY = target.y;
        // Calculate zoom based on snake length - very gradual zoom out
        const zoomFactor = Math.max(0.3, 1 - ((snakeLength - 3) * GAME_CONFIG.ZOOM_SCALE_FACTOR / 1000));
        this.targetZoom = clamp(zoomFactor, GAME_CONFIG.ZOOM_MIN, GAME_CONFIG.ZOOM_MAX);
    }
    // Convert world coordinates to screen coordinates
    worldToScreen(worldPos) {
        return {
            x: (worldPos.x - this.x) * this.zoom + this.width / 2,
            y: (worldPos.y - this.y) * this.zoom + this.height / 2
        };
    }
    // Convert screen coordinates to world coordinates
    screenToWorld(screenPos) {
        return {
            x: (screenPos.x - this.width / 2) / this.zoom + this.x,
            y: (screenPos.y - this.height / 2) / this.zoom + this.y
        };
    }
    // Get the visible world bounds
    getVisibleBounds() {
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
    isVisible(worldPos, radius = 0) {
        const bounds = this.getVisibleBounds();
        return (worldPos.x + radius >= bounds.left &&
            worldPos.x - radius <= bounds.right &&
            worldPos.y + radius >= bounds.top &&
            worldPos.y - radius <= bounds.bottom);
    }
    // Set camera size (for canvas resize)
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    // Get camera transformation matrix for rendering
    getTransform() {
        return {
            translateX: this.width / 2 - this.x * this.zoom,
            translateY: this.height / 2 - this.y * this.zoom,
            scale: this.zoom
        };
    }
    // Smoothly zoom to a specific level
    zoomTo(targetZoom) {
        this.targetZoom = clamp(targetZoom, GAME_CONFIG.ZOOM_MIN, GAME_CONFIG.ZOOM_MAX);
    }
    // Get the current zoom level
    getZoom() {
        return this.zoom;
    }
    // Get camera center position
    getCenter() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
//# sourceMappingURL=Camera.js.map