-- ========================================
-- DISABLE RLS FOR TESTING ONLY
-- Use this temporarily if you continue to have RLS issues
-- IMPORTANT: Re-enable RLS in production!
-- ========================================

-- Disable RLS temporarily for testing
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE usernames DISABLE ROW LEVEL SECURITY;

-- Grant full access to anon role for testing
-- (These permissions will be ignored when RLS is re-enabled)
GRANT ALL ON users TO anon;
GRANT ALL ON usernames TO anon;

-- To re-enable RLS later, run:
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE usernames ENABLE ROW LEVEL SECURITY; 