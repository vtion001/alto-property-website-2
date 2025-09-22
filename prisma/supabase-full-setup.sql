-- SUPABASE FULL SETUP FOR ALTO PROPERTY + DIALER
-- Safe to re-run (IF NOT EXISTS guards). Execute in Supabase SQL editor.

-- Extensions
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- Helpers
create or replace function public.trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;$$ language plpgsql;

-- =====================
-- Core Tables
-- =====================

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text not null,
  role text not null check (role in ('admin','super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.properties (
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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rental_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_name text not null,
  property_id uuid references public.properties(id) on delete cascade,
  application_date date not null default now(),
  status text not null check (status in ('pending','approved','rejected','processing')),
  income text,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  date date not null default now(),
  author text not null,
  category text not null,
  image text,
  published boolean not null default false,
  views int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================
-- Dialer / Twilio
-- =====================

-- Create twilio_config table with proper column handling
do $$ begin
  -- Create table if it doesn't exist
  if not exists (select 1 from information_schema.tables 
                 where table_schema = 'public' 
                 and table_name = 'twilio_config') then
    create table public.twilio_config (
      id bigserial primary key,
      account_sid text not null unique,
      auth_token text not null,
      phone_number varchar(32) not null,
      is_active boolean not null default false,
      project_url text, -- app origin (e.g., http://localhost:3001 or https://yourdomain)
      supabase_project_id text, -- e.g., xctamnjglrsxhgzszkai
      supabase_url text,        -- e.g., https://xctamnjglrsxhgzszkai.supabase.co
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  else
    -- Add missing columns if table exists but columns are missing
    if not exists (select 1 from information_schema.columns 
                   where table_schema = 'public' 
                   and table_name = 'twilio_config' 
                   and column_name = 'project_url') then
      alter table public.twilio_config add column project_url text;
    end if;
    
    if not exists (select 1 from information_schema.columns 
                   where table_schema = 'public' 
                   and table_name = 'twilio_config' 
                   and column_name = 'supabase_project_id') then
      alter table public.twilio_config add column supabase_project_id text;
    end if;
    
    if not exists (select 1 from information_schema.columns 
                   where table_schema = 'public' 
                   and table_name = 'twilio_config' 
                   and column_name = 'supabase_url') then
      alter table public.twilio_config add column supabase_url text;
    end if;
  end if;
end $$;

create table if not exists public.call_logs (
  id bigserial primary key,
  call_sid text not null,
  from_number varchar(32) not null,
  to_number varchar(32) not null,
  status text not null,
  duration integer,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id bigserial primary key,
  name text not null,
  phone_number varchar(32) not null,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================
-- Google Integrations (tokens)
-- =====================

create table if not exists public.google_integration_tokens (
  id serial primary key,
  provider text not null default 'google',
  refresh_token text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================
-- Indexes
-- =====================

create index if not exists idx_call_logs_created_at on public.call_logs (created_at desc);
create index if not exists idx_call_logs_call_sid on public.call_logs (call_sid);
create unique index if not exists ux_google_tokens_provider on public.google_integration_tokens(provider);

-- Create twilio index only if project_url column exists
do $$ begin
  if exists (select 1 from information_schema.columns 
             where table_schema = 'public' 
             and table_name = 'twilio_config' 
             and column_name = 'project_url') then
    if not exists (select 1 from pg_indexes 
                   where tablename = 'twilio_config' 
                   and indexname = 'ux_active_twilio_by_project') then
      create unique index ux_active_twilio_by_project
      on public.twilio_config (coalesce(project_url,'*'), is_active)
      where is_active = true;
    end if;
  end if;
end $$;

-- =====================
-- Triggers
-- =====================

do $$ begin
  if not exists (select 1 from pg_trigger where tgname='trg_properties_updated_at') then
    create trigger trg_properties_updated_at before update on public.properties
    for each row execute function public.trigger_set_timestamp();
  end if;
  if not exists (select 1 from pg_trigger where tgname='trg_rental_applications_updated_at') then
    create trigger trg_rental_applications_updated_at before update on public.rental_applications
    for each row execute function public.trigger_set_timestamp();
  end if;
  if not exists (select 1 from pg_trigger where tgname='trg_blog_posts_updated_at') then
    create trigger trg_blog_posts_updated_at before update on public.blog_posts
    for each row execute function public.trigger_set_timestamp();
  end if;
  if not exists (select 1 from pg_trigger where tgname='trg_contacts_updated_at') then
    create trigger trg_contacts_updated_at before update on public.contacts
    for each row execute function public.trigger_set_timestamp();
  end if;
  if not exists (select 1 from pg_trigger where tgname='trg_twilio_config_updated_at') then
    create trigger trg_twilio_config_updated_at before update on public.twilio_config
    for each row execute function public.trigger_set_timestamp();
  end if;
end $$;

-- =====================
-- Views & Functions (safe, no secrets)
-- =====================

create or replace view public.twilio_config_public as
select id, account_sid, phone_number, is_active, project_url, supabase_project_id, supabase_url, created_at, updated_at
from public.twilio_config;

create or replace function public.get_active_twilio_config(p_project_url text)
returns table (
  id bigint,
  account_sid text,
  phone_number text,
  is_active boolean,
  project_url text,
  supabase_project_id text,
  supabase_url text
) language sql stable as $$
  select id, account_sid, phone_number, is_active, project_url, supabase_project_id, supabase_url
  from public.twilio_config
  where is_active = true
    and (project_url is null or project_url = p_project_url)
  order by project_url nulls last, updated_at desc
  limit 1;
$$;

-- =====================
-- RLS (optional for PostgREST; Prisma connects with DB creds and bypasses RLS)
-- =====================

alter table public.admin_users enable row level security;
alter table public.properties enable row level security;
alter table public.rental_applications enable row level security;
alter table public.blog_posts enable row level security;
alter table public.contacts enable row level security;
alter table public.call_logs enable row level security;
alter table public.twilio_config enable row level security;

-- Service role policies (full access)
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'admin_users' and policyname = 'service_role_all_admin') then
    create policy service_role_all_admin on public.admin_users for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'properties' and policyname = 'service_role_all_properties') then
    create policy service_role_all_properties on public.properties for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'rental_applications' and policyname = 'service_role_all_rentals') then
    create policy service_role_all_rentals on public.rental_applications for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'blog_posts' and policyname = 'service_role_all_blog') then
    create policy service_role_all_blog on public.blog_posts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'contacts' and policyname = 'service_role_all_contacts') then
    create policy service_role_all_contacts on public.contacts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'call_logs' and policyname = 'service_role_all_calls') then
    create policy service_role_all_calls on public.call_logs for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'twilio_config' and policyname = 'service_role_all_twilio') then
    create policy service_role_all_twilio on public.twilio_config for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
