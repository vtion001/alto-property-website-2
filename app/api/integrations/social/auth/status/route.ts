import { NextRequest, NextResponse } from 'next/server'
import { connectionStatus } from '@/lib/social'

export async function GET(req: NextRequest) {
  const adminKey = req.cookies.get('alto_admin')?.value || 'anon'
  const status = connectionStatus(adminKey)
  return NextResponse.json({ status })
}