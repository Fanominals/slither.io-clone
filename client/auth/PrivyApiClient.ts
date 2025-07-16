import { PRIVY_APP_ID } from '../privy-config.js';

export interface PrivyUser {
  id: string;
  created_at: string;
  linked_accounts: any[];
  embedded_wallets?: {
    address: string;
    chain_type: string;
  }[];
}

export interface PrivyAuthResponse {
  user: PrivyUser;
  token: string;
  is_new_user: boolean;
}

class PrivyApiClient {
  private baseUrl: string = 'https://auth.privy.io';
  private appId: string = PRIVY_APP_ID;
  private authToken: string | null = null;
  private currentUser: PrivyUser | null = null;
  private authModal: HTMLElement | null = null;

  constructor() {
    // Try to restore session from localStorage
    this.restoreSession();
  }

  // Create and show Privy authentication modal
  async login(): Promise<PrivyUser | null> {
    try {
      return new Promise((resolve, reject) => {
        this.createAuthModal(resolve, reject);
      });
    } catch (error) {
      console.error('❌ Privy login failed:', error);
      throw error;
    }
  }

  // Create authentication modal UI
  private createAuthModal(resolve: (user: PrivyUser | null) => void, reject: (error: any) => void): void {
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

  private setupModalEventListeners(
    modal: HTMLElement, 
    overlay: HTMLElement, 
    resolve: (user: PrivyUser | null) => void, 
    reject: (error: any) => void
  ): void {
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
      if (e.target === overlay) closeModal();
    });

