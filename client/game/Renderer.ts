import { ClientSnake } from './Snake.js';
import { ClientFood } from './Food.js';
import { Camera } from './Camera.js';
import { GAME_CONFIG, Vector2D } from '../../common/constants.js';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private camera: Camera;
    private gridPattern: HTMLCanvasElement | null = null;

    constructor(canvas: HTMLCanvasElement, camera: Camera) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.camera = camera;
        
        // Set up canvas properties
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        
        this.createGridPattern();
    }

    // Create hexagonal grid pattern
    private createGridPattern(): void {
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d')!;
        
        // Set pattern size
        const size = GAME_CONFIG.GRID_SIZE;
        patternCanvas.width = size;
        patternCanvas.height = size;
        
        // Draw hexagonal grid cell
        patternCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        patternCtx.lineWidth = 1;
        patternCtx.beginPath();
        
        // Create hexagon
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 3;
        
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                patternCtx.moveTo(x, y);
            } else {
                patternCtx.lineTo(x, y);
            }
        }
        
        patternCtx.closePath();
        patternCtx.stroke();
        
        this.gridPattern = patternCanvas;
    }

    // Clear the canvas
    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Set up camera transformation
    private applyCameraTransform(): void {
        const transform = this.camera.getTransform();
        this.ctx.setTransform(
            transform.scale, 0, 0, transform.scale,
            transform.translateX, transform.translateY
        );
    }

    // Reset camera transformation
    private resetTransform(): void {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Draw hexagonal grid background
    drawGrid(): void {
        if (!this.gridPattern) return;
        
        this.applyCameraTransform();
        
        const bounds = this.camera.getVisibleBounds();
        const gridSize = GAME_CONFIG.GRID_SIZE;
        
        // Calculate grid bounds
        const startX = Math.floor(bounds.left / gridSize) * gridSize;
        const startY = Math.floor(bounds.top / gridSize) * gridSize;
        const endX = Math.ceil(bounds.right / gridSize) * gridSize;
        const endY = Math.ceil(bounds.bottom / gridSize) * gridSize;
        
        // Create pattern
        const pattern = this.ctx.createPattern(this.gridPattern, 'repeat');
        if (pattern) {
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(startX, startY, endX - startX, endY - startY);
        }
    }

    // Draw world boundaries
    drawWorldBoundaries(): void {
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
    drawSnake(snake: ClientSnake): void {
        if (!snake.alive) return;
        
        this.applyCameraTransform();
        
        const segments = snake.getInterpolatedSegments();
        if (segments.length === 0) return;
        
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
            } else {
                // Body with gradient effect
                const alpha = 0.9 - (i / segments.length) * 0.3;
                this.ctx.fillStyle = snake.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                this.ctx.lineWidth = 1;
            }
            
            // Draw segment
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
    private drawSnakeEyes(headSegment: any, angle: number): void {
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
        this.ctx.arc(
            headSegment.x + eyeOffsetX + perpX,
            headSegment.y + eyeOffsetY + perpY,
            eyeSize, 0, Math.PI * 2
        );
        this.ctx.fill();
        
        // Right eye
        this.ctx.beginPath();
        this.ctx.arc(
            headSegment.x + eyeOffsetX - perpX,
            headSegment.y + eyeOffsetY - perpY,
            eyeSize, 0, Math.PI * 2
        );
        this.ctx.fill();
        
        // Eye pupils
        this.ctx.fillStyle = 'black';
        const pupilSize = eyeSize * 0.6;
        
        // Left pupil
        this.ctx.beginPath();
        this.ctx.arc(
            headSegment.x + eyeOffsetX + perpX,
            headSegment.y + eyeOffsetY + perpY,
            pupilSize, 0, Math.PI * 2
        );
        this.ctx.fill();
        
        // Right pupil
        this.ctx.beginPath();
        this.ctx.arc(
            headSegment.x + eyeOffsetX - perpX,
            headSegment.y + eyeOffsetY - perpY,
            pupilSize, 0, Math.PI * 2
        );
        this.ctx.fill();
    }

    // Draw snake name and score
    private drawSnakeName(snake: ClientSnake): void {
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
        this.ctx.fillRect(
            screenPos.x - textWidth / 2 - 4,
            screenPos.y - snake.thickness * this.camera.getZoom() - fontSize - 8,
            textWidth + 8,
            fontSize + 4
        );
        
        // Draw text
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(
            text,
            screenPos.x,
            screenPos.y - snake.thickness * this.camera.getZoom() - 4
        );
    }

    // Draw a single food particle
    drawFood(food: ClientFood): void {
        this.applyCameraTransform();
        
        const size = food.getAnimatedSize();
        
        // Glow effect
        const gradient = this.ctx.createRadialGradient(
            food.x, food.y, 0,
            food.x, food.y, size * 2
        );
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
        this.ctx.arc(
            food.x - size * 0.3,
            food.y - size * 0.3,
            size * 0.3,
            0, Math.PI * 2
        );
        this.ctx.fill();
    }

    // Draw UI elements (score, etc.)
    drawUI(localPlayer: ClientSnake | null): void {
        this.resetTransform();
        
        if (localPlayer) {
            // Draw score
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.textBaseline = 'top';
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(10, 10, 200, 40);
            
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`Score: ${localPlayer.score}`, 20, 20);
            
            // Draw length
            this.ctx.fillText(`Length: ${localPlayer.getCurrentLength()}`, 20, 50);
        }
        
        // Draw connection status if disconnected
        // (This would be handled by the main game loop)
    }

    // Draw loading screen
    drawLoading(): void {
        this.resetTransform();
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(
            'Connecting...',
            this.canvas.width / 2,
            this.canvas.height / 2
        );
    }

    // Resize canvas
    resize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
        this.camera.setSize(width, height);
        
        // Reapply canvas properties after resize
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }
} 