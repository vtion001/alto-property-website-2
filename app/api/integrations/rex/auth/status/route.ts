import { NextRequest, NextResponse } from 'next/server'
import { rexApiRequest } from '@/lib/rex'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const access = request.cookies.get('rex_access')?.value
  const refresh = request.cookies.get('rex_refresh')?.value
  type RexAuthStatus = {
    hasAccessToken: boolean
    hasRefreshToken: boolean
    valid?: boolean
    accounts?: unknown
    error?: string
  }
  const status: RexAuthStatus = { hasAccessToken: !!access, hasRefreshToken: !!refresh }
  if (!access) return NextResponse.json(status)

  try {
    // Call a lightweight endpoint to validate the access token
    const resp = await rexApiRequest<unknown>('https://api.rexsoftware.com/v1/rex/user-profile/get-all-accounts', { method: 'POST', body: JSON.stringify({}) })
    status.valid = true
    status.accounts = resp
  } catch (_e) {
    status.valid = false
    status.error = _e instanceof Error ? _e.message : 'Unknown error'
  }
  return NextResponse.json(status)
}