import { 
    auth, 
    db, 
    googleProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from '../firebase-config.js';

// Type definitions
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
}

export class AuthService {
  private currentUser: User | null = null;
  private userProfile: UserProfile | null = null;
  private authStateListeners: ((user: User | null) => void)[] = [];

  constructor() {
    this.initializeAuthStateListener();
  }

  private initializeAuthStateListener(): void {
    onAuthStateChanged(auth, async (user: User | null) => {
      this.currentUser = user;
      
      if (user) {
        // User is signed in
        await this.loadOrCreateUserProfile(user);
      } else {
        // User is signed out
        this.userProfile = null;
      }

      // Notify all listeners
      this.authStateListeners.forEach(listener => listener(user));
    });
  }

  private async loadOrCreateUserProfile(user: User): Promise<void> {
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
      } else {
        // Create new user profile
        const newProfile: UserProfile = {
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
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  async signInWithGoogle(): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasUsernameSet(): boolean {
    return this.userProfile?.usernameSet === true && !!this.userProfile.username;
  }

  onAuthStateChanged(listener: (user: User | null) => void): () => void {
    this.authStateListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  async refreshUserProfile(): Promise<void> {
    if (!this.currentUser) {
      return;
    }
    
    await this.loadOrCreateUserProfile(this.currentUser);
  }

  updateCachedUsername(newUsername: string): void {
    if (this.userProfile) {
      this.userProfile.username = newUsername;
      this.userProfile.usernameSet = true;
      console.log('AuthService: Updated cached username to:', newUsername);
    }
  }

  async updateGameStats(stats: Partial<UserProfile['gameStats']>): Promise<void> {
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
    } catch (error) {
      console.error('Error updating game stats:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const authService = new AuthService(); 