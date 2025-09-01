import { NextRequest, NextResponse } from 'next/server'

// This is a placeholder endpoint to start Google OAuth flow.
// In production, configure a real OAuth consent and redirect URL.
export async function GET(request: NextRequest) {
  // Accept values from query params (from the admin form) or env fallback
  const url = new URL(request.url)
  const qpClientId = url.searchParams.get('client_id') || undefined
  const qpBaseUrl = url.searchParams.get('base_url') || undefined
  const qpState = url.searchParams.get('state') || 'reviews-sync'

  const clientId = qpClientId || process.env.GOOGLE_CLIENT_ID
  const baseUrl = qpBaseUrl || process.env.NEXT_PUBLIC_BASE_URL || `${url.protocol}//${url.host}`
  const redirectUri = `${baseUrl}/api/google-reviews/oauth/callback`
  const scope = encodeURIComponent('https://www.googleapis.com/auth/business.manage')
  const state = encodeURIComponent(qpState)
  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(
    clientId || ''
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&access_type=offline&prompt=consent&state=${state}`

  // If clientId isn't configured, just return a helpful message
  if (!clientId) {
    return NextResponse.json({
      ok: false,
      message:
        'Google OAuth is not configured. Provide client_id & base_url as query params or set GOOGLE_CLIENT_ID and NEXT_PUBLIC_BASE_URL environment variables.',
      oauthUrl,
    })
  }

  return NextResponse.redirect(oauthUrl)
}


