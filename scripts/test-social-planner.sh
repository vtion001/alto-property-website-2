#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:3004"
echo "Running Social Planner tests (mock mode)"

echo "1) Auth status"
curl -s "$BASE_URL/api/integrations/social/auth/status" | jq . || true

echo "2) Create a scheduled post"
curl -s -X POST "$BASE_URL/api/social/posts" \
  -H 'Content-Type: application/json' \
  -d '{"content":"Test post from mock", "mediaUrls":[], "scheduledAt":"2025-01-01T00:00:00Z", "platforms":["facebook","twitter"]}' | jq . || true

echo "3) Publish immediately"
curl -s -X POST "$BASE_URL/api/social/publish" \
  -H 'Content-Type: application/json' \
  -d '{"content":"Immediate publish", "mediaUrls":[], "platforms":["linkedin","pinterest"]}' | jq . || true

echo "4) Run scheduler"
curl -s -X POST "$BASE_URL/api/cron/social/schedule-runner" | jq . || true

echo "All Social Planner mock tests executed. Review outputs above."