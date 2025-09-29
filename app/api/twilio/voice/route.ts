import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { createClient } from '@supabase/supabase-js'

const VoiceResponse = twilio.twiml.VoiceResponse

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
    const formData = await request.formData()
    const to = formData.get('To') as string
    const from = formData.get('From') as string
    const callSid = formData.get('CallSid') as string
    const record = formData.get('Record') === 'true'
    
    console.log('🎤 TwiML webhook called with:', { to, from, callSid, record })

    const response = new VoiceResponse()
    
    if (!to) {
      console.log('❌ No "To" parameter provided')
      response.say('Sorry, no phone number was provided.')
      return new NextResponse(response.toString(), {
        headers: { 
          'Content-Type': 'text/xml',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
        },
      })
    }

    // Log the call initiation to Supabase
    if (callSid && from && to) {
      try {
        await supabase
          .from('call_logs')
          .upsert({
            call_sid: callSid,
            from_number: from,
            to_number: to,
            status: 'in-progress',
            started_at: new Date().toISOString(),
          }, {
            onConflict: 'call_sid'
          })
        console.log('📝 Call logged to Supabase:', callSid)
      } catch (dbError) {
        console.error('❌ Failed to log call to Supabase:', dbError)
      }
    }

    // Create dial verb to connect to the phone number
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'
    const dial = response.dial({
      callerId: process.env.TWILIO_PHONE_NUMBER || from || '+1234567890',
      record: record ? 'record-from-answer' : undefined,
      recordingStatusCallback: `${baseUrl}/api/twilio/webhook`,
      recordingStatusCallbackMethod: 'POST',
      timeout: 30,
      action: `${baseUrl}/api/twilio/webhook`,
      method: 'POST'
    })
    
    // Add the destination number
    dial.number(to)

    console.log('📞 Generated TwiML XML:', response.toString())
    console.log('📞 Generated TwiML for call to:', to, 'with recording:', record)
    
    return new NextResponse(response.toString(), {
      headers: { 
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
      },
    })
    
  } catch (error) {
    console.error('💥 TwiML webhook error:', error)
    
    const response = new VoiceResponse()
    response.say('Sorry, there was an error making your call.')
    
    return new NextResponse(response.toString(), {
      headers: { 
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*'
      },
    })
  }
}

// Handle GET requests for webhook verification
export async function GET() {
  return new NextResponse('Twilio Voice Webhook is working!', {
    status: 200,
    headers: { 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning'
    },
  })
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, ngrok-skip-browser-warning',
    },
  })
}