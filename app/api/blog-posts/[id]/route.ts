import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { jwtVerify } from 'jose'

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
  const body = await req.json()
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
  let query = supabase
    .from('blog_posts')
    .update({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      date: body.date,
      author: body.author,
      category: body.category,
      image: body.image,
      published,
      views: body.views,
    })
    .eq('id', id)
  if (ownerUsername) {
    query = query.eq('owner_username', ownerUsername)
  }
  let { data, error } = await query.select('*').single()
  if (error && ownerUsername && /column .*owner_username/i.test(error.message)) {
    const fb = await supabase
      .from('blog_posts')
      .update({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        date: body.date,
        author: body.author,
        category: body.category,
        image: body.image,
        published,
        views: body.views,
      })
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


