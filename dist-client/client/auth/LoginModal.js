export class LoginModal {
    constructor() {
        this.isVisible = false;
        this.modal = this.createModal();
        document.body.appendChild(this.modal);
    }
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'login-modal hidden';
        modal.innerHTML = `
      <div class="login-modal-overlay"></div>
      <div class="login-modal-content">
        <div class="login-modal-header">
          <h2>Log in or sign up</h2>
          <button class="login-modal-close" id="loginModalClose">×</button>
        </div>
        
        <div class="login-modal-body">
          <div class="login-icon">
            <div class="snake-icon">🐍</div>
          </div>
          
          <div class="login-options">
            <button class="google-signin-btn" id="googleSignInBtn">
              <div class="google-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span>Sign in with Google</span>
            </button>
          </div>
          
          <div class="login-legal">
            <p>By logging in I agree to the 
              <a href="#" class="legal-link">Terms</a> & 
              <a href="#" class="legal-link">Privacy Policy</a>
            </p>
          </div>
          
          <div class="login-footer">
            <p>Protected by <span class="privy-icon">🔒</span> privy</p>
          </div>
        </div>
      </div>
    `;
        // Add event listeners
        const closeBtn = modal.querySelector('#loginModalClose');
        const overlay = modal.querySelector('.login-modal-overlay');
        const googleBtn = modal.querySelector('#googleSignInBtn');
        closeBtn.addEventListener('click', () => this.hide());
        overlay.addEventListener('click', () => this.hide());
        googleBtn.addEventListener('click', () => this.handleGoogleSignIn());
        return modal;
    }
    resetGoogleButton(googleBtn) {
        googleBtn.disabled = false;
        googleBtn.innerHTML = `
      <div class="google-icon">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>
      <span>Sign in with Google</span>
    `;
    }
    async handleGoogleSignIn() {
        const googleBtn = this.modal.querySelector('#googleSignInBtn');
        // Add timeout to reset button if sign-in takes too long
        const timeoutId = setTimeout(() => {
            console.warn('Sign-in timeout - resetting button');
            this.resetGoogleButton(googleBtn);
        }, 30000); // 30 second timeout
        try {
            googleBtn.disabled = true;
            googleBtn.innerHTML = '<div class="spinner"></div><span>Signing in...</span>';
            // Import auth service dynamically to avoid circular dependencies
            const { authService } = await import('./AuthService.js');
            const result = await authService.signInWithGoogle();
            // Clear timeout since we succeeded
            clearTimeout(timeoutId);
            this.hide();
            if (this.onSignInCallback) {
                this.onSignInCallback();
            }
        }
        catch (error) {
            // Clear timeout since we're handling the error
            clearTimeout(timeoutId);
            console.error('Google sign-in failed:', error);
            // Always reset the button on error or cancellation
            this.resetGoogleButton(googleBtn);
        }
    }
    show(onSignIn) {
        this.isVisible = true;
        this.modal.classList.remove('hidden');
        this.onSignInCallback = onSignIn;
        // Always reset the Google button when showing the modal
        const googleBtn = this.modal.querySelector('#googleSignInBtn');
        this.resetGoogleButton(googleBtn);
    }
    hide() {
        this.isVisible = false;
        this.modal.classList.add('hidden');
        this.onSignInCallback = undefined;
    }
    isModalVisible() {
        return this.isVisible;
    }
}
//# sourceMappingURL=LoginModal.js.map