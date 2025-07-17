-- Reset and Create Slither.io Database Schema
-- This script will drop existing tables and recreate them

-- Drop tables in reverse order to handle dependencies
DROP TABLE IF EXISTS usernames CASCADE;
DROP TABLE IF EXISTS leaderboard_entries CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS game_sessions CASCADE;
DROP TABLE IF EXISTS user_game_stats CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Drop any existing triggers and functions
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_user_game_stats_updated_at ON user_game_stats;
DROP TRIGGER IF EXISTS update_game_sessions_updated_at ON game_sessions;
DROP TRIGGER IF EXISTS update_usernames_updated_at ON usernames;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Enable Row Level Security
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
-- Core user information synced from Privy authentication
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    privy_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    nickname VARCHAR(50),
    google_account VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    login_count INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Future feature columns (prepared for scalability)
    avatar_url TEXT,
    preferred_theme VARCHAR(20) DEFAULT 'dark',
    timezone VARCHAR(50),
    locale VARCHAR(10) DEFAULT 'en-US',
    
    -- Constraints
    CONSTRAINT valid_nickname CHECK (LENGTH(TRIM(nickname)) >= 1),
    CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Game Statistics Table (prepared for future features)
CREATE TABLE user_game_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    games_played INTEGER DEFAULT 0,
    total_score BIGINT DEFAULT 0,
    best_score INTEGER DEFAULT 0,
    total_playtime_seconds INTEGER DEFAULT 0,
    deaths INTEGER DEFAULT 0,
    eliminations INTEGER DEFAULT 0,
    food_consumed INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- Game Sessions Table (for tracking individual game sessions)
CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    duration_seconds INTEGER DEFAULT 0,
    food_consumed INTEGER DEFAULT 0,
    eliminations INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements Table (prepared for future gamification)
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    achievement_type VARCHAR(50) NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB,
    
    UNIQUE(user_id, achievement_type)
);

-- User Settings Table (for game preferences)
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    controls_sensitivity DECIMAL(3,2) DEFAULT 1.00,
    graphics_quality VARCHAR(10) DEFAULT 'medium',
    sound_enabled BOOLEAN DEFAULT TRUE,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- Leaderboard Entries Table (for tracking high scores)
CREATE TABLE leaderboard_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    username VARCHAR(20) NOT NULL,
    score INTEGER NOT NULL,
    game_duration_seconds INTEGER DEFAULT 0,
    food_consumed INTEGER DEFAULT 0,
    eliminations INTEGER DEFAULT 0,
    achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usernames Table (for unique username management)
CREATE TABLE usernames (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
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
CREATE INDEX idx_user_profiles_privy_id ON user_profiles(privy_id);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_active ON user_profiles(is_active);
CREATE INDEX idx_user_game_stats_user_id ON user_game_stats(user_id);
CREATE INDEX idx_game_sessions_user_id ON game_sessions(user_id);
CREATE INDEX idx_game_sessions_created_at ON game_sessions(created_at DESC);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_type ON user_achievements(achievement_type);
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX idx_leaderboard_score ON leaderboard_entries(score DESC);
CREATE INDEX idx_leaderboard_date ON leaderboard_entries(achieved_at DESC);
CREATE INDEX idx_leaderboard_user ON leaderboard_entries(user_id);
CREATE INDEX idx_usernames_user_id ON usernames(user_id);
CREATE INDEX idx_usernames_active ON usernames(is_active);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- User Profiles: Users can read and update their own profile
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid()::text = privy_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid()::text = privy_id);

CREATE POLICY "Service can insert user profiles" ON user_profiles
    FOR INSERT WITH CHECK (true);

-- User Game Stats: Users can read their own stats, service can update
CREATE POLICY "Users can view their own stats" ON user_game_stats
    FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE privy_id = auth.uid()::text));

CREATE POLICY "Service can manage game stats" ON user_game_stats
    FOR ALL WITH CHECK (true);

-- Game Sessions: Users can read their own sessions, service can manage
CREATE POLICY "Users can view their own sessions" ON game_sessions
    FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE privy_id = auth.uid()::text));

CREATE POLICY "Service can manage game sessions" ON game_sessions
    FOR ALL WITH CHECK (true);

-- User Achievements: Users can read their own achievements
CREATE POLICY "Users can view their own achievements" ON user_achievements
    FOR SELECT USING (user_id IN (SELECT id FROM user_profiles WHERE privy_id = auth.uid()::text));

CREATE POLICY "Service can manage achievements" ON user_achievements
    FOR ALL WITH CHECK (true);

-- User Settings: Users can manage their own settings
CREATE POLICY "Users can manage their own settings" ON user_settings
    FOR ALL USING (user_id IN (SELECT id FROM user_profiles WHERE privy_id = auth.uid()::text));

-- Leaderboard Entries: Everyone can read, service can manage
CREATE POLICY "Anyone can view leaderboard" ON leaderboard_entries
    FOR SELECT WITH CHECK (true);

CREATE POLICY "Service can manage leaderboard entries" ON leaderboard_entries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Service can update leaderboard entries" ON leaderboard_entries
    FOR UPDATE WITH CHECK (true);

-- Usernames: Users can read all (for uniqueness checking), manage their own
CREATE POLICY "Anyone can check username availability" ON usernames
    FOR SELECT WITH CHECK (true);

CREATE POLICY "Users can manage their own usernames" ON usernames
    FOR ALL USING (user_id IN (SELECT id FROM user_profiles WHERE privy_id = auth.uid()::text));

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_game_stats_updated_at 
    BEFORE UPDATE ON user_game_stats 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_sessions_updated_at 
    BEFORE UPDATE ON game_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usernames_updated_at 
    BEFORE UPDATE ON usernames 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON user_profiles TO authenticated;
GRANT SELECT ON user_game_stats TO authenticated;
GRANT SELECT ON game_sessions TO authenticated;
GRANT SELECT ON user_achievements TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_settings TO authenticated;
GRANT SELECT ON leaderboard_entries TO authenticated;
GRANT SELECT, INSERT, UPDATE ON usernames TO authenticated;

-- Grant permissions to anon users for username checking
GRANT SELECT ON usernames TO anon; 