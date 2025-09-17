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

    // Mock mode: enabled if TWILIO_MOCK=true or placeholder credentials are detected
    const useMock = process.env.TWILIO_MOCK === 'true'
      || config.accountSid.startsWith('ACxxxx')
      || config.authToken === 'your_auth_token_here'

    if (useMock) {
      const fakeSid = 'CA' + randomBytes(16).toString('hex')
      await prisma.callLog.create({
        data: {
          callSid: fakeSid,
          fromNumber: from,
          toNumber: to,
          status: 'queued',
          startedAt: new Date(),
        },
      })
      return NextResponse.json({ sid: fakeSid, status: 'queued', mocked: true })
    }

    const client = twilio(config.accountSid, config.authToken)

    const call = await client.calls.create({
      to,
      from,
      twiml: '<Response><Say>Hello from the dialing system. This is a test call.</Say></Response>',
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


