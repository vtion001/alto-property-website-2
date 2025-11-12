import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  if (!code) {
    return NextResponse.json({ error: 'Missing OAuth code' }, { status: 400 })
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET' }, { status: 500 })
  }

  const redirectUriCookie = request.cookies.get('gmail_redirect')?.value
  const redirectUri = redirectUriCookie || `${(request.headers.get('origin') || process.env.APP_BASE_URL || 'http://localhost:3002')}/api/integrations/gmail/oauth/callback`
  const oauth2 = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })

  try {
    const { tokens } = await oauth2.getToken(code)
    oauth2.setCredentials(tokens)
    const gmail = google.gmail({ version: 'v1', auth: oauth2 })
    // Try to get the connected account email for display
    let accountEmail: string | undefined
    try {
      const profile = await gmail.users.getProfile({ userId: 'me' })
      accountEmail = profile.data.emailAddress || undefined
    } catch {}

    const baseUrl = request.headers.get('origin') || process.env.APP_BASE_URL || 'http://localhost:3002'
    const res = NextResponse.redirect(`${baseUrl}/admin?tab=integrations&gmail=success`)
    if (tokens.access_token) {
      res.cookies.set('gmail_access', tokens.access_token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
    }
    if (tokens.refresh_token) {
      res.cookies.set('gmail_refresh', tokens.refresh_token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
    }
    if (accountEmail) {
      res.cookies.set('gmail_account', accountEmail, { httpOnly: false, secure: true, sameSite: 'lax', path: '/' })
    }
    return res
  } catch (_e) {
    const detail = _e instanceof Error ? _e.message : 'Unknown error'
    return NextResponse.json({ error: 'OAuth exchange failed', detail }, { status: 500 })
  }
}