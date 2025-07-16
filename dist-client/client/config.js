// Client-side configuration
export const CLIENT_CONFIG = {
    // This will be populated from the server
    GOOGLE_CLIENT_ID: ''
};
// Function to load configuration from server
export async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        if (response.ok) {
            const config = await response.json();
            CLIENT_CONFIG.GOOGLE_CLIENT_ID = config.googleClientId;
        }
    }
    catch (error) {
        console.error('Failed to load configuration:', error);
    }
}
//# sourceMappingURL=config.js.map