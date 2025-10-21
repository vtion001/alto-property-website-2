import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-client'
import { jwtVerify } from 'jose'

export const runtime = 'nodejs'

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('alto_admin')?.value
  if (!token) return null
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function GET(_request: NextRequest) {
  // Allow unauthenticated access for dialer functionality
  try {
    const supabase = getSupabaseServerClient() // Use server client with service role

    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Supabase GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
    }

    // Convert snake_case database columns to camelCase for API response
    const formattedContacts = (contacts || []).map(contact => ({
      id: contact.id,
      name: contact.name,
      phoneNumber: contact.phone_number || contact.phoneNumber, // Handle both cases
      email: contact.email,
      notes: contact.notes,
      tags: contact.tags,
      isFavorite: contact.is_favorite || contact.isFavorite, // Handle both cases
      createdAt: contact.created_at || contact.createdAt, // Handle both cases
      updatedAt: contact.updated_at || contact.updatedAt // Handle both cases
    }))

    return NextResponse.json(formattedContacts)
  } catch (error) {
    console.error('Contacts GET error', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { name, phoneNumber, email, address, postalAddress } = body
    if (!name || !phoneNumber) {
      return NextResponse.json({ error: 'Missing required fields: name and phoneNumber' }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()
    const composedNotes = [
      address ? `Address: ${address}` : null,
      postalAddress ? `Postal Address: ${postalAddress}` : null,
    ]
      .filter(Boolean)
      .join('\n') || null

    const { data: contact, error } = await supabase
      .from('contacts')
      .insert([{
        name,
        phone_number: phoneNumber,  // Use snake_case
        email: email || null,
        notes: composedNotes,
        created_at: new Date().toISOString(),  // Explicitly set timestamps
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase POST error:', error)
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
    }

    // Convert back to camelCase for response
    const formattedContact = {
      id: contact.id,
      name: contact.name,
      phoneNumber: contact.phone_number,
      email: contact.email,
      notes: contact.notes,
      tags: contact.tags,
      isFavorite: contact.is_favorite,
      createdAt: contact.created_at,
      updatedAt: contact.updated_at
    }

    return NextResponse.json(formattedContact)
  } catch (error) {
    console.error('Contacts POST error', error)
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Accept partial updates; only 'id' is required
    const body = await request.json()
    const { id } = body
    if (!id) {
      return NextResponse.json({ error: 'Missing required field: id' }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()

    // Build update payload, mapping camelCase to snake_case columns
    type ContactUpdatePayload = {
      name?: string;
      phone_number?: string;
      email?: string | null;
      notes?: string | null;
      tags?: string[] | null;
      is_favorite?: boolean;
      updated_at?: string;
    }
    const updatePayload: ContactUpdatePayload = {}
    if (typeof body.name !== 'undefined') updatePayload.name = body.name
    if (typeof body.phoneNumber !== 'undefined') updatePayload.phone_number = body.phoneNumber
    if (typeof body.email !== 'undefined') updatePayload.email = body.email || null
    if (typeof body.notes !== 'undefined') updatePayload.notes = body.notes
    if (typeof body.tags !== 'undefined') updatePayload.tags = body.tags
    if (typeof body.isFavorite !== 'undefined') updatePayload.is_favorite = body.isFavorite
    // Always update timestamp when making changes
    updatePayload.updated_at = new Date().toISOString()

    if (Object.keys(updatePayload).length === 1 && 'updated_at' in updatePayload) {
      return NextResponse.json({ error: 'No fields provided to update' }, { status: 400 })
    }

    const { data: contact, error } = await supabase
      .from('contacts')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase PUT error:', error)
      return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
    }

    // Normalize response to camelCase
    const formattedContact = {
      id: contact.id,
      name: contact.name,
      phoneNumber: contact.phone_number || contact.phoneNumber,
      email: contact.email,
      notes: contact.notes,
      tags: contact.tags,
      isFavorite: contact.is_favorite || contact.isFavorite,
      createdAt: contact.created_at || contact.createdAt,
      updatedAt: contact.updated_at || contact.updatedAt
    }

    return NextResponse.json(formattedContact)
  } catch (error) {
    console.error('Contacts PUT error', error)
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 })
    }

    const supabase = getSupabaseServerClient() // Use server client with service role

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase DELETE error:', error)
      return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    console.error('Contacts DELETE error', error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}