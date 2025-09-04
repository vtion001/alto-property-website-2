-- Supabase/PostgreSQL initialization for Twilio Dialing System
-- Safe re-runs: create objects if they don't already exist

-- Ensure helper function to auto-update updated_at
create or replace function public.trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Tables
create table if not exists public.twilio_config (
  id bigserial primary key,
  account_sid text not null unique,
  auth_token text not null,
  phone_number varchar(32) not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

-- Triggers
do $$ begin
  if not exists (
    select 1 from pg_trigger where tgname = 'set_timestamp_twilio_config'
  ) then
    create trigger set_timestamp_twilio_config
    before update on public.twilio_config
    for each row execute function public.trigger_set_timestamp();
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_trigger where tgname = 'set_timestamp_contacts'
  ) then
    create trigger set_timestamp_contacts
    before update on public.contacts
    for each row execute function public.trigger_set_timestamp();
  end if;
end $$;

-- Indexes
create index if not exists idx_call_logs_created_at on public.call_logs (created_at desc);
create index if not exists idx_call_logs_call_sid on public.call_logs (call_sid);
create index if not exists idx_contacts_phone on public.contacts (phone_number);

-- Only one active Twilio config
create unique index if not exists unique_active_twilio_config
on public.twilio_config (is_active)
where is_active = true;

-- RLS setup (optional if you only connect via server or postgres user)
alter table public.twilio_config enable row level security;
alter table public.call_logs enable row level security;
alter table public.contacts enable row level security;

-- Allow service role to do everything via Supabase REST (PostgREST)
-- Note: service_role is identified via auth.jwt() claim, not a DB role
create policy if not exists service_role_all_twilio_config on public.twilio_config
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy if not exists service_role_all_call_logs on public.call_logs
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy if not exists service_role_all_contacts on public.contacts
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

-- Read-only access for authenticated users to contacts (optional)
create policy if not exists authenticated_read_contacts on public.contacts
  for select using (auth.role() = 'authenticated');

-- Grants (safe to attempt)
grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update, delete on public.contacts to service_role;
grant select, insert, update, delete on public.call_logs to service_role;
grant select, insert, update, delete on public.twilio_config to service_role;


