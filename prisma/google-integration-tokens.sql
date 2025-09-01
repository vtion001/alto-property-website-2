-- Table to store OAuth refresh tokens for Google integrations
CREATE TABLE IF NOT EXISTS google_integration_tokens (
  id SERIAL PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'google',
  refresh_token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Keep only one row per provider (you can relax this if you support multiple locations)
CREATE UNIQUE INDEX IF NOT EXISTS ux_google_tokens_provider ON google_integration_tokens(provider);


