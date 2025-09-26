import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const VoiceResponse = twilio.twiml.VoiceResponse

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const to = formData.get('To') as string
    const record = formData.get('Record') === 'true'
    
    console.log('🎤 TwiML webhook called with:', { to, record })

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

    // Create dial verb to connect to the phone number
    const dial = response.dial({
      callerId: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
      record: record ? 'record-from-answer' : undefined,
      timeout: 30
    })
    
    // Add the destination number
    dial.number(to)

    console.log('📞 Generated TwiML XML:', response.toString())

    console.log('📞 Generated TwiML for call to:', to)
    
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