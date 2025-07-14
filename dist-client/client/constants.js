// Client-specific constants (ES modules)
export const GAME_CONFIG = {
    WORLD_WIDTH: 4000,
    WORLD_HEIGHT: 4000,
    CAMERA_SMOOTH_FACTOR: 0.1,
    ZOOM_MIN: 0.65,
    ZOOM_MAX: 1.2,
    ZOOM_SCALE_FACTOR: 0.8,
    INTERPOLATION_FACTOR: 0.15
};
// Utility functions for client
export function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
export function normalizeAngle(angle) {
    while (angle > Math.PI)
        angle -= 2 * Math.PI;
    while (angle < -Math.PI)
        angle += 2 * Math.PI;
    return angle;
}
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export function lerp(a, b, t) {
    return a + (b - a) * t;
}
//# sourceMappingURL=constants.js.map