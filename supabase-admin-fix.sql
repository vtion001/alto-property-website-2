-- Comprehensive Admin User Fix for Supabase
-- This script fixes both schema and permission issues
-- Run this in Supabase SQL Editor

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Ensure service role has proper permissions on public schema
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;

-- 3. Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text,
  password_hash text not null,
  name text not null,
  role text not null check (role in ('admin','super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Add username column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin_users' 
                   AND column_name = 'username') THEN
        ALTER TABLE public.admin_users ADD COLUMN username text;
    END IF;
END $$;

-- 5. Make email nullable (since we're using username for login)
ALTER TABLE public.admin_users ALTER COLUMN email DROP NOT NULL;

-- 6. Add unique constraint on username if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint 
                   WHERE conname = 'admin_users_username_key') THEN
        ALTER TABLE public.admin_users ADD CONSTRAINT admin_users_username_key UNIQUE (username);
    END IF;
END $$;

-- 7. Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 8. Drop existing policies if they exist
DROP POLICY IF EXISTS "service_role_all_admin" ON public.admin_users;
DROP POLICY IF EXISTS "service_role full access admin_users" ON public.admin_users;

-- 9. Create comprehensive service role policy
CREATE POLICY "service_role full access admin_users" ON public.admin_users 
  FOR ALL USING (true) WITH CHECK (true);

-- 10. Grant explicit permissions on admin_users table
GRANT ALL ON public.admin_users TO service_role;

-- 11. Insert/Update the altoadmin user
INSERT INTO public.admin_users (username, email, password_hash, name, role)
VALUES (
    'altoadmin',
    'admin@altoproperty.com',
    crypt('AltoAdmin123!', gen_salt('bf')),
    'Alto Admin',
    'super_admin'
)
ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- Handle conflict on email as well (in case email exists but username doesn't)
INSERT INTO public.admin_users (username, email, password_hash, name, role)
VALUES (
    'altoadmin',
    'admin@altoproperty.com',
    crypt('AltoAdmin123!', gen_salt('bf')),
    'Alto Admin',
    'super_admin'
)
ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    password_hash = EXCLUDED.password_hash,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    updated_at = NOW()
WHERE admin_users.username IS NULL OR admin_users.username != 'altoadmin';

-- 12. Verification queries
SELECT 'Admin Users Table:' as info, COUNT(*) as total_records FROM public.admin_users;
SELECT 'altoadmin user:' as info, username, email, name, role, created_at 
FROM public.admin_users WHERE username = 'altoadmin';

-- 13. Test service role permissions
SELECT 'Service role can access admin_users:' as test, 
       CASE WHEN has_table_privilege('service_role', 'public.admin_users', 'SELECT') 
            THEN 'YES' ELSE 'NO' END as result;