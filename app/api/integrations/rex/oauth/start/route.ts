import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getRexAuthUrl } from '@/lib/rex'

export const runtime = 'nodejs'

function getBaseUrl(req: NextRequest): string {
  const fromParam = req.nextUrl.searchParams.get('base_url')
  if (fromParam) return fromParam
  const requestOrigin = req.nextUrl.origin
  if (requestOrigin) return requestOrigin
  const originHeader = req.headers.get('origin') || ''
  if (originHeader) return originHeader
  return process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
}

export async function GET(request: NextRequest) {
  const state = crypto.randomBytes(16).toString('hex')

  const clientId = process.env.REX_CLIENT_ID || ''
  const scope = process.env.REX_SCOPE || 'openid profile rex.read'
  const authUrl = process.env.REX_AUTH_URL || 'https://api.rexsoftware.com/oauth/authorize'
  const baseUrl = getBaseUrl(request)
  const redirectUri = `${baseUrl}/api/integrations/rex/oauth/callback`

  if (!clientId) {
    return NextResponse.json({ error: 'Missing REX_CLIENT_ID' }, { status: 500 })
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state,
  })
  const url = `${authUrl}?${params.toString()}`

  const res = NextResponse.redirect(url)
  // Store state and redirect in cookies for CSRF and callback consistency
  res.cookies.set('rex_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 600 })
  res.cookies.set('rex_redirect', redirectUri, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 600 })
  return res
}