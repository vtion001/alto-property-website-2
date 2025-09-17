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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to fetch configuration', 
      details: errorMessage,
      hint: 'Check if DATABASE_URL is set in environment variables'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { accountSid, authToken, phoneNumber, isActive } = await request.json()
    
    // Validate required fields
    if (!accountSid || !authToken || !phoneNumber) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'accountSid, authToken, and phoneNumber are required',
        received: { accountSid: !!accountSid, authToken: !!authToken, phoneNumber: !!phoneNumber }
      }, { status: 400 })
    }

    // Deactivate existing configurations
    await prisma.twilioConfig.updateMany({ data: { isActive: false } })

    // Create or update configuration
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
      message: 'Configuration saved successfully'
    })
  } catch (error) {
    console.error('Twilio config POST error', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Check for common database connection errors
    if (errorMessage.includes('connect') || errorMessage.includes('ENOTFOUND')) {
      return NextResponse.json({ 
        error: 'Database connection failed',
        details: errorMessage,
        hint: 'Check if DATABASE_URL is correctly set and Supabase is accessible'
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to save configuration',
      details: errorMessage,
      hint: 'Check server logs for more details'
    }, { status: 500 })
  }
}


