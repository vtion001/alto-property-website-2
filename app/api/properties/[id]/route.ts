import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'
import { jwtVerify } from 'jose'

export const runtime = 'edge'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const body = await req.json()
  let ownerUsername: string | null = null
  try {
    const token = req.cookies.get('alto_admin')?.value
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
      const { payload } = await jwtVerify(token, secret)
      ownerUsername = (payload as { username?: string }).username || null
    }
  } catch {}

  let query = (supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .from('properties') as any)
    .update({
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
      date_added: body.dateAdded,
      description: body.description,
      features: body.features,
      commission_rate: body.commissionRate,
    })
    .eq('id', id)
  if (ownerUsername) {
    query = query.eq('owner_username', ownerUsername)
  }
  let { data, error } = await query.select('*').single()
  if (error && ownerUsername && /column .*owner_username/i.test(error.message)) {
    const fb = await (supabase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .from('properties') as any)
      .update({
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
        date_added: body.dateAdded,
        description: body.description,
        features: body.features,
        commission_rate: body.commissionRate,
      })
      .eq('id', id)
      .select('*').single()
    data = fb.data
    error = fb.error
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}


