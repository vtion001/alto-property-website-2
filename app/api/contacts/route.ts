import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Contacts GET error', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { name, phoneNumber, email } = await request.json()
    if (!name || !phoneNumber) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const contact = await prisma.contact.create({ data: { name, phoneNumber, email } })
    return NextResponse.json(contact)
  } catch (error) {
    console.error('Contacts POST error', error)
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}


