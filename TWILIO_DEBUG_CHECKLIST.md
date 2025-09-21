# Twilio Device WebSocket/Signaling Debug Checklist

This comprehensive checklist helps systematically debug Twilio Device WebSocket and signaling connection issues.

## 🔍 Quick Diagnosis

### 1. Check Error Patterns
- **Empty Error Object `{}`**: Usually indicates TwiML application webhook configuration issues
- **Error Code 31205**: TwiML application configuration error
- **Error Code 31206**: Invalid access token
- **Error Code 31208**: WebSocket connection failed
- **Error Code 31209**: Signaling connection error

### 2. Browser Console Analysis
Open browser DevTools and check for:
```javascript
// Look for these log patterns:
// ✅ Successful initialization
"🔄 Initializing Twilio Device..."
"✅ Twilio Device ready for calls"

// ❌ Error patterns
"❌ Twilio Device error:"
"❌ WebSocket connection failed"
"❌ Empty error object received"
```

## 🛠️ Systematic Debugging Steps

### Step 1: Environment Configuration
```bash
# Check all required environment variables
echo "TWILIO_ACCOUNT_SID: ${TWILIO_ACCOUNT_SID:0:10}..."
echo "TWILIO_API_KEY: ${TWILIO_API_KEY:0:10}..."
echo "TWILIO_API_SECRET: ${TWILIO_API_SECRET:0:10}..."
echo "TWILIO_TWIML_APP_SID: ${TWILIO_TWIML_APP_SID:0:10}..."
echo "TWILIO_PHONE_NUMBER: $TWILIO_PHONE_NUMBER"
```

**Validation Checklist:**
- [ ] TWILIO_ACCOUNT_SID starts with "AC"
- [ ] TWILIO_API_KEY starts with "SK"
- [ ] TWILIO_TWIML_APP_SID starts with "AP"
- [ ] TWILIO_PHONE_NUMBER is in E.164 format (+1234567890)
- [ ] All credentials are from the same Twilio project

### Step 2: Token Generation Test
```bash
# Test token generation endpoint
curl -X POST http://localhost:3001/api/twilio/access-token \
  -H "Content-Type: application/json" \
  -d '{"identity":"test_user"}'
```

**Expected Response:**
```json
{
  "accessToken": "eyJ...",
  "identity": "test_user",
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "expiresAt": "2024-01-01T01:00:00.000Z",
  "ttl": 3600,
  "capabilities": {
    "outgoingCalls": true,
    "incomingCalls": true,
    "applicationSid": "AP..."
  }
}
```

### Step 3: TwiML Application Configuration
1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Develop** → **Voice** → **TwiML** → **TwiML Apps**
3. Find your TwiML App SID: `AP913fc80a00e0b39da6d38c92f4ebc54f`

**Required Configuration:**
- [ ] Voice Request URL: `https://your-domain.com/api/twilio/webhook` (POST)
- [ ] Voice Status Callback URL: `https://your-domain.com/api/twilio/voice` (POST)
- [ ] URLs are publicly accessible (use ngrok for development)

### Step 4: Webhook Accessibility Test
```bash
# Test webhook endpoints
curl -X POST https://your-ngrok-url.ngrok.io/api/twilio/webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "CallSid=test&From=%2B1234567890&To=%2B0987654321"
```

**Expected Response:** Valid TwiML XML

### Step 5: Network and Firewall Check
```javascript
// Test WebSocket connectivity in browser console
const ws = new WebSocket('wss://chunderw-vpc-gll.twilio.com/signal');
ws.onopen = () => console.log('✅ WebSocket connection successful');
ws.onerror = (error) => console.error('❌ WebSocket connection failed:', error);
```

**Network Requirements:**
- [ ] Port 443 (HTTPS) is open
- [ ] WebSocket connections are allowed
- [ ] No corporate firewall blocking Twilio domains
- [ ] DNS resolution works for *.twilio.com

### Step 6: Browser Compatibility
**Supported Browsers:**
- [ ] Chrome 60+
- [ ] Firefox 55+
- [ ] Safari 11+
- [ ] Edge 79+

**Required Permissions:**
- [ ] Microphone access granted
- [ ] HTTPS connection (required for WebRTC)

## 🔧 Advanced Debugging Tools

### 1. Enhanced Error Logging
Add this to your browser console for detailed error analysis:
```javascript
// Enable verbose Twilio logging
window.Twilio.Device.debug = true;

// Monitor all device events
device.on('error', (error) => {
  console.group('🔍 Detailed Error Analysis');
  console.log('Error object:', error);
  console.log('Error type:', typeof error);
  console.log('Error constructor:', error?.constructor?.name);
  console.log('All properties:', Object.getOwnPropertyNames(error));
  console.groupEnd();
});
```

### 2. WebSocket State Monitoring
```javascript
// Monitor WebSocket connection state
const monitorWebSocket = (device) => {
  if (device._stream?._transport) {
    const transport = device._stream._transport;
    console.log('WebSocket State:', {
      readyState: transport.readyState,
      url: transport.url,
      protocol: transport.protocol
    });
  }
};
```

### 3. Token Validation Tool
```javascript
// Decode and validate JWT token
const validateToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    
    console.log('Token Analysis:', {
      identity: payload.sub || payload.identity,
      issued: new Date(payload.iat * 1000),
      expires: new Date(payload.exp * 1000),
      timeToExpiry: payload.exp - now,
      grants: payload.grants
    });
    
    return payload.exp > now;
  } catch (error) {
    console.error('Invalid token format:', error);
    return false;
  }
};
```

## 🚨 Common Issues and Solutions

### Issue 1: Empty Error Object `{}`
**Cause:** TwiML application webhook URLs not configured or not accessible
**Solution:**
1. Configure webhook URLs in TwiML application
2. Ensure URLs are publicly accessible (use ngrok for development)
3. Test webhook endpoints manually

### Issue 2: Error Code 31205
**Cause:** TwiML application configuration error
**Solution:**
1. Verify TwiML App SID in environment variables
2. Check webhook URL configuration
3. Ensure webhook returns valid TwiML

### Issue 3: Error Code 31206
**Cause:** Invalid or expired access token
**Solution:**
1. Check token generation endpoint
2. Verify Twilio credentials
3. Implement token refresh mechanism

### Issue 4: Error Code 31208
**Cause:** WebSocket connection failed
**Solution:**
1. Check network connectivity
2. Verify firewall settings
3. Test WebSocket connection manually
4. Try different edge location

### Issue 5: Device Initialization Timeout
**Cause:** Network issues or incorrect configuration
**Solution:**
1. Implement retry logic with exponential backoff
2. Check network stability
3. Verify all configuration parameters

## 🧪 Development Mode Solutions

### Enable Mock Mode
Set `TWILIO_MOCK=true` in `.env.local` to bypass real Twilio connections:
```env
TWILIO_MOCK=true
```

### Use ngrok for Webhook Testing
```bash
# Install ngrok
npm install -g ngrok

# Start your development server
npm run dev

# In another terminal, expose localhost
ngrok http 3000

# Use the HTTPS URL in your TwiML application
```

### Debug Mode Configuration
```javascript
// Enable maximum debugging
const deviceOptions = {
  debug: true,
  logLevel: 'debug',
  codecPreferences: ['opus', 'pcmu'],
  edge: 'sydney' // Use closest edge
};
```

## 📋 Pre-Production Checklist

Before deploying to production:
- [ ] All environment variables are set correctly
- [ ] TwiML application webhook URLs point to production domain
- [ ] Webhook endpoints are accessible and return valid TwiML
- [ ] Token generation works correctly
- [ ] Device initialization succeeds consistently
- [ ] WebSocket connections are stable
- [ ] Error handling covers all edge cases
- [ ] Logging is configured for production monitoring

## 🔗 Useful Resources

- [Twilio Device SDK Documentation](https://www.twilio.com/docs/voice/client/javascript)
- [TwiML Application Configuration](https://www.twilio.com/docs/voice/twiml/application)
- [Twilio Error Codes Reference](https://www.twilio.com/docs/api/errors)
- [WebRTC Troubleshooting Guide](https://www.twilio.com/docs/voice/client/javascript/troubleshooting)

## 📞 Support Contacts

If issues persist after following this checklist:
1. Check Twilio Status Page: https://status.twilio.com/
2. Review Twilio Console logs
3. Contact Twilio Support with detailed error logs
4. Post on Twilio Community Forum with specific error details