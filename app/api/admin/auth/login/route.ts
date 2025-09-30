
import { NextRequest, NextResponse } from 'next/server'
import { findUserByUsername, comparePassword } from '@/lib/auth-supabase'
import { SignJWT } from 'jose'

// Use Node.js runtime for compatibility with cookies and environment access
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Dev fallback: allow env-configured credentials when DB is not available
    const isProductionEnv = process.env.NODE_ENV === 'production'
    const devUser = !isProductionEnv && process.env.ADMIN_DEFAULT_USERNAME
    const devPass = !isProductionEnv && process.env.ADMIN_DEFAULT_PASSWORD

    if (devUser && devPass && username === process.env.ADMIN_DEFAULT_USERNAME && password === process.env.ADMIN_DEFAULT_PASSWORD) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      const token = await new SignJWT({
        userId: 'dev-user',
        username,
        role: 'super_admin',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret)

      const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
      response.cookies.set('alto_admin', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: isProductionEnv,
        path: '/',
        maxAge: 60 * 60 * 24,
      })
      return response
    }

    // Find user by username/email in DB
    let user: { password_hash?: string } | null = null
    try {
      user = await findUserByUsername(username)
    } catch (dbErr) {
      console.error('Login DB error, falling back to dev logic if enabled:', dbErr)
      // Continue to fallback logic below; do not hard-fail here so dev creds can work without DB
      user = null
    }
    if (!user || !user.password_hash) {
      // As a final development fallback, allow default creds when DB has no admin row
      if (!isProductionEnv && username === 'altoadmin' && password === 'altoproperty2025@@') {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
        const token = await new SignJWT({ userId: 'dev-user', username, role: 'super_admin' })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('24h')
          .sign(secret)
        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
        response.cookies.set('alto_admin', token, {
          httpOnly: true,
          sameSite: 'lax',
          secure: isProductionEnv,
          path: '/',
          maxAge: 60 * 60 * 24,
        })
        return response
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    let isValidPassword = false
    try {
      isValidPassword = await comparePassword(password, user.password_hash)
    } catch (cmpErr) {
      console.error('Password compare error:', cmpErr)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
    const token = await new SignJWT({
      userId: user.id,
      username: user.username,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    // Return success response
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
    // In local development over http, secure cookies are blocked. Toggle based on env.
    response.cookies.set('alto_admin', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProductionEnv,
      path: '/',
      maxAge: 60 * 60 * 24,
    })
    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
