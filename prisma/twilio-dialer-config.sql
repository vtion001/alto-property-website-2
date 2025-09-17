-- =====================================================
-- Twilio Dialer Configuration for AdminPage
-- =====================================================
-- This script sets up the complete database configuration
-- for the Twilio dialing system used in the AdminPage.

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Twilio Configuration Table
-- Stores API credentials and settings for Twilio integration
CREATE TABLE IF NOT EXISTS public.twilio_config (
  id BIGSERIAL PRIMARY KEY,
  account_sid TEXT NOT NULL UNIQUE,
  auth_token TEXT NOT NULL,
  phone_number VARCHAR(32) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  project_url TEXT, -- Application origin URL
  supabase_project_id TEXT, -- Supabase project identifier
  supabase_url TEXT, -- Supabase project URL
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Call Logs Table
-- Tracks all calls made through the dialer system
CREATE TABLE IF NOT EXISTS public.call_logs (
  id BIGSERIAL PRIMARY KEY,
  call_sid TEXT NOT NULL,
  from_number VARCHAR(32) NOT NULL,
  to_number VARCHAR(32) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('queued', 'ringing', 'in-progress', 'completed', 'busy', 'failed', 'no-answer', 'canceled')),
  duration INTEGER, -- Call duration in seconds
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contacts Table
-- Stores contact information for the dialer
CREATE TABLE IF NOT EXISTS public.contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number VARCHAR(32) NOT NULL,
  email TEXT,
  notes TEXT,
  tags TEXT[], -- Array of tags for categorization
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- 2. CREATE INDEXES
-- =====================================================

-- Ensure only one active Twilio config per project
CREATE UNIQUE INDEX IF NOT EXISTS ux_active_twilio_by_project
ON public.twilio_config (COALESCE(project_url, '*'), is_active)
WHERE is_active = true;

-- Performance indexes for call logs
CREATE INDEX IF NOT EXISTS idx_call_logs_created_at 
ON public.call_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_call_logs_call_sid 
ON public.call_logs (call_sid);

CREATE INDEX IF NOT EXISTS idx_call_logs_status 
ON public.call_logs (status);

CREATE INDEX IF NOT EXISTS idx_call_logs_to_number 
ON public.call_logs (to_number);

-- Performance indexes for contacts
CREATE INDEX IF NOT EXISTS idx_contacts_phone_number 
ON public.contacts (phone_number);

CREATE INDEX IF NOT EXISTS idx_contacts_name 
ON public.contacts (name);

CREATE INDEX IF NOT EXISTS idx_contacts_is_favorite 
ON public.contacts (is_favorite) WHERE is_favorite = true;

-- =====================================================
-- 3. CREATE TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for twilio_config
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trg_twilio_config_updated_at'
  ) THEN
    CREATE TRIGGER trg_twilio_config_updated_at
    BEFORE UPDATE ON public.twilio_config
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;

-- Trigger for contacts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trg_contacts_updated_at'
  ) THEN
    CREATE TRIGGER trg_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;

-- =====================================================
-- 4. CREATE VIEWS AND FUNCTIONS
-- =====================================================

-- Public view for Twilio config (excludes sensitive auth_token)
CREATE OR REPLACE VIEW public.twilio_config_public AS
SELECT 
  id,
  account_sid,
  phone_number,
  is_active,
  project_url,
  created_at,
  updated_at
FROM public.twilio_config;

