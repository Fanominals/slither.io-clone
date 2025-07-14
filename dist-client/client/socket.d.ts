declare global {
    interface Window {
        io: any;
    }
}
export declare class SocketManager {
    private socket;
    private connected;
    private eventHandlers;
    constructor();
    private setupEventHandlers;
    connect(): void;
    disconnect(): void;
    joinGame(nickname: string): void;
    sendPlayerMove(angle: number, isBoosting?: boolean): void;
    on(event: string, callback: Function): void;
    off(event: string, callback?: Function): void;
    private emit;
    isConnected(): boolean;
    getSocket(): any;
}
