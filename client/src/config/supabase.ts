import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for user table
export interface User {
  id: string;
  privy_id: string;
  email?: string;
  google_account?: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  login_count: number;
  is_active: boolean;
}

export interface Username {
  id: string;
  user_id: string;
  username: string;
  username_lower: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
} 