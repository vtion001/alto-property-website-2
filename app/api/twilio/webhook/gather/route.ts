import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const { VoiceResponse } = twilio.twiml

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const callSid = formData.get('CallSid') as string
    const digits = formData.get('Digits') as string
    const speechResult = formData.get('SpeechResult') as string
    const _confidence = formData.get('Confidence') as string

    console.log(`Twilio Gather - Call: ${callSid}, Digits: ${digits}, Speech: ${speechResult}`)

    const twiml = new VoiceResponse()

    // Handle user input
    if (digits === '#') {
      // User wants to end the call
      twiml.say('Thank you for using the Alto Property dialing system. Goodbye!')
      twiml.hangup()
    } else if (digits || speechResult) {
      // User provided some input, acknowledge it
      if (digits) {
        twiml.say(`You pressed ${digits}.`)
      } else if (speechResult) {
        twiml.say('I heard what you said.')
      }
      
      // Continue the conversation
      twiml.gather({
        input: ['speech', 'dtmf'],
        timeout: 10,
        finishOnKey: '#',
        action: '/api/twilio/webhook/gather',
        method: 'POST'
      }).say('Please continue speaking or press pound to end the call.')
    } else {
      // No input received, continue listening
      twiml.gather({
        input: ['speech', 'dtmf'],
        timeout: 10,
        finishOnKey: '#',
        action: '/api/twilio/webhook/gather',
        method: 'POST'
      }).say('I did not hear anything. Please speak or press a key.')
    }

    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Twilio gather error:', error)
    
    // Return a safe fallback response
    const twiml = new VoiceResponse()
    twiml.say('Sorry, there was an error processing your input. Goodbye.')
    twiml.hangup()
    
    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
}