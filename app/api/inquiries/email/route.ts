import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { google } from 'googleapis'

export async function POST(req: Request) {
  try {
    const payload = await req.json()
    const to = String(payload?.to || '').trim()
    const subject = String(payload?.subject || '').trim()
    const body = String(payload?.body || '').trim()
    const inquiryId = payload?.inquiryId ? String(payload.inquiryId) : undefined

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, body' }, { status: 400 })
    }

    // Attempt to send via Gmail if authorized
    const cookieStore = await cookies()
    const access = cookieStore.get('gmail_access')?.value
    const refresh = cookieStore.get('gmail_refresh')?.value
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const base = process.env.APP_BASE_URL || 'http://localhost:3002'
    const redirectUri = `${base}/api/integrations/gmail/oauth/callback`

    if (clientId && clientSecret && (access || refresh)) {
      try {
        const oauth2 = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })
        oauth2.setCredentials({ access_token: access, refresh_token: refresh })
        const gmail = google.gmail({ version: 'v1', auth: oauth2 })
        const message = [
          `To: ${to}`,
          `Subject: ${subject}`,
          'Content-Type: text/plain; charset=UTF-8',
          '',
          body,
        ].join('\r\n')
        const raw = Buffer.from(message)
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '')
        await gmail.users.messages.send({ userId: 'me', requestBody: { raw } })
        return NextResponse.json({ ok: true, provider: 'gmail' })
      } catch (_e) {
        const detail = _e instanceof Error ? _e.message : 'Unknown send error'
        return NextResponse.json({ error: `Gmail send failed: ${detail}` }, { status: 502 })
      }
    }

    // Fallback: simulate send (no Gmail connected)
    console.log('[SendEmail:FALLBACK] Inquiry:', inquiryId, 'To:', to, 'Subject:', subject)
    return NextResponse.json({ ok: true, provider: 'fallback' })
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}