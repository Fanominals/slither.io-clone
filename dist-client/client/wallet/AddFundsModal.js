import { privyIntegrationService } from '../auth/PrivyIntegrationService.js';
export class AddFundsModal {
    constructor() {
        this.isVisible = false;
        this.createModal();
        this.setupEventListeners();
        this.updateBalanceDisplay();
        this.setupBalanceMonitoring();
    }
    createModal() {
        // Create modal overlay
        this.modal = document.createElement('div');
        this.modal.className = 'add-funds-modal hidden';
        this.modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <!-- Header -->
          <div class="modal-header">
            <h2>Add Funds</h2>
            <button class="close-button">&times;</button>
          </div>
          
          <!-- QR Code Section -->
          <div class="qr-section">
            <div class="qr-container">
              <div class="qr-code-placeholder">
                <div class="qr-code" id="qr-code"></div>
              </div>
            </div>
            
            <div class="qr-info">
              <h3>Send from your own wallet</h3>
              <p>Get QR code & address (Receive funds)</p>
            </div>
          </div>
          
          <!-- Wallet Address Section -->
          <div class="wallet-address-section">
            <label>Your wallet</label>
            <div class="address-container">
              <span class="wallet-address" id="wallet-address">Loading...</span>
              <button class="copy-button" id="copy-button">📋</button>
            </div>
          </div>
          
          <!-- Balance Section -->
          <div class="balance-section">
            <div class="balance-item">
              <span class="balance-label">SOL Balance</span>
              <span class="balance-value" id="sol-balance">0.0000 SOL</span>
            </div>
            <div class="balance-item">
              <span class="balance-label">USD Value</span>
              <span class="balance-value" id="usd-balance">$0.00</span>
            </div>
          </div>
          
          <!-- Instructions -->
          <div class="instructions">
            <p>Send SOL to this address from any Solana wallet. Funds will appear in your balance automatically.</p>
            <div class="warning">
              <span class="warning-icon">⚠️</span>
              <span>Only send SOL to this address. Sending other tokens may result in permanent loss.</span>
            </div>
          </div>
        </div>
      </div>
    `;
        // Get references to elements
        this.qrCodeContainer = this.modal.querySelector('#qr-code');
        this.walletAddressText = this.modal.querySelector('#wallet-address');
        this.copyButton = this.modal.querySelector('#copy-button');
        this.closeButton = this.modal.querySelector('.close-button');
        this.solAmountDisplay = this.modal.querySelector('#sol-balance');
        this.usdAmountDisplay = this.modal.querySelector('#usd-balance');
        // Add to document
        document.body.appendChild(this.modal);
    }
    setupEventListeners() {
        // Close modal events
        this.closeButton.addEventListener('click', () => this.hide());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal.querySelector('.modal-overlay')) {
                this.hide();
            }
        });
        // Copy wallet address
        this.copyButton.addEventListener('click', () => this.copyWalletAddress());
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
    setupBalanceMonitoring() {
        // Update balance display when balance changes
        privyIntegrationService.onIntegrationChange(() => {
            this.updateBalanceDisplay();
        });
    }
    async copyWalletAddress() {
        const walletData = privyIntegrationService.getWalletData();
        if (walletData?.walletAddress) {
            try {
                await navigator.clipboard.writeText(walletData.walletAddress);
                this.showCopyFeedback();
            }
            catch (error) {
                console.error('Failed to copy address:', error);
                // Fallback for older browsers
                this.fallbackCopy(walletData.walletAddress);
            }
        }
    }
    showCopyFeedback() {
        const originalText = this.copyButton.textContent;
        this.copyButton.textContent = '✓';
        this.copyButton.style.color = '#4CAF50';
        setTimeout(() => {
            this.copyButton.textContent = originalText;
            this.copyButton.style.color = '';
        }, 2000);
    }
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            this.showCopyFeedback();
        }
        catch (error) {
            console.error('Fallback copy failed:', error);
        }
        document.body.removeChild(textArea);
    }
    updateBalanceDisplay() {
        const balance = privyIntegrationService.getBalance();
        const solPrice = privyIntegrationService.getSolPrice();
        if (balance) {
            this.solAmountDisplay.textContent = `${balance.sol.toFixed(4)} SOL`;
            this.usdAmountDisplay.textContent = `$${balance.usd.toFixed(2)}`;
        }
        else {
            this.solAmountDisplay.textContent = '0.0000 SOL';
            this.usdAmountDisplay.textContent = '$0.00';
        }
    }
    async generateQRCode(data) {
        try {
            // Dynamic import of QRCode library
            const QRCode = await import('qrcode');
            // Generate QR code as canvas
            const canvas = document.createElement('canvas');
            await QRCode.toCanvas(canvas, data, {
                width: 180,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            // Clear container and add canvas
            this.qrCodeContainer.innerHTML = '';
            this.qrCodeContainer.appendChild(canvas);
        }
        catch (error) {
            console.error('Failed to generate QR code:', error);
            // Fallback to placeholder
            this.qrCodeContainer.innerHTML = `
        <div class="qr-placeholder">
          <div class="qr-dots"></div>
          <div class="qr-text">Scan to send SOL</div>
        </div>
      `;
        }
    }
    show() {
        const walletData = privyIntegrationService.getWalletData();
        if (!walletData) {
            console.error('No wallet data available');
            return;
        }
        // Update wallet address display
        const shortAddress = this.shortenAddress(walletData.walletAddress);
        this.walletAddressText.textContent = shortAddress;
        this.walletAddressText.title = walletData.walletAddress; // Full address on hover
        // Generate QR code
        const qrData = privyIntegrationService.generateDepositQRData();
        if (qrData) {
            this.generateQRCode(qrData);
        }
        // Update balance
        this.updateBalanceDisplay();
        // Show modal
        this.modal.classList.remove('hidden');
        this.isVisible = true;
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }
    hide() {
        this.modal.classList.add('hidden');
        this.isVisible = false;
        // Restore background scrolling
        document.body.style.overflow = '';
    }
    shortenAddress(address) {
        if (address.length <= 10)
            return address;
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    isOpen() {
        return this.isVisible;
    }
}
//# sourceMappingURL=AddFundsModal.js.map