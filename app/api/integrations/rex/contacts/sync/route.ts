import { NextRequest, NextResponse } from 'next/server'
import { listContacts, mapRexToDashboard } from '@/lib/rex'
import { getSupabaseServerClient } from '@/lib/supabase-client'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('alto_admin')?.value
  if (!token) return null
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
    const { jwtVerify } = await import('jose')
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

function isValidISODate(s?: string | null) {
  if (!s) return false
  const d = new Date(s)
  return !isNaN(d.getTime()) && s.includes('T')
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rl = rateLimit(`rex_sync_${admin.sub || 'admin'}`, 6, 60_000) // 6 sync ops per minute
  if (!rl.allowed) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })

  const { searchParams } = new URL(request.url)
  const sinceParam = searchParams.get('since') || request.cookies.get('rex_last_contacts_sync')?.value || undefined
  const since = sinceParam && isValidISODate(sinceParam) ? sinceParam : undefined

  try {
    const supabase = getSupabaseServerClient()
    const started = Date.now()
    const rexContacts = await listContacts(since || undefined)

    // Prepare batch upsert payload; use phone_number as conflict target
    const batch = rexContacts
      .map(rc => mapRexToDashboard(rc))
      .filter(m => m.phoneNumber || m.email)
      .map(m => ({
        name: m.name,
        phone_number: m.phoneNumber || null,
        email: m.email || null,
        notes: m.notes || null,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }))

    let upserted = 0
    if (batch.length > 0) {
      const { error } = await supabase
        .from('contacts')
        .upsert(batch, { onConflict: 'phone_number' })
      if (error) {
        console.error('Supabase upsert error:', error)
        return NextResponse.json({ error: 'Failed to upsert contacts' }, { status: 500 })
      }
      upserted = batch.length
    }

    // Record sync checkpoint
    const durationMs = Date.now() - started
    const res = NextResponse.json({ upserted, totalFetched: rexContacts.length, durationMs })
    res.cookies.set('rex_last_contacts_sync', new Date().toISOString(), { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
    return res
  } catch (_e) {
    console.error('REX contacts sync error:', _e)
    const detail = _e instanceof Error ? _e.message : 'unknown'
    return NextResponse.json({ error: 'Failed to sync contacts', detail }, { status: 500 })
  }
}