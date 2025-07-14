export class ClientFood {
    constructor(foodData) {
        this.pulseAnimation = 0;
        this.glowIntensity = 0.5;
        this.id = foodData.id;
        this.x = foodData.x;
        this.y = foodData.y;
        this.color = foodData.color;
        this.size = foodData.size;
        this.lengthIncrement = foodData.lengthIncrement;
    }
    // Update food with server data
    updateFromServer(foodData) {
        this.x = foodData.x;
        this.y = foodData.y;
        this.color = foodData.color;
        this.size = foodData.size;
        this.lengthIncrement = foodData.lengthIncrement;
    }
    // Update animation
    update(deltaTime) {
        // Pulse animation for visual appeal
        this.pulseAnimation += deltaTime * 3;
        if (this.pulseAnimation > Math.PI * 2) {
            this.pulseAnimation -= Math.PI * 2;
        }
        // Glow intensity variation
        this.glowIntensity = 0.3 + Math.sin(this.pulseAnimation) * 0.2;
    }
    // Get current animated size
    getAnimatedSize() {
        const pulseFactor = 1 + Math.sin(this.pulseAnimation) * 0.1;
        return this.size * pulseFactor;
    }
    // Get current position
    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
    // Check if food is visible in camera bounds
    isVisible(cameraX, cameraY, cameraZoom, screenWidth, screenHeight) {
        const halfWidth = screenWidth / (2 * cameraZoom);
        const halfHeight = screenHeight / (2 * cameraZoom);
        const bounds = {
            left: cameraX - halfWidth,
            right: cameraX + halfWidth,
            top: cameraY - halfHeight,
            bottom: cameraY + halfHeight
        };
        const margin = this.size * 2; // Add margin for better culling
        return (this.x + margin >= bounds.left &&
            this.x - margin <= bounds.right &&
            this.y + margin >= bounds.top &&
            this.y - margin <= bounds.bottom);
    }
    // Get the render color with glow effect
    getRenderColor() {
        // Convert hex color to RGB for glow effect
        const hex = this.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${this.glowIntensity})`;
    }
    // Get the food's length increment value
    getLengthIncrement() {
        return this.lengthIncrement;
    }
    // Get distance to a point
    getDistanceTo(point) {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    // Check if point is within food bounds
    contains(point) {
        return this.getDistanceTo(point) <= this.size;
    }
    // Get bounding box for efficient collision detection
    getBoundingBox() {
        return {
            left: this.x - this.size,
            right: this.x + this.size,
            top: this.y - this.size,
            bottom: this.y + this.size
        };
    }
}
//# sourceMappingURL=Food.js.map