import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import twilio from 'twilio'

export async function POST(request: NextRequest) {
  try {
    const { to, from } = await request.json()
    if (!to || !from) return NextResponse.json({ error: 'Missing to/from' }, { status: 400 })

    const config = await prisma.twilioConfig.findFirst({ where: { isActive: true } })
    if (!config) return NextResponse.json({ error: 'Twilio not configured' }, { status: 400 })

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
    return NextResponse.json({ error: 'Failed to make call' }, { status: 500 })
  }
}


