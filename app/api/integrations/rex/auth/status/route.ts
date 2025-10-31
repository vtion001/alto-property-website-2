import { NextRequest, NextResponse } from 'next/server'
import { rexApiRequest } from '@/lib/rex'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const access = request.cookies.get('rex_access')?.value
  const refresh = request.cookies.get('rex_refresh')?.value
  const status: any = { hasAccessToken: !!access, hasRefreshToken: !!refresh }
  if (!access) return NextResponse.json(status)

  try {
    // Call a lightweight endpoint to validate the access token
    const resp = await rexApiRequest<any>('https://api.rexsoftware.com/v1/rex/user-profile/get-all-accounts', { method: 'POST', body: JSON.stringify({}) })
    status.valid = true
    status.accounts = resp
  } catch (e: any) {
    status.valid = false
    status.error = e?.message || 'Unknown error'
  }
  return NextResponse.json(status)
}