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

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)
    
    const callSid = params.get('CallSid')
    const callStatus = params.get('CallStatus')
    const from = params.get('From')
    const to = params.get('To')
    const callDuration = params.get('CallDuration')
    const recordingUrl = params.get('RecordingUrl')
    const recordingSid = params.get('RecordingSid')
    const recordingDuration = params.get('RecordingDuration')

    console.log('Twilio webhook received:', {
      callSid,
      callStatus,
      from,
      to,
      callDuration,
      recordingUrl,
      recordingSid
    })

    if (!callSid) {
      return NextResponse.json({ error: 'Missing CallSid' }, { status: 400 })
    }

    // Always try to find existing call log first
    const { data: existingCallLog } = await supabase
      .from('call_logs')
      .select('*')
      .eq('call_sid', callSid)
      .single()

    let callLog = existingCallLog;

    // Handle call status updates (when we have call details)
    if (callStatus || from || to) {
      if (existingCallLog) {
        // Update existing call log
        const updateData: any = {}
        
        if (callStatus) updateData.status = callStatus.toLowerCase()
        if (callDuration) updateData.duration = parseInt(callDuration)
        if (callStatus === 'completed') updateData.ended_at = new Date().toISOString()
        if (from && !existingCallLog.from_number) updateData.from_number = from
        if (to && !existingCallLog.to_number) updateData.to_number = to

        const { data: updatedCallLog, error: updateError } = await supabase
          .from('call_logs')
          .update(updateData)
          .eq('call_sid', callSid)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating call log:', updateError)
        } else {
          callLog = updatedCallLog
          console.log('Call log updated successfully')
        }
      } else if (from && to) {
        // Create new call log only if we have minimum required data
        const { data: newCallLog, error: insertError } = await supabase
          .from('call_logs')
          .insert({
            call_sid: callSid,
            from_number: from,
            to_number: to,
            status: callStatus?.toLowerCase() || 'unknown',
            duration: callDuration ? parseInt(callDuration) : null,
            started_at: new Date().toISOString(),
            ended_at: callStatus === 'completed' ? new Date().toISOString() : null,
          })
          .select()
          .single()

        if (insertError) {
          console.error('Error creating call log:', insertError)
        } else {
          callLog = newCallLog
          console.log('Call log created successfully')
        }
      }
    }

    // Handle recording (can happen independently of call status)
    if (recordingUrl && recordingSid) {
      if (callLog) {
        // Check if recording already exists
        const { data: existingRecording } = await supabase
          .from('call_recordings')
          .select('id')
          .eq('call_log_id', callLog.id)
          .single()

        if (existingRecording) {
          // Update existing recording
          const { error: recordingError } = await supabase
            .from('call_recordings')
            .update({
              recording_url: recordingUrl,
              recording_sid: recordingSid,
              duration: recordingDuration ? parseInt(recordingDuration) : null,
              updated_at: new Date().toISOString()
            })
            .eq('call_log_id', callLog.id)

          if (recordingError) {
            console.error('Error updating recording:', recordingError)
          } else {
            console.log('Recording updated successfully:', recordingUrl)
          }
        } else {
          // Create new recording
          const { error: recordingError } = await supabase
            .from('call_recordings')
            .insert({
              call_log_id: callLog.id,
              recording_url: recordingUrl,
              recording_sid: recordingSid,
              duration: recordingDuration ? parseInt(recordingDuration) : null,
              consent_given: true,
              consent_timestamp: new Date().toISOString(),
              format: 'mp3',
              is_processed: false,
              updated_at: new Date().toISOString()
            })

          if (recordingError) {
            console.error('Error saving recording:', recordingError)
          } else {
            console.log('Recording saved successfully:', recordingUrl)
          }
        }
      } else {
        console.log('Recording received but no call log found for CallSid:', callSid)
        console.log('This might be a recording-only webhook - trying to find call by SID again...')
        
        // Sometimes there's a delay, try one more time to find the call log
        const { data: retryCallLog } = await supabase
          .from('call_logs')
          .select('*')
          .eq('call_sid', callSid)
          .single()

        if (retryCallLog) {
          console.log('Found call log on retry, saving recording...')
          const { error: recordingError } = await supabase
            .from('call_recordings')
            .upsert({
              call_log_id: retryCallLog.id,
              recording_url: recordingUrl,
              recording_sid: recordingSid,
              duration: recordingDuration ? parseInt(recordingDuration) : null,
              consent_given: true,
              consent_timestamp: new Date().toISOString(),
              format: 'mp3',
              is_processed: false,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'call_log_id'
            })

          if (recordingError) {
            console.error('Error saving recording on retry:', recordingError)
          } else {
            console.log('Recording saved successfully on retry:', recordingUrl)
          }
        } else {
          console.log('Still no call log found - this recording will be orphaned')
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}