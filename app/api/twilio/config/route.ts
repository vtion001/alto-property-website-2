import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const config = await prisma.twilioConfig.findFirst({ where: { isActive: true } })
    if (!config) return NextResponse.json({ error: 'No active configuration found' }, { status: 404 })
    return NextResponse.json({
      id: config.id,
      accountSid: config.accountSid,
      phoneNumber: config.phoneNumber,
      isActive: config.isActive,
    })
  } catch (error) {
    console.error('Twilio config GET error', error)
    return NextResponse.json({ error: 'Failed to fetch configuration' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { accountSid, authToken, phoneNumber, isActive } = await request.json()
    if (!accountSid || !authToken || !phoneNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await prisma.twilioConfig.updateMany({ data: { isActive: false } })

    const config = await prisma.twilioConfig.upsert({
      where: { accountSid },
      update: { authToken, phoneNumber, isActive: isActive ?? true },
      create: { accountSid, authToken, phoneNumber, isActive: isActive ?? true },
    })

    return NextResponse.json({
      id: config.id,
      accountSid: config.accountSid,
      phoneNumber: config.phoneNumber,
      isActive: config.isActive,
    })
  } catch (error) {
    console.error('Twilio config POST error', error)
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 })
  }
}


