
import { NextRequest, NextResponse } from 'next/server'
import { findUserByUsername, comparePassword } from '@/lib/auth-supabase'
import { SignJWT } from 'jose'

// Use Node.js runtime for compatibility with cookies and environment access
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    console.log('🔐 Login attempt for username:', username)

    // Validation
    if (!username || !password) {
      console.log('❌ Missing username or password')
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Dev fallback: allow env-configured credentials when DB is not available
    const isProductionEnv = process.env.NODE_ENV === 'production'
    const devUser = !isProductionEnv && process.env.ADMIN_DEFAULT_USERNAME
    const devPass = !isProductionEnv && process.env.ADMIN_DEFAULT_PASSWORD
    
    console.log('🌍 Environment:', { 
      NODE_ENV: process.env.NODE_ENV, 
      isProductionEnv,
      hasDevUser: !!devUser,
      hasDevPass: !!devPass,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseServiceRole: !!process.env.SUPABASE_SERVICE_ROLE,
      hasJwtSecret: !!process.env.JWT_SECRET
    })

    if (devUser && devPass && username === process.env.ADMIN_DEFAULT_USERNAME && password === process.env.ADMIN_DEFAULT_PASSWORD) {
      console.log('✅ Using dev fallback credentials')
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
    let user: { id: string; username?: string; role?: string; password_hash: string } | null = null
    console.log('🔍 Attempting to find user in database...')
    try {
      user = await findUserByUsername(username)
      console.log('👤 Database user lookup result:', user ? { 
        id: user.id, 
        username: user.username, 
        role: user.role, 
        hasPasswordHash: !!user.password_hash 
      } : 'null')
    } catch (dbErr) {
      console.error('❌ Login DB error, falling back to dev logic if enabled:', dbErr)
      // Continue to fallback logic below; do not hard-fail here so dev creds can work without DB
      user = null
    }
    if (!user || !user.password_hash) {
      console.log('⚠️ No user found or missing password hash, checking fallback...')
      // As a final development fallback, allow default creds when DB has no admin row
      if (!isProductionEnv && username === 'altoadmin' && password === 'altoproperty2025@@') {
        console.log('✅ Using hardcoded fallback credentials for altoadmin')
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
      console.log('❌ No fallback available, returning 401')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    let isValidPassword = false
    console.log('🔒 Verifying password...')
    try {
      isValidPassword = await comparePassword(password, user.password_hash)
      console.log('🔑 Password verification result:', isValidPassword)
    } catch (cmpErr) {
      console.error('❌ Password compare error:', cmpErr)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    if (!isValidPassword) {
      console.log('❌ Invalid password, returning 401')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token
    console.log('🎫 Generating JWT token for successful login')
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
    console.log('✅ Login successful, returning token')
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
