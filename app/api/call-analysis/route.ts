import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'

const prisma = new PrismaClient()

// Initialize OpenAI client for analysis
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// GET - Fetch call analyses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const callLogId = searchParams.get('callLogId')
    const includeTranscription = searchParams.get('includeTranscription') === 'true'

    if (callLogId) {
      // Get specific analysis
      const analysis = await prisma.callAnalysis.findUnique({
        where: { callLogId: BigInt(callLogId) },
        include: {
          callLog: {
            include: {
              transcription: includeTranscription
            }
          }
        }
      })

      if (!analysis) {
        return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
      }

      return NextResponse.json(analysis)
    } else {
      // Get all analyses
      const analyses = await prisma.callAnalysis.findMany({
        include: {
          callLog: {
            include: {
              transcription: includeTranscription,
              recording: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json(analyses)
    }
  } catch (error) {
    console.error('Error fetching call analyses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call analyses' },
      { status: 500 }
    )
  }
}

// POST - Create call analysis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      callLogId,
      transcriptionText,
      analysisType = 'comprehensive',
      customPrompt
    } = body

    // Validate required fields
    if (!callLogId) {
      return NextResponse.json(
        { error: 'callLogId is required' },
        { status: 400 }
      )
    }

    // Check if call log exists and get transcription if not provided
    const callLog = await prisma.callLog.findUnique({
      where: { id: BigInt(callLogId) },
      include: {
        transcription: true,
        recording: true
      }
    })

    if (!callLog) {
      return NextResponse.json(
        { error: 'Call log not found' },
        { status: 404 }
      )
    }

    // Use provided transcription or get from database
    const textToAnalyze = transcriptionText || callLog.transcription?.transcriptText

    if (!textToAnalyze) {
      return NextResponse.json(
        { error: 'No transcription available for analysis' },
        { status: 400 }
      )
    }

    // Check if analysis already exists
    const existingAnalysis = await prisma.callAnalysis.findUnique({
      where: { callLogId: BigInt(callLogId) }
    })

    if (existingAnalysis) {
      return NextResponse.json(
        { error: 'Analysis already exists for this call' },
        { status: 409 }
      )
    }

    const startTime = Date.now()

    try {
      // Perform AI analysis
      const analysisResult = await performCallAnalysis(textToAnalyze, analysisType, customPrompt)
      const processingTime = Date.now() - startTime

      // Create analysis record
      const analysis = await prisma.callAnalysis.create({
        data: {
          callLogId: BigInt(callLogId),
          overallScore: analysisResult.overallScore,
          sentimentScore: analysisResult.sentimentScore,
          professionalismScore: analysisResult.professionalismScore,
          clarityScore: analysisResult.clarityScore,
          engagementScore: analysisResult.engagementScore,
          keyTopics: analysisResult.keyTopics || [],
          actionItems: analysisResult.actionItems || [],
          summary: analysisResult.summary,
          recommendations: analysisResult.recommendations || [],
          processingTime,
          aiModel: 'gpt-4',
          isProcessed: true
        },
        include: {
          callLog: {
            include: {
              transcription: true,
              recording: true
            }
          }
        }
      })

      return NextResponse.json(analysis, { status: 201 })
    } catch (analysisError) {
      console.error('Analysis failed:', analysisError)
      
      // Create failed analysis record
      const failedAnalysis = await prisma.callAnalysis.create({
        data: {
          callLogId: BigInt(callLogId),
          overallScore: 0,
          sentimentScore: 0,
          professionalismScore: 0,
          clarityScore: 0,
          engagementScore: 0,
          summary: 'Analysis failed',
          processingTime: Date.now() - startTime,
          aiModel: 'gpt-4',
          isProcessed: false
        }
      })

      return NextResponse.json(
        { 
          error: 'Analysis failed',
          details: analysisError instanceof Error ? analysisError.message : 'Unknown error',
          analysis: failedAnalysis
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating call analysis:', error)
    return NextResponse.json(
      { error: 'Failed to create call analysis' },
      { status: 500 }
    )
  }
}

// PUT - Update analysis
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, overallScore, sentimentScore, summary, recommendations } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Analysis ID is required' },
        { status: 400 }
      )
    }

    const updateData: { overallScore?: number; sentimentScore?: number; keyPoints?: string; recommendations?: string[]; summary?: string } = {}
    
    if (typeof overallScore === 'number') {
      updateData.overallScore = overallScore
    }

    if (typeof sentimentScore === 'number') {
      updateData.sentimentScore = sentimentScore
    }

    if (summary !== undefined) {
      updateData.summary = summary
    }

    if (recommendations !== undefined) {
      updateData.recommendations = recommendations
    }

    const analysis = await prisma.callAnalysis.update({
      where: { id: BigInt(id) },
      data: updateData,
      include: {
        callLog: {
          include: {
            transcription: true,
            recording: true
          }
        }
      }
    })

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error updating call analysis:', error)
    return NextResponse.json(
      { error: 'Failed to update call analysis' },
      { status: 500 }
    )
  }
}

// Helper function to perform AI analysis
async function performCallAnalysis(transcriptionText: string, analysisType: string, customPrompt?: string) {
  try {
    const systemPrompt = customPrompt || `
You are an expert call analyst. Analyze the following call transcription and provide detailed insights.

Please provide your analysis in the following JSON format:
{
  "overallScore": number (0-100),
  "sentimentScore": number (-1 to 1, where -1 is very negative, 0 is neutral, 1 is very positive),
  "professionalismScore": number (0-100),
  "clarityScore": number (0-100),
  "engagementScore": number (0-100),
  "keyTopics": ["topic1", "topic2", ...],
  "actionItems": ["action1", "action2", ...],
  "summary": "Brief summary of the call",
  "recommendations": ["recommendation1", "recommendation2", ...]
}

Focus on:
- Overall call quality and effectiveness
- Sentiment and tone throughout the conversation
- Professionalism and communication skills
- Clarity of communication
- Level of engagement from both parties
- Key topics discussed
- Action items identified
- Recommendations for improvement
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze this call transcription:\n\n${transcriptionText}` }
      ],
      temperature: 0.3,
      max_tokens: 2000
    })

    const analysisText = response.choices[0]?.message?.content
    if (!analysisText) {
      throw new Error('No analysis response received')
    }

    // Parse JSON response
    const analysisResult = JSON.parse(analysisText)

    // Validate required fields
    if (typeof analysisResult.overallScore !== 'number' || 
        typeof analysisResult.sentimentScore !== 'number') {
      throw new Error('Invalid analysis format received')
    }

    return analysisResult
  } catch (error) {
    console.error('AI analysis error:', error)
    throw error
  }
}