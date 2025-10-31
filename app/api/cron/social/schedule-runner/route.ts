import { NextResponse } from 'next/server'
import { runScheduler } from '@/lib/social'
import { rateLimit } from '@/lib/rate-limit'

export async function POST() {
  const rl = rateLimit('social:schedule:run', 6, 60_000)
  if (!rl.allowed) return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
  const start = Date.now()
  const results = await runScheduler()
  const durationMs = Date.now() - start
  return NextResponse.json({ published: results, durationMs })
}