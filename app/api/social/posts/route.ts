import { NextResponse } from 'next/server'
import { createPost, listPosts } from '@/lib/social'
import { rateLimit } from '@/lib/rate-limit'

function isISODateString(s: string) {
  return !isNaN(Date.parse(s))
}

export async function GET() {
  const posts = listPosts()
  return NextResponse.json({ posts })
}

export async function POST(req: Request) {
  try {
    const rl = rateLimit('social:posts:create', 20, 60_000)
    if (!rl.allowed) return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
    const body = await req.json()
    const { content, mediaUrls, scheduledAt, platforms } = body || {}
    if (!content || typeof content !== 'string') return NextResponse.json({ error: 'Invalid content' }, { status: 400 })
    if (!Array.isArray(platforms) || platforms.length === 0) return NextResponse.json({ error: 'Select at least one platform' }, { status: 400 })
    if (scheduledAt && typeof scheduledAt === 'string' && !isISODateString(scheduledAt)) {
      return NextResponse.json({ error: 'Invalid scheduledAt' }, { status: 400 })
    }
    const post = await createPost({ content, mediaUrls, scheduledAt: scheduledAt || null, platforms })
    return NextResponse.json({ post })
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to create post', detail: e.message }, { status: 500 })
  }
}