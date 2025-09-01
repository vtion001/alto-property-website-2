-- Core app tables for Admin-controlled content (properties, blog_posts) and admin auth

-- Admin users (exclusive to Alto Property)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Properties managed in admin
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  address text,
  suburb text,
  price text,
  beds int,
  baths int,
  parking int,
  land_size text,
  status text CHECK (status IN ('available','sold','pending','off-market')),
  type text CHECK (type IN ('house','apartment','townhouse','land')),
  listing_type text CHECK (listing_type IN ('sale','rent')),
  image text,
  date_added date,
  description text,
  features text[],
  commission_rate numeric,
  owner_username text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts managed in admin
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  date date,
  author text,
  category text,
  image text,
  status text CHECK (status IN ('published','draft')),
  views int DEFAULT 0,
  owner_username text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Helper to keep updated_at fresh
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_properties_updated_at') THEN
    CREATE TRIGGER trg_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_blog_posts_updated_at') THEN
    CREATE TRIGGER trg_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_admin_users_updated_at') THEN
    CREATE TRIGGER trg_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

-- Safe alterations for existing databases (idempotent)
DO $$ BEGIN
  -- Add owner_username to properties if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='properties' AND column_name='owner_username'
  ) THEN
    ALTER TABLE properties ADD COLUMN owner_username text;
    UPDATE properties SET owner_username = COALESCE(owner_username, 'altoadmin');
  END IF;

  -- Add owner_username to blog_posts if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='blog_posts' AND column_name='owner_username'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN owner_username text;
    UPDATE blog_posts SET owner_username = COALESCE(owner_username, 'altoadmin');
  END IF;
END $$;


