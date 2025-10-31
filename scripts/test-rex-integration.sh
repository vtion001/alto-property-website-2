#!/usr/bin/env bash
set -euo pipefail

BASE_URL=${BASE_URL:-http://localhost:3004}

echo "Running REX integration tests (mock mode)..."

export REX_MOCK=1

echo "1) Auth status"
curl -sS "${BASE_URL}/api/integrations/rex/auth/status" | jq '. | {hasAccessToken, hasRefreshToken} '

echo "2) Fetch contacts (mock)"
curl -sS "${BASE_URL}/api/integrations/rex/contacts/fetch" | jq '.count'

echo "3) Sync contacts (mock)"
curl -sS -X POST "${BASE_URL}/api/integrations/rex/contacts/sync" | jq '{upserted, totalFetched, durationMs}'

echo "All mock tests executed. Review outputs above."