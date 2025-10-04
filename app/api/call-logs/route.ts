import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createClient } from '@supabase/supabase-js'
import twilio from 'twilio'

export const runtime = 'nodejs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function _requireAdmin(request: NextRequest) {
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
  try {
    const { searchParams } = new URL(request.url)
    const source = (searchParams.get('source') || '').toLowerCase()
    const useTwilio = source === 'twilio' || searchParams.get('twilio') === 'true'

    if (useTwilio) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID
      const authToken = process.env.TWILIO_AUTH_TOKEN

      if (!accountSid || !authToken) {
        console.warn('Twilio credentials not configured. Falling back to Supabase call_logs.')
      } else {
        const client = twilio(accountSid, authToken)
        console.log('Fetching recent call logs from Twilio API...')
        try {
          const calls = await client.calls.list()
          const mapped = calls.map((call) => ({
            id: call.sid, // Use Twilio SID as identifier
            call_sid: call.sid,
            from_number: call.from || '',
            to_number: call.to || '',
            status: (call.status || '').toLowerCase(),
            duration: typeof call.duration === 'number' ? call.duration : Number(call.duration) || null,
            started_at: call.startTime ? new Date(call.startTime as unknown as Date).toISOString() : null,
            ended_at: call.endTime ? new Date(call.endTime as unknown as Date).toISOString() : null,
            created_at: call.startTime ? new Date(call.startTime as unknown as Date).toISOString() : new Date().toISOString(),
          }))
          console.log(`Fetched ${mapped.length} calls from Twilio`)
          return NextResponse.json(mapped)
        } catch (twilioErr) {
          console.error('Twilio calls.list error:', twilioErr)
          // Fall through to Supabase fetch below
        }
      }
    }

    console.log('Fetching call logs from Supabase...')
    
    const { data: callLogs, error } = await supabase
      .from('call_logs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch call logs',
        details: error.message 
      }, { status: 500 })
    }

    console.log(`Fetched ${callLogs?.length || 0} call logs`)
    return NextResponse.json(callLogs || [])
  } catch (error) {
    console.error('Error in call logs GET:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Creating call log with data:', body)
    
    const { 
      call_sid, 
      from_number, 
      to_number, 
      status, 
      duration, 
      started_at, 
      ended_at 
    } = body

    // Validate required fields
    if (!call_sid || !from_number || !to_number || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: call_sid, from_number, to_number, status' }, 
        { status: 400 }
      )
    }

    const insertData = {
      call_sid,
      from_number,
      to_number,
      status,
      duration: duration || null,
      started_at: started_at ? new Date(started_at).toISOString() : null,
      ended_at: ended_at ? new Date(ended_at).toISOString() : null,
    }

    console.log('Inserting data:', insertData)

    const { data: callLog, error } = await supabase
      .from('call_logs')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ 
        error: 'Failed to create call log',
        details: error.message 
      }, { status: 500 })
    }

    console.log('Call log created successfully:', callLog)
    return NextResponse.json(callLog)
  } catch (error) {
    console.error('Error in call logs POST:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}