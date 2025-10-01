import { NextRequest, NextResponse } from 'next/server'
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

// POST - Sync recordings from Twilio API
export async function POST(request: NextRequest) {
  try {
    // Initialize Twilio client
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    if (!accountSid || !authToken) {
      return NextResponse.json(
        { error: 'Twilio credentials not configured' },
        { status: 500 }
      )
    }

    const client = twilio(accountSid, authToken)

    // Get optional parameters from request body
    const body = await request.json().catch(() => ({}))
    const { 
      limit = 50, 
      dateCreatedAfter, 
      callSid 
    } = body

    console.log('🔄 Starting Twilio recordings sync...')

    // Fetch recordings from Twilio API
    const recordingsOptions: any = {
      limit: Math.min(limit, 100) // Cap at 100 for safety
    }

    if (dateCreatedAfter) {
      recordingsOptions.dateCreatedAfter = new Date(dateCreatedAfter)
    }

    if (callSid) {
      recordingsOptions.callSid = callSid
    }

    const twilioRecordings = await client.recordings.list(recordingsOptions)
    
    console.log(`📞 Found ${twilioRecordings.length} recordings in Twilio`)

    let syncedCount = 0
    let skippedCount = 0
    let errorCount = 0
    const errors: string[] = []

    for (const recording of twilioRecordings) {
      try {
        // Find the corresponding call log in our database
        const { data: callLog, error: callLogError } = await supabase
          .from('call_logs')
          .select('id')
          .eq('call_sid', recording.callSid)
          .single()

        if (callLogError || !callLog) {
          console.log(`⚠️ No call log found for recording ${recording.sid} (call: ${recording.callSid})`)
          skippedCount++
          continue
        }

        // Check if recording already exists
        const { data: existingRecording } = await supabase
          .from('call_recordings')
          .select('id')
          .eq('recording_sid', recording.sid)
          .single()

        if (existingRecording) {
          console.log(`⏭️ Recording ${recording.sid} already exists, skipping`)
          skippedCount++
          continue
        }

        // Create the recording URL
        const recordingUrl = `https://api.twilio.com${recording.uri.replace('.json', '.mp3')}`

        // Insert the recording into our database
        const { error: insertError } = await supabase
          .from('call_recordings')
          .insert({
            call_log_id: callLog.id,
            recording_url: recordingUrl,
            recording_sid: recording.sid,
            duration: recording.duration ? parseInt(recording.duration) : null,
            file_size: null, // Twilio doesn't provide file size in the API
            format: 'mp3',
            consent_given: true, // Assume consent if recording exists
            consent_timestamp: recording.dateCreated,
            storage_location: 'twilio',
            is_processed: false
          })

        if (insertError) {
          console.error(`❌ Error inserting recording ${recording.sid}:`, insertError)
          errors.push(`Recording ${recording.sid}: ${insertError.message}`)
          errorCount++
        } else {
          console.log(`✅ Synced recording ${recording.sid}`)
          syncedCount++
        }

      } catch (error) {
        console.error(`❌ Error processing recording ${recording.sid}:`, error)
        errors.push(`Recording ${recording.sid}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        errorCount++
      }
    }

    const result = {
      success: true,
      message: `Sync completed: ${syncedCount} synced, ${skippedCount} skipped, ${errorCount} errors`,
      stats: {
        totalFound: twilioRecordings.length,
        synced: syncedCount,
        skipped: skippedCount,
        errors: errorCount
      },
      errors: errors.length > 0 ? errors : undefined
    }

    console.log('🎉 Sync completed:', result)

    return NextResponse.json(result)

  } catch (error) {
    console.error('💥 Error syncing recordings:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to sync recordings from Twilio',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET - Get sync status and recent sync history
export async function GET() {
  try {
    // Get count of recordings in database
    const { count: localCount, error: countError } = await supabase
      .from('call_recordings')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      throw countError
    }

    // Get recent recordings
    const { data: recentRecordings, error: recentError } = await supabase
      .from('call_recordings')
      .select(`
        id,
        recording_sid,
        created_at,
        storage_location,
        call_logs (
          call_sid,
          from_number,
          to_number
        )
      `)
      .order('created_at', { ascending: false })
      .limit(10)

    if (recentError) {
      throw recentError
    }

    return NextResponse.json({
      localRecordingsCount: localCount || 0,
      recentRecordings: recentRecordings || [],
      lastSyncTime: recentRecordings?.[0]?.created_at || null
    })

  } catch (error) {
    console.error('Error getting sync status:', error)
    return NextResponse.json(
      { error: 'Failed to get sync status' },
      { status: 500 }
    )
  }
}