import { GAME_CONFIG, lerp } from '../../common/constants.js';
export class ClientSnake {
    constructor(playerData, isLocalPlayer = false) {
        this.interpolationAlpha = 0;
        this.lastUpdateTime = 0;
        this.lastServerUpdateTime = 0;
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
        this.lastUpdateTime = Date.now();
        this.lastServerUpdateTime = Date.now();
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
        this.nickname = playerData.nickname;
        this.color = playerData.color;
        this.isBoosting = playerData.isBoosting || false;
        // Reset interpolation
        this.interpolationAlpha = 0;
        this.lastUpdateTime = Date.now();
        this.lastServerUpdateTime = Date.now();
    }
    // Update interpolation for smooth movement
    updateInterpolation(deltaTime) {
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
        }
        else {
            // For remote players, use smooth interpolation
            this.interpolationAlpha = Math.min(1, this.interpolationAlpha + deltaTime / GAME_CONFIG.INTERPOLATION_FACTOR);
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
        // Check all segments for visibility
        const segments = this.getInterpolatedSegments();
        for (const segment of segments) {
            const radius = segment.radius || this.thickness;
            if (segment.x + radius >= bounds.left &&
                segment.x - radius <= bounds.right &&
                segment.y + radius >= bounds.top &&
                segment.y - radius <= bounds.bottom) {
                return true;
            }
        }
        return false;
    }
    // Get snake's current length including growth
    getCurrentLength() {
        return this.length;
    }
    // Get display name with length
    getDisplayName() {
        return `${this.nickname} (${this.length})`;
    }
    // Get snake's total length
    getTotalLength() {
        return this.length;
    }
    // Check if boosting is allowed (for UI feedback)
    canBoost() {
        return this.length > GAME_CONFIG.INITIAL_SNAKE_LENGTH;
    }
}
//# sourceMappingURL=Snake.js.map