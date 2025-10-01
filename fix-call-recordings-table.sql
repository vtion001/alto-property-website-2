-- Fix for Call Recordings Table - Missing from Supabase Schema
-- Run this in your Supabase SQL Editor to add the missing call_recordings table

-- Create call_recordings table
CREATE TABLE IF NOT EXISTS public.call_recordings (
    id BIGSERIAL PRIMARY KEY,
    call_log_id BIGINT NOT NULL,
    recording_url TEXT NOT NULL,
    recording_sid TEXT,
    duration INTEGER,
    file_size INTEGER,
    format TEXT NOT NULL DEFAULT 'mp3',
    consent_given BOOLEAN NOT NULL DEFAULT false,
    consent_timestamp TIMESTAMPTZ,
    storage_location TEXT,
    is_processed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_call_recordings_call_log_id 
        FOREIGN KEY (call_log_id) 
        REFERENCES public.call_logs(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint to ensure one recording per call log
    CONSTRAINT unique_call_log_recording 
        UNIQUE (call_log_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_call_recordings_call_log_id ON public.call_recordings (call_log_id);
CREATE INDEX IF NOT EXISTS idx_call_recordings_created_at ON public.call_recordings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_recordings_recording_sid ON public.call_recordings (recording_sid);

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to call_recordings table
DROP TRIGGER IF EXISTS set_timestamp_call_recordings ON public.call_recordings;
CREATE TRIGGER set_timestamp_call_recordings
    BEFORE UPDATE ON public.call_recordings
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_timestamp();

-- Enable Row Level Security
ALTER TABLE public.call_recordings ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for call_recordings
CREATE POLICY "Allow all operations on call_recordings" 
    ON public.call_recordings 
    FOR ALL 
    USING (true);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.call_recordings TO service_role;
GRANT USAGE, SELECT ON SEQUENCE call_recordings_id_seq TO service_role;

-- Verification query
SELECT 
    'call_recordings table created successfully' as status,
    COUNT(*) as total_records 
FROM public.call_recordings;

-- Show table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'call_recordings'
ORDER BY ordinal_position;