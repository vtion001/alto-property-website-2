import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

export const runtime = 'edge'

export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })
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
    published: b.published,
    isExternal: b.is_external,
    originalUrl: b.original_url,
  }))
  return NextResponse.json(mapped)
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerClient()
  const body = await req.json()
  const row = {
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
  const { data, error } = await supabase.from('blog_posts').insert(row).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
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
    published: data.published,
    isExternal: data.is_external,
    originalUrl: data.original_url,
  }
  return NextResponse.json(mapped, { status: 201 })
}


