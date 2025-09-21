import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const { VoiceResponse } = twilio.twiml

export const runtime = 'nodejs'

// Remove admin authentication for webhook - Twilio needs direct access
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const callSid = formData.get('CallSid') as string
    const callStatus = formData.get('CallStatus') as string
    const to = formData.get('To') as string
    const from = formData.get('From') as string
    const direction = formData.get('Direction') as string

    console.log(`Twilio Webhook - Call: ${callSid}, Status: ${callStatus}, Direction: ${direction}`)

    const twiml = new VoiceResponse()

    // Handle different call statuses and directions
    if (direction === 'outbound-api') {
      // This is an outbound call created via REST API
      if (callStatus === 'ringing' || callStatus === 'in-progress') {
        // For outbound calls, we want to connect the call and allow two-way audio
        // The <Say> will play, but we need to keep the call open for audio
        twiml.say('Hello from the dialing system. Please wait while we connect your call.')
        
        // Add a pause to allow for connection
        twiml.pause({ length: 1 })
        
        // The key insight: we need to keep the call open for audio
        // Since this is a web-based dialer, we'll use a simple approach:
        // Play a message and then keep the line open
        twiml.say('You are now connected. You should be able to hear the other party.')
        
        // Keep the call alive by adding a long pause or gather
        twiml.gather({
          input: ['speech', 'dtmf'],
          timeout: 3600, // 1 hour timeout
          finishOnKey: '#',
          action: '/api/twilio/webhook/gather',
          method: 'POST'
        }).say('Speak or press any key to continue. Press pound to end.')
      }
    } else {
      // Handle inbound calls or other scenarios
      twiml.say('Hello! This is the Alto Property dialing system.')
      twiml.pause({ length: 1 })
      twiml.say('How can I help you today?')
    }

    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Twilio webhook error:', error)
    
    // Return a safe fallback response
    const twiml = new VoiceResponse()
    twiml.say('Sorry, there was an error processing your call. Please try again.')
    
    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}

// Handle GET requests (Twilio sometimes sends GET for status callbacks)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const callSid = searchParams.get('CallSid')
  const callStatus = searchParams.get('CallStatus')
  const direction = searchParams.get('Direction')

  console.log(`Twilio Webhook GET - Call: ${callSid}, Status: ${callStatus}, Direction: ${direction}`)

  // For status callbacks, we don't need to return TwiML, just acknowledge
  return NextResponse.json({ received: true })
}