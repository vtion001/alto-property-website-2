import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jwtVerify } from 'jose'

export const runtime = 'nodejs'

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('alto_admin')?.value
  if (!token) return null
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  // Allow unauthenticated access for dialer functionality
  try {
    const callLogs = await prisma.callLog.findMany({ orderBy: { createdAt: 'desc' } })
    // Convert BigInt values to strings for JSON serialization
    const serializedCallLogs = callLogs.map(log => ({
      ...log,
      id: log.id.toString()
    }))
    return NextResponse.json(serializedCallLogs)
  } catch (error) {
    console.error('Call logs GET error', error)
    return NextResponse.json({ error: 'Failed to fetch call logs' }, { status: 500 })
  }
}


