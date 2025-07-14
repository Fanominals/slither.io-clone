import { GAME_CONFIG, lerp } from '../../common/constants.js';
export class ClientSnake {
    constructor(playerData, isLocalPlayer = false) {
        this.interpolationAlpha = 0;
        this.lastUpdateTime = 0;
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
    }
    // Update with server data
    updateFromServer(playerData) {
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
    }
    // Update interpolation for smooth movement
    updateInterpolation(deltaTime) {
        if (!this.isLocalPlayer) {
            // Only interpolate for remote players
            this.interpolationAlpha = Math.min(1, this.interpolationAlpha + deltaTime * 8);
        }
    }
    // Get interpolated position for rendering
    getInterpolatedPosition() {
        if (this.isLocalPlayer) {
            return { x: this.x, y: this.y };
        }
        return {
            x: lerp(this.previousX, this.x, this.interpolationAlpha),
            y: lerp(this.previousY, this.y, this.interpolationAlpha)
        };
    }
    // Get interpolated angle for rendering
    getInterpolatedAngle() {
        if (this.isLocalPlayer) {
            return this.angle;
        }
        // Handle angle wrapping for smooth interpolation
        let angleDiff = this.angle - this.previousAngle;
        if (angleDiff > Math.PI) {
            angleDiff -= 2 * Math.PI;
        }
        else if (angleDiff < -Math.PI) {
            angleDiff += 2 * Math.PI;
        }
        return this.previousAngle + angleDiff * this.interpolationAlpha;
    }
    // Get interpolated segments for rendering
    getInterpolatedSegments() {
        if (this.isLocalPlayer) {
            return this.segments;
        }
        const interpolatedSegments = [];
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
            }
            else if (current) {
                // New segment appeared
                interpolatedSegments.push({
                    x: current.x,
                    y: current.y,
                    radius: current.radius * this.interpolationAlpha
                });
            }
            else if (previous) {
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
    getHeadPosition() {
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
    getPredictedPosition(deltaTime) {
        const currentPos = this.getInterpolatedPosition();
        const speed = GAME_CONFIG.SNAKE_SPEED * deltaTime;
        return {
            x: currentPos.x + Math.cos(this.getInterpolatedAngle()) * speed,
            y: currentPos.y + Math.sin(this.getInterpolatedAngle()) * speed
        };
    }
    // Check if snake is visible in camera bounds
    isVisible(cameraX, cameraY, cameraZoom, screenWidth, screenHeight) {
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
        return (headPos.x + maxRadius >= bounds.left &&
            headPos.x - maxRadius <= bounds.right &&
            headPos.y + maxRadius >= bounds.top &&
            headPos.y - maxRadius <= bounds.bottom);
    }
    // Get snake's current length including growth
    getCurrentLength() {
        return this.segments.length;
    }
    // Get display name with score
    getDisplayName() {
        return `${this.nickname} (${this.score})`;
    }
    // Calculate snake's total mass
    getTotalMass() {
        return this.length + (this.score - this.length);
    }
}
//# sourceMappingURL=Snake.js.map