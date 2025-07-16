export declare function signInWithGoogle(): Promise<void>;
export declare function signOut(): Promise<void>;
export declare function subscribeToAuthChanges(callback: (session: any) => void): {
    data: {
        subscription: import("@supabase/auth-js").Subscription;
    };
};
