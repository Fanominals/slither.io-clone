import { privyConfig, PRIVY_APP_ID } from '../privy-config.js';
import { privyIntegrationService } from './PrivyIntegrationService.js';
export class PrivyProvider {
    constructor() {
        this.privyClient = null;
        this.currentUser = null;
        this.isInitialized = false;
    }
    static getInstance() {
        if (!PrivyProvider.instance) {
            PrivyProvider.instance = new PrivyProvider();
        }
        return PrivyProvider.instance;
    }
    async initialize() {
        try {
            if (!window.Privy) {
                throw new Error('Privy SDK not loaded');
            }
            console.log('🚀 Initializing Privy with App ID:', PRIVY_APP_ID);
            // Initialize Privy client
            this.privyClient = window.Privy.createPrivyClient({
                appId: PRIVY_APP_ID,
                config: {
                    appearance: privyConfig.appearance,
                    loginMethods: privyConfig.loginMethods,
                    embeddedWallets: {
                        createOnLogin: 'users-without-wallets',
                        requireUserPasswordOnCreate: false,
                    },
                    mfa: privyConfig.mfa,
                },
            });
            // Set up authentication state listener
            this.privyClient.onAuthStateChange((user) => {
                if (user) {
                    this.handleUserLogin(user);
                }
                else {
                    this.handleUserLogout();
                }
            });
            this.isInitialized = true;
            console.log('✅ Privy initialization successful');
        }
        catch (error) {
            console.error('❌ Privy initialization failed:', error);
            throw error;
        }
    }
    async handleUserLogin(user) {
        try {
            // Convert Privy user to our PrivyUser interface
            this.currentUser = {
                id: user.id,
                linkedAccounts: user.linkedAccounts || [],
                embeddedWallet: user.wallet ? {
                    address: user.wallet.address
                } : undefined
            };
            console.log('👤 User logged in:', this.currentUser.id);
            // If user has embedded wallet, initialize integration
            if (this.currentUser.embeddedWallet?.address) {
                console.log('💼 Embedded wallet found:', this.currentUser.embeddedWallet.address);
                await privyIntegrationService.initializeIntegration(this.currentUser);
            }
            else {
                console.log('⏳ Creating embedded wallet...');
                await this.createEmbeddedWallet();
            }
        }
        catch (error) {
            console.error('❌ Error handling user login:', error);
        }
    }
    handleUserLogout() {
        console.log('👋 User logged out');
        this.currentUser = null;
        privyIntegrationService.resetIntegration();
    }
    async login() {
        if (!this.isInitialized || !this.privyClient) {
            throw new Error('Privy not initialized');
        }
        try {
            console.log('🔐 Initiating Privy login...');
            await this.privyClient.login();
        }
        catch (error) {
            console.error('❌ Login failed:', error);
            throw error;
        }
    }
    async logout() {
        if (!this.isInitialized || !this.privyClient) {
            return;
        }
        try {
            await this.privyClient.logout();
        }
        catch (error) {
            console.error('❌ Logout failed:', error);
        }
    }
    async createEmbeddedWallet() {
        if (!this.privyClient || !this.currentUser) {
            return null;
        }
        try {
            console.log('💼 Creating embedded wallet...');
            const wallet = await this.privyClient.createWallet();
            if (wallet?.address) {
                // Update current user with new wallet
                this.currentUser.embeddedWallet = {
                    address: wallet.address
                };
                console.log('✅ Embedded wallet created:', wallet.address);
                // Initialize integration with the new wallet
                await privyIntegrationService.initializeIntegration(this.currentUser);
                return wallet.address;
            }
            return null;
        }
        catch (error) {
            console.error('❌ Failed to create embedded wallet:', error);
            return null;
        }
    }
    isAuthenticated() {
        return this.privyClient?.authenticated || false;
    }
    getCurrentUser() {
        return this.currentUser;
    }
    getWalletAddress() {
        return this.currentUser?.embeddedWallet?.address || null;
    }
    isReady() {
        return this.isInitialized;
    }
}
export const privyProvider = PrivyProvider.getInstance();
//# sourceMappingURL=PrivyProvider.js.map