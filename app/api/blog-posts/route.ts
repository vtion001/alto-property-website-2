import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAllPosts } from '@/lib/blog'
import { jwtVerify } from 'jose'

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
      console.warn('Supabase not configured, falling back to static blog posts')
      // Fallback to static blog when DB/env is not configured
      try {
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
      } catch (blogError) {
        console.error('Error loading static blog posts:', blogError)
        return NextResponse.json([])
      }
    }

    // Derive owner from JWT cookie when present
    let ownerUsername: string | null = null
    try {
      const token = request.cookies.get('alto_admin')?.value
      if (token) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
        const { payload } = await jwtVerify(token, secret)
        ownerUsername = (payload as { username?: string }).username || null
      }
    } catch {}

    // Prefer scoping by owner_username column when available. Default to altoadmin when unauthenticated.
    let data: unknown[] | null = null
    let error: unknown = null
    const defaultOwner = ownerUsername || process.env.ADMIN_DEFAULT_USERNAME || 'altoadmin'
    
    if (defaultOwner) {
      const attempt = await supabase
        .from('blog_posts')
        .select('*')
        .eq('owner_username', defaultOwner)
        .order('date', { ascending: false })
        
      if (attempt.error && /column .*owner_username/i.test(attempt.error.message)) {
        // Column missing → fallback to unscoped (previous behavior)
        const fb = await supabase.from('blog_posts').select('*').order('date', { ascending: false })
        data = fb.data as unknown[]
        error = fb.error
      } else {
        data = attempt.data as unknown[]
        error = attempt.error
      }
    }

    if (error) {
      console.error('Blog posts API error:', error)
      const errorMessage = (error as { message?: string })?.message || 'Unknown error'
      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
    
    const mapped = (data || []).map((b: unknown) => {
      const blogPost = b as Record<string, unknown>
      return {
      id: blogPost.id,
      title: blogPost.title,
      slug: blogPost.slug,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      date: blogPost.date,
      author: blogPost.author,
      category: blogPost.category,
      image: blogPost.image,
      published: blogPost.published ?? (blogPost.status === 'published'),
      isExternal: blogPost.is_external,
      originalUrl: blogPost.original_url,
    }
    })
    
    return NextResponse.json(mapped)
  } catch (error: unknown) {
    console.error('Blog posts API unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
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
        ownerUsername = (payload as { username?: string }).username || null
      }
    } catch {}

    const rowBase: Record<string, unknown> = {
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
      const { owner_username: _owner_username, ...withoutOwner } = rowBase
      insert = await supabase.from('blog_posts').insert(withoutOwner).select('*').single()
    }
    
    if (insert.error) {
      console.error('Blog posts POST error:', insert.error)
      return NextResponse.json({ error: insert.error.message }, { status: 500 })
    }
    
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
  } catch (error: unknown) {
    console.error('Blog posts POST unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


