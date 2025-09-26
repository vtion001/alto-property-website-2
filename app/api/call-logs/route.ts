import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createClient } from '@supabase/supabase-js'

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
  try {
    console.log('Fetching call logs from Supabase...')
    
    const { data: callLogs, error } = await supabase
      .from('call_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

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