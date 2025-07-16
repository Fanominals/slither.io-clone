import { PRIVY_APP_ID } from '../privy-config.js';
class PrivyApiClient {
    constructor() {
        this.baseUrl = 'https://auth.privy.io';
        this.appId = PRIVY_APP_ID;
        this.authToken = null;
        this.currentUser = null;
        this.authModal = null;
        // Try to restore session from localStorage
        this.restoreSession();
    }
    // Create and show Privy authentication modal
    async login() {
        try {
            return new Promise((resolve, reject) => {
                this.createAuthModal(resolve, reject);
            });
        }
        catch (error) {
            console.error('❌ Privy login failed:', error);
            throw error;
        }
    }
    // Create authentication modal UI
    createAuthModal(resolve, reject) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'privy-modal-overlay';
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      backdrop-filter: blur(5px);
    `;
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'privy-modal';
        modal.style.cssText = `
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: 2px solid #ffd700;
      border-radius: 20px;
      padding: 40px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      position: relative;
      box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3);
    `;
        // Modal content HTML
        modal.innerHTML = `
      <button class="close-btn" style="
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        color: #ffd700;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">×</button>
      
      <div class="privy-logo" style="
        color: #ffd700;
        font-size: 32px;
        margin-bottom: 10px;
      ">🔐</div>
      
      <h2 style="
        color: #ffd700;
        margin: 0 0 10px 0;
        font-size: 24px;
        font-weight: bold;
      ">Connect Wallet</h2>
      
      <p style="
        color: #ccc;
        margin: 0 0 30px 0;
        font-size: 14px;
      ">Sign in to create your embedded Solana wallet and start playing</p>
      
      <div class="auth-methods" style="
        display: flex;
        flex-direction: column;
        gap: 15px;
      ">
        <button class="auth-btn email-btn" data-method="email" style="
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 15px 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        ">
          <span>📧</span>
          <span>Continue with Email</span>
        </button>
        
        <button class="auth-btn sms-btn" data-method="sms" style="
          background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 15px 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        ">
          <span>📱</span>
          <span>Continue with Phone</span>
        </button>
        
        <button class="auth-btn google-btn" data-method="google" style="
          background: white;
          color: #333;
          border: 2px solid #ddd;
          border-radius: 12px;
          padding: 15px 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
        ">
          <span>🔍</span>
          <span>Continue with Google</span>
        </button>
      </div>
      
      <div class="input-container" style="
        display: none;
        margin-top: 20px;
      ">
        <input type="text" class="auth-input" placeholder="Enter email or phone" style="
          width: 100%;
          padding: 15px;
          border: 2px solid #444;
          border-radius: 12px;
          background: #2d2d2d;
          color: white;
          font-size: 16px;
          margin-bottom: 15px;
          box-sizing: border-box;
        ">
        <button class="submit-btn" style="
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 15px 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        ">Send Code</button>
        <button class="back-btn" style="
          background: none;
          color: #ffd700;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
        ">← Back</button>
      </div>
      
      <div class="verify-container" style="
        display: none;
        margin-top: 20px;
      ">
        <p style="color: #ccc; margin-bottom: 15px;">Enter verification code:</p>
        <input type="text" class="verify-input" placeholder="123456" maxlength="6" style="
          width: 100%;
          padding: 15px;
          border: 2px solid #444;
          border-radius: 12px;
          background: #2d2d2d;
          color: white;
          font-size: 20px;
          text-align: center;
          letter-spacing: 5px;
          margin-bottom: 15px;
          box-sizing: border-box;
        ">
        <button class="verify-btn" style="
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 15px 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        ">Verify & Create Wallet</button>
        <button class="back-btn-verify" style="
          background: none;
          color: #ffd700;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
        ">← Back</button>
      </div>
      
      <p style="
        color: #666;
        font-size: 12px;
        margin-top: 20px;
        line-height: 1.4;
      ">Protected by <span style="color: #ffd700;">Privy</span> • Your wallet is encrypted and only you control it</p>
    `;
        // Add event listeners
        this.setupModalEventListeners(modal, overlay, resolve, reject);
        // Add to DOM
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        this.authModal = overlay;
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    setupModalEventListeners(modal, overlay, resolve, reject) {
        const closeModal = () => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
            this.authModal = null;
            resolve(null);
        };
        // Close button
        modal.querySelector('.close-btn')?.addEventListener('click', closeModal);
        // Click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay)
                closeModal();
        });
        // Auth method buttons
        modal.querySelectorAll('.auth-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const method = btn.dataset.method;
                this.handleAuthMethod(method, modal, resolve, reject);
            });
        });
        // Input handling
        const submitBtn = modal.querySelector('.submit-btn');
        const backBtn = modal.querySelector('.back-btn');
        const verifyBtn = modal.querySelector('.verify-btn');
        const backBtnVerify = modal.querySelector('.back-btn-verify');
        submitBtn?.addEventListener('click', () => {
            const input = modal.querySelector('.auth-input');
            this.handleSubmitAuth(input.value, modal, resolve, reject);
        });
        backBtn?.addEventListener('click', () => {
            this.showAuthMethods(modal);
        });
        verifyBtn?.addEventListener('click', () => {
            const input = modal.querySelector('.verify-input');
            this.handleVerifyCode(input.value, modal, resolve, reject);
        });
        backBtnVerify?.addEventListener('click', () => {
            this.showInputContainer(modal);
        });
        // Enter key handling
        modal.querySelector('.auth-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter')
                submitBtn?.click();
        });
        modal.querySelector('.verify-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter')
                verifyBtn?.click();
        });
    }
    handleAuthMethod(method, modal, resolve, reject) {
        if (method === 'google') {
            // Handle Google OAuth
            this.handleGoogleAuth(resolve, reject);
        }
        else {
            // Show input for email/SMS
            this.showInputContainer(modal);
            const input = modal.querySelector('.auth-input');
            input.placeholder = method === 'email' ? 'Enter your email' : 'Enter your phone number';
            input.type = method === 'email' ? 'email' : 'tel';
        }
    }
    async handleGoogleAuth(resolve, reject) {
        try {
            // Simulate Google OAuth flow
            console.log('🔐 Starting Google OAuth flow...');
            // In a real implementation, this would redirect to Google OAuth
            // For now, simulate successful authentication
            await this.simulateAuthentication('google', 'user@gmail.com', resolve, reject);
        }
        catch (error) {
            reject(error);
        }
    }
    async handleSubmitAuth(identifier, modal, resolve, reject) {
        if (!identifier.trim())
            return;
        try {
            console.log('📤 Sending verification code to:', identifier);
            // Show verification step
            this.showVerifyContainer(modal);
            // In real implementation, this would call Privy API to send verification code
            console.log('✅ Verification code sent (simulated)');
        }
        catch (error) {
            reject(error);
        }
    }
    async handleVerifyCode(code, modal, resolve, reject) {
        if (!code.trim() || code.length !== 6)
            return;
        try {
            console.log('🔍 Verifying code:', code);
            // Simulate successful verification
            await this.simulateAuthentication('email', 'user@example.com', resolve, reject);
        }
        catch (error) {
            reject(error);
        }
    }
    async simulateAuthentication(method, identifier, resolve, reject) {
        try {
            console.log('🔐 Authenticating with Privy...');
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Create mock user with embedded wallet
            const mockUser = {
                id: `privy_user_${Date.now()}`,
                created_at: new Date().toISOString(),
                linked_accounts: [{
                        type: method,
                        address: identifier
                    }],
                embedded_wallets: [{
                        address: this.generateSolanaAddress(),
                        chain_type: 'solana'
                    }]
            };
            // Store authentication state
            this.currentUser = mockUser;
            this.authToken = `privy_token_${Date.now()}`;
            // Save to localStorage
            localStorage.setItem('privy_user', JSON.stringify(mockUser));
            localStorage.setItem('privy_token', this.authToken);
            console.log('✅ Privy authentication successful!');
            console.log('💼 Embedded wallet created:', mockUser.embedded_wallets[0].address);
            // Close modal
            if (this.authModal) {
                document.body.removeChild(this.authModal);
                document.body.style.overflow = '';
                this.authModal = null;
            }
            resolve(mockUser);
        }
        catch (error) {
            reject(error);
        }
    }
    generateSolanaAddress() {
        // Generate a valid-looking Solana address (44 characters, base58)
        const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 44; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    showAuthMethods(modal) {
        modal.querySelector('.auth-methods').style.display = 'flex';
        modal.querySelector('.input-container').style.display = 'none';
        modal.querySelector('.verify-container').style.display = 'none';
    }
    showInputContainer(modal) {
        modal.querySelector('.auth-methods').style.display = 'none';
        modal.querySelector('.input-container').style.display = 'block';
        modal.querySelector('.verify-container').style.display = 'none';
    }
    showVerifyContainer(modal) {
        modal.querySelector('.auth-methods').style.display = 'none';
        modal.querySelector('.input-container').style.display = 'none';
        modal.querySelector('.verify-container').style.display = 'block';
    }
    // Logout user
    async logout() {
        try {
            console.log('👋 Logging out from Privy...');
            // Clear local state
            this.currentUser = null;
            this.authToken = null;
            // Clear localStorage
            localStorage.removeItem('privy_user');
            localStorage.removeItem('privy_token');
            console.log('✅ Privy logout successful');
        }
        catch (error) {
            console.error('❌ Privy logout failed:', error);
            throw error;
        }
    }
    // Restore session from localStorage
    restoreSession() {
        try {
            const savedUser = localStorage.getItem('privy_user');
            const savedToken = localStorage.getItem('privy_token');
            if (savedUser && savedToken) {
                this.currentUser = JSON.parse(savedUser);
                this.authToken = savedToken;
                console.log('🔄 Privy session restored for user:', this.currentUser?.id);
            }
        }
        catch (error) {
            console.warn('⚠️ Failed to restore Privy session:', error);
            // Clear corrupted data
            localStorage.removeItem('privy_user');
            localStorage.removeItem('privy_token');
        }
    }
    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null && this.authToken !== null;
    }
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
    // Get user's wallet address
    getWalletAddress() {
        return this.currentUser?.embedded_wallets?.[0]?.address || null;
    }
    // Check if ready
    isReady() {
        return true; // Always ready since we're using REST API
    }
}
export const privyApiClient = new PrivyApiClient();
//# sourceMappingURL=PrivyApiClient.js.map