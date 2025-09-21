-- SQLite-compatible Twilio Dialer Schema

-- Twilio Configuration Table
CREATE TABLE IF NOT EXISTS twilio_config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_sid TEXT NOT NULL UNIQUE,
  auth_token TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT 0,
  project_url TEXT,
  supabase_project_id TEXT,
  supabase_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Call Logs Table
CREATE TABLE IF NOT EXISTS call_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  call_sid TEXT NOT NULL,
  from_number TEXT NOT NULL,
  to_number TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('queued', 'ringing', 'in-progress', 'completed', 'busy', 'failed', 'no-answer', 'canceled')),
  duration INTEGER,
  started_at DATETIME,
  ended_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  tags TEXT,
  is_favorite BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_call_logs_created_at ON call_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_call_logs_call_sid ON call_logs (call_sid);
CREATE INDEX IF NOT EXISTS idx_call_logs_status ON call_logs (status);
CREATE INDEX IF NOT EXISTS idx_call_logs_to_number ON call_logs (to_number);
CREATE INDEX IF NOT EXISTS idx_contacts_phone_number ON contacts (phone_number);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts (name);
CREATE INDEX IF NOT EXISTS idx_contacts_is_favorite ON contacts (is_favorite);

-- Insert mock Twilio configuration for testing
INSERT INTO twilio_config (account_sid, auth_token, phone_number, is_active, project_url)
VALUES (
  'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  'your_auth_token_here',
  '+1234567890',
  1,
  'http://localhost:3000'
);