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

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const callSid = searchParams.get('callSid')

    if (!callSid) {
      return NextResponse.json({ error: 'Missing callSid' }, { status: 400 })
    }

    // Use credentials from .env.local
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    if (!accountSid || !authToken) {
      return NextResponse.json({ error: 'Twilio credentials not set in environment' }, { status: 500 })
    }

    const client = twilio(accountSid, authToken)

    try {
      const call = await client.calls(callSid).fetch()

      return NextResponse.json({
        status: call.status,
        from: call.from,
        to: call.to,
        duration: call.duration,
        startTime: call.startTime,
        endTime: call.endTime,
        price: call.price,
        priceUnit: call.priceUnit
      })
    } catch (twilioError: any) {
      // Twilio returns 20404 for not found
      if (twilioError?.status === 404 || twilioError?.code === 20404) {
        return NextResponse.json({ error: 'Call not found' }, { status: 404 })
      }
      console.error('Twilio API error:', twilioError)
      return NextResponse.json({ error: 'Failed to fetch from Twilio' }, { status: 500 })
    }
  } catch (error) {
    console.error('Call status error:', error)
    return NextResponse.json({ error: 'Failed to get call status' }, { status: 500 })
  }
}