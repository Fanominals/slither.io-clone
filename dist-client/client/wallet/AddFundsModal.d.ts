export declare class AddFundsModal {
    private modal;
    private qrCodeContainer;
    private walletAddressText;
    private copyButton;
    private closeButton;
    private balanceDisplay;
    private solAmountDisplay;
    private usdAmountDisplay;
    private isVisible;
    constructor();
    private createModal;
    private setupEventListeners;
    private setupBalanceMonitoring;
    private copyWalletAddress;
    private showCopyFeedback;
    private fallbackCopy;
    private updateBalanceDisplay;
    private generateQRCode;
    show(): void;
    hide(): void;
    private shortenAddress;
    isOpen(): boolean;
}
