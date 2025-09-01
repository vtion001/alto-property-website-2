import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { jwtVerify } from 'jose'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  let supabase: ReturnType<typeof getSupabaseServerClient> | null = null
  try {
    supabase = getSupabaseServerClient()
  } catch (e) {
    // Fallback: return demo properties list from admin state when DB/env missing
    return NextResponse.json([])
  }
  let ownerUsername: string | null = null
  try {
    const token = request.cookies.get('alto_admin')?.value
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      const { payload } = await jwtVerify(token, secret)
      ownerUsername = (payload as any).username || null
    }
  } catch {}

  let data: any[] | null = null
  let error: any = null
  const defaultOwner = ownerUsername || process.env.ADMIN_DEFAULT_USERNAME || 'altoadmin'
  if (defaultOwner) {
    const attempt = await supabase
      .from('properties')
      .select('*')
      // @ts-ignore optional owner scoping
      .eq('owner_username', defaultOwner)
      .order('date_added', { ascending: false })
    if (attempt.error && /column .*owner_username/i.test(attempt.error.message)) {
      const fb = await supabase.from('properties').select('*').order('date_added', { ascending: false })
      data = fb.data as any[]
      error = fb.error
    } else {
      data = attempt.data as any[]
      error = attempt.error
    }
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(req: NextRequest) {
  let supabase: ReturnType<typeof getSupabaseServerClient>
  try {
    supabase = getSupabaseServerClient()
  } catch (e) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }
  const body = await req.json()
  let rowBase: any = {
    title: body.title,
    address: body.address,
    suburb: body.suburb,
    price: body.price,
    beds: body.beds,
    baths: body.baths,
    parking: body.parking,
    land_size: body.landSize,
    status: body.status,
    type: body.type,
    listing_type: body.listingType,
    image: body.image,
    date_added: body.dateAdded || new Date().toISOString().split('T')[0],
    description: body.description,
    features: body.features,
    commission_rate: body.commissionRate,
  }
  try {
    const token = req.cookies.get('alto_admin')?.value
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      const { payload } = await jwtVerify(token, secret)
      const ownerUsername = (payload as any).username || null
      if (ownerUsername) rowBase.owner_username = ownerUsername
    }
  } catch {}

  let insert = await supabase
    .from('properties')
    .insert(rowBase)
    .select('*').single()
  if (insert.error && /column .*owner_username/i.test(insert.error.message)) {
    const { owner_username, ...withoutOwner } = rowBase
    insert = await supabase.from('properties').insert(withoutOwner).select('*').single()
  }
  if (insert.error) return NextResponse.json({ error: insert.error.message }, { status: 500 })
  return NextResponse.json(insert.data, { status: 201 })
}


