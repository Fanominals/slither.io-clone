interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}
interface UserCredential {
    user: User;
}
export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    lastLogin: Date;
    createdAt: Date;
    username?: string;
    usernameSet?: boolean;
    gameStats?: {
        totalGames: number;
        totalTime: number;
        bestLength: number;
        totalEliminations: number;
    };
    walletAddress?: string;
    walletIntegrated?: boolean;
    walletIntegratedAt?: Date;
    solBalance?: number;
    lastBalanceUpdate?: Date;
    lastSolPrice?: number;
}
export declare class AuthService {
    private currentUser;
    private userProfile;
    private authStateListeners;
    constructor();
    private initializeAuthStateListener;
    private loadOrCreateUserProfile;
    signInWithGoogle(): Promise<UserCredential>;
    signOut(): Promise<void>;
    getCurrentUser(): User | null;
    getUserProfile(): UserProfile | null;
    isAuthenticated(): boolean;
    hasUsernameSet(): boolean;
    onAuthStateChanged(listener: (user: User | null) => void): () => void;
    refreshUserProfile(): Promise<void>;
    updateCachedUsername(newUsername: string): void;
    updateGameStats(stats: Partial<UserProfile['gameStats']>): Promise<void>;
}
export declare const authService: AuthService;
export {};
