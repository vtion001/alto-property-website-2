import { cookies } from 'next/headers'

type OAuthTokenResponse = {
  access_token: string
  refresh_token?: string
  expires_in?: number
  token_type?: string
}

type RexContact = {
  id?: string
  name?: string
  email?: string
  phone?: string | string[]
  notes?: string
  updatedAt?: string
}

const REX_CONFIG = {
  authUrl: process.env.REX_AUTH_URL || 'https://api.rexsoftware.com/oauth/authorize',
  tokenUrl: process.env.REX_TOKEN_URL || 'https://api.rexsoftware.com/oauth/token',
  clientId: process.env.REX_CLIENT_ID || '',
  clientSecret: process.env.REX_CLIENT_SECRET || '',
  redirectUri: process.env.REX_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/integrations/rex/oauth/callback`,
  scope: process.env.REX_SCOPE || 'openid profile rex.read',
  contactsEndpoint: process.env.REX_CONTACTS_ENDPOINT || 'https://api.rexsoftware.com/v1/rex/contacts/list',
}

const MOCK = process.env.REX_MOCK === '1'

export function getRexAuthUrl(state: string) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: REX_CONFIG.clientId,
    redirect_uri: REX_CONFIG.redirectUri,
    scope: REX_CONFIG.scope,
    state,
  })
  return `${REX_CONFIG.authUrl}?${params.toString()}`
}

export async function exchangeCodeForToken(code: string): Promise<OAuthTokenResponse> {
  if (MOCK) {
    return { access_token: 'mock_access', refresh_token: 'mock_refresh', expires_in: 3600, token_type: 'Bearer' }
  }
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REX_CONFIG.redirectUri,
    client_id: REX_CONFIG.clientId,
    client_secret: REX_CONFIG.clientSecret,
  })
  const res = await fetch(REX_CONFIG.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`REX token exchange failed: ${res.status} ${text}`)
  }
  return res.json()
}

export async function refreshAccessToken(refreshToken: string): Promise<OAuthTokenResponse> {
  if (MOCK) {
    return { access_token: 'mock_access_refreshed', refresh_token: refreshToken, expires_in: 3600, token_type: 'Bearer' }
  }
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: REX_CONFIG.clientId,
    client_secret: REX_CONFIG.clientSecret,
  })
  const res = await fetch(REX_CONFIG.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`REX token refresh failed: ${res.status} ${text}`)
  }
  return res.json()
}

export async function rexApiRequest<T>(pathOrUrl: string, opts: RequestInit = {}): Promise<T> {
  if (MOCK) {
    // Simulate a contacts list response or ping
    const isContacts = typeof pathOrUrl === 'string' && pathOrUrl.includes('contacts')
    const mock: unknown = isContacts
      ? { items: [ { id: 'rex_1', first_name: 'Alice', last_name: 'Doe', primary_email: 'alice@example.com', primary_phone: '+6100000001', updated_at: new Date().toISOString(), notes: 'VIP' }, { id: 'rex_2', first_name: 'Bob', last_name: 'Smith', emails: ['bob@example.com'], phones: ['+6100000002'], updated_at: new Date().toISOString() } ] }
      : { ok: true }
    return mock as T
  }
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('rex_access')?.value
  const refreshToken = cookieStore.get('rex_refresh')?.value

  async function doFetch(token: string) {
    const headers = new Headers(opts.headers || {})
    headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
    const res = await fetch(pathOrUrl, { ...opts, headers })
    return res
  }

  if (!accessToken) {
    throw new Error('Missing REX access token')
  }

  let res = await doFetch(accessToken)
  if (res.status === 401 && refreshToken) {
    // Attempt refresh once
    try {
      const refreshed = await refreshAccessToken(refreshToken)
      accessToken = refreshed.access_token
      // Persist refreshed access token
      const cookieStoreMutable = await cookies()
      cookieStoreMutable.set('rex_access', accessToken, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
      res = await doFetch(accessToken)
    } catch (_e) {
      throw new Error('REX auth expired and refresh failed')
    }
  }

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`REX request failed: ${res.status} ${text}`)
  }
  return res.json()
}

type RexAPIRaw = {
  id?: string
  contact_id?: string
  name?: string
  first_name?: string
  last_name?: string
  email?: string
  primary_email?: string
  emails?: string[]
  phone?: string | string[]
  primary_phone?: string
  phones?: string[]
  notes?: string
  description?: string
  updatedAt?: string
  updated_at?: string
  last_updated?: string
}

export async function listContacts(updatedSince?: string): Promise<RexContact[]> {
  const url = new URL(REX_CONFIG.contactsEndpoint)
  if (updatedSince) {
    url.searchParams.set('updated_since', updatedSince)
  }
  try {
    const data = await rexApiRequest<{ items?: RexAPIRaw[]; contacts?: RexAPIRaw[] } | RexAPIRaw[]>(url.toString(), { method: 'GET' })
    // Normalize possible response formats
    const records: RexAPIRaw[] = Array.isArray(data) ? data : (data.items ?? data.contacts ?? [])
    return records.map((r) => ({
      id: r.id || r.contact_id,
      name: r.name || [r.first_name, r.last_name].filter(Boolean).join(' '),
      email: r.email || r.primary_email || (Array.isArray(r.emails) ? r.emails[0] : undefined),
      phone: r.phone || r.primary_phone || (Array.isArray(r.phones) ? r.phones[0] : undefined),
      notes: r.notes || r.description || undefined,
      updatedAt: r.updatedAt || r.updated_at || r.last_updated || undefined,
    }))
  } catch (e) {
    throw e
  }
}

export function mapRexToDashboard(contact: RexContact) {
  const phone = Array.isArray(contact.phone) ? contact.phone[0] : contact.phone
  return {
    name: contact.name || 'Unknown',
    phoneNumber: phone || '',
    email: contact.email || null,
    notes: contact.notes || null,
    updatedAt: contact.updatedAt || new Date().toISOString(),
  }
}