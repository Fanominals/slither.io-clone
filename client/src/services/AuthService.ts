import { supabase, User } from '../config/supabase';
import { User as PrivyUser } from '@privy-io/react-auth';

export class AuthService {
  /**
   * Syncs a Privy user with the Supabase database
   * Creates or updates user profile based on authentication data
   */
  static async syncUserToDatabase(privyUser: PrivyUser): Promise<User | null> {
    try {
      // Check if user already exists (SELECT with limited fields for RLS compliance)
      const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('id, privy_id, email, login_count, created_at')
        .eq('privy_id', privyUser.id)
        .maybeSingle();

      if (selectError) {
        console.error('Error checking existing user:', selectError);
        return null;
      }

      if (existingUser) {
        // Update existing user (only for the authenticated user's own profile)
        const { data, error } = await supabase
          .from('users')
          .update({
            email: privyUser.email?.address || null,
            google_account: privyUser.google?.email || null,
            last_login: new Date().toISOString(),
            login_count: existingUser.login_count + 1,
            updated_at: new Date().toISOString(),
          })
          .eq('privy_id', privyUser.id)
          .select('id, privy_id, email, google_account, created_at, updated_at, last_login, login_count, is_active')
          .maybeSingle();

        if (error) {
          console.error('Error updating user profile:', error);
          return null;
        }

        if (!data) {
          console.error('No data returned from user update');
          return null;
        }

        return data;
      } else {
        // Create new user (limited to service-level inserts due to RLS)
        const { data, error } = await supabase
          .from('users')
          .insert({
            privy_id: privyUser.id,
            email: privyUser.email?.address || null,
            google_account: privyUser.google?.email || null,
          })
          .select('id, privy_id, email, google_account, created_at, updated_at, last_login, login_count, is_active')
          .maybeSingle();

        if (error) {
          console.error('Error creating user profile:', error);
          return null;
        }

        if (!data) {
          console.error('No data returned from user creation');
          return null;
        }

        return data;
      }
    } catch (error) {
      console.error('Error syncing user to database:', error);
      return null;
    }
  }

  /**
   * Gets user profile from database
   */
  static async getUserProfile(privyUserId: string): Promise<User | null> {
    try {
      // SELECT (only public/allowed fields)
      const { data, error } = await supabase
        .from('users')
        .select('id, privy_id, email, created_at, updated_at, last_login, login_count, is_active')
        .eq('privy_id', privyUserId)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Deactivates user account (soft delete)
   */
  static async deactivateUser(privyUserId: string): Promise<boolean> {
    try {
      // UPDATE (only for the authenticated user's own profile)
      const { error } = await supabase
        .from('users')
        .update({
          is_active: false,
          updated_at: new Date().toISOString(),
        })
        .eq('privy_id', privyUserId);

      if (error) {
        console.error('Error deactivating user:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deactivating user:', error);
      return false;
    }
  }

  // ========== USERNAME MANAGEMENT ==========

  /**
   * Validates username format
   */
  static validateUsername(username: string): { isValid: boolean; error?: string } {
    const trimmed = username.trim();
    
    if (trimmed.length < 3) {
      return { isValid: false, error: 'Username must be at least 3 characters long' };
    }
    
    if (trimmed.length > 20) {
      return { isValid: false, error: 'Username cannot be longer than 20 characters' };
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
    }
    
    return { isValid: true };
  }

  /**
   * Checks if username is available
   */
  static async checkUsernameAvailability(username: string): Promise<{ available: boolean; error?: string }> {
    try {
      const validation = this.validateUsername(username);
      if (!validation.isValid) {
        return { available: false, error: validation.error };
      }

      // SELECT (anyone can check username availability)
      const { data, error } = await supabase
        .from('usernames')
        .select('username')
        .eq('username_lower', username.toLowerCase())
        .maybeSingle();

      if (error) {
        console.error('Error checking username availability:', error);
        return { available: false, error: 'Error checking username availability' };
      }

      return { available: !data };
    } catch (error) {
      console.error('Error checking username availability:', error);
      return { available: false, error: 'Error checking username availability' };
    }
  }

  /**
   * Gets user's current username
   */
  static async getCurrentUsername(userId: string): Promise<{ username: string | null; error?: string }> {
    try {
      // SELECT (user can view their own username)
      const { data, error } = await supabase
        .from('usernames')
        .select('username')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error getting current username:', error);
        return { username: null, error: 'Error getting current username' };
      }

      return { username: data?.username || null };
    } catch (error) {
      console.error('Error getting current username:', error);
      return { username: null, error: 'Error getting current username' };
    }
  }

  /**
   * Sets or updates user's username
   */
  static async setUsername(userId: string, username: string): Promise<{ success: boolean; error?: string }> {
    try {
      const validation = this.validateUsername(username);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Check availability
      const availability = await this.checkUsernameAvailability(username);
      if (!availability.available) {
        return { success: false, error: availability.error || 'Username is not available' };
      }

      // Check if user already has a username to update
      const { data: existingUsername } = await supabase
        .from('usernames')
        .select('id, username')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (existingUsername) {
        // UPDATE (user can update their own username)
        const { error } = await supabase
          .from('usernames')
          .update({
            username: username.trim(),
            username_lower: username.toLowerCase().trim(),
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (error) {
          console.error('Error updating username:', error);
          return { success: false, error: 'Error updating username' };
        }
      } else {
        // INSERT (user can create a username for themselves)
        const { error } = await supabase
          .from('usernames')
          .insert({
            user_id: userId,
            username: username.trim(),
            username_lower: username.toLowerCase().trim(),
          });

        if (error) {
          console.error('Error creating username:', error);
          return { success: false, error: 'Error creating username' };
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error setting username:', error);
      return { success: false, error: 'Error setting username' };
    }
  }

  /**
   * Checks if user has a username set
   */
  static async hasUsername(userId: string): Promise<boolean> {
    try {
      // SELECT (user can check their own username status)
      const { data } = await supabase
        .from('usernames')
        .select('username')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      return !!data;
    } catch (error) {
      console.error('Error checking if user has username:', error);
      return false;
    }
  }
} 