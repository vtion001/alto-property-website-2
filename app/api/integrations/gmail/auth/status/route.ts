import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const access = request.cookies.get('gmail_access')?.value
  const refresh = request.cookies.get('gmail_refresh')?.value
  const account = request.cookies.get('gmail_account')?.value
  const status: { hasAccessToken: boolean; hasRefreshToken: boolean; valid?: boolean; accountEmail?: string; error?: string } = {
    hasAccessToken: !!access,
    hasRefreshToken: !!refresh,
    accountEmail: account,
  }
  if (!access && !refresh) return NextResponse.json(status)

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.APP_BASE_URL ? `${process.env.APP_BASE_URL}/api/integrations/gmail/oauth/callback` : undefined
  if (!clientId || !clientSecret) {
    status.error = 'Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET'
    return NextResponse.json(status)
  }

  const oauth2 = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })
  oauth2.setCredentials({ access_token: access, refresh_token: refresh })

  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2 })
    const profile = await gmail.users.getProfile({ userId: 'me' })
    status.valid = !!profile.data.emailAddress
    status.accountEmail = profile.data.emailAddress || status.accountEmail
  } catch (_e) {
    status.valid = false
    status.error = _e instanceof Error ? _e.message : 'Unknown error'
  }
  return NextResponse.json(status)
}