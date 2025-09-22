#!/bin/bash

# Comprehensive API Test Script for Alto Property Website
# Tests all major API endpoints and provides detailed diagnostics

echo "🧪 COMPREHENSIVE API TESTING FOR ALTO PROPERTY WEBSITE"
echo "======================================================="
echo ""

BASE_URL="http://localhost:3000"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "🕐 Test started at: $TIMESTAMP"
echo "🌐 Base URL: $BASE_URL"
echo ""

# Function to test an endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    
    echo "📡 Testing: $description"
    echo "   Method: $method"
    echo "   Endpoint: $endpoint"
    
    if [ -n "$data" ]; then
        echo "   Data: $data"
        response=$(curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" \
            -w "\n---CURL_INFO---\nStatus: %{http_code}\nTime: %{time_total}s\n")
    else
        response=$(curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -w "\n---CURL_INFO---\nStatus: %{http_code}\nTime: %{time_total}s\n")
    fi
    
    echo "   Response:"
    echo "$response" | head -20
    echo ""
    echo "---"
    echo ""
}

# Test Core API Endpoints
echo "🏠 TESTING CORE PROPERTY & BLOG ENDPOINTS"
echo "=========================================="

# Test Properties API
test_endpoint "GET" "/api/properties" "Get all properties"

# Test Blog Posts API  
test_endpoint "GET" "/api/blog-posts" "Get all blog posts"

# Test individual blog post (if any exist)
test_endpoint "GET" "/api/blog-posts/test-id" "Get specific blog post"

echo "📞 TESTING TWILIO/DIALER ENDPOINTS"
echo "=================================="

# Test Twilio Config
test_endpoint "GET" "/api/twilio/config" "Get Twilio configuration"

# Test Call Logs
test_endpoint "GET" "/api/call-logs" "Get call logs"

# Test Contacts
test_endpoint "GET" "/api/contacts" "Get contacts"

echo "🔐 TESTING ADMIN ENDPOINTS"
echo "=========================="

# Test Admin Auth (should fail without credentials)
test_endpoint "POST" "/api/admin/auth/login" "Admin login (should fail)" '{"username":"test","password":"test"}'

echo "🔍 TESTING OTHER ENDPOINTS"
echo "=========================="

# Test RSS
test_endpoint "GET" "/api/rss" "RSS feed"

# Test Google Reviews (should handle missing config gracefully)
test_endpoint "GET" "/api/google-reviews" "Google Reviews"

echo "📊 TESTING POST ENDPOINTS (CREATE OPERATIONS)"
echo "=============================================="

# Test creating a property (should fail without auth)
test_endpoint "POST" "/api/properties" "Create property (should fail without auth)" '{
    "title": "Test Property",
    "address": "123 Test St",
    "suburb": "Test Suburb", 
    "price": "$500,000",
    "beds": 3,
    "baths": 2,
    "parking": 1,
    "landSize": "600m²",
    "status": "available",
    "type": "house",
    "listingType": "sale"
}'

# Test creating a blog post (should fail without auth)
test_endpoint "POST" "/api/blog-posts" "Create blog post (should fail without auth)" '{
    "title": "Test Blog Post",
    "slug": "test-blog-post",
    "excerpt": "This is a test blog post",
    "content": "This is the content of the test blog post",
    "author": "Test Author",
    "category": "Test Category"
}'

echo "✅ API TESTING COMPLETED"
echo "========================"
echo ""
echo "🔍 SUMMARY & DIAGNOSTICS"
echo "========================"
echo "• If you see 'permission denied for schema public' errors:"
echo "  - Your Supabase environment variables are set but the service role key lacks permissions"
echo "  - Execute the supabase-full-setup.sql script in your Supabase dashboard"
echo "  - Verify your SUPABASE_SERVICE_ROLE_KEY has the correct permissions"
echo ""
echo "• If you see 'Database not configured' errors:"
echo "  - Your environment variables are missing"
echo "  - Create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE"
echo ""
echo "• If you see 200 status codes with data:"
echo "  - ✅ Your API endpoints are working correctly!"
echo ""
echo "• If you see 401/403 errors for POST endpoints:"
echo "  - ✅ This is expected - authentication is working correctly"
echo ""
echo "🕐 Test completed at: $(date '+%Y-%m-%d %H:%M:%S')"