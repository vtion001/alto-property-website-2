-- Fix Supabase Permissions and RLS Policies
-- This script addresses 'permission denied for schema public' errors
-- Run this in Supabase SQL Editor with service role permissions

-- 1. Ensure service role has proper permissions on public schema
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;

-- 2. Fix google_reviews table permissions
-- Enable RLS if not already enabled
ALTER TABLE IF EXISTS google_reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations" ON google_reviews;
DROP POLICY IF EXISTS "public read google_reviews" ON google_reviews;
DROP POLICY IF EXISTS "service_role full access google_reviews" ON google_reviews;

-- Create comprehensive policies
CREATE POLICY "public read google_reviews" ON google_reviews 
  FOR SELECT USING (true);

CREATE POLICY "service_role full access google_reviews" ON google_reviews 
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Fix google_integration_tokens table permissions
ALTER TABLE IF EXISTS google_integration_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role full access google_integration_tokens" ON google_integration_tokens;

CREATE POLICY "service_role full access google_integration_tokens" ON google_integration_tokens 
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Fix twilio_config table permissions (if exists)
ALTER TABLE IF EXISTS twilio_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations" ON twilio_config;
DROP POLICY IF EXISTS "service_role full access twilio_config" ON twilio_config;

CREATE POLICY "service_role full access twilio_config" ON twilio_config 
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Fix call_logs table permissions (if exists)
ALTER TABLE IF EXISTS call_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations" ON call_logs;
DROP POLICY IF EXISTS "service_role full access call_logs" ON call_logs;

CREATE POLICY "service_role full access call_logs" ON call_logs 
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Fix contacts table permissions (if exists)
ALTER TABLE IF EXISTS contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations" ON contacts;
DROP POLICY IF EXISTS "service_role full access contacts" ON contacts;

CREATE POLICY "service_role full access contacts" ON contacts 
  FOR ALL USING (true) WITH CHECK (true);

-- 7. Ensure existing tables have proper service role access
-- Properties table
DROP POLICY IF EXISTS "service_role full access properties" ON properties;
CREATE POLICY "service_role full access properties" ON properties 
  FOR ALL USING (true) WITH CHECK (true);

-- Blog posts table
DROP POLICY IF EXISTS "service_role full access blog_posts" ON blog_posts;
CREATE POLICY "service_role full access blog_posts" ON blog_posts 
  FOR ALL USING (true) WITH CHECK (true);

-- Rental applications table
DROP POLICY IF EXISTS "service_role full access rental_applications" ON rental_applications;
CREATE POLICY "service_role full access rental_applications" ON rental_applications 
  FOR ALL USING (true) WITH CHECK (true);

-- Admin users table
DROP POLICY IF EXISTS "service_role full access admin_users" ON admin_users;
CREATE POLICY "service_role full access admin_users" ON admin_users 
  FOR ALL USING (true) WITH CHECK (true);

-- 8. Grant explicit permissions on specific tables that might be missing
GRANT ALL PRIVILEGES ON TABLE google_reviews TO service_role;
GRANT ALL PRIVILEGES ON TABLE google_integration_tokens TO service_role;
GRANT ALL PRIVILEGES ON TABLE properties TO service_role;
GRANT ALL PRIVILEGES ON TABLE blog_posts TO service_role;
GRANT ALL PRIVILEGES ON TABLE rental_applications TO service_role;
GRANT ALL PRIVILEGES ON TABLE admin_users TO service_role;

-- Grant on Twilio tables if they exist
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'twilio_config') THEN
        GRANT ALL PRIVILEGES ON TABLE twilio_config TO service_role;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'call_logs') THEN
        GRANT ALL PRIVILEGES ON TABLE call_logs TO service_role;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'contacts') THEN
        GRANT ALL PRIVILEGES ON TABLE contacts TO service_role;
    END IF;
END $$;

-- 9. Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 10. Verification queries
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Show all policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Show table permissions for service_role
SELECT 
    table_schema,
    table_name,
    privilege_type
FROM information_schema.table_privileges 
WHERE grantee = 'service_role' 
    AND table_schema = 'public'
ORDER BY table_name, privilege_type;