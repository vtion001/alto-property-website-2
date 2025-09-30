import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'

const prisma = new PrismaClient()

// Initialize OpenAI client for Whisper API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// GET - Fetch transcriptions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const callLogId = searchParams.get('callLogId')
    const recordingId = searchParams.get('recordingId')

    if (callLogId) {
      // Get transcription by call log ID
      const transcription = await prisma.callTranscription.findUnique({
        where: { callLogId: BigInt(callLogId) },
        include: {
          callLog: true
        }
      })

      if (!transcription) {
        return NextResponse.json({ error: 'Transcription not found' }, { status: 404 })
      }

      return NextResponse.json(transcription)
    } else if (recordingId) {
      // Get transcription by recording ID
      const recording = await prisma.callRecording.findUnique({
        where: { id: BigInt(recordingId) },
        include: {
          callLog: {
            include: {
              transcription: true
            }
          }
        }
      })

      if (!recording?.callLog?.transcription) {
        return NextResponse.json({ error: 'Transcription not found' }, { status: 404 })
      }

      return NextResponse.json(recording.callLog.transcription)
    } else {
      // Get all transcriptions
      const transcriptions = await prisma.callTranscription.findMany({
        include: {
          callLog: true
        },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json(transcriptions)
    }
  } catch (error) {
    console.error('Error fetching transcriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    )
  }
}

// POST - Create transcription from audio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      callLogId,
      recordingUrl,
      provider = 'openai-whisper',
      language = 'en',
      includeTimestamps = true,
      _includeSpeakerLabels = false
    } = body

    // Validate required fields
    if (!callLogId || !recordingUrl) {
      return NextResponse.json(
        { error: 'callLogId and recordingUrl are required' },
        { status: 400 }
      )
    }

    // Check if call log exists
      const callLog = await prisma.callLog.findUnique({
        where: { id: BigInt(callLogId) }
      })

      if (!callLog) {
        return NextResponse.json(
          { error: 'Call log not found' },
          { status: 404 }
        )
      }

      // Check if transcription already exists
      const existingTranscription = await prisma.callTranscription.findUnique({
        where: { callLogId: BigInt(callLogId) }
      })

    if (existingTranscription) {
      return NextResponse.json(
        { error: 'Transcription already exists for this call' },
        { status: 409 }
      )
    }

    let transcriptionResult
    let confidence = 0
    let processingTime = 0

    const startTime = Date.now()

    try {
      if (provider === 'openai-whisper') {
        transcriptionResult = await transcribeWithWhisper(recordingUrl, language, includeTimestamps)
        confidence = 0.95 // OpenAI Whisper typically has high confidence
      } else {
        throw new Error(`Unsupported transcription provider: ${provider}`)
      }

      processingTime = Date.now() - startTime

      // Create transcription record
      const transcription = await prisma.callTranscription.create({
        data: {
          callLogId: BigInt(callLogId),
          transcriptText: transcriptionResult.text,
          confidence,
          language,
          service: provider,
          processingTime,
          wordCount: transcriptionResult.text.split(' ').length,
          isProcessed: true
        },
        include: {
          callLog: true
        }
      })

      return NextResponse.json(transcription, { status: 201 })
    } catch (transcriptionError) {
      console.error('Transcription failed:', transcriptionError)
      
      // Create failed transcription record
      const failedTranscription = await prisma.callTranscription.create({
        data: {
          callLogId: BigInt(callLogId),
          transcriptText: '',
          confidence: 0,
          language,
          service: provider,
          processingTime: Date.now() - startTime,
          wordCount: 0,
          isProcessed: false
        }
      })

      return NextResponse.json(
        { 
          error: 'Transcription failed',
          details: transcriptionError instanceof Error ? transcriptionError.message : 'Unknown error',
          transcription: failedTranscription
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating transcription:', error)
    return NextResponse.json(
      { error: 'Failed to create transcription' },
      { status: 500 }
    )
  }
}

// PUT - Update transcription
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, transcriptionText, confidence, isProcessed } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Transcription ID is required' },
        { status: 400 }
      )
    }

    const updateData: {
      transcriptText?: string
      wordCount?: number
      confidence?: number
      status?: string
      isProcessed?: boolean
    } = {}
    
    if (transcriptionText !== undefined) {
      updateData.transcriptText = transcriptionText
      updateData.wordCount = transcriptionText.split(' ').length
    }

    if (typeof confidence === 'number') {
      updateData.confidence = confidence
    }

    if (typeof isProcessed === 'boolean') {
      updateData.isProcessed = isProcessed
    }

    const transcription = await prisma.callTranscription.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        callLog: true
      }
    })

    return NextResponse.json(transcription)
  } catch (error) {
    console.error('Error updating transcription:', error)
    return NextResponse.json(
      { error: 'Failed to update transcription' },
      { status: 500 }
    )
  }
}

// Helper function to transcribe audio using OpenAI Whisper
async function transcribeWithWhisper(audioUrl: string, language: string, includeTimestamps: boolean) {
  try {
    // Download audio file
    const audioResponse = await fetch(audioUrl)
    if (!audioResponse.ok) {
      throw new Error(`Failed to download audio: ${audioResponse.statusText}`)
    }

    const audioBuffer = await audioResponse.arrayBuffer()
    const audioFile = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' })

    // Transcribe with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: language,
      response_format: includeTimestamps ? 'verbose_json' : 'json',
      timestamp_granularities: includeTimestamps ? ['segment'] : undefined
    })

    return {
      text: transcription.text,
      segments: includeTimestamps && 'segments' in transcription ? transcription.segments : undefined
    }
  } catch (error) {
    console.error('Whisper transcription error:', error)
    throw error
  }
}