-- Function to get active Twilio configuration for a project
CREATE OR REPLACE FUNCTION public.get_active_twilio_config(p_project_url TEXT)
RETURNS TABLE (
  id BIGINT,
  account_sid TEXT,
  phone_number TEXT,
  is_active BOOLEAN,
  project_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    tc.id,
    tc.account_sid,
    tc.phone_number,
    tc.is_active,
    tc.project_url
  FROM public.twilio_config tc
  WHERE tc.is_active = true 
    AND (tc.project_url = p_project_url OR tc.project_url IS NULL)
  ORDER BY tc.project_url NULLS LAST
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.twilio_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 6. SECURITY POLICIES
-- =====================================================

-- Service role has full access to all tables
CREATE POLICY IF NOT EXISTS service_role_all_twilio_config 
ON public.twilio_config FOR ALL 
USING (auth.role() = 'service_role') 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS service_role_all_call_logs 
ON public.call_logs FOR ALL 
USING (auth.role() = 'service_role') 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS service_role_all_contacts 
ON public.contacts FOR ALL 
USING (auth.role() = 'service_role') 
WITH CHECK (auth.role() = 'service_role');

-- Authenticated users can read contacts (optional - adjust as needed)
CREATE POLICY IF NOT EXISTS authenticated_read_contacts 
ON public.contacts FOR SELECT 
USING (auth.role() = 'authenticated');

-- =====================================================
-- 7. GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to service role
GRANT SELECT, INSERT, UPDATE, DELETE ON public.twilio_config TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.call_logs TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contacts TO service_role;

-- Grant sequence permissions
GRANT USAGE, SELECT ON SEQUENCE public.twilio_config_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.call_logs_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.contacts_id_seq TO service_role;

-- =====================================================
-- 8. SAMPLE CONFIGURATION DATA
-- =====================================================

-- Insert or update default Twilio configuration
-- IMPORTANT: Replace these placeholder values with your actual Twilio credentials
INSERT INTO public.twilio_config (
  account_sid, 
  auth_token, 
  phone_number, 
  is_active, 
  project_url,
  supabase_project_id,
  supabase_url
)
VALUES (
  'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', -- Replace with your Twilio Account SID
  'your_auth_token_here',               -- Replace with your Twilio Auth Token
  '+1234567890',                        -- Replace with your Twilio phone number
  true,
  'http://localhost:3000',              -- Replace with your app URL
  'your_supabase_project_id',           -- Replace with your Supabase project ID
  'https://your_project.supabase.co'    -- Replace with your Supabase URL
)
ON CONFLICT (account_sid) DO UPDATE SET
  auth_token = EXCLUDED.auth_token,
  phone_number = EXCLUDED.phone_number,
  is_active = EXCLUDED.is_active,
  project_url = EXCLUDED.project_url,
  supabase_project_id = EXCLUDED.supabase_project_id,
  supabase_url = EXCLUDED.supabase_url,
  updated_at = NOW();

-- Insert sample contacts (optional)
INSERT INTO public.contacts (name, phone_number, email, notes, tags, is_favorite)
VALUES 
  ('John Doe', '+1234567890', 'john.doe@example.com', 'Potential client', ARRAY['lead', 'buyer'], false),
  ('Jane Smith', '+1987654321', 'jane.smith@example.com', 'Property owner', ARRAY['seller', 'owner'], true),
  ('Mike Johnson', '+1555123456', 'mike.j@example.com', 'Real estate agent', ARRAY['agent', 'partner'], false)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 9. VERIFICATION QUERIES
-- =====================================================

-- Verify the setup with these queries:

-- Check if tables exist
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('twilio_config', 'call_logs', 'contacts');

-- Check active Twilio configuration
-- SELECT * FROM public.twilio_config_public WHERE is_active = true;

-- Check sample contacts
-- SELECT * FROM public.contacts LIMIT 5;

-- Test the get_active_twilio_config function
-- SELECT * FROM public.get_active_twilio_config('http://localhost:3000');

-- =====================================================
-- SETUP COMPLETE
-- =====================================================

-- Your Twilio dialer configuration is now ready!
-- 
-- Next steps:
-- 1. Update the placeholder values in the INSERT statement above with your actual Twilio credentials
-- 2. Update your .env.local file with the correct DATABASE_URL and Supabase credentials
-- 3. Restart your application server
-- 4. Test the dialer functionality in the AdminPage
--
-- For security:
-- - Never commit your actual Twilio credentials to version control
-- - Use environment variables for sensitive configuration
-- - Regularly rotate your Twilio Auth Token