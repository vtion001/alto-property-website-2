import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const runtime = 'nodejs'

function getBaseUrl(req: NextRequest): string {
  const fromParam = req.nextUrl.searchParams.get('base_url')
  if (fromParam) return fromParam
  const origin = req.headers.get('origin') || ''
  if (origin) return origin
  // Fallback for local dev
  return process.env.APP_BASE_URL || 'http://localhost:3002'
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET' }, { status: 500 })
  }

  const baseUrl = getBaseUrl(request)
  const redirectUri = `${baseUrl}/api/integrations/gmail/oauth/callback`
  const oauth2 = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })

  const scopes = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ]

  const authUrl = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  })

  const res = NextResponse.redirect(authUrl)
  res.cookies.set('gmail_redirect', redirectUri, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60, // 10 minutes
  })
  return res
}