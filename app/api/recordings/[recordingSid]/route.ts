import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ recordingSid: string }> }
) {
  try {
    // Await the params as required by Next.js 15
    const { recordingSid } = await params
    
    if (!recordingSid) {
      return NextResponse.json({ error: 'Recording SID required' }, { status: 400 })
    }

    // Initialize Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    )

    // Fetch the recording metadata
    const recording = await client.recordings(recordingSid).fetch()
    
    // Create the authenticated request using fetch with Authorization header
    const mediaUrl = `https://api.twilio.com${recording.uri.replace('.json', '.mp3')}`
    
    // Create basic auth header
    const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')
    
    // Fetch the actual audio file with proper authentication
    const audioResponse = await fetch(mediaUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'User-Agent': 'Alto Property Dialer/1.0'
      }
    })
    
    if (!audioResponse.ok) {
      console.error('Twilio API error:', audioResponse.status, audioResponse.statusText)
      throw new Error(`Failed to fetch recording: ${audioResponse.status} ${audioResponse.statusText}`)
    }

    const audioBuffer = await audioResponse.arrayBuffer()
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `inline; filename="recording-${recordingSid}.mp3"`,
        'Cache-Control': 'private, max-age=3600',
        'Content-Length': audioBuffer.byteLength.toString()
      }
    })
    
  } catch (error) {
    console.error('Error fetching recording:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch recording',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}