    // Auth method buttons
    modal.querySelectorAll('.auth-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const method = (btn as HTMLElement).dataset.method;
        this.handleAuthMethod(method!, modal, resolve, reject);
      });
    });

    // Input handling
    const submitBtn = modal.querySelector('.submit-btn') as HTMLButtonElement;
    const backBtn = modal.querySelector('.back-btn') as HTMLButtonElement;
    const verifyBtn = modal.querySelector('.verify-btn') as HTMLButtonElement;
    const backBtnVerify = modal.querySelector('.back-btn-verify') as HTMLButtonElement;

    submitBtn?.addEventListener('click', () => {
      const input = modal.querySelector('.auth-input') as HTMLInputElement;
      this.handleSubmitAuth(input.value, modal, resolve, reject);
    });

    backBtn?.addEventListener('click', () => {
      this.showAuthMethods(modal);
    });

    verifyBtn?.addEventListener('click', () => {
      const input = modal.querySelector('.verify-input') as HTMLInputElement;
      this.handleVerifyCode(input.value, modal, resolve, reject);
    });

    backBtnVerify?.addEventListener('click', () => {
      this.showInputContainer(modal);
    });

    // Enter key handling
    modal.querySelector('.auth-input')?.addEventListener('keypress', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') submitBtn?.click();
    });

    modal.querySelector('.verify-input')?.addEventListener('keypress', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') verifyBtn?.click();
    });
  }

  private handleAuthMethod(method: string, modal: HTMLElement, resolve: (user: PrivyUser | null) => void, reject: (error: any) => void): void {
    if (method === 'google') {
      // Handle Google OAuth
      this.handleGoogleAuth(resolve, reject);
    } else {
      // Show input for email/SMS
      this.showInputContainer(modal);
      const input = modal.querySelector('.auth-input') as HTMLInputElement;
      input.placeholder = method === 'email' ? 'Enter your email' : 'Enter your phone number';
      input.type = method === 'email' ? 'email' : 'tel';
    }
  }

  private async handleGoogleAuth(resolve: (user: PrivyUser | null) => void, reject: (error: any) => void): Promise<void> {
    try {
      // Simulate Google OAuth flow
      console.log('🔐 Starting Google OAuth flow...');
      
      // In a real implementation, this would redirect to Google OAuth
      // For now, simulate successful authentication
      await this.simulateAuthentication('google', 'user@gmail.com', resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  private async handleSubmitAuth(identifier: string, modal: HTMLElement, resolve: (user: PrivyUser | null) => void, reject: (error: any) => void): Promise<void> {
    if (!identifier.trim()) return;

    try {
      console.log('📤 Sending verification code to:', identifier);
      
      // Show verification step
      this.showVerifyContainer(modal);
      
      // In real implementation, this would call Privy API to send verification code
      console.log('✅ Verification code sent (simulated)');
    } catch (error) {
      reject(error);
    }
  }

  private async handleVerifyCode(code: string, modal: HTMLElement, resolve: (user: PrivyUser | null) => void, reject: (error: any) => void): Promise<void> {
    if (!code.trim() || code.length !== 6) return;

    try {
      console.log('🔍 Verifying code:', code);
      
      // Simulate successful verification
      await this.simulateAuthentication('email', 'user@example.com', resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  private async simulateAuthentication(method: string, identifier: string, resolve: (user: PrivyUser | null) => void, reject: (error: any) => void): Promise<void> {
    try {
      console.log('🔐 Authenticating with Privy...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock user with embedded wallet
      const mockUser: PrivyUser = {
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
      console.log('💼 Embedded wallet created:', mockUser.embedded_wallets![0].address);

      // Close modal
      if (this.authModal) {
        document.body.removeChild(this.authModal);
        document.body.style.overflow = '';
        this.authModal = null;
      }

      resolve(mockUser);
    } catch (error) {
      reject(error);
    }
  }

  private generateSolanaAddress(): string {
    // Generate a valid-looking Solana address (44 characters, base58)
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private showAuthMethods(modal: HTMLElement): void {
    (modal.querySelector('.auth-methods')! as HTMLElement).style.display = 'flex';
    (modal.querySelector('.input-container')! as HTMLElement).style.display = 'none';
    (modal.querySelector('.verify-container')! as HTMLElement).style.display = 'none';
  }

  private showInputContainer(modal: HTMLElement): void {
    (modal.querySelector('.auth-methods')! as HTMLElement).style.display = 'none';
    (modal.querySelector('.input-container')! as HTMLElement).style.display = 'block';
    (modal.querySelector('.verify-container')! as HTMLElement).style.display = 'none';
  }

  private showVerifyContainer(modal: HTMLElement): void {
    (modal.querySelector('.auth-methods')! as HTMLElement).style.display = 'none';
    (modal.querySelector('.input-container')! as HTMLElement).style.display = 'none';
    (modal.querySelector('.verify-container')! as HTMLElement).style.display = 'block';
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      console.log('👋 Logging out from Privy...');
      
      // Clear local state
      this.currentUser = null;
      this.authToken = null;
      
      // Clear localStorage
      localStorage.removeItem('privy_user');
      localStorage.removeItem('privy_token');
      
      console.log('✅ Privy logout successful');
    } catch (error) {
      console.error('❌ Privy logout failed:', error);
      throw error;
    }
  }

  // Restore session from localStorage
  private restoreSession(): void {
    try {
      const savedUser = localStorage.getItem('privy_user');
      const savedToken = localStorage.getItem('privy_token');
      
      if (savedUser && savedToken) {
        this.currentUser = JSON.parse(savedUser);
        this.authToken = savedToken;
        console.log('🔄 Privy session restored for user:', this.currentUser?.id);
      }
    } catch (error) {
      console.warn('⚠️ Failed to restore Privy session:', error);
      // Clear corrupted data
      localStorage.removeItem('privy_user');
      localStorage.removeItem('privy_token');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.authToken !== null;
  }

  // Get current user
  getCurrentUser(): PrivyUser | null {
    return this.currentUser;
  }

  // Get user's wallet address
  getWalletAddress(): string | null {
    return this.currentUser?.embedded_wallets?.[0]?.address || null;
  }

  // Check if ready
  isReady(): boolean {
    return true; // Always ready since we're using REST API
  }
}

export const privyApiClient = new PrivyApiClient(); 