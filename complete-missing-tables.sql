-- Complete Missing Tables for Twilio Dialer System
-- Run this in your Supabase SQL Editor to add all missing tables

-- 1. Create call_recordings table
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

-- 2. Create call_transcriptions table
CREATE TABLE IF NOT EXISTS public.call_transcriptions (
    id BIGSERIAL PRIMARY KEY,
    call_log_id BIGINT NOT NULL,
    transcript_text TEXT NOT NULL,
    confidence REAL,
    language TEXT NOT NULL DEFAULT 'en-US',
    service TEXT NOT NULL DEFAULT 'openai',
    processing_time INTEGER,
    word_count INTEGER,
    is_processed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_call_transcriptions_call_log_id 
        FOREIGN KEY (call_log_id) 
        REFERENCES public.call_logs(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint to ensure one transcription per call log
    CONSTRAINT unique_call_log_transcription 
        UNIQUE (call_log_id)
);

-- 3. Create call_analysis table
CREATE TABLE IF NOT EXISTS public.call_analysis (
    id BIGSERIAL PRIMARY KEY,
    call_log_id BIGINT NOT NULL,
    overall_score REAL,
    sentiment_score REAL,
    clarity_score REAL,
    engagement_score REAL,
    outcome_score REAL,
    key_topics TEXT[],
    action_items TEXT[],
    summary TEXT,
    recommendations TEXT[],
    call_outcome TEXT,
    talk_time_ratio REAL,
    interruption_count INTEGER,
    pause_analysis JSONB,
    emotional_tone TEXT,
    is_processed BOOLEAN NOT NULL DEFAULT false,
    processing_time INTEGER,
    ai_model TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_call_analysis_call_log_id 
        FOREIGN KEY (call_log_id) 
        REFERENCES public.call_logs(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint to ensure one analysis per call log
    CONSTRAINT unique_call_log_analysis 
        UNIQUE (call_log_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_call_recordings_call_log_id ON public.call_recordings (call_log_id);
CREATE INDEX IF NOT EXISTS idx_call_recordings_created_at ON public.call_recordings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_recordings_recording_sid ON public.call_recordings (recording_sid);

CREATE INDEX IF NOT EXISTS idx_call_transcriptions_call_log_id ON public.call_transcriptions (call_log_id);
CREATE INDEX IF NOT EXISTS idx_call_transcriptions_created_at ON public.call_transcriptions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_transcriptions_is_processed ON public.call_transcriptions (is_processed);

CREATE INDEX IF NOT EXISTS idx_call_analysis_call_log_id ON public.call_analysis (call_log_id);
CREATE INDEX IF NOT EXISTS idx_call_analysis_created_at ON public.call_analysis (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_analysis_is_processed ON public.call_analysis (is_processed);

-- Create or update trigger function for updated_at timestamp
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to all tables
DROP TRIGGER IF EXISTS set_timestamp_call_recordings ON public.call_recordings;
CREATE TRIGGER set_timestamp_call_recordings
    BEFORE UPDATE ON public.call_recordings
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_call_transcriptions ON public.call_transcriptions;
CREATE TRIGGER set_timestamp_call_transcriptions
    BEFORE UPDATE ON public.call_transcriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_call_analysis ON public.call_analysis;
CREATE TRIGGER set_timestamp_call_analysis
    BEFORE UPDATE ON public.call_analysis
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_timestamp();

-- Enable Row Level Security
ALTER TABLE public.call_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_transcriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_analysis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all operations on call_recordings" 
    ON public.call_recordings 
    FOR ALL 
    USING (true);

CREATE POLICY "Allow all operations on call_transcriptions" 
    ON public.call_transcriptions 
    FOR ALL 
    USING (true);

CREATE POLICY "Allow all operations on call_analysis" 
    ON public.call_analysis 
    FOR ALL 
    USING (true);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.call_recordings TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.call_transcriptions TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.call_analysis TO service_role;

GRANT USAGE, SELECT ON SEQUENCE call_recordings_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE call_transcriptions_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE call_analysis_id_seq TO service_role;

-- Verification queries
SELECT 'call_recordings' as table_name, COUNT(*) as total_records FROM public.call_recordings
UNION ALL
SELECT 'call_transcriptions' as table_name, COUNT(*) as total_records FROM public.call_transcriptions
UNION ALL
SELECT 'call_analysis' as table_name, COUNT(*) as total_records FROM public.call_analysis;

-- Show all tables in the public schema
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN ('call_logs', 'call_recordings', 'call_transcriptions', 'call_analysis', 'twilio_config', 'contacts')
ORDER BY table_name;