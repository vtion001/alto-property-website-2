import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state') || 'reviews-sync'

  if (!code) {
    return NextResponse.json({ ok: false, error: 'Missing authorization code' }, { status: 400 })
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  // Use the exact URL that Google redirected to, to avoid redirect_uri mismatch
  const redirectUri = `${url.protocol}//${url.host}${url.pathname}`

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET',
        next: 'Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_BASE_URL in .env.local and restart dev server.'
      },
      { status: 500 }
    )
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  })

  const tokenJson = await tokenRes.json()

  if (!tokenRes.ok) {
    return NextResponse.json({ ok: false, error: 'Token exchange failed', details: tokenJson }, { status: 500 })
  }

  // Persist refresh token securely (single row keyed by provider='google')
  try {
    const supabase = getSupabaseServerClient()
    const refreshToken = tokenJson.refresh_token as string | undefined
    if (refreshToken) {
      // upsert by provider
      const { error: upsertError } = await (supabase
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .from('google_integration_tokens') as any)
        .upsert({ provider: 'google', refresh_token: refreshToken }, { onConflict: 'provider' })
      if (upsertError) {
        console.error('Failed to store refresh token:', upsertError)
      }
    }
  } catch (e) {
    console.error('Token storage error:', e)
  }

  // Redirect back to admin with a success flag.
  const baseUrl = `${url.protocol}//${url.host}`
  const redirect = new URL(`/admin/integrations/google-reviews?oauth=success&state=${encodeURIComponent(state)}`, baseUrl)
  return NextResponse.redirect(redirect)
}


