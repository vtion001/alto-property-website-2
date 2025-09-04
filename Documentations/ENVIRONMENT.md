# Environment and Setup

Create a `.env.local` in the project root with your database connection string.

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/dialing_system
```

When using Supabase, set `DATABASE_URL` to the project Postgres connection string from the Supabase dashboard (Project Settings → Database → Connection string → URI):

```
DATABASE_URL=postgresql://postgres:YOUR_DB_PASSWORD@DB_HOST.DB_REGION.supabase.co:5432/postgres
```

## Prisma

- `npx prisma generate`
- `npx prisma migrate deploy` (or `migrate dev` locally)

## Supabase schema init

Run the SQL in `prisma/supabase-init.sql` inside the Supabase SQL Editor once. It creates the tables, constraints, indexes, triggers and RLS policies needed by the Twilio Dialer.
