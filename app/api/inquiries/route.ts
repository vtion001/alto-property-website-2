import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase-client'

export const runtime = 'nodejs'

type InquiryStatus = 'new' | 'contacted' | 'closed'

function inferStatus(tags: string[] | null | undefined): InquiryStatus {
  const safeTags = (tags || []).map(t => t.toLowerCase())
  if (safeTags.includes('closed')) return 'closed'
  if (safeTags.includes('contacted') || safeTags.includes('replied')) return 'contacted'
  return 'new'
}

function extractFromNotes(notes: string | null | undefined, label: string): string | null {
  if (!notes) return null
  const regex = new RegExp(`^${label}:\\s*(.*)$`, 'mi')
  const match = notes.match(regex)
  return match ? match[1].trim() : null
}

function deriveSource(notes: string | null | undefined, tags: string[] | null | undefined): string {
  const fromNotes = extractFromNotes(notes, 'Source')
  if (fromNotes) return fromNotes
  const safeTags = (tags || []).map(t => t.toLowerCase())
  if (safeTags.includes('web')) return 'Web'
  if (safeTags.includes('contact-form')) return 'Contact Form'
  if (safeTags.includes('lead') || safeTags.includes('dialer')) return 'Lead'
  return 'Contacts'
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase inquiries GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
    }

    // Map contacts to Inquiry shape expected by admin UI
    const inquiries = (data || []).map((c: any) => {
      const notes = c.notes || null
      const subject = extractFromNotes(notes, 'Subject')
      const message = extractFromNotes(notes, 'Message') || notes
      const source = deriveSource(notes, c.tags)
      return {
        id: c.id,
        name: c.name || '',
        email: c.email || null,
        phone: c.phone_number || c.phoneNumber || null,
        source,
        subject: subject || null,
        message: message || null,
        createdAt: c.created_at || c.createdAt || new Date().toISOString(),
        status: inferStatus(c.tags),
        notes
      }
    })

    return NextResponse.json(inquiries)
  } catch (err) {
    console.error('Inquiries GET error', err)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = String(body.name || `${body.firstName || ''} ${body.lastName || ''}`.trim() || '')
    const email = body.email ? String(body.email) : null
    const phone = body.phone || body.phoneNumber ? String(body.phone || body.phoneNumber) : null
    const source = String(body.source || 'Website Form')
    const subject = body.subject ? String(body.subject) : null
    const message = body.message ? String(body.message) : null
    const tags: string[] | null = Array.isArray(body.tags) ? body.tags : null

    if (!name || (!email && !phone)) {
      return NextResponse.json({ error: 'Missing required fields: name and at least one of email or phone' }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()

    // Compose notes with labeled lines for robust parsing
    const lines: string[] = []
    if (subject) lines.push(`Subject: ${subject}`)
    if (message) lines.push(`Message: ${message}`)
    if (source) lines.push(`Source: ${source}`)

    // Include any extra fields for context (e.g., helpWith, address, budget)
    const extras: Record<string, unknown> = { ...body }
    delete extras.name
    delete extras.firstName
    delete extras.lastName
    delete extras.email
    delete extras.phone
    delete extras.phoneNumber
    delete extras.source
    delete extras.subject
    delete extras.message
    delete extras.tags

    Object.entries(extras).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      const val = typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : JSON.stringify(value)
      lines.push(`${key}: ${val}`)
    })

    const notes = lines.join('\n') || null

    const { data: contact, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone_number: phone,
          notes,
          tags,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase inquiries POST error:', error)
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
    }

    const response = {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone_number || null,
      source,
      subject,
      message,
      createdAt: contact.created_at,
      status: inferStatus(contact.tags),
    }

    return NextResponse.json(response, { status: 201 })
  } catch (err) {
    console.error('Inquiries POST error', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}