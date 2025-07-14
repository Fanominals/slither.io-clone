// Game Configuration Constants
export const GAME_CONFIG = {
    WORLD_WIDTH: 4000,
    WORLD_HEIGHT: 4000,
    INITIAL_SNAKE_LENGTH: 3,
    INITIAL_SNAKE_THICKNESS: 30,
    SNAKE_SPEED: 200, // pixels per second
    SNAKE_BOOST_SPEED: 350, // boost speed in pixels per second
    FOOD_SIZE: 8,
    FOOD_ATTRACTION_RADIUS: 50, // Radius where food starts gravitating towards snake head  
    FOOD_CONSUMPTION_DISTANCE: 8, // Distance at which food gets consumed (much smaller)
    FOOD_COUNT: 800,
    GRID_SIZE: 40,
    TICK_RATE: 30, // server updates per second
    CAMERA_SMOOTH_FACTOR: 0.1,
    ZOOM_MIN: 0.65,
    ZOOM_MAX: 1.2,
    ZOOM_SCALE_FACTOR: 0.8, // How much zoom changes with snake size
    THICKNESS_SCALE_FACTOR: 0.15, // How much thickness increases with length
    SEGMENT_SPACING: 12,
    FOOD_MASS_MIN: 1,
    FOOD_MASS_MAX: 2,
    MASS_PER_SEGMENT: 3, // How much mass is needed to grow one segment
    DEATH_FOOD_MULTIPLIER: 0.7, // How much food is dropped when snake dies
    INTERPOLATION_FACTOR: 0.15,
    BORDER_WIDTH: 50, // Width of the red kill border
    SNAKE_TURN_RATE: 4 // max turn rate in radians per second
};
// Socket.IO Event Names
export const SOCKET_EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    JOIN_GAME: 'join_game',
    LEAVE_GAME: 'leave_game',
    PLAYER_MOVE: 'player_move',
    GAME_STATE: 'game_state',
    SNAKE_DIED: 'snake_died',
    FOOD_EATEN: 'food_eaten',
    PLAYER_JOINED: 'player_joined',
    PLAYER_LEFT: 'player_left'
};
// Network Update Types
export const UPDATE_TYPES = {
    FULL_STATE: 'full_state',
    DELTA_STATE: 'delta_state',
    PLAYER_UPDATE: 'player_update',
    FOOD_UPDATE: 'food_update'
};
// Utility Functions
export function generateRandomColor() {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#F4D03F'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
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