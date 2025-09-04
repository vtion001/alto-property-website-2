-- Dialer API configuration (Supabase/PostgreSQL)
-- Adds project_url scoping to Twilio config, helper function, safe indexes, and a public view.

-- 1) Extend twilio_config with project_url (nullable for older rows)
alter table if exists public.twilio_config
  add column if not exists project_url text;

-- 2) Ensure only one active config per project_url
create unique index if not exists unique_active_twilio_config_by_project
on public.twilio_config (project_url, is_active)
where is_active = true;

-- 3) Public view (no secrets)
create or replace view public.twilio_config_public as
select id,
       account_sid,
       phone_number,
       is_active,
       project_url,
       created_at,
       updated_at
from public.twilio_config;

-- 4) Helper function to fetch active config for a project
create or replace function public.get_active_twilio_config(p_project_url text)
returns table (
  id bigint,
  account_sid text,
  phone_number text,
  is_active boolean,
  project_url text
) language sql stable as $$
  select id, account_sid, phone_number, is_active, project_url
  from public.twilio_config
  where is_active = true
    and (project_url is null or project_url = p_project_url)
  order by project_url nulls last, updated_at desc
  limit 1;
$$;

-- 5) (Optional) RLS policy by project_url (keeps earlier service_role policies intact)
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'auth_read_twilio_config_public_by_project') then
    create policy auth_read_twilio_config_public_by_project
      on public.twilio_config_public
      for select using (true);
  end if;
end $$;

-- 6) Seed/Upsert an initial config row for your project URL
-- Replace the values below as needed. The phone number must be your Twilio number in E.164 format.
-- The auth_token is intentionally omitted from the public view but stored in twilio_config.
insert into public.twilio_config (account_sid, auth_token, phone_number, is_active, project_url)
values (
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  '+10000000000',
  true,
  'http://localhost:3001' -- Set to your project URL (same origin used by @dialer.tsx fetch: '/api/...')
)
on conflict (account_sid) do update set
  auth_token = excluded.auth_token,
  phone_number = excluded.phone_number,
  is_active = excluded.is_active,
  project_url = excluded.project_url,
  updated_at = now();



