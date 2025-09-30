import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jwtVerify } from 'jose'
import twilio from 'twilio'

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ callSid: string }> }
) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { callSid } = await params
    
    if (!callSid) {
      return NextResponse.json({ error: 'Missing callSid' }, { status: 400 })
    }

    // Get Twilio configuration
    const config = await prisma.twilioConfig.findFirst({ where: { isActive: true } })
    if (!config) {
      return NextResponse.json({ error: 'Twilio not configured' }, { status: 400 })
    }

    // Check for placeholder credentials
    if (config.accountSid.startsWith('ACxxxx') || config.authToken === 'your_auth_token_here') {
      return NextResponse.json({ error: 'Invalid Twilio configuration' }, { status: 400 })
    }

    const client = twilio(config.accountSid, config.authToken)

    try {
      // Update the call to completed status in Twilio
      await client.calls(callSid).update({ status: 'completed' })
      
      // Update the call log in our database
      await prisma.callLog.updateMany({
        where: { callSid },
        data: { 
          status: 'completed',
          endedAt: new Date()
        }
      })

      return NextResponse.json({ success: true, message: 'Call ended successfully' })
    } catch (twilioError: unknown) {
      console.error('Twilio API error:', twilioError)
      
      // If the call is already completed or doesn't exist, still update our database
      const error = twilioError as { code?: number; status?: number }
      if (error.code === 20404 || error.status === 404) {
        await prisma.callLog.updateMany({
          where: { callSid },
          data: { 
            status: 'completed',
            endedAt: new Date()
          }
        })
        return NextResponse.json({ success: true, message: 'Call already ended' })
      }
      
      const errorMessage = (twilioError as { message?: string })?.message || 'Unknown error'
      return NextResponse.json({ 
        error: 'Failed to end call', 
        details: errorMessage 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Call DELETE error:', error)
    return NextResponse.json({ error: 'Failed to end call' }, { status: 500 })
  }
}