import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { jwtVerify } from 'jose'

type Property = {
  id?: string
  title: string
  address: string
  suburb: string
  price: string
  beds: number
  baths: number
  parking: number
  land_size?: string
  status: string
  type: string
  listing_type: string
  image?: string
  date_added: string
  description?: string
  features?: string[]
  commission_rate?: number
  owner_username?: string
}

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
      console.warn('Supabase not configured, returning empty properties list')
      return NextResponse.json([])
    }
    let ownerUsername: string | null = null
    try {
      const token = request.cookies.get('alto_admin')?.value
      if (token) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
        const { payload } = await jwtVerify(token, secret)
        ownerUsername = (payload as { username?: string }).username || null
      }
    } catch {}

    let data: Property[] | null = null
    let error: unknown = null
    const defaultOwner = ownerUsername || process.env.ADMIN_DEFAULT_USERNAME || 'altoadmin'
    
    if (defaultOwner) {
      const attempt = await supabase
        .from('properties')
        .select('*')
        .eq('owner_username', defaultOwner)
        .order('date_added', { ascending: false })
      
      if (attempt.error && /column .*owner_username/i.test(attempt.error.message)) {
        const fb = await supabase.from('properties').select('*').order('date_added', { ascending: false })
        data = fb.data as Property[]
        error = fb.error
      } else {
        data = attempt.data as Property[]
        error = attempt.error
      }
    }
    
    if (error) {
      console.error('Properties API error:', error)
      const errorMessage = (error as { message?: string })?.message || 'Unknown error'
      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
    
    return NextResponse.json(data || [])
  } catch (error: unknown) {
    console.error('Properties API unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const body = await req.json()
    const rowBase: Partial<Property> = {
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
        const ownerUsername = (payload as { username?: string }).username || null
        if (ownerUsername) rowBase.owner_username = ownerUsername
      }
    } catch {}

    let insert = await supabase
      .from('properties')
      .insert(rowBase)
      .select('*').single()
      
    if (insert.error && /column .*owner_username/i.test(insert.error.message)) {
      const { owner_username: _owner_username, ...withoutOwner } = rowBase
      insert = await supabase.from('properties').insert(withoutOwner).select('*').single()
    }
    
    if (insert.error) {
      console.error('Properties POST error:', insert.error)
      return NextResponse.json({ error: insert.error.message }, { status: 500 })
    }
    
    return NextResponse.json(insert.data, { status: 201 })
  } catch (error: unknown) {
    console.error('Properties POST unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


