import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export const runtime = 'nodejs'

// Helper function to get Twilio config
async function getTwilioConfig() {
  // Try environment variables first for access token generation
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const apiKey = process.env.TWILIO_API_KEY
  const apiSecret = process.env.TWILIO_API_SECRET
  const twimlAppSid = process.env.TWILIO_TWIML_APP_SID

  if (accountSid && authToken && apiKey && apiSecret && twimlAppSid) {
    return { accountSid, authToken, apiKey, apiSecret, twimlAppSid }
  }

  // If no API keys, we can't generate access tokens
  return null
}

export async function POST(request: NextRequest) {
  try {
    const { identity } = await request.json()
    
    if (!identity) {
      return NextResponse.json({ 
        error: 'Identity required',
        details: 'Please provide an identity for the access token'
      }, { status: 400 })
    }

    const config = await getTwilioConfig()
    
    if (!config) {
      return NextResponse.json({
        error: 'Twilio credentials not configured',
        details: 'Missing TWILIO_API_KEY, TWILIO_API_SECRET, or TWILIO_TWIML_APP_SID in environment variables',
        hint: 'You need to create API Keys in Twilio Console and set up a TwiML App'
      }, { status: 500 })
    }

    // Create access token using correct import
    const AccessToken = twilio.jwt.AccessToken
    const VoiceGrant = AccessToken.VoiceGrant

    const accessToken = new AccessToken(
      config.accountSid,
      config.apiKey,
      config.apiSecret,
      { identity }
    )

    // Add Voice Grant
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: config.twimlAppSid,
      incomingAllow: true // Allow incoming calls
    })

    accessToken.addGrant(voiceGrant)

    // Token expires in 1 hour
    accessToken.ttl = 3600

    console.log('🎫 Generated access token for:', identity)

    return NextResponse.json({
      accessToken: accessToken.toJwt(),
      identity,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      capabilities: {
        outgoing: true,
        incoming: true
      }
    })

  } catch (error) {
    console.error('Access token generation error:', error)
    return NextResponse.json({
      error: 'Failed to generate access token',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}