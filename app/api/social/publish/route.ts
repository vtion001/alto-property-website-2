import { NextResponse } from 'next/server'
import { publishToPlatform } from '@/lib/social'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    const rl = rateLimit('social:publish', 10, 60_000)
    if (!rl.allowed) return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
    const body = await req.json()
    const { content, mediaUrls, platforms } = body || {}
    if (!content || typeof content !== 'string') return NextResponse.json({ error: 'Invalid content' }, { status: 400 })
    if (!Array.isArray(platforms) || platforms.length === 0) return NextResponse.json({ error: 'Select at least one platform' }, { status: 400 })
    const results = []
    for (const p of platforms) {
      const r = await publishToPlatform(p, { content, mediaUrls, platforms })
      results.push(r)
    }
    return NextResponse.json({ results })
  } catch (e: any) {
    return NextResponse.json({ error: 'Publish failed', detail: e.message }, { status: 500 })
  }
}