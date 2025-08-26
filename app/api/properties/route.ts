import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-server'

export const runtime = 'edge'

export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const mapped = (data || []).map((p: any) => ({
    id: p.id,
    title: p.title,
    address: p.address,
    suburb: p.suburb,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    parking: p.parking,
    landSize: p.land_size,
    status: p.status,
    type: p.type,
    listingType: p.listing_type,
    image: p.image,
    images: p.images || [],
    dateAdded: p.date_added,
    description: p.description || '',
    features: p.features || [],
    commissionRate: p.commission_rate || 0,
  }))
  return NextResponse.json(mapped)
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerClient()
  const body = await req.json()
  const row = {
    title: body.title,
    address: body.address,
    suburb: body.suburb,
    price: body.price,
    beds: body.beds,
    baths: body.baths,
    parking: body.parking,
    land_size: body.landSize,
    status: body.status || 'available',
    type: body.type,
    listing_type: body.listingType,
    image: body.image,
    images: body.images || [],
    date_added: body.dateAdded || new Date().toISOString().split('T')[0],
    description: body.description || '',
    features: body.features || [],
    commission_rate: body.commissionRate || 0,
  }
  const { data, error } = await supabase.from('properties').insert(row).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const mapped = {
    id: data.id,
    title: data.title,
    address: data.address,
    suburb: data.suburb,
    price: data.price,
    beds: data.beds,
    baths: data.baths,
    parking: data.parking,
    landSize: data.land_size,
    status: data.status,
    type: data.type,
    listingType: data.listing_type,
    image: data.image,
    images: data.images || [],
    dateAdded: data.date_added,
    description: data.description || '',
    features: data.features || [],
    commissionRate: data.commission_rate || 0,
  }
  return NextResponse.json(mapped, { status: 201 })
}


