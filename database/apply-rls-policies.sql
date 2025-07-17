-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Apply these policies to an existing database
-- ========================================

-- Enable RLS on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (in case of reapplication)
DROP POLICY IF EXISTS "Users can view own profile and active users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow service user creation" ON users;
DROP POLICY IF EXISTS "Users can deactivate own account" ON users;
DROP POLICY IF EXISTS "Anyone can check username availability" ON usernames;
DROP POLICY IF EXISTS "Users can create own username" ON usernames;
DROP POLICY IF EXISTS "Users can update own username" ON usernames;
DROP POLICY IF EXISTS "Users can delete own username" ON usernames;

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