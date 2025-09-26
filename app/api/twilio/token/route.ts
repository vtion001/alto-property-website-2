import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: NextRequest) {
  try {
    // Since your frontend doesn't send identity, provide a default
    let identity = 'user-browser-client'
    
    try {
      const body = await request.json()
      if (body.identity) {
        identity = body.identity
      }
    } catch {
      // If no JSON body, use default identity
    }

    // Check Twilio configuration
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      return NextResponse.json(
        { error: 'Twilio configuration missing' },
        { status: 500 }
      )
    }

    // For Voice SDK, you need API Key and Secret (not Account SID/Auth Token for JWT)
    // If you don't have API Key/Secret, you'll need to create them in Twilio Console
    const apiKey = process.env.TWILIO_API_KEY || process.env.TWILIO_ACCOUNT_SID
    const apiSecret = process.env.TWILIO_API_SECRET || process.env.TWILIO_AUTH_TOKEN

    // Create an Access Token for Voice SDK
    const accessToken = new twilio.jwt.AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      apiKey,
      apiSecret,
      { 
        identity: identity,
        ttl: 3600 // 1 hour expiration
      }
    )

    // Add voice grant for making and receiving calls
    const voiceGrant = new twilio.jwt.AccessToken.VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
      incomingAllow: true, // Allow incoming calls
    })
    
    accessToken.addGrant(voiceGrant)

    const token = accessToken.toJwt()

    console.log('Generated token for identity:', identity)
    
    return NextResponse.json({ token, identity })
  } catch (error) {
    console.error('Error generating Twilio token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}