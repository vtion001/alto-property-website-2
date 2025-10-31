import { NextRequest, NextResponse } from 'next/server'
import { exchangeSocialCodeForToken, storeToken } from '@/lib/social'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const platform = url.searchParams.get('platform') as any
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const expected = req.cookies.get('social_oauth_state')?.value

  if (!platform || !code || !state) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  if (!expected || expected !== state) return NextResponse.json({ error: 'Invalid state' }, { status: 400 })

  try {
    const token = await exchangeSocialCodeForToken(platform, code)
    const adminKey = req.cookies.get('alto_admin')?.value || 'anon'
    await storeToken(platform, token, adminKey)
    const res = NextResponse.redirect('/admin/integrations/social-planner')
    res.cookies.set(`social_connected_${platform}`, '1', { httpOnly: true, sameSite: 'lax', secure: true, path: '/' })
    return res
  } catch (e: any) {
    return NextResponse.json({ error: 'OAuth callback failed', detail: e.message }, { status: 502 })
  }
}