import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePrivy, User as PrivyUser } from '@privy-io/react-auth';
import { AuthService } from '../services/AuthService';
import { User } from '../config/supabase';

interface AuthContextType {
  user: PrivyUser | null;
  userProfile: User | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasUsername: boolean;
  login: () => void;
  logout: () => void;
  setUsername: (username: string) => Promise<boolean>;
  refreshUsername: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, login, logout, ready } = usePrivy();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          const profile = await AuthService.syncUserToDatabase(user);
          setUserProfile(profile);
          
          // Load username if profile exists
          if (profile) {
            const { username: currentUsername } = await AuthService.getCurrentUsername(profile.id);
            setUsernameState(currentUsername);
          }
        } catch (error) {
          console.error('Failed to sync user:', error);
        }
      } else {
        setUserProfile(null);
        setUsernameState(null);
      }
      setIsLoading(false);
    };

    if (ready) {
      syncUser();
    }
  }, [user, ready]);

  const setUsername = async (newUsername: string): Promise<boolean> => {
    if (!userProfile) return false;
    
    const result = await AuthService.setUsername(userProfile.id, newUsername);
    if (result.success) {
      setUsernameState(newUsername.trim());
    }
    return result.success;
  };

  const refreshUsername = async (): Promise<void> => {
    if (!userProfile) return;
    
    const { username: currentUsername } = await AuthService.getCurrentUsername(userProfile.id);
    setUsernameState(currentUsername);
  };

  const contextValue: AuthContextType = {
    user,
    userProfile,
    username,
    isAuthenticated: !!user,
    isLoading: !ready || isLoading,
    hasUsername: !!username,
    login,
    logout,
    setUsername,
    refreshUsername,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 