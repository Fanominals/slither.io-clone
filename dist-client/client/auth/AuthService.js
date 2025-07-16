import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, updateDoc } from '../firebase-config.js';
export class AuthService {
    constructor() {
        this.currentUser = null;
        this.userProfile = null;
        this.authStateListeners = [];
        this.initializeAuthStateListener();
    }
    initializeAuthStateListener() {
        onAuthStateChanged(auth, async (user) => {
            this.currentUser = user;
            if (user) {
                // User is signed in
                await this.loadOrCreateUserProfile(user);
            }
            else {
                // User is signed out
                this.userProfile = null;
            }
            // Notify all listeners
            this.authStateListeners.forEach(listener => listener(user));
        });
    }
    async loadOrCreateUserProfile(user) {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                // User profile exists, load it
                const data = userDoc.data();
                this.userProfile = {
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || '',
                    photoURL: user.photoURL || '',
                    lastLogin: data.lastLogin?.toDate() || new Date(),
                    createdAt: data.createdAt?.toDate() || new Date(),
                    username: data.username || undefined,
                    usernameSet: data.usernameSet || false,
                    gameStats: data.gameStats || {
                        totalGames: 0,
                        totalTime: 0,
                        bestLength: 0,
                        totalEliminations: 0
                    }
                };
                // Update last login
                await updateDoc(userDocRef, {
                    lastLogin: new Date()
                });
            }
            else {
                // Create new user profile
                const newProfile = {
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || '',
                    photoURL: user.photoURL || '',
                    lastLogin: new Date(),
                    createdAt: new Date(),
                    username: undefined,
                    usernameSet: false,
                    gameStats: {
                        totalGames: 0,
                        totalTime: 0,
                        bestLength: 0,
                        totalEliminations: 0
                    }
                };
                await setDoc(userDocRef, newProfile);
                this.userProfile = newProfile;
            }
        }
        catch (error) {
            console.error('Error loading user profile:', error);
        }
    }
    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        }
        catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    }
    async signOut() {
        try {
            await signOut(auth);
        }
        catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    }
    getCurrentUser() {
        return this.currentUser;
    }
    getUserProfile() {
        return this.userProfile;
    }
    isAuthenticated() {
        return this.currentUser !== null;
    }
    hasUsernameSet() {
        return this.userProfile?.usernameSet === true && !!this.userProfile.username;
    }
    onAuthStateChanged(listener) {
        this.authStateListeners.push(listener);
        // Return unsubscribe function
        return () => {
            const index = this.authStateListeners.indexOf(listener);
            if (index > -1) {
                this.authStateListeners.splice(index, 1);
            }
        };
    }
    async refreshUserProfile() {
        if (!this.currentUser) {
            return;
        }
        await this.loadOrCreateUserProfile(this.currentUser);
    }
    updateCachedUsername(newUsername) {
        if (this.userProfile) {
            this.userProfile.username = newUsername;
            this.userProfile.usernameSet = true;
            console.log('AuthService: Updated cached username to:', newUsername);
        }
    }
    async updateGameStats(stats) {
        if (!this.currentUser || !this.userProfile) {
            throw new Error('User not authenticated');
        }
        try {
            const userDocRef = doc(db, 'users', this.currentUser.uid);
            const currentStats = this.userProfile.gameStats || {
                totalGames: 0,
                totalTime: 0,
                bestLength: 0,
                totalEliminations: 0
            };
            const updatedStats = { ...currentStats, ...stats };
            await updateDoc(userDocRef, {
                gameStats: updatedStats
            });
            // Update local profile
            if (this.userProfile) {
                this.userProfile.gameStats = updatedStats;
            }
        }
        catch (error) {
            console.error('Error updating game stats:', error);
            throw error;
        }
    }
}
// Create singleton instance
export const authService = new AuthService();
//# sourceMappingURL=AuthService.js.map