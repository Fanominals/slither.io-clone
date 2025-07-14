import { GAME_CONFIG } from '../../common/constants.js';
export class Renderer {
    // Remove gridPattern and pattern canvas logic. Draw honeycomb directly in drawGrid.
    constructor(canvas, camera) {
        this.gridPattern = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.camera = camera;
        // Set up canvas properties for smooth rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        // No gridPattern or createGridPattern
        this.createGridPattern();
    }
    // Create a seamless honeycomb pattern tile using the 3D hex style
    createGridPattern() {
        const size = GAME_CONFIG.GRID_SIZE * 1.15;
        const hexWidth = size;
        const hexHeight = size * Math.sqrt(3);
        const vertSpacing = hexHeight * 0.55;
        // Pattern canvas: width = hexWidth, height = vertSpacing * 2 (covers two rows for seamless tiling)
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');
        patternCanvas.width = hexWidth;
        patternCanvas.height = vertSpacing * 2;
        // Draw two rows: even row at y=vertSpacing/2, odd row at y=1.5*vertSpacing (offset by half a hex)
        for (let row = 0; row < 2; row++) {
            const y = vertSpacing / 2 + row * vertSpacing;
            const x = row % 2 === 0 ? hexWidth / 2 : 0;
            // Even row: center hex
            if (row % 2 === 0) {
                this.draw3DHex(patternCtx, this.getHexPoints(hexWidth / 2, y, size), hexWidth / 2, y, true);
            }
            else {
                // Odd row: left and right hexes
                this.draw3DHex(patternCtx, this.getHexPoints(0, y, size), 0, y, true);
                this.draw3DHex(patternCtx, this.getHexPoints(hexWidth, y, size), hexWidth, y, true);
            }
        }
        this.gridPattern = patternCanvas;
    }
    // Remove createGridPattern and all gridPattern logic
    // Helper to draw a 3D hexagon with shadow, gradient, and highlight
    draw3DHex(ctx, points, centerX, centerY, background = false) {
        const radius = GAME_CONFIG.GRID_SIZE * 1.15 / 2 * 0.97;
        // Outer shadow
        ctx.save();
        ctx.shadowColor = '#000b';
        ctx.shadowBlur = background ? 6 : 16; // Lower blur for background
        ctx.beginPath();
        points.forEach((pt, i) => {
            if (i === 0)
                ctx.moveTo(pt.x, pt.y);
            else
                ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.fillStyle = '#232a33';
        ctx.fill();
        ctx.restore();
        // Gradient fill
        const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius);
        grad.addColorStop(0, '#2c3440');
        grad.addColorStop(0.5, '#232a33');
        grad.addColorStop(1, '#181c22');
        ctx.beginPath();
        points.forEach((pt, i) => {
            if (i === 0)
                ctx.moveTo(pt.x, pt.y);
            else
                ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 1;
        // Inner highlight (top-left edge)
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            const pt = points[i];
            if (i === 0)
                ctx.moveTo(pt.x, pt.y);
            else
                ctx.lineTo(pt.x, pt.y);
        }
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(120,180,255,0.18)';
        ctx.shadowColor = '#8fd6ff';
        ctx.shadowBlur = background ? 2 : 8;
        ctx.stroke();
        ctx.restore();
        // Hex border
        ctx.beginPath();
        points.forEach((pt, i) => {
            if (i === 0)
                ctx.moveTo(pt.x, pt.y);
            else
                ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#22282f';
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    // Clear the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // Set up camera transformation
    applyCameraTransform() {
        const transform = this.camera.getTransform();
        this.ctx.setTransform(transform.scale, 0, 0, transform.scale, transform.translateX, transform.translateY);
    }
    // Reset camera transformation
    resetTransform() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    // Draw hexagonal honeycomb grid background using the pattern
    drawGrid() {
        this.applyCameraTransform();
        const gridSize = GAME_CONFIG.GRID_SIZE * 1.15;
        const hexWidth = gridSize;
        const hexHeight = gridSize * Math.sqrt(3);
        const vertSpacing = hexHeight * 0.55;
        const bounds = this.camera.getVisibleBounds();
        // Calculate grid bounds
        const startX = Math.floor(bounds.left / hexWidth) * hexWidth;
        const startY = Math.floor(bounds.top / vertSpacing) * vertSpacing;
        const endX = Math.ceil(bounds.right / hexWidth) * hexWidth;
        const endY = Math.ceil(bounds.bottom / vertSpacing) * vertSpacing;
        // Optional: background gradient
        this.resetTransform();
        const grad = this.ctx.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.15, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.7);
        grad.addColorStop(0, '#232a33');
        grad.addColorStop(1, '#10141a');
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.applyCameraTransform();
        // Draw the pattern
        if (this.gridPattern) {
            const pattern = this.ctx.createPattern(this.gridPattern, 'repeat');
            if (pattern) {
                this.ctx.globalAlpha = 0.92;
                this.ctx.fillStyle = pattern;
                this.ctx.fillRect(startX, startY, endX - startX, endY - startY);
                this.ctx.globalAlpha = 1;
            }
        }
    }
    // Helper to get hex points for a given center and size
    getHexPoints(cx, cy, size) {
        const radius = size / 2 * 0.97;
        const pts = [];
        for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 2 + i * Math.PI / 3;
            pts.push({
                x: cx + Math.cos(angle) * radius,
                y: cy + Math.sin(angle) * radius
            });
        }
        return pts;
    }
    // Draw world boundaries
    drawWorldBoundaries() {
        this.applyCameraTransform();
        const borderWidth = GAME_CONFIG.BORDER_WIDTH;
        // Draw red kill border around the edges
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        // Top border
        this.ctx.fillRect(-borderWidth, -borderWidth, GAME_CONFIG.WORLD_WIDTH + 2 * borderWidth, borderWidth);
        // Bottom border
        this.ctx.fillRect(-borderWidth, GAME_CONFIG.WORLD_HEIGHT, GAME_CONFIG.WORLD_WIDTH + 2 * borderWidth, borderWidth);
        // Left border
        this.ctx.fillRect(-borderWidth, 0, borderWidth, GAME_CONFIG.WORLD_HEIGHT);
        // Right border
        this.ctx.fillRect(GAME_CONFIG.WORLD_WIDTH, 0, borderWidth, GAME_CONFIG.WORLD_HEIGHT);
        // Draw world boundary line
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, GAME_CONFIG.WORLD_WIDTH, GAME_CONFIG.WORLD_HEIGHT);
    }
    // Draw a single snake
    drawSnake(snake) {
        if (!snake.alive)
            return;
        this.applyCameraTransform();
        const segments = snake.getInterpolatedSegments();
        if (segments.length === 0)
            return;
        // Enable better anti-aliasing for smoother rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        // Draw body segments
        for (let i = segments.length - 1; i >= 0; i--) {
            const segment = segments[i];
            const isHead = i === 0;
            // Set colors
            if (isHead) {
                // Head with slight glow
                this.ctx.fillStyle = snake.color;
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.lineWidth = 2;
            }
            else {
                // Body with gradient effect
                const alpha = 0.9 - (i / segments.length) * 0.3;
                this.ctx.fillStyle = snake.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                this.ctx.lineWidth = 1;
            }
            // Draw segment with better anti-aliasing
            this.ctx.beginPath();
            this.ctx.arc(segment.x, segment.y, segment.radius, 0, Math.PI * 2);
            this.ctx.fill();
            if (isHead) {
                this.ctx.stroke();
                this.drawSnakeEyes(segment, snake.getInterpolatedAngle());
            }
        }
        // Draw snake name if it's visible and not the local player
        if (snake.isLocalPlayer || this.camera.getZoom() > 0.5) {
            this.drawSnakeName(snake);
        }
    }
    // Draw snake eyes
    drawSnakeEyes(headSegment, angle) {
        const eyeSize = headSegment.radius * 0.15;
        const eyeDistance = headSegment.radius * 0.4;
        // Calculate eye positions
        const eyeOffsetX = Math.cos(angle) * eyeDistance;
        const eyeOffsetY = Math.sin(angle) * eyeDistance;
        const perpX = -Math.sin(angle) * eyeDistance * 0.5;
        const perpY = Math.cos(angle) * eyeDistance * 0.5;
        // Draw eyes
        this.ctx.fillStyle = 'white';
        // Left eye
        this.ctx.beginPath();
        this.ctx.arc(headSegment.x + eyeOffsetX + perpX, headSegment.y + eyeOffsetY + perpY, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();
        // Right eye
        this.ctx.beginPath();
        this.ctx.arc(headSegment.x + eyeOffsetX - perpX, headSegment.y + eyeOffsetY - perpY, eyeSize, 0, Math.PI * 2);
        this.ctx.fill();
        // Eye pupils
        this.ctx.fillStyle = 'black';
        const pupilSize = eyeSize * 0.6;
        // Left pupil
        this.ctx.beginPath();
        this.ctx.arc(headSegment.x + eyeOffsetX + perpX, headSegment.y + eyeOffsetY + perpY, pupilSize, 0, Math.PI * 2);
        this.ctx.fill();
        // Right pupil
        this.ctx.beginPath();
        this.ctx.arc(headSegment.x + eyeOffsetX - perpX, headSegment.y + eyeOffsetY - perpY, pupilSize, 0, Math.PI * 2);
        this.ctx.fill();
    }
    // Draw snake name and score
    drawSnakeName(snake) {
        const headPos = snake.getHeadPosition();
        const screenPos = this.camera.worldToScreen(headPos);
        this.resetTransform();
        const fontSize = Math.max(12, 16 * this.camera.getZoom());
        this.ctx.font = `bold ${fontSize}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';
        const text = snake.getDisplayName();
        const textWidth = this.ctx.measureText(text).width;
        // Draw background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(screenPos.x - textWidth / 2 - 4, screenPos.y - snake.thickness * this.camera.getZoom() - fontSize - 8, textWidth + 8, fontSize + 4);
        // Draw text
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(text, screenPos.x, screenPos.y - snake.thickness * this.camera.getZoom() - 4);
    }
    // Draw a single food particle
    drawFood(food) {
        this.applyCameraTransform();
        const size = food.getAnimatedSize();
        // Glow effect
        const gradient = this.ctx.createRadialGradient(food.x, food.y, 0, food.x, food.y, size * 2);
        gradient.addColorStop(0, food.color);
        gradient.addColorStop(0.7, food.getRenderColor());
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(food.x, food.y, size * 2, 0, Math.PI * 2);
        this.ctx.fill();
        // Main food particle
        this.ctx.fillStyle = food.color;
        this.ctx.beginPath();
        this.ctx.arc(food.x, food.y, size, 0, Math.PI * 2);
        this.ctx.fill();
        // Highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.beginPath();
        this.ctx.arc(food.x - size * 0.3, food.y - size * 0.3, size * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    // Draw UI elements (score, etc.)
    drawUI(localPlayer) {
        this.resetTransform();
        // No score or length drawing here; handled by HTML HUD
    }
    // Draw loading screen
    drawLoading() {
        this.resetTransform();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Connecting...', this.canvas.width / 2, this.canvas.height / 2);
    }
    // Draw minimap in the bottom right
    drawMinimap(players, localPlayerId) {
        const minimap = document.getElementById('minimap');
        if (!minimap)
            return;
        const ctx = minimap.getContext('2d');
        const w = minimap.width;
        const h = minimap.height;
        ctx.clearRect(0, 0, w, h);
        // Draw background
        ctx.fillStyle = 'rgba(20,20,30,0.82)';
        ctx.fillRect(0, 0, w, h);
        // Draw world border (subtle gray or white, not red)
        const border = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth = 2;
        ctx.strokeRect(border, border, w - 2 * border, h - 2 * border);
        // World to minimap scale
        const scaleX = (w - 2 * border) / GAME_CONFIG.WORLD_WIDTH;
        const scaleY = (h - 2 * border) / GAME_CONFIG.WORLD_HEIGHT;
        // Draw all players as red dots
        for (const [id, player] of players) {
            if (!player.alive)
                continue;
            const x = border + player.x * scaleX;
            const y = border + player.y * scaleY;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = (id === localPlayerId) ? '#4ecdc4' : '#ff3b3b';
            ctx.shadowColor = (id === localPlayerId) ? '#4ecdc4' : '#ff3b3b';
            ctx.shadowBlur = (id === localPlayerId) ? 8 : 4;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    // Resize canvas
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.camera.setSize(width, height);
        // Reapply canvas properties after resize
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }
}
//# sourceMappingURL=Renderer.js.map