import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

type GoogleReview = {
  reviewId?: string
  name?: string
  reviewer?: {
    displayName?: string
  }
  starRating?: number
  rating?: number
  comment?: string
  createTime?: string
}

// NOTE: This route assumes you've granted the required scopes in OAuth.
// Replace the fetch URL with the correct Google My Business API endpoint for reviews.

export async function POST() {
  const supabase = getSupabaseServerClient()

  // 1) Load refresh token
  const { data: tokenRow, error: tokenErr } = await supabase
    .from('google_integration_tokens')
    .select('*')
    .eq('provider', 'google')
    .single()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (tokenErr || !(tokenRow as any)?.refresh_token) {
    return NextResponse.json({ ok: false, error: 'Missing stored refresh token. Reconnect Google in admin.' }, { status: 400 })
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return NextResponse.json({ ok: false, error: 'Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET' }, { status: 500 })
  }

  // 2) Exchange refresh token to get access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      refresh_token: (tokenRow as any).refresh_token,
      grant_type: 'refresh_token',
    }),
  })
  const tokenJson = await tokenRes.json()
  if (!tokenRes.ok) {
    return NextResponse.json({ ok: false, error: 'Failed to refresh access token', details: tokenJson }, { status: 500 })
  }

  const accessToken = tokenJson.access_token as string

  // 3) Call Google API to fetch reviews using configured account/location
  try {
    const accountId = process.env.GOOGLE_ACCOUNT_ID || 'ACCOUNT_ID'
    const locationId = process.env.GOOGLE_LOCATION_ID || 'LOCATION_ID'
    const endpoint = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`
    const reviewsRes = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const reviewsJson = await reviewsRes.json()
    if (!reviewsRes.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to fetch Google reviews', details: reviewsJson }, { status: 500 })
    }

    // 4) Map and upsert into google_reviews
    const reviews = Array.isArray(reviewsJson?.reviews) ? reviewsJson.reviews : []
    const rows = reviews.map((r: GoogleReview) => ({
      review_id: r.reviewId || r.name || null,
      account_id: accountId,
      location_id: locationId,
      reviewer_name: r.reviewer?.displayName || 'Google User',
      rating: Math.round(r.starRating || r.rating || 0),
      comment: r.comment || '',
      review_date: r.createTime ? new Date(r.createTime).toISOString() : new Date().toISOString(),
      review_url: r.reviewId ? `https://search.google.com/local/reviews?placeid=${r.reviewId}` : null,
    }))

    // upsert by review_id (requires unique index created in prisma/google-reviews-alter.sql)
    for (const row of rows) {
      const { error } = await supabase
        .from('google_reviews')
        .upsert(row, { onConflict: 'review_id' })
      if (error) {
        console.error('Upsert error:', error)
      }
    }

    return NextResponse.json({ ok: true, imported: rows.length })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Unexpected error during sync', details: String(e) }, { status: 500 })
  }
}


