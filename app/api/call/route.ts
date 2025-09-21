import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import twilio from 'twilio'
import { jwtVerify } from 'jose'
import { randomBytes } from 'crypto'

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

    const config = await prisma.twilioConfig.findFirst({ where: { isActive: true } })
    if (!config) return NextResponse.json({ error: 'Twilio not configured' }, { status: 400 })

    // Check for placeholder credentials and reject the call
    if (config.accountSid.startsWith('ACxxxx') || config.authToken === 'your_auth_token_here') {
      return NextResponse.json({ error: 'Invalid Twilio configuration. Please update your credentials.' }, { status: 400 })
    }

    const client = twilio(config.accountSid, config.authToken)

    // Get the base URL for webhooks
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const call = await client.calls.create({
      to,
      from,
      twiml: '<Response><Say>Hello from the dialing system. Please wait while we connect your call.</Say><Pause length="1"/><Say>You are now connected. You should be able to hear the other party.</Say><Gather input="speech dtmf" timeout="3600" finishOnKey="#" action="/api/twilio/voice/gather" method="POST">Speak or press any key to continue. Press pound to end.</Gather></Response>',
      statusCallback: `${baseUrl}/api/twilio/voice`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      statusCallbackMethod: 'POST',
    })

    await prisma.callLog.create({
      data: {
        callSid: call.sid,
        fromNumber: from,
        toNumber: to,
        status: call.status ?? 'queued',
        startedAt: new Date(),
      },
    })

    return NextResponse.json({ sid: call.sid, status: call.status, dateCreated: call.dateCreated })
  } catch (error) {
    console.error('Call POST error', error)
    return NextResponse.json({ error: 'Failed to make call' }, { status: 500 })
  }
}


