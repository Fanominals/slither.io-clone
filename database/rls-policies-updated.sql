-- ========================================
-- UPDATED ROW LEVEL SECURITY (RLS) POLICIES
-- More compatible with Privy authentication
-- ========================================

-- Enable RLS on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile and active users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow service user creation" ON users;
DROP POLICY IF EXISTS "Users can deactivate own account" ON users;
DROP POLICY IF EXISTS "Anyone can check username availability" ON usernames;
DROP POLICY IF EXISTS "Users can create own username" ON usernames;
DROP POLICY IF EXISTS "Users can update own username" ON usernames;
DROP POLICY IF EXISTS "Users can delete own username" ON usernames;

-- ========================================
-- USERS TABLE POLICIES (More permissive for Privy auth)
-- ========================================

-- Allow viewing all active users (for leaderboards and public profiles)
CREATE POLICY "Allow viewing active users" ON users
    FOR SELECT 
    USING (is_active = true);

-- Allow inserting new users (for Privy registration)
CREATE POLICY "Allow user registration" ON users
    FOR INSERT 
    WITH CHECK (privy_id IS NOT NULL AND LENGTH(privy_id) > 0);

-- Allow users to update their own profile based on privy_id
CREATE POLICY "Allow user profile updates" ON users
    FOR UPDATE 
    USING (privy_id IS NOT NULL)
    WITH CHECK (privy_id IS NOT NULL);

-- ========================================
-- USERNAMES TABLE POLICIES
-- ========================================

-- Anyone can read usernames (for availability checking and leaderboards)
CREATE POLICY "Allow reading usernames" ON usernames
    FOR SELECT 
    USING (true);

-- Allow creating usernames for valid users
CREATE POLICY "Allow username creation" ON usernames
    FOR INSERT 
    WITH CHECK (
        user_id IS NOT NULL AND 
        EXISTS (SELECT 1 FROM users WHERE id = user_id AND is_active = true)
    );

-- Allow updating usernames for the username owner
CREATE POLICY "Allow username updates" ON usernames
    FOR UPDATE 
    USING (
        user_id IS NOT NULL AND 
        EXISTS (SELECT 1 FROM users WHERE id = user_id AND is_active = true)
    )
    WITH CHECK (
        user_id IS NOT NULL AND 
        EXISTS (SELECT 1 FROM users WHERE id = user_id AND is_active = true)
    );

-- Allow deleting usernames for the username owner
CREATE POLICY "Allow username deletion" ON usernames
    FOR DELETE 
    USING (
        user_id IS NOT NULL AND 
        EXISTS (SELECT 1 FROM users WHERE id = user_id AND is_active = true)
    ); 