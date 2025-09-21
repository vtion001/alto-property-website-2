import { NextRequest, NextResponse } from 'next/server'

// Handle gather input from Twilio
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const callSid = formData.get('CallSid') as string
    const digits = formData.get('Digits') as string
    const speechResult = formData.get('SpeechResult') as string

    console.log(`Twilio Gather - Call: ${callSid}, Digits: ${digits}, Speech: ${speechResult}`)

    // Handle user input
    let twiml = ''
    
    if (digits === '#') {
      // User wants to end the call
      twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you for using the Alto Property dialing system. Goodbye!</Say>
  <Hangup/>
</Response>`
    } else if (digits || speechResult) {
      // User provided some input, acknowledge it and continue
      twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>I heard your input. Please continue speaking or press pound to end the call.</Say>
  <Gather input="speech dtmf" timeout="10" finishOnKey="#" action="/api/twilio/voice/gather" method="POST">
    <Say>Please continue speaking or press pound to end the call.</Say>
  </Gather>
</Response>`
    } else {
      // No input received, continue listening
      twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>I did not hear anything. Please speak or press a key.</Say>
  <Gather input="speech dtmf" timeout="10" finishOnKey="#" action="/api/twilio/voice/gather" method="POST">
    <Say>Please speak or press a key.</Say>
  </Gather>
</Response>`
    }

    return new Response(twiml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Twilio gather error:', error)
    
    // Return a safe fallback response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Sorry, there was an error processing your input. Goodbye.</Say>
  <Hangup/>
</Response>`
    
    return new Response(twiml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}