import { NextRequest, NextResponse } from 'next/server'
import { getSocialAuthUrl } from '@/lib/social'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const platform = url.searchParams.get('platform')
  if (!platform) return NextResponse.json({ error: 'Missing platform' }, { status: 400 })
  type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'pinterest'
  const valid = ['facebook','instagram','tiktok','youtube','twitter','linkedin','pinterest'] as const
  if (!valid.some(v => v === platform)) return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  const platformTyped = platform as Platform

  const state = Math.random().toString(36).slice(2)
  const redirect = getSocialAuthUrl(platformTyped, state)
  const res = NextResponse.redirect(redirect)
  res.cookies.set('social_oauth_state', state, { httpOnly: true, sameSite: 'lax', secure: true, path: '/' })
  return res
}