end $$;

-- Minimal read policies (anon can read public content)
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'properties' and policyname = 'anon_read_properties') then
    create policy anon_read_properties on public.properties for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'blog_posts' and policyname = 'anon_read_blog') then
    create policy anon_read_blog on public.blog_posts for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'contacts' and policyname = 'anon_read_contacts') then
    create policy anon_read_contacts on public.contacts for select using (true);
  end if;
end $$;

-- =====================
-- Seed (set your values!)
-- Project URL used by the app (origin). For local dev:
--   http://localhost:3001
-- For deployment, set your public site origin.

-- Handle existing active configurations safely
do $$ begin
  -- First, deactivate any existing active configurations
  update public.twilio_config set is_active = false where is_active = true;
  
  -- Then insert or update the new configuration
  insert into public.twilio_config (account_sid, auth_token, phone_number, is_active, project_url, supabase_project_id, supabase_url, created_at, updated_at)
  values (
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    '+10000000000',
    true,
    'http://localhost:3001',
    'xctamnjglrsxhgzszkai',
    'https://xctamnjglrsxhgzszkai.supabase.co',
    now(),
    now()
  )
  on conflict (account_sid) do update set
    auth_token = excluded.auth_token,
    phone_number = excluded.phone_number,
    is_active = excluded.is_active,
    project_url = excluded.project_url,
    supabase_project_id = excluded.supabase_project_id,
    supabase_url = excluded.supabase_url,
    updated_at = now();
end $$;
