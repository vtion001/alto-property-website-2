#!/bin/bash

# Test script for Twilio configuration API
# Make this executable: chmod +x test-api.sh

echo "🧪 Testing Twilio Configuration API"
echo "=================================="

# Test GET endpoint
echo "📡 Testing GET /api/twilio/config..."
curl -X GET http://localhost:3000/api/twilio/config \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n"

echo ""

# Test POST endpoint with test data
echo "📡 Testing POST /api/twilio/config..."
curl -X POST http://localhost:3000/api/twilio/config \
  -H "Content-Type: application/json" \
  -d '{
    "accountSid": "ACtest123456789",
    "authToken": "test_auth_token_123",
    "phoneNumber": "+1234567890"
  }' \
  -w "\nStatus: %{http_code}\n"

echo ""
echo "✅ API tests completed"
echo "💡 Check the responses above for any errors"
echo "🔍 If you see 200 status codes, the API is working correctly"