import { NextRequest, NextResponse } from 'next/server'
import { exchangeSocialCodeForToken, storeToken } from '@/lib/social'

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'pinterest'
function isValidPlatform(p: string): p is Platform {
  return ['facebook','instagram','tiktok','youtube','twitter','linkedin','pinterest'].includes(p)
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const platform = url.searchParams.get('platform')
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const expected = req.cookies.get('social_oauth_state')?.value

  if (!platform || !code || !state) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  if (!isValidPlatform(platform)) return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  const platformTyped = platform as Platform
  if (!expected || expected !== state) return NextResponse.json({ error: 'Invalid state' }, { status: 400 })

  try {
    const token = await exchangeSocialCodeForToken(platformTyped, code)
    const adminKey = req.cookies.get('alto_admin')?.value || 'anon'
    await storeToken(platformTyped, token, adminKey)
    const res = NextResponse.redirect('/admin/integrations/social-planner')
    res.cookies.set(`social_connected_${platform}`, '1', { httpOnly: true, sameSite: 'lax', secure: true, path: '/' })
    return res
  } catch (_e) {
    const message = _e instanceof Error ? _e.message : String(_e)
    return NextResponse.json({ error: 'OAuth callback failed', detail: message }, { status: 502 })
  }
}