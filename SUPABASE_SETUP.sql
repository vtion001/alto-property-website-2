-- Twilio Dialer Database Setup for Supabase
-- Copy and paste this into Supabase SQL Editor
-- URL: https://app.supabase.com -> Your Project -> SQL Editor

-- 1. Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS public.call_logs CASCADE;
DROP TABLE IF EXISTS public.twilio_config CASCADE;
DROP TABLE IF EXISTS public.contacts CASCADE;

-- 2. Create Twilio Configuration Table
CREATE TABLE public.twilio_config (
    id BIGSERIAL PRIMARY KEY,
    account_sid TEXT NOT NULL UNIQUE,
    auth_token TEXT NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Call Logs Table
CREATE TABLE public.call_logs (
    id BIGSERIAL PRIMARY KEY,
    call_sid TEXT NOT NULL,
    from_number VARCHAR(32) NOT NULL,
    to_number VARCHAR(32) NOT NULL,
    status TEXT NOT NULL,
    duration INTEGER,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create Contacts Table
CREATE TABLE public.contacts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Create Indexes for Performance
CREATE INDEX idx_call_logs_created_at ON public.call_logs (created_at DESC);
CREATE INDEX idx_call_logs_call_sid ON public.call_logs (call_sid);
CREATE INDEX idx_contacts_phone ON public.contacts (phone_number);

-- 6. Ensure Only One Active Configuration
CREATE UNIQUE INDEX unique_active_twilio_config 
ON public.twilio_config (is_active) 
WHERE is_active = TRUE;

-- 7. Create Row Level Security (RLS) Policies
ALTER TABLE public.twilio_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users
CREATE POLICY "Allow all operations" ON public.twilio_config FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.call_logs FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.contacts FOR ALL USING (true);

-- 8. Insert Sample Data (Replace with actual values)
INSERT INTO public.twilio_config (account_sid, auth_token, phone_number, is_active)
VALUES (
    'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', -- Replace with your Twilio Account SID
    'your_auth_token_here',                 -- Replace with your Twilio Auth Token
    '+1234567890',                          -- Replace with your Twilio phone number
    true
)
ON CONFLICT (account_sid) DO UPDATE SET
    auth_token = EXCLUDED.auth_token,
    phone_number = EXCLUDED.phone_number,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- 9. Insert Sample Contacts
INSERT INTO public.contacts (name, phone_number, email)
VALUES 
    ('John Doe', '+15551234567', 'john@example.com'),
    ('Jane Smith', '+15559876543', 'jane@example.com'),
    ('Bob Johnson', '+15555555555', 'bob@example.com')
ON CONFLICT DO NOTHING;

-- 10. Insert Sample Call Logs
INSERT INTO public.call_logs (call_sid, from_number, to_number, status, duration, started_at, ended_at)
VALUES 
    ('CA1234567890abcdef', '+15551234567', '+15559876543', 'completed', 120, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour' + INTERVAL '2 minutes'),
    ('CA0987654321fedcba', '+15555555555', '+15551234567', 'no-answer', 0, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes')
ON CONFLICT DO NOTHING;

-- 11. Verification Queries
SELECT 'Twilio Config:' as table_name, COUNT(*) as total_records FROM public.twilio_config;
SELECT 'Call Logs:' as table_name, COUNT(*) as total_records FROM public.call_logs;
SELECT 'Contacts:' as table_name, COUNT(*) as total_records FROM public.contacts;

-- 12. Show Active Configuration
SELECT 
    id,
    account_sid,
    phone_number,
    is_active,
    created_at,
    updated_at
FROM public.twilio_config 
WHERE is_active = true;