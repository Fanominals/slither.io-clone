export declare class LoginModal {
    private modal;
    private isVisible;
    private onSignInCallback?;
    constructor();
    private createModal;
    private resetGoogleButton;
    private handleGoogleSignIn;
    show(onSignIn?: () => void): void;
    hide(): void;
    isModalVisible(): boolean;
}
