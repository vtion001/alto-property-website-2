import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { jwtVerify } from 'jose'

interface BlogPostUpdate {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  date?: string
  author?: string
  category?: string
  image?: string
  published?: boolean
  status?: string
  views?: number
}

export const runtime = 'edge'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const body: BlogPostUpdate = await req.json()
  // Scope update to owner when column exists
  let ownerUsername: string | null = null
  try {
    const token = req.cookies.get('alto_admin')?.value
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      const { payload } = await jwtVerify(token, secret)
      ownerUsername = (payload as { username?: string }).username || null
    }
  } catch {}

  const published = typeof body.published === 'boolean' ? body.published : body.status === 'published'
  
  // Create update object with only defined values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = {}
  if (body.title !== undefined) updateData.title = body.title
  if (body.slug !== undefined) updateData.slug = body.slug
  if (body.excerpt !== undefined) updateData.excerpt = body.excerpt
  if (body.content !== undefined) updateData.content = body.content
  if (body.date !== undefined) updateData.date = body.date
  if (body.author !== undefined) updateData.author = body.author
  if (body.category !== undefined) updateData.category = body.category
  if (body.image !== undefined) updateData.image = body.image
  if (published !== undefined) updateData.published = published
  if (body.views !== undefined) updateData.views = body.views

  let query = (supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .from('blog_posts') as any)
    .update(updateData)
    .eq('id', id)
  if (ownerUsername) {
    query = query.eq('owner_username', ownerUsername)
  }
  let { data, error } = await query.select('*').single()
  if (error && ownerUsername && /column .*owner_username/i.test(error.message)) {
    const fb = await (supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .from('blog_posts') as any)
      .update(updateData)
      .eq('id', id)
      .select('*').single()
    data = fb.data
    error = fb.error
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}


