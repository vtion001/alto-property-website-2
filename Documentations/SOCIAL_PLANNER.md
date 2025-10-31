# Social Media Planner

## Overview
- Unified composer for Facebook, Instagram, TikTok, YouTube, Twitter/X, LinkedIn, Pinterest.
- OAuth connections per platform with connection status.
- Media upload, scheduling, bulk publish, and queue processing.
- Mock mode supported via `SOCIAL_MOCK=1` for local tests.

## Environment Variables
- `NEXT_PUBLIC_BASE_URL` — App base URL (e.g., http://localhost:3004).
- `SOCIAL_MOCK=1` — Enable mock publishing.
- Platform credentials (for production):
  - `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`
  - `INSTAGRAM_CLIENT_ID`, `INSTAGRAM_CLIENT_SECRET` (optional, may reuse FB)
  - `TIKTOK_CLIENT_ID`, `TIKTOK_CLIENT_SECRET`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (YouTube)
  - `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`
  - `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`
  - `PINTEREST_CLIENT_ID`, `PINTEREST_CLIENT_SECRET`

## API Endpoints
- OAuth:
  - `GET /api/integrations/social/oauth/start?platform=<name>` — redirect to provider.
  - `GET /api/integrations/social/oauth/callback?platform=<name>&code=&state=` — token exchange.
  - `GET /api/integrations/social/auth/status` — connection status map.
- Posts:
  - `GET /api/social/posts` — list posts (mock storage).
  - `POST /api/social/posts` — create/schedule `{ content, mediaUrls?, scheduledAt?, platforms }`.
- Publish:
  - `POST /api/social/publish` — immediate bulk publish.
- Scheduler Runner:
  - `POST /api/cron/social/schedule-runner` — process due scheduled posts.
- Media Upload:
  - `POST /api/social/media/upload` — form-data `media` → returns `{ url }`.

## UI
- Page: `/admin/integrations/social-planner`
- Aside: connection indicators and platform selection.
- Composer: content textarea, media upload, schedule datetime, publish button.
- Preview: tabs per selected platform showing content + media thumbnails.

## Error Handling & Rate Limiting
- Rate limits:
  - Create posts: 20/min per admin.
  - Publish: 10/min per admin.
  - Scheduler: 6/min per admin.
- Endpoints return `{ error, detail }` on failure with appropriate status codes.

## Testing
1. Ensure dev server is running on the configured port.
2. Run `bash scripts/test-social-planner.sh`.
3. Visit `/admin/integrations/social-planner` to interact with UI.

## Production Notes
- Replace mock memory storage with DB persistence (Prisma or Supabase).
- Implement real publisher adapters per platform using official APIs.
- Store tokens securely (encrypted at rest) with periodic refresh.
- Add approval workflows and audit logs as needed.
- Add analytics ingestion and charts for performance and engagement.