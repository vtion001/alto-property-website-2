import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken } from '@/lib/rex'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const storedState = request.cookies.get('rex_oauth_state')?.value

  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  if (!state || !storedState || state !== storedState) {
    return NextResponse.json({ error: 'Invalid OAuth state' }, { status: 400 })
  }

  try {
    const token = await exchangeCodeForToken(code)
    const res = NextResponse.redirect('/admin')
    const maxAge = token.expires_in ? token.expires_in : 3600
    res.cookies.set('rex_access', token.access_token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge })
    if (token.refresh_token) {
      // Typically long-lived; store securely as httpOnly cookie
      res.cookies.set('rex_refresh', token.refresh_token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
    }
    res.cookies.set('rex_oauth_state', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 })
    return res
  } catch (_e) {
    console.error('REX OAuth callback error:', _e)
    return NextResponse.json({ error: 'OAuth exchange failed' }, { status: 500 })
  }
}