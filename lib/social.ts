import { rateLimit } from './rate-limit'

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'pinterest'

type OAuthToken = {
  access_token: string
  refresh_token?: string
  token_type?: string
  expires_in?: number
}

type OAuthConfig = {
  authUrl: string
  tokenUrl: string
  clientId: string
  clientSecret: string
  scope: string
  redirectUri: string
}

type PostPayload = {
  id?: string
  content: string
  mediaUrls?: string[]
  scheduledAt?: string | null
  platforms: Platform[]
}

type PublishResult = {
  platform: Platform
  status: 'queued' | 'published' | 'failed'
  externalId?: string
  error?: string
}

const MOCK = process.env.SOCIAL_MOCK === '1'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3004'

const CONFIG: Record<Platform, OAuthConfig> = {
  facebook: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    clientId: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    scope: 'pages_manage_posts,pages_read_engagement,pages_show_list',
    redirectUri: `${BASE_URL}/api/integrations/social/oauth/callback?platform=facebook`,
  },
  instagram: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    clientId: process.env.INSTAGRAM_CLIENT_ID || process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || process.env.FACEBOOK_CLIENT_SECRET || '',
    scope: 'instagram_basic,instagram_content_publish,pages_show_list',
    redirectUri: `${BASE_URL}/api/integrations/social/oauth/callback?platform=instagram`,
  },
  tiktok: {
    authUrl: 'https://www.tiktok.com/v2/auth/authorize',
    tokenUrl: 'https://open-api.tiktok.com/oauth/token',
    clientId: process.env.TIKTOK_CLIENT_ID || '',
    clientSecret: process.env.TIKTOK_CLIENT_SECRET || '',
    scope: 'video.upload,business.account',
    redirectUri: `${BASE_URL}/api/integrations/social/oauth/callback?platform=tiktok`,
  },
  youtube: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly',
    redirectUri: `${BASE_URL}/api/integrations/social/oauth/callback?platform=youtube`,
  },
  twitter: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    clientId: process.env.TWITTER_CLIENT_ID || '',
    clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
    scope: 'tweet.read tweet.write users.read offline.access',
    redirectUri: `${BASE_URL}/api/integrations/social/oauth/callback?platform=twitter`,
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    clientId: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    scope: 'r_emailaddress r_liteprofile w_member_social',
    redirectUri: `${BASE_URL}/api/integrations/social/oauth/callback?platform=linkedin`,
  },
  pinterest: {
    authUrl: 'https://www.pinterest.com/oauth/',
    tokenUrl: 'https://api.pinterest.com/v5/oauth/token',
    clientId: process.env.PINTEREST_CLIENT_ID || '',
    clientSecret: process.env.PINTEREST_CLIENT_SECRET || '',
    scope: 'pins:read pins:write boards:read boards:write',
    redirectUri: `${BASE_URL}/api/integrations/social/oauth/callback?platform=pinterest`,
  },
}

export function getSocialAuthUrl(platform: Platform, state: string): string {
  const cfg = CONFIG[platform]
  const qs = new URLSearchParams()
  qs.set('client_id', cfg.clientId)
  qs.set('redirect_uri', cfg.redirectUri)
  qs.set('response_type', 'code')
  qs.set('scope', cfg.scope)
  qs.set('state', state)
  if (platform === 'youtube') {
    qs.set('access_type', 'offline')
    qs.set('include_granted_scopes', 'true')
  }
  return `${cfg.authUrl}?${qs.toString()}`
}

export async function exchangeSocialCodeForToken(platform: Platform, code: string): Promise<OAuthToken> {
  if (MOCK) return { access_token: `mock_${platform}_access`, refresh_token: `mock_${platform}_refresh`, token_type: 'Bearer', expires_in: 3600 }
  const cfg = CONFIG[platform]
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: cfg.redirectUri,
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
  })
  const res = await fetch(cfg.tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
  if (!res.ok) throw new Error(`Token exchange failed for ${platform}: ${res.status} ${await res.text()}`)
  return res.json()
}

export async function refreshSocialAccessToken(platform: Platform, refreshToken: string): Promise<OAuthToken> {
  if (MOCK) return { access_token: `mock_${platform}_access_refreshed`, refresh_token: refreshToken, token_type: 'Bearer', expires_in: 3600 }
  const cfg = CONFIG[platform]
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
  })
  const res = await fetch(cfg.tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
  if (!res.ok) throw new Error(`Token refresh failed for ${platform}: ${res.status} ${await res.text()}`)
  return res.json()
}

// Simple ephemeral storage for mock/dev; replace with DB in production
const memoryStore = {
  tokens: new Map<string, Partial<Record<Platform, OAuthToken>>>(),
  posts: [] as (PostPayload & { id: string; status: 'draft' | 'scheduled' | 'published' })[],
}

export async function storeToken(platform: Platform, token: OAuthToken, adminKey?: string) {
  const key = adminKey || 'anon'
  const existing = memoryStore.tokens.get(key) || ({} as Partial<Record<Platform, OAuthToken>>)
  existing[platform] = token
  memoryStore.tokens.set(key, existing)
}

export function getToken(platform: Platform, adminKey?: string): OAuthToken | undefined {
  const key = adminKey || 'anon'
  const tokens = memoryStore.tokens.get(key)
  return tokens?.[platform]
}

export async function publishToPlatform(platform: Platform, _post: PostPayload): Promise<PublishResult> {
  // Rate limit per platform
  const rl = rateLimit(`social:${platform}`, 30, 60_000)
  if (!rl.allowed) return { platform, status: 'failed', error: 'Rate limited' }
  if (MOCK) {
    return { platform, status: 'published', externalId: `mock_${platform}_${Date.now()}` }
  }
  // TODO: Implement real API calls per platform. For now, fail gracefully.
  return { platform, status: 'failed', error: 'Publisher not configured' }
}

export async function createPost(payload: PostPayload) {
  const id = payload.id || `post_${Date.now()}`
  const status: 'draft' | 'scheduled' = payload.scheduledAt ? 'scheduled' : 'draft'
  const post: PostPayload & { id: string; status: 'draft' | 'scheduled' | 'published' } = { ...payload, id, status }
  memoryStore.posts.push(post)
  return post
}

export function listPosts() {
  return memoryStore.posts
}

export async function runScheduler(now = new Date()) {
  const due = memoryStore.posts.filter((p) => p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now)
  const results: PublishResult[] = []
  for (const p of due) {
    for (const pl of p.platforms) {
      const r = await publishToPlatform(pl, p)
      results.push(r)
    }
    p.status = 'published'
  }
  return results
}

export function connectionStatus(adminKey?: string) {
  const key = adminKey || 'anon'
  const tokens = memoryStore.tokens.get(key) || ({} as Partial<Record<Platform, OAuthToken>>)
  const status: Record<Platform, boolean> = {
    facebook: !!tokens.facebook,
    instagram: !!tokens.instagram,
    tiktok: !!tokens.tiktok,
    youtube: !!tokens.youtube,
    twitter: !!tokens.twitter,
    linkedin: !!tokens.linkedin,
    pinterest: !!tokens.pinterest,
  }
  return status
}