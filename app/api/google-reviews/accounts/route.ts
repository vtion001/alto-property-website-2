import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServerClient()

  const { data: tokenRow, error: tokenErr } = await supabase
    .from('google_integration_tokens')
    .select('*')
    .eq('provider', 'google')
    .single()

  if (tokenErr || !tokenRow?.refresh_token) {
    return NextResponse.json({ ok: false, error: 'Missing stored refresh token. Connect Google first.' }, { status: 400 })
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return NextResponse.json({ ok: false, error: 'Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET' }, { status: 500 })
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: tokenRow.refresh_token,
      grant_type: 'refresh_token',
    }),
  })
  const tokenJson = await tokenRes.json()
  if (!tokenRes.ok) {
    return NextResponse.json({ ok: false, error: 'Failed to refresh access token', details: tokenJson }, { status: 500 })
  }

  const accessToken = tokenJson.access_token as string
  const accountsRes = await fetch('https://mybusiness.googleapis.com/v4/accounts', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const accountsJson = await accountsRes.json()
  if (!accountsRes.ok) {
    return NextResponse.json({ ok: false, error: 'Failed to list accounts', details: accountsJson }, { status: 500 })
  }

  return NextResponse.json({ ok: true, data: accountsJson })
}


