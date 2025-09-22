import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { jwtVerify } from 'jose'

export const runtime = 'nodejs'

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('alto_admin')?.value
  if (!token) return null
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { to, from } = await request.json()
    if (!to || !from) return NextResponse.json({ error: 'Missing to/from' }, { status: 400 })

    // Use credentials from .env.local
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !twilioNumber) {
      return NextResponse.json({ error: 'Twilio credentials not set in environment' }, { status: 500 })
    }

    // Check for placeholder credentials and reject the call
    if (accountSid.startsWith('ACxxxx') || authToken === 'your_auth_token_here') {
      return NextResponse.json({ error: 'Invalid Twilio configuration. Please update your credentials.' }, { status: 400 })
    }

    const client = twilio(accountSid, authToken)

    // Get the base URL for webhooks
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3004'

    const call = await client.calls.create({
      to,
      from,
      twiml: '<Response><Say>Hello from the dialing system. Please wait while we connect your call.</Say><Pause length="1"/><Say>You are now connected. You should be able to hear the other party.</Say><Gather input="speech dtmf" timeout="3600" finishOnKey="#" action="/api/twilio/voice/gather" method="POST">Speak or press any key to continue. Press pound to end.</Gather></Response>',
      statusCallback: `${baseUrl}/api/twilio/voice`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      statusCallbackMethod: 'POST',
    })

    // No DB logging
    return NextResponse.json({ sid: call.sid, status: call.status, dateCreated: call.dateCreated })
  } catch (error) {
    console.error('Call POST error', error)
    return NextResponse.json({ error: 'Failed to make call' }, { status: 500 })
  }
}