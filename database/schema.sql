-- Enable UUID Extension First
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
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

-- Usernames Table (with foreign key to users)
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

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
-- Allow users to view their own profile and other active users (for leaderboards, etc.)
CREATE POLICY "Users can view own profile and active users" ON users
    FOR SELECT 
    USING (
        auth.uid()::text = privy_id OR 
        (is_active = true AND privy_id IS NOT NULL)
    );

-- Allow users to update only their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE 
    USING (auth.uid()::text = privy_id)
    WITH CHECK (auth.uid()::text = privy_id);

-- Allow service-level inserts for new user creation
CREATE POLICY "Allow service user creation" ON users
    FOR INSERT 
    WITH CHECK (true);

-- Allow users to deactivate their own account
CREATE POLICY "Users can deactivate own account" ON users
    FOR UPDATE 
    USING (auth.uid()::text = privy_id AND is_active = false)
    WITH CHECK (auth.uid()::text = privy_id AND is_active = false);

-- Usernames Table Policies
-- Anyone can check username availability (read-only for availability checking)
CREATE POLICY "Anyone can check username availability" ON usernames
    FOR SELECT 
    USING (true);

-- Users can create usernames for themselves
CREATE POLICY "Users can create own username" ON usernames
    FOR INSERT 
    WITH CHECK (auth.uid()::text = (SELECT privy_id FROM users WHERE id = user_id));

-- Users can update their own username
CREATE POLICY "Users can update own username" ON usernames
    FOR UPDATE 
    USING (auth.uid()::text = (SELECT privy_id FROM users WHERE id = user_id))
    WITH CHECK (auth.uid()::text = (SELECT privy_id FROM users WHERE id = user_id));

-- Users can delete their own username
CREATE POLICY "Users can delete own username" ON usernames
    FOR DELETE 
    USING (auth.uid()::text = (SELECT privy_id FROM users WHERE id = user_id));