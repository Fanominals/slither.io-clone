import { Vector2D } from '../../common/constants.js';
export declare class Camera {
    x: number;
    y: number;
    zoom: number;
    targetX: number;
    targetY: number;
    targetZoom: number;
    width: number;
    height: number;
    private velocityX;
    private velocityY;
    private velocityZoom;
    constructor(width: number, height: number);
    update(deltaTime: number): void;
    followTarget(target: Vector2D, snakeLength: number): void;
    snapToTarget(target: Vector2D, snakeLength: number): void;
    worldToScreen(worldPos: Vector2D): Vector2D;
    screenToWorld(screenPos: Vector2D): Vector2D;
    getVisibleBounds(): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    isVisible(worldPos: Vector2D, radius?: number): boolean;
    setSize(width: number, height: number): void;
    getTransform(): {
        translateX: number;
        translateY: number;
        scale: number;
    };
    zoomTo(targetZoom: number): void;
    getZoom(): number;
    getCenter(): Vector2D;
}
