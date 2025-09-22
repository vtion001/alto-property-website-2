import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Get call logs with related data
    const callLogs = await prisma.callLog.findMany({
      include: {
        recording: true,
        transcription: true,
        analysis: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate analytics
    const totalCalls = callLogs.length
    const successfulCalls = callLogs.filter(call => 
      call.status === 'completed' || call.status === 'answered'
    ).length
    const successRate = totalCalls > 0 ? (successfulCalls / totalCalls) * 100 : 0

    // Calculate average duration (in seconds)
    const callsWithDuration = callLogs.filter(call => call.duration && call.duration > 0)
    const averageDuration = callsWithDuration.length > 0 
      ? callsWithDuration.reduce((sum, call) => sum + (call.duration || 0), 0) / callsWithDuration.length
      : 0

    // Calculate quality score based on analysis data
    const callsWithAnalysis = callLogs.filter(call => call.analysis)
    const qualityScore = callsWithAnalysis.length > 0
      ? callsWithAnalysis.reduce((sum, call) => {
          // Extract quality score from analysis or use a default calculation
          const analysis = call.analysis
          if (analysis && analysis.overallScore) {
            return sum + analysis.overallScore
          }
          // Fallback to sentiment score if available
          if (analysis && analysis.sentimentScore) {
            // Convert sentiment score (-1 to 1) to 0-100 scale
            return sum + ((analysis.sentimentScore + 1) * 50)
          }
          return sum + 50 // Default neutral score
        }, 0) / callsWithAnalysis.length
      : 75 // Default score when no analysis available

    // Get recent calls for the dashboard
    const recentCalls = callLogs.slice(0, 10).map(call => ({
      id: call.id.toString(), // Convert BigInt to string
      callSid: call.callSid,
      fromNumber: call.fromNumber,
      toNumber: call.toNumber,
      status: call.status,
      duration: call.duration,
      startedAt: call.startedAt,
      endedAt: call.endedAt,
      createdAt: call.createdAt,
      hasRecording: !!call.recording,
      hasTranscription: !!call.transcription,
      hasAnalysis: !!call.analysis,
      emotionalTone: call.analysis?.emotionalTone || null,
      sentimentScore: call.analysis?.sentimentScore || null
    }))

    // Calculate call volume by hour for the last 24 hours
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const recentCallLogs = callLogs.filter(call => 
      call.createdAt && call.createdAt >= last24Hours
    )

    const callVolumeByHour = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).getHours()
      const hourStart = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000)
      hourStart.setMinutes(0, 0, 0)
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000)
      
      const callsInHour = recentCallLogs.filter(call => 
        call.createdAt && call.createdAt >= hourStart && call.createdAt < hourEnd
      ).length

      return {
        hour: hour.toString().padStart(2, '0') + ':00',
        calls: callsInHour
      }
    })

    const analytics = {
      overview: {
        totalCalls,
        successfulCalls,
        successRate: Math.round(successRate * 100) / 100,
        averageDuration: Math.round(averageDuration),
        qualityScore: Math.round(qualityScore * 100) / 100
      },
      recentCalls,
      callVolumeByHour,
      trends: {
        dailyCallCount: recentCallLogs.length,
        averageCallsPerHour: Math.round((recentCallLogs.length / 24) * 100) / 100,
        peakHour: callVolumeByHour.reduce((max, current) => 
          current.calls > max.calls ? current : max, callVolumeByHour[0]
        )
      }
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Call analytics error:', error)
    
    // Return mock data if database is not available
    const mockAnalytics = {
      overview: {
        totalCalls: 0,
        successfulCalls: 0,
        successRate: 0,
        averageDuration: 0,
        qualityScore: 0
      },
      recentCalls: [],
      callVolumeByHour: Array.from({ length: 24 }, (_, i) => ({
        hour: i.toString().padStart(2, '0') + ':00',
        calls: 0
      })),
      trends: {
        dailyCallCount: 0,
        averageCallsPerHour: 0,
        peakHour: { hour: '00:00', calls: 0 }
      }
    }

    return NextResponse.json(mockAnalytics)
  }
}