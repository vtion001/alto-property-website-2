import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { getAllPosts } from '@/lib/blog'
import { jwtVerify } from 'jose'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  let supabase: ReturnType<typeof getSupabaseServerClient> | null = null
  try {
    supabase = getSupabaseServerClient()
  } catch (e) {
    // Fallback to static blog when DB/env is not configured
    const staticPosts = getAllPosts().map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      date: p.date,
      author: p.author,
      category: p.category,
      image: p.image,
      published: p.published,
      isExternal: false,
      originalUrl: undefined,
    }))
    return NextResponse.json(staticPosts)
  }

  // Derive owner from JWT cookie when present
  let ownerUsername: string | null = null
  try {
    const token = request.cookies.get('alto_admin')?.value
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      const { payload } = await jwtVerify(token, secret)
      ownerUsername = (payload as any).username || null
    }
  } catch {}

  // Prefer scoping by owner_username column when available. Default to altoadmin when unauthenticated.
  let data: any[] | null = null
  let error: any = null
  const defaultOwner = ownerUsername || process.env.ADMIN_DEFAULT_USERNAME || 'altoadmin'
  if (defaultOwner) {
    const attempt = await supabase
      .from('blog_posts')
      .select('*')
      // @ts-ignore: owner scoping if column exists
      .eq('owner_username', defaultOwner)
      .order('date', { ascending: false })
    if (attempt.error && /column .*owner_username/i.test(attempt.error.message)) {
      // Column missing → fallback to unscoped (previous behavior)
      const fb = await supabase.from('blog_posts').select('*').order('date', { ascending: false })
      data = fb.data as any[]
      error = fb.error
    } else {
      data = attempt.data as any[]
      error = attempt.error
    }
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const mapped = (data || []).map((b: any) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    date: b.date,
    author: b.author,
    category: b.category,
    image: b.image,
    published: b.published ?? (b.status === 'published'),
    isExternal: b.is_external,
    originalUrl: b.original_url,
  }))
  return NextResponse.json(mapped)
}

export async function POST(req: NextRequest) {
  let supabase: ReturnType<typeof getSupabaseServerClient>
  try {
    supabase = getSupabaseServerClient()
  } catch (e) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }
  const body = await req.json()

  // Derive owner from JWT cookie; if missing, default to 'altoadmin' in development
  let ownerUsername: string | null = null
  try {
    const token = req.cookies.get('alto_admin')?.value
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      const { payload } = await jwtVerify(token, secret)
      ownerUsername = (payload as any).username || null
    }
  } catch {}

  const rowBase: any = {
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    date: body.date || new Date().toISOString().split('T')[0],
    author: body.author,
    category: body.category,
    image: body.image,
    published: body.published ?? false,
    is_external: body.isExternal ?? false,
    original_url: body.originalUrl || null,
  }
  // Attach owner when available; ignore if column doesn't exist
  if (ownerUsername) rowBase.owner_username = ownerUsername

  let insert = await supabase.from('blog_posts').insert(rowBase).select('*').single()
  if (insert.error && /column .*owner_username/i.test(insert.error.message)) {
    const { owner_username, ...withoutOwner } = rowBase
    insert = await supabase.from('blog_posts').insert(withoutOwner).select('*').single()
  }
  if (insert.error) return NextResponse.json({ error: insert.error.message }, { status: 500 })
  const data = insert.data
  const mapped = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    date: data.date,
    author: data.author,
    category: data.category,
    image: data.image,
    published: data.published ?? (data.status === 'published'),
    isExternal: data.is_external,
    originalUrl: data.original_url,
  }
  return NextResponse.json(mapped, { status: 201 })
}


