export declare class UsernameModal {
    private modal;
    private isVisible;
    private onUsernameSavedCallback?;
    constructor();
    private createModal;
    private handleUsernameInput;
    private checkUsernameAvailability;
    private handleSaveUsername;
    private saveUsername;
    show(onUsernameSaved?: (username: string) => void): void;
    hide(): void;
    isModalVisible(): boolean;
}
