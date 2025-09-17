-- =====================================================
-- Twilio Configuration Data Setup
-- =====================================================
-- This script inserts or updates Twilio configuration data
-- for the AdminPage Dialer. Safe to run multiple times.

-- =====================================================
-- TWILIO CONFIGURATION
-- =====================================================

-- Insert or update your Twilio configuration
-- Replace the placeholder values with your actual Twilio credentials
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
  -- REPLACE THESE VALUES WITH YOUR ACTUAL TWILIO CREDENTIALS:
  'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', -- Your Twilio Account SID (starts with AC)
  'your_auth_token_here',               -- Your Twilio Auth Token (32 characters)
  '+1234567890',                        -- Your Twilio phone number (E.164 format)
  true,                                 -- Set to true to activate this configuration
  'http://localhost:3000',              -- Your application URL (update for production)
  'your_supabase_project_id',           -- Your Supabase project ID
  'https://your_project.supabase.co'    -- Your Supabase project URL
)
ON CONFLICT (account_sid) DO UPDATE SET
  auth_token = EXCLUDED.auth_token,
  phone_number = EXCLUDED.phone_number,
  is_active = EXCLUDED.is_active,
  project_url = EXCLUDED.project_url,
  supabase_project_id = EXCLUDED.supabase_project_id,
  supabase_url = EXCLUDED.supabase_url,
  updated_at = NOW();

-- =====================================================
-- SAMPLE CONTACTS (OPTIONAL)
-- =====================================================

-- Insert sample contacts for testing the dialer
-- Remove or modify these as needed
INSERT INTO public.contacts (name, phone_number, email, notes, tags, is_favorite)
VALUES 
  ('Test Contact 1', '+1234567890', 'test1@example.com', 'Sample contact for testing', ARRAY['test', 'sample'], false),
  ('Test Contact 2', '+1987654321', 'test2@example.com', 'Another test contact', ARRAY['test', 'demo'], true),
  ('Emergency Contact', '+1555000911', 'emergency@example.com', 'Emergency contact', ARRAY['emergency'], true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check if the configuration was inserted successfully
SELECT 
  id,
  account_sid,
  phone_number,
  is_active,
  project_url,
  created_at,
  updated_at
FROM public.twilio_config 
WHERE is_active = true;

-- Check contacts
SELECT 
  id,
  name,
  phone_number,
  email,
  is_favorite,
  created_at
FROM public.contacts 
ORDER BY created_at DESC 
LIMIT 5;

-- =====================================================
-- INSTRUCTIONS
-- =====================================================

/*
TO CONFIGURE YOUR TWILIO DIALER:

1. Get your Twilio credentials:
   - Go to https://console.twilio.com/
   - Find your Account SID (starts with "AC")
   - Find your Auth Token (click to reveal)
   - Get your Twilio phone number (must be purchased from Twilio)

2. Update the INSERT statement above with your actual values:
   - Replace 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' with your Account SID
   - Replace 'your_auth_token_here' with your Auth Token
   - Replace '+1234567890' with your Twilio phone number
   - Update the project_url to match your application URL
   - Update Supabase project details if using Supabase

3. Run this SQL script in your database

4. Update your .env.local file with database credentials:
   DATABASE_URL="your_database_connection_string"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE="your_supabase_service_role_key"

5. Restart your application and test the dialer in AdminPage

SECURITY NOTES:
- Never commit your actual credentials to version control
- Use environment variables for sensitive data in production
- Regularly rotate your Twilio Auth Token
- Consider using Twilio's API Key/Secret instead of Auth Token for production
*/