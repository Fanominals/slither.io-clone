import { Vector2D } from '../../common/constants.js';

export class Input {
    private canvas: HTMLCanvasElement;
    private mousePosition: Vector2D = { x: 0, y: 0 };
    private isMouseInCanvas: boolean = false;
    private eventListeners: Array<() => void> = [];
    private isBoostingState: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const handleMouseMove = (event: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        };

        const handleMouseEnter = () => {
            this.isMouseInCanvas = true;
        };

        const handleMouseLeave = () => {
            this.isMouseInCanvas = false;
        };

        const handleMouseDown = (event: MouseEvent) => {
            if (event.button === 0) { // Left mouse button
                this.isBoostingState = true;
            }
        };

        const handleMouseUp = (event: MouseEvent) => {
            if (event.button === 0) { // Left mouse button
                this.isBoostingState = false;
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                this.isBoostingState = true;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                this.isBoostingState = false;
            }
        };

        // Add event listeners and store references for cleanup
        this.canvas.addEventListener('mousemove', handleMouseMove);
        this.canvas.addEventListener('mouseenter', handleMouseEnter);
        this.canvas.addEventListener('mouseleave', handleMouseLeave);
        this.canvas.addEventListener('mousedown', handleMouseDown);
        this.canvas.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Store cleanup functions
        this.eventListeners.push(() => {
            this.canvas.removeEventListener('mousemove', handleMouseMove);
            this.canvas.removeEventListener('mouseenter', handleMouseEnter);
            this.canvas.removeEventListener('mouseleave', handleMouseLeave);
            this.canvas.removeEventListener('mousedown', handleMouseDown);
            this.canvas.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        });
    }

    // Get current mouse position relative to canvas
    getMousePosition(): Vector2D {
        return { ...this.mousePosition };
    }

    // Check if mouse is currently over the canvas
    isMouseOver(): boolean {
        return this.isMouseInCanvas;
    }

    // Calculate angle from player position to mouse position
    getAngleToMouse(playerPosition: Vector2D): number {
        const dx = this.mousePosition.x - playerPosition.x;
        const dy = this.mousePosition.y - playerPosition.y;
        return Math.atan2(dy, dx);
    }

    // Calculate direction vector from player to mouse (normalized)
    getDirectionToMouse(playerPosition: Vector2D): Vector2D {
        const dx = this.mousePosition.x - playerPosition.x;
        const dy = this.mousePosition.y - playerPosition.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        if (length === 0) {
            return { x: 0, y: 0 };
        }
        
        return {
            x: dx / length,
            y: dy / length
        };
    }

    // Get distance from player to mouse position
    getDistanceToMouse(playerPosition: Vector2D): number {
        const dx = this.mousePosition.x - playerPosition.x;
        const dy = this.mousePosition.y - playerPosition.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Set mouse position manually (useful for testing)
    setMousePosition(x: number, y: number): void {
        this.mousePosition = { x, y };
    }

    // Check if mouse is within a certain radius of a point
    isMouseNear(point: Vector2D, radius: number): boolean {
        const distance = this.getDistanceToMouse(point);
        return distance <= radius;
    }

    // Cleanup event listeners
    destroy(): void {
        this.eventListeners.forEach(cleanup => cleanup());
        this.eventListeners = [];
    }

    // Handle canvas resize
    onCanvasResize(): void {
        // Update any canvas-related calculations if needed
        // For now, mouse position calculation is handled by getBoundingClientRect
    }

    // Check if the player is currently boosting
    isBoosting(): boolean {
        return this.isBoostingState;
    }
} 