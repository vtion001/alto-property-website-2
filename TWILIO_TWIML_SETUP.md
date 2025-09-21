# Twilio TwiML Application Setup Guide

This guide will help you configure your Twilio TwiML application to work with the dialer component.

## The Problem

The Twilio Device error you're seeing occurs because the TwiML application referenced in your access token doesn't have the correct webhook URLs configured. This causes signaling errors when the Twilio Device tries to connect.

## Solution: Configure TwiML Application

### Step 1: Access Twilio Console

1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Develop** → **Voice** → **TwiML** → **TwiML Apps**

### Step 2: Find Your TwiML Application

Your TwiML Application SID is: `AP913fc80a00e0b39da6d38c92f4ebc54f`

1. Look for this SID in your TwiML Apps list
2. If it doesn't exist, create a new one by clicking **Create new TwiML App**

### Step 3: Configure Webhook URLs

Set the following webhook URLs in your TwiML application:

#### For Production (replace with your actual domain):
- **Voice Request URL**: `https://your-domain.com/api/twilio/webhook`
- **Voice Request Method**: `POST`
- **Voice Status Callback URL**: `https://your-domain.com/api/twilio/voice`
- **Voice Status Callback Method**: `POST`

#### For Development (localhost):
- **Voice Request URL**: `https://your-ngrok-url.ngrok.io/api/twilio/webhook`
- **Voice Request Method**: `POST`
- **Voice Status Callback URL**: `https://your-ngrok-url.ngrok.io/api/twilio/voice`
- **Voice Status Callback Method**: `POST`

### Step 4: Set Up ngrok for Development

Since Twilio needs to reach your local server, you'll need ngrok:

1. Install ngrok: `npm install -g ngrok` or download from [ngrok.com](https://ngrok.com/)
2. Start your development server: `npm run dev`
3. In another terminal, run: `ngrok http 3000`
4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
5. Use this URL in your TwiML application webhook configuration

### Step 5: Update Environment Variables

Add your ngrok URL to `.env.local`:

```env
# Add this for webhook callbacks
NEXT_PUBLIC_BASE_URL=https://your-ngrok-url.ngrok.io
```

## Alternative: Mock Mode for Development

If you don't want to set up webhooks immediately, you can enable mock mode:

1. Set `TWILIO_MOCK=true` in your `.env.local`
2. This will bypass real Twilio connections for development

## Webhook Endpoints

Your application already has these webhook endpoints configured:

- `/api/twilio/webhook` - Main voice webhook handler
- `/api/twilio/voice` - Voice status callbacks
- `/api/twilio/webhook/gather` - Handles user input during calls
- `/api/twilio/voice/gather` - Alternative gather handler

## Testing the Setup

1. Configure your TwiML application as described above
2. Restart your development server
3. Open the dialer at `http://localhost:3000/dialer`
4. The device status should show "Device Ready" instead of "Initializing..."

## Troubleshooting

### Common Issues:

1. **"Device not ready"** - Check TwiML application webhook URLs
2. **"Signaling error"** - Verify ngrok is running and URLs are correct
3. **"Token generation failed"** - Check environment variables
4. **"Webhook not reachable"** - Ensure ngrok URL is accessible

### Debug Steps:

1. Check browser console for detailed error messages
2. Check server logs for webhook requests
3. Verify TwiML application configuration in Twilio Console
4. Test webhook URLs directly with curl

## Security Notes

- Never expose your ngrok URL publicly
- Use HTTPS URLs for all webhook configurations
- Rotate your API keys regularly
- Use environment variables for all sensitive data

## Next Steps

After configuring the TwiML application:
1. Test making a call through the dialer
2. Monitor webhook logs for proper request flow
3. Configure production webhook URLs when deploying