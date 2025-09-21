import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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

    // First check local database
    const callLog = await prisma.callLog.findFirst({
      where: { callSid }
    })

    if (!callLog) {
      return NextResponse.json({ error: 'Call not found' }, { status: 404 })
    }

    // Check if this is a real Twilio call (not a mock)
    if (callLog.callSid.startsWith('CA') && callLog.callSid.length === 34) {
      // This is a real Twilio call, fetch from Twilio API
      const config = await prisma.twilioConfig.findFirst({ where: { isActive: true } })
      if (!config) {
        return NextResponse.json({ error: 'Twilio not configured' }, { status: 400 })
      }

      const client = twilio(config.accountSid, config.authToken)
      
      try {
        const call = await client.calls(callSid).fetch()
        
        // Update local database with current status
        await prisma.callLog.updateMany({
          where: { callSid },
          data: { 
            status: call.status,
            duration: call.duration ? parseInt(call.duration) : undefined
          }
        })

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
      } catch (twilioError) {
        console.error('Twilio API error:', twilioError)
        // Return the last known status from database if Twilio API fails
        return NextResponse.json({
          status: callLog.status,
          from: callLog.fromNumber,
          to: callLog.toNumber,
          duration: callLog.duration || undefined,
          error: 'Failed to fetch from Twilio, returning cached status'
        })
      }
    }

    // For real Twilio calls, fetch from Twilio API
    const config = await prisma.twilioConfig.findFirst({ where: { isActive: true } })
    if (!config) {
      return NextResponse.json({ error: 'Twilio not configured' }, { status: 400 })
    }

    const client = twilio(config.accountSid, config.authToken)
    
    try {
      const call = await client.calls(callSid).fetch()
      
      // Update local database with current status
      await prisma.callLog.updateMany({
        where: { callSid },
        data: { 
          status: call.status,
          duration: call.duration ? parseInt(call.duration) : undefined
        }
      })

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
    } catch (twilioError) {
      console.error('Twilio API error:', twilioError)
      // Return the last known status from database if Twilio API fails
      return NextResponse.json({
        status: callLog.status,
        from: callLog.fromNumber,
        to: callLog.toNumber,
        duration: callLog.duration || undefined,
        error: 'Failed to fetch from Twilio, returning cached status'
      })
    }
  } catch (error) {
    console.error('Call status error:', error)
    return NextResponse.json({ error: 'Failed to get call status' }, { status: 500 })
  }
}