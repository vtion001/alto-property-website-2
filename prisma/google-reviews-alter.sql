-- Ensure google_reviews has a stable review_id for duplicate-safe upserts
ALTER TABLE IF EXISTS google_reviews
  ADD COLUMN IF NOT EXISTS review_id TEXT,
  ADD COLUMN IF NOT EXISTS account_id TEXT,
  ADD COLUMN IF NOT EXISTS location_id TEXT;

-- Unique constraint on review_id for conflict handling
CREATE UNIQUE INDEX IF NOT EXISTS ux_google_reviews_review_id ON google_reviews(review_id);


