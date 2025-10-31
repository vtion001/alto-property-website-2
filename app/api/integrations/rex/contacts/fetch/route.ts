import { NextRequest, NextResponse } from 'next/server'
import { listContacts } from '@/lib/rex'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

function isValidISODate(s?: string | null) {
  if (!s) return false
  const d = new Date(s)
  return !isNaN(d.getTime()) && s.includes('T')
}

export async function GET(request: NextRequest) {
  const adminToken = request.cookies.get('alto_admin')?.value || 'anon'
  const rl = rateLimit(`rex_fetch_${adminToken}`, 20, 60_000)
  if (!rl.allowed) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })

  const { searchParams } = new URL(request.url)
  const since = searchParams.get('since') || undefined
  if (since && !isValidISODate(since)) {
    return NextResponse.json({ error: 'Invalid since parameter. Must be ISO datetime.' }, { status: 400 })
  }

  try {
    const contacts = await listContacts(since)
    return NextResponse.json({ contacts, count: contacts.length })
  } catch (e: any) {
    console.error('REX fetch contacts error:', e)
    return NextResponse.json({ error: 'Failed to fetch contacts from REX', detail: e?.message || 'unknown' }, { status: 502 })
  }
}