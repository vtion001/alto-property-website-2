import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: NextRequest) {
  try {
    const { identity } = await request.json()
    
    if (!identity) {
      return NextResponse.json(
        { error: 'Identity is required' },
        { status: 400 }
      )
    }

    // Check Twilio configuration
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      return NextResponse.json(
        { error: 'Twilio configuration missing' },
        { status: 500 }
      )
    }

    // Create an Access Token for Voice SDK
    const accessToken = new twilio.jwt.AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY || process.env.TWILIO_ACCOUNT_SID, // Use account SID as fallback
      process.env.TWILIO_API_SECRET || process.env.TWILIO_AUTH_TOKEN, // Use auth token as fallback
      { identity: identity }
    )

    // Add voice grant for making and receiving calls
    const voiceGrant = new twilio.jwt.AccessToken.VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
      incomingAllow: true, // Allow incoming calls
    })
    
    accessToken.addGrant(voiceGrant)

    const token = accessToken.toJwt()

    return NextResponse.json({ token, identity })
  } catch (error) {
    console.error('Error generating Twilio token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}