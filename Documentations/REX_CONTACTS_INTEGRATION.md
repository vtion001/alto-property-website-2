# REX Contacts Integration

This document describes the backend integration that synchronizes contacts from the REX API into the Alto admin dashboard.

## Overview

- OAuth 2.0 authentication to REX with secure httpOnly cookies.
- Endpoints to fetch and sync contacts from REX.
- Mapped fields and incremental sync support.
- Input validation, rate limiting, and error handling.
- Mock mode for local testing.

## Environment Variables

- `REX_AUTH_URL` (default `https://api.rexsoftware.com/oauth/authorize`)
- `REX_TOKEN_URL` (default `https://api.rexsoftware.com/oauth/token`)
- `REX_CLIENT_ID`
- `REX_CLIENT_SECRET`
- `REX_REDIRECT_URI` (default `${NEXT_PUBLIC_BASE_URL}/api/integrations/rex/oauth/callback`)
- `REX_SCOPE` (default `openid profile rex.read`)
- `REX_CONTACTS_ENDPOINT` (default `https://api.rexsoftware.com/v1/rex/contacts/list`)
- `NEXT_PUBLIC_BASE_URL` (e.g., `http://localhost:3004`)
- `REX_MOCK` (set to `1` to enable mock responses)

## API Endpoints

- `GET /api/integrations/rex/oauth/start` — Redirects to REX OAuth.
- `GET /api/integrations/rex/oauth/callback` — Exchanges code for tokens and stores cookies.
- `GET /api/integrations/rex/auth/status` — Validates tokens and reports status.
- `GET /api/integrations/rex/contacts/fetch?since=<ISO>` — Retrieves contacts from REX (normalized) for inspection.
- `POST /api/integrations/rex/contacts/sync?since=<ISO>` — Syncs contacts to Supabase `contacts` table.

## Contact Field Mapping

From REX → Dashboard:

- `name`: `name` or `first_name + last_name`
- `email`: `primary_email` or first of `emails[]`
- `phoneNumber`: `primary_phone` or first of `phones[]`
- `notes`: `notes` or `description`
- `updatedAt`: `updated_at`/`last_updated`

Stored in our `contacts` (Supabase) table:

- `name` (text)
- `phone_number` (text)
- `email` (text, nullable)
- `notes` (text, nullable)
- `created_at`, `updated_at` (timestamps)

## Incremental Sync

- Provide `since` query as ISO datetime or rely on `rex_last_contacts_sync` cookie.
- The sync endpoint requests REX with `updated_since` and upserts results by `phone_number`.

## Security

- Tokens are stored as httpOnly, secure cookies: `rex_access`, `rex_refresh`.
- OAuth `state` in `rex_oauth_state` cookie for CSRF protection.
- Admin endpoints require `alto_admin` JWT cookie.

## Rate Limiting

- In-memory token bucket limiter:
  - Fetch: 20/min per admin.
  - Sync: 6/min per admin.
  - For production, consider Redis-backed limiter.

## Error Handling

- Consistent JSON with `{ error, detail }` on failures.
- Log errors to server console; integrate with external monitoring in production.

## Testing

- Mock mode: set `REX_MOCK=1`.
- Run `scripts/test-rex-integration.sh` to exercise the endpoints.

## Performance

- Batch `upsert` with `onConflict: 'phone_number'` to minimize round trips.
- Use `since` for incremental fetch.

## Monitoring

- Use `auth/status` to check token validity.
- Capture sync metrics (`upserted`, `totalFetched`, `durationMs`).
  - Extend to database logs or external telemetry as needed.

## Notes

- REX endpoints and field names can vary by tenant; the integration is configurable via env vars and maps common fields.
- For durable mapping, introduce a separate table for external IDs if needed (e.g., `rex_contact_id`).