import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch call recordings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const callLogId = searchParams.get('callLogId')
    const includeAnalysis = searchParams.get('includeAnalysis') === 'true'

    if (callLogId) {
      // Get specific recording
      const recording = await prisma.callRecording.findUnique({
        where: { callLogId: BigInt(callLogId) },
        include: {
          callLog: {
            include: {
              transcription: includeAnalysis,
              analysis: includeAnalysis
            }
          }
        }
      })

      if (!recording) {
        return NextResponse.json({ error: 'Recording not found' }, { status: 404 })
      }

      return NextResponse.json(recording)
    } else {
      // Get all recordings
      const recordings = await prisma.callRecording.findMany({
        include: {
          callLog: {
            include: {
              transcription: includeAnalysis,
              analysis: includeAnalysis
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json(recordings)
    }
  } catch (error) {
    console.error('Error fetching call recordings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call recordings' },
      { status: 500 }
    )
  }
}

// POST - Create or update call recording
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      callLogId,
      recordingUrl,
      recordingSid,
      duration,
      fileSize,
      format = 'mp3',
      consentGiven = false,
      consentTimestamp,
      storageLocation
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

    // Create or update recording
    const recording = await prisma.callRecording.upsert({
      where: { callLogId: BigInt(callLogId) },
      update: {
        recordingUrl,
        recordingSid,
        duration,
        fileSize,
        format,
        consentGiven,
        consentTimestamp: consentTimestamp ? new Date(consentTimestamp) : null,
        storageLocation,
        isProcessed: false,
        updatedAt: new Date()
      },
      create: {
        callLogId: BigInt(callLogId),
        recordingUrl,
        recordingSid,
        duration,
        fileSize,
        format,
        consentGiven,
        consentTimestamp: consentTimestamp ? new Date(consentTimestamp) : null,
        storageLocation,
        isProcessed: false
      },
      include: {
        callLog: true
      }
    })

    return NextResponse.json(recording, { status: 201 })
  } catch (error) {
    console.error('Error creating/updating call recording:', error)
    return NextResponse.json(
      { error: 'Failed to create/update call recording' },
      { status: 500 }
    )
  }
}

// PUT - Update recording consent or processing status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, consentGiven, consentTimestamp, isProcessed } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Recording ID is required' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    
    if (typeof consentGiven === 'boolean') {
      updateData.consentGiven = consentGiven
      if (consentGiven && consentTimestamp) {
        updateData.consentTimestamp = new Date(consentTimestamp)
      }
    }

    if (typeof isProcessed === 'boolean') {
      updateData.isProcessed = isProcessed
    }

    const recording = await prisma.callRecording.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        callLog: true
      }
    })

    return NextResponse.json(recording)
  } catch (error) {
    console.error('Error updating call recording:', error)
    return NextResponse.json(
      { error: 'Failed to update call recording' },
      { status: 500 }
    )
  }
}

// DELETE - Delete call recording
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Recording ID is required' },
        { status: 400 }
      )
    }

    await prisma.callRecording.delete({
      where: { id: BigInt(id) }
    })

    return NextResponse.json({ message: 'Recording deleted successfully' })
  } catch (error) {
    console.error('Error deleting call recording:', error)
    return NextResponse.json(
      { error: 'Failed to delete call recording' },
      { status: 500 }
    )
  }
}