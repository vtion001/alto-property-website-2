import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import twilio from 'twilio'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const source = (searchParams.get('source') || '').toLowerCase()
  const useTwilio = source === 'twilio' || searchParams.get('twilio') === 'true'
  const dateParam = searchParams.get('date')
  const targetDate = dateParam ? new Date(dateParam) : new Date()
  const startOfDay = new Date(targetDate)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(startOfDay)
  endOfDay.setDate(endOfDay.getDate() + 1)
  
  try {

    // If requested, source recent calls from Twilio directly
    if (useTwilio) {
      const accountSid = process.env.TWILIO_ACCOUNT_SID
      const authToken = process.env.TWILIO_AUTH_TOKEN

      if (!accountSid || !authToken) {
        return NextResponse.json(
          {
            error: 'Twilio credentials not configured',
            next: 'Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env.local and restart dev server.'
          },
          { status: 500 }
        )
      }

      const client = twilio(accountSid, authToken)
      try {
        const listOptions: { startTimeAfter?: Date; startTimeBefore?: Date; limit?: number } = {}
        // If a date is provided, restrict results to that day (local time)
        if (dateParam) {
          listOptions.startTimeAfter = startOfDay
          listOptions.startTimeBefore = endOfDay
        }
        // Fetch a generous amount to cover the day; Twilio paginates internally
        listOptions.limit = 1000
        const calls = await client.calls.list(listOptions)
        // Normalize Twilio calls to a common shape
        const callLogs = calls.map((call) => ({
          id: call.sid,
          callSid: call.sid,
          fromNumber: call.from || '',
          toNumber: call.to || '',
          status: (call.status || '').toLowerCase(),
          duration: typeof call.duration === 'number' ? call.duration : Number(call.duration) || 0,
          startedAt: call.startTime ? new Date(call.startTime as unknown as Date) : null,
          endedAt: call.endTime ? new Date(call.endTime as unknown as Date) : null,
          createdAt: call.startTime ? new Date(call.startTime as unknown as Date) : new Date(),
          recording: null,
          transcription: null,
          analysis: null,
        }))

        // Calculate analytics based on Twilio-sourced logs
        const totalCalls = callLogs.length
        const successfulCalls = callLogs.filter(call => call.status === 'completed').length
        const successRate = totalCalls > 0 ? (successfulCalls / totalCalls) * 100 : 0

        const callsWithDuration = callLogs.filter(call => call.duration && call.duration > 0)
        const averageDuration = callsWithDuration.length > 0 
          ? callsWithDuration.reduce((sum, call) => sum + (call.duration || 0), 0) / callsWithDuration.length
          : 0

        const callsWithAnalysis: typeof callLogs = [] // none when sourcing directly from Twilio
        const qualityScore = callsWithAnalysis.length > 0
          ? callsWithAnalysis.reduce((sum, call) => {
              const analysis = call.analysis as unknown as { overallScore?: number; sentimentScore?: number } | null
              if (analysis && analysis.overallScore) {
                return sum + analysis.overallScore
              }
              if (analysis && analysis.sentimentScore) {
                return sum + ((analysis.sentimentScore + 1) * 50)
              }
              return sum + 50
            }, 0) / callsWithAnalysis.length
          : 75

        const recentCalls = callLogs.slice(0, 10).map(call => ({
          id: String(call.id),
          callSid: call.callSid,
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          status: call.status,
          duration: call.duration,
          startedAt: call.startedAt,
          endedAt: call.endedAt,
          createdAt: call.createdAt,
          hasRecording: false,
          hasTranscription: false,
          hasAnalysis: false,
          emotionalTone: null,
          sentimentScore: null
        }))

        // Build hourly volume for the selected day (or last 24 hours if no date)
        const recentCallLogs = callLogs.filter(call => {
          if (!call.createdAt) return false
          return dateParam
            ? call.createdAt >= startOfDay && call.createdAt < endOfDay
            : call.createdAt >= new Date(Date.now() - 24 * 60 * 60 * 1000)
        })

        const baseDay = dateParam ? startOfDay : new Date()
        const callVolumeByHour = Array.from({ length: 24 }, (_, i) => {
          const hourStart = new Date(baseDay)
          hourStart.setHours(i, 0, 0, 0)
          const hourEnd = new Date(hourStart)
          hourEnd.setHours(i + 1, 0, 0, 0)
          const callsInHour = recentCallLogs.filter(call => 
            call.createdAt && call.createdAt >= hourStart && call.createdAt < hourEnd
          ).length
          return { hour: i.toString().padStart(2, '0') + ':00', calls: callsInHour }
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
      } catch (twilioErr) {
        console.error('Twilio analytics fetch error:', twilioErr)
        return NextResponse.json(
          {
            error: 'Failed to fetch analytics from Twilio',
            details: process.env.NODE_ENV === 'development' ? (twilioErr as Error).message : undefined
          },
          { status: 502 }
        )
      }
    }

    // Default: use Prisma (database) for analytics
    const callLogs = await prisma.callLog.findMany({
      where: dateParam ? { createdAt: { gte: startOfDay, lt: endOfDay } } : undefined,
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
    const recentCallLogs = callLogs.filter(call => {
      if (!call.createdAt) return false
      return dateParam
        ? call.createdAt >= startOfDay && call.createdAt < endOfDay
        : call.createdAt >= new Date(Date.now() - 24 * 60 * 60 * 1000)
    })

    const baseDay = dateParam ? startOfDay : new Date()
    const callVolumeByHour = Array.from({ length: 24 }, (_, i) => {
      const hourStart = new Date(baseDay)
      hourStart.setHours(i, 0, 0, 0)
      const hourEnd = new Date(hourStart)
      hourEnd.setHours(i + 1, 0, 0, 0)
      const callsInHour = recentCallLogs.filter(call => 
        call.createdAt && call.createdAt >= hourStart && call.createdAt < hourEnd
      ).length
      return { hour: i.toString().padStart(2, '0') + ':00', calls: callsInHour }
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
    
    // If Prisma fails due to ID type mismatch, try Twilio as a fallback
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID
      const authToken = process.env.TWILIO_AUTH_TOKEN
      if (accountSid && authToken) {
        const client = twilio(accountSid, authToken)
        const listOptions: { startTimeAfter?: Date; startTimeBefore?: Date; limit?: number } = {}
        if (dateParam) {
          listOptions.startTimeAfter = startOfDay
          listOptions.startTimeBefore = endOfDay
        }
        listOptions.limit = 1000
        const calls = await client.calls.list(listOptions)
        const callLogs = calls.map((call) => ({
          id: call.sid,
          callSid: call.sid,
          fromNumber: call.from || '',
          toNumber: call.to || '',
          status: (call.status || '').toLowerCase(),
          duration: typeof call.duration === 'number' ? call.duration : Number(call.duration) || 0,
          startedAt: call.startTime ? new Date(call.startTime as unknown as Date) : null,
          endedAt: call.endTime ? new Date(call.endTime as unknown as Date) : null,
          createdAt: call.startTime ? new Date(call.startTime as unknown as Date) : new Date(),
        }))

        const totalCalls = callLogs.length
        const successfulCalls = callLogs.filter(call => call.status === 'completed').length
        const successRate = totalCalls > 0 ? (successfulCalls / totalCalls) * 100 : 0
        const callsWithDuration = callLogs.filter(call => call.duration && call.duration > 0)
        const averageDuration = callsWithDuration.length > 0 
          ? callsWithDuration.reduce((sum, call) => sum + (call.duration || 0), 0) / callsWithDuration.length
          : 0
        const recentCalls = callLogs.slice(0, 10).map(call => ({
          id: String(call.id),
          callSid: call.callSid,
          fromNumber: call.fromNumber,
          toNumber: call.toNumber,
          status: call.status,
          duration: call.duration,
          startedAt: call.startedAt,
          endedAt: call.endedAt,
          createdAt: call.createdAt,
          hasRecording: false,
          hasTranscription: false,
          hasAnalysis: false,
          emotionalTone: null,
          sentimentScore: null
        }))

        const mockFromTwilio = {
          overview: {
            totalCalls,
            successfulCalls,
            successRate: Math.round(successRate * 100) / 100,
            averageDuration: Math.round(averageDuration),
            qualityScore: 75
          },
          recentCalls,
          callVolumeByHour: Array.from({ length: 24 }, (_, i) => ({
            hour: i.toString().padStart(2, '0') + ':00',
            calls: 0
          })),
          trends: {
            dailyCallCount: callLogs.length,
            averageCallsPerHour: 0,
            peakHour: { hour: '00:00', calls: 0 }
          }
        }

        return NextResponse.json(mockFromTwilio)
      }
    } catch (twilioFallbackErr) {
      console.error('Twilio fallback failed:', twilioFallbackErr)
    }

    // Return mock data if database and Twilio are not available
    const mockAnalytics = {
      overview: {
        totalCalls: 0,
        successfulCalls: 0,
        successRate: 0,
        averageDuration: 0,
        qualityScore: 0,
        mock: true
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