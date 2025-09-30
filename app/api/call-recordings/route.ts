import { NextRequest, NextResponse } from 'next/server'
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

// GET - Fetch call recordings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const callLogId = searchParams.get('callLogId')
    const _includeAnalysis = searchParams.get('includeAnalysis') === 'true'

    if (callLogId) {
      // Get specific recording with call log details
      const { data: recording, error } = await supabase
        .from('call_recordings')
        .select(`
          *,
          call_logs (
            id,
            call_sid,
            from_number,
            to_number,
            status,
            duration,
            started_at,
            ended_at,
            created_at
          )
        `)
        .eq('call_log_id', callLogId)
        .single()

      if (error) {
        console.error('Error fetching recording:', error)
        return NextResponse.json({ error: 'Recording not found' }, { status: 404 })
      }

      return NextResponse.json(recording)
    } else {
      // Get all recordings with call log details
      const { data: recordings, error } = await supabase
        .from('call_recordings')
        .select(`
          *,
          call_logs (
            id,
            call_sid,
            from_number,
            to_number,
            status,
            duration,
            started_at,
            ended_at,
            created_at
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching recordings:', error)
        return NextResponse.json({ error: 'Failed to fetch call recordings' }, { status: 500 })
      }

      return NextResponse.json(recordings || [])
    }
  } catch (error) {
    console.error('Error fetching call recordings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call recordings' },
      { status: 500 }
    )
  }
}

// POST - Create or update call recording
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      call_log_id,
      recording_url,
      recording_sid,
      duration,
      file_size,
      format = 'mp3',
      consent_given = true,
      consent_timestamp,
      storage_location
    } = body

    // Validate required fields
    if (!call_log_id || !recording_url) {
      return NextResponse.json(
        { error: 'call_log_id and recording_url are required' },
        { status: 400 }
      )
    }

    // Check if call log exists
    const { data: callLog, error: callLogError } = await supabase
      .from('call_logs')
      .select('id')
      .eq('id', call_log_id)
      .single()

    if (callLogError || !callLog) {
      return NextResponse.json(
        { error: 'Call log not found' },
        { status: 404 }
      )
    }

    // Create or update recording
    const { data: recording, error } = await supabase
      .from('call_recordings')
      .upsert({
        call_log_id,
        recording_url,
        recording_sid,
        duration,
        file_size,
        format,
        consent_given,
        consent_timestamp: consent_timestamp ? new Date(consent_timestamp).toISOString() : null,
        storage_location,
        is_processed: false,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'call_log_id'
      })
      .select(`
        *,
        call_logs (
          id,
          call_sid,
          from_number,
          to_number,
          status,
          created_at
        )
      `)
      .single()

    if (error) {
      console.error('Error creating/updating recording:', error)
      return NextResponse.json(
        { error: 'Failed to create/update call recording' },
        { status: 500 }
      )
    }

    return NextResponse.json(recording, { status: 201 })
  } catch (error) {
    console.error('Error creating/updating call recording:', error)
    return NextResponse.json(
      { error: 'Failed to create/update call recording' },
      { status: 500 }
    )
  }
}

// PUT - Update recording consent or processing status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, consent_given, consent_timestamp, is_processed } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Recording ID is required' },
        { status: 400 }
      )
    }

    const updateData: {
      updated_at: string
      consent_given?: boolean
      consent_timestamp?: string
      is_processed?: boolean
    } = {
      updated_at: new Date().toISOString()
    }
    
    if (typeof consent_given === 'boolean') {
      updateData.consent_given = consent_given
      if (consent_given && consent_timestamp) {
        updateData.consent_timestamp = new Date(consent_timestamp).toISOString()
      }
    }

    if (typeof is_processed === 'boolean') {
      updateData.is_processed = is_processed
    }

    const { data: recording, error } = await supabase
      .from('call_recordings')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        call_logs (
          id,
          call_sid,
          from_number,
          to_number,
          status,
          created_at
        )
      `)
      .single()

    if (error) {
      console.error('Error updating recording:', error)
      return NextResponse.json(
        { error: 'Failed to update call recording' },
        { status: 500 }
      )
    }

    return NextResponse.json(recording)
  } catch (error) {
    console.error('Error updating call recording:', error)
    return NextResponse.json(
      { error: 'Failed to update call recording' },
      { status: 500 }
    )
  }
}

// DELETE - Delete call recording
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Recording ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('call_recordings')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting recording:', error)
      return NextResponse.json(
        { error: 'Failed to delete call recording' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Recording deleted successfully' })
  } catch (error) {
    console.error('Error deleting call recording:', error)
    return NextResponse.json(
      { error: 'Failed to delete call recording' },
      { status: 500 }
    )
  }
}