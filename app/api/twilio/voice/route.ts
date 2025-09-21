import { NextRequest, NextResponse } from 'next/server'

// Simple webhook without authentication for Twilio
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const callSid = formData.get('CallSid') as string
    const callStatus = formData.get('CallStatus') as string
    const direction = formData.get('Direction') as string

    console.log(`Twilio Webhook - Call: ${callSid}, Status: ${callStatus}, Direction: ${direction}`)

    // Return simple TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello from the dialing system. Please wait while we connect your call.</Say>
  <Pause length="1"/>
  <Say>You are now connected. You should be able to hear the other party.</Say>
  <Gather input="speech dtmf" timeout="3600" finishOnKey="#" action="/api/twilio/voice/gather" method="POST">
    <Say>Speak or press any key to continue. Press pound to end.</Say>
  </Gather>
</Response>`

    return new Response(twiml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Twilio webhook error:', error)
    
    // Return a safe fallback response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Sorry, there was an error processing your call. Please try again.</Say>
</Response>`
    
    return new Response(twiml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}

// Handle GET requests for status callbacks
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const callSid = searchParams.get('CallSid')
  const callStatus = searchParams.get('CallStatus')
  const direction = searchParams.get('Direction')

  console.log(`Twilio Webhook GET - Call: ${callSid}, Status: ${callStatus}, Direction: ${direction}`)

  // For status callbacks, just acknowledge
  return NextResponse.json({ received: true })
}