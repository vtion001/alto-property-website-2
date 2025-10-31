import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getRexAuthUrl } from '@/lib/rex'

export const runtime = 'nodejs'

export async function GET() {
  const state = crypto.randomBytes(16).toString('hex')
  const url = getRexAuthUrl(state)
  const res = NextResponse.redirect(url)
  // Store state in cookie for CSRF protection
  res.cookies.set('rex_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 600 })
  return res
}