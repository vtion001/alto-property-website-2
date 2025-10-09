import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createClient } from '@supabase/supabase-js'
import twilio from 'twilio'

type TwilioCall = {
  sid: string
  startTime?: Date | string
  endTime?: Date | string
  to?: string
  from?: string
  status?: string
  duration?: number | string
  direction?: string
}

type SupabaseCallRow = {
  id?: string | number
  call_sid?: string
  to_number?: string
  from_number?: string
  status?: string
  duration?: number | string
  started_at?: string
  ended_at?: string
  created_at?: string
}

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
    const dateParam = searchParams.get('date')
    const targetDate = dateParam ? new Date(dateParam) : null
    const startOfDay = targetDate ? new Date(targetDate) : null
    if (startOfDay) startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = startOfDay ? new Date(startOfDay) : null
    if (endOfDay) endOfDay.setDate(endOfDay.getDate() + 1)

    if (useTwilio) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID
      const authToken = process.env.TWILIO_AUTH_TOKEN

      if (!accountSid || !authToken) {
        console.warn('Twilio credentials not configured. Falling back to Supabase call_logs.')
      } else {
        const client = twilio(accountSid, authToken)
        console.log('Fetching recent call logs from Twilio API...')
        try {
          const listOptions: { startTimeAfter?: Date; startTimeBefore?: Date; limit?: number } = {}
          if (startOfDay && endOfDay) {
            listOptions.startTimeAfter = startOfDay
            listOptions.startTimeBefore = endOfDay
          }
          listOptions.limit = 1000
          const calls = await client.calls.list(listOptions)

          const BUSINESS_NUMBER = process.env.TWILIO_BUSINESS_NUMBER || ''
          const normalized = calls.map((call: TwilioCall) => {
            const started = call.startTime ? new Date(call.startTime as Date).toISOString() : null
            const ended = call.endTime ? new Date(call.endTime as Date).toISOString() : null
            const to = call.to || ''
            const from = call.from || ''
            let direction: 'inbound' | 'outbound' = 'outbound'
            if (BUSINESS_NUMBER) {
              // If the call is to the business number, it's inbound
              if (to && BUSINESS_NUMBER && to.replace(/\D/g, '') === BUSINESS_NUMBER.replace(/\D/g, '')) {
                direction = 'inbound'
              } else if (from && BUSINESS_NUMBER && from.replace(/\D/g, '') === BUSINESS_NUMBER.replace(/\D/g, '')) {
                direction = 'outbound'
              }
            } else if (call.direction) {
              // Fallback to Twilio-provided direction if available
              direction = String(call.direction).includes('inbound') ? 'inbound' : 'outbound'
            }

            return {
              id: call.sid,
              callSid: call.sid,
              to,
              from,
              status: (call.status || '').toLowerCase(),
              duration: typeof call.duration === 'number' ? call.duration : Number(call.duration) || 0,
              startTime: started || new Date().toISOString(),
              endTime: ended || started || new Date().toISOString(),
              direction,
              recordingUrl: undefined,
              transcription: undefined,
              sentiment: undefined,
              qualityScore: undefined,
              tags: undefined,
            }
          })

          console.log(`Fetched ${normalized.length} calls from Twilio`)
          return NextResponse.json(normalized)
        } catch (twilioErr) {
          console.error('Twilio calls.list error:', twilioErr)
          // Fall through to Supabase fetch below
        }
      }
    }

    console.log('Fetching call logs from Supabase...')
    
    let supabaseQuery = supabase
      .from('call_logs')
      .select('*')
      .order('created_at', { ascending: false })
    if (startOfDay && endOfDay) {
      supabaseQuery = supabaseQuery
        .gte('created_at', startOfDay.toISOString())
        .lt('created_at', endOfDay.toISOString())
    }
    const { data: callLogs, error } = await supabaseQuery

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch call logs',
        details: error.message 
      }, { status: 500 })
    }

    console.log(`Fetched ${callLogs?.length || 0} call logs`)
    const BUSINESS_NUMBER = process.env.TWILIO_BUSINESS_NUMBER || ''
    const normalizedFromSupabase = (callLogs || []).map((row) => {
      const r = row as SupabaseCallRow
      const to = String(r.to_number || '')
      const from = String(r.from_number || '')
      let direction: 'inbound' | 'outbound' = 'outbound'
      if (BUSINESS_NUMBER) {
        if (to && BUSINESS_NUMBER && to.replace(/\D/g, '') === BUSINESS_NUMBER.replace(/\D/g, '')) {
          direction = 'inbound'
        } else if (from && BUSINESS_NUMBER && from.replace(/\D/g, '') === BUSINESS_NUMBER.replace(/\D/g, '')) {
          direction = 'outbound'
        }
      }
      return {
        id: String(r.id ?? r.call_sid ?? ''),
        callSid: String(r.call_sid ?? ''),
        to,
        from,
        status: String((r.status || '').toLowerCase()),
        duration: typeof r.duration === 'number' ? r.duration : Number(r.duration) || 0,
        startTime: r.started_at ? new Date(r.started_at).toISOString() : (r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString()),
        endTime: r.ended_at ? new Date(r.ended_at).toISOString() : (r.started_at ? new Date(r.started_at).toISOString() : new Date().toISOString()),
        direction,
        recordingUrl: undefined,
        transcription: undefined,
        sentiment: undefined,
        qualityScore: undefined,
        tags: undefined,
      }
    })
    return NextResponse.json(normalizedFromSupabase)
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