-- Simplified Slither.io Database Schema
-- Just the essential tables: users and usernames

-- Drop existing tables if they exist
DROP TABLE IF EXISTS usernames CASCADE;
DROP TABLE IF EXISTS leaderboard_entries CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS game_sessions CASCADE;
DROP TABLE IF EXISTS user_game_stats CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop any existing triggers and functions
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_usernames_updated_at ON usernames;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Enable Row Level Security
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
-- Core user information synced from Privy authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    privy_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    google_account VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    login_count INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Usernames Table
-- For unique username management
CREATE TABLE usernames (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(20) NOT NULL,
    username_lower VARCHAR(20) NOT NULL, -- For case-insensitive uniqueness
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_username_length CHECK (LENGTH(TRIM(username)) >= 3 AND LENGTH(TRIM(username)) <= 20),
    CONSTRAINT valid_username_chars CHECK (username ~ '^[a-zA-Z0-9_-]+$'),
    CONSTRAINT unique_username_lower UNIQUE (username_lower),
    CONSTRAINT one_active_username_per_user UNIQUE (user_id, is_active) DEFERRABLE INITIALLY DEFERRED
);

-- Create indexes for performance
CREATE INDEX idx_users_privy_id ON users(privy_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_usernames_user_id ON usernames(user_id);
CREATE INDEX idx_usernames_active ON usernames(is_active);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users: Users can read and update their own profile
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = privy_id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = privy_id);

CREATE POLICY "Service can insert user profiles" ON users
    FOR INSERT WITH CHECK (true);

-- Usernames: Users can read all (for uniqueness checking), manage their own
CREATE POLICY "Anyone can check username availability" ON usernames
    FOR SELECT WITH CHECK (true);

CREATE POLICY "Users can manage their own usernames" ON usernames
    FOR ALL USING (user_id IN (SELECT id FROM users WHERE privy_id = auth.uid()::text));

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usernames_updated_at 
    BEFORE UPDATE ON usernames 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON users TO authenticated;
GRANT SELECT, INSERT, UPDATE ON usernames TO authenticated;

-- Grant permissions to anon users for username checking
GRANT SELECT ON usernames TO anon; 