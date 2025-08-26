-- Supabase schema for Alto Property

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text not null,
  role text not null check (role in ('admin','super_admin')),
  created_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text not null,
  suburb text not null,
  price text not null,
  beds int not null,
  baths int not null,
  parking int not null,
  land_size text not null,
  status text not null check (status in ('available','sold','pending','off-market')),
  type text not null check (type in ('house','apartment','townhouse','land')),
  listing_type text not null check (listing_type in ('sale','rent')),
  image text,
  images text[],
  date_added date not null default now(),
  description text,
  features text[],
  commission_rate numeric,
  created_at timestamptz not null default now()
);

create table if not exists rental_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_name text not null,
  property_id uuid references properties(id) on delete cascade,
  application_date date not null default now(),
  status text not null check (status in ('pending','approved','rejected','processing')),
  income text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  date date not null default now(),
  author text not null,
  category text not null,
  image text not null,
  published boolean not null default false,
  is_external boolean default false,
  original_url text,
  created_at timestamptz not null default now()
);

-- RLS
alter table admin_users enable row level security;
alter table properties enable row level security;
alter table rental_applications enable row level security;
alter table blog_posts enable row level security;

-- Policies (public read, admin write)
create policy if not exists "public read properties" on properties for select using (true);
create policy if not exists "public read blog" on blog_posts for select using (true);
create policy if not exists "public read rentals" on rental_applications for select using (true);


