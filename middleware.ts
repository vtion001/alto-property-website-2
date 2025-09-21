import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/auth')) {
    const token = req.cookies.get('alto_admin')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin/auth/login', req.url))
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/admin/auth/login', req.url))
    }
  }
  // Protect mutating API routes, but allow unauthenticated access to auth endpoints
  if (
    pathname.startsWith('/api') &&
    !pathname.startsWith('/api/admin/auth') &&
    !pathname.startsWith('/api/twilio') && // Allow Twilio webhook access
    ['POST','PUT','DELETE'].includes(req.method)
  ) {
    const token = req.cookies.get('alto_admin')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
}


