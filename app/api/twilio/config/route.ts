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
  // Allow unauthenticated access for dialer functionality
  // Only require admin auth for sensitive operations via POST/PUT/DELETE
  try {
    // First try to get config from database
    let config = await prisma.twilioConfig.findFirst({ where: { isActive: true } })
    
    // If no database config found, fall back to environment variables
    if (!config) {
      const envAccountSid = process.env.TWILIO_ACCOUNT_SID
      const envPhoneNumber = process.env.TWILIO_PHONE_NUMBER
      
      if (envAccountSid && envPhoneNumber) {
        console.log('📡 Using Twilio config from environment variables')
        return NextResponse.json({
          id: 'env-config',
          accountSid: envAccountSid,
          phoneNumber: envPhoneNumber,
          isActive: true,
          source: 'environment'
        })
      }
      
      return NextResponse.json({ 
        error: 'No active configuration found',
        hint: 'Either configure via the API Config tab or set TWILIO_ACCOUNT_SID and TWILIO_PHONE_NUMBER in environment variables'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      id: config.id.toString(), // Convert BigInt to string
      accountSid: config.accountSid,
      phoneNumber: config.phoneNumber,
      isActive: config.isActive,
      source: 'database'
    })
  } catch (error) {
    console.error('Twilio config GET error', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // If database error, try environment variables as fallback
    const envAccountSid = process.env.TWILIO_ACCOUNT_SID
    const envPhoneNumber = process.env.TWILIO_PHONE_NUMBER
    
    if (envAccountSid && envPhoneNumber) {
      console.log('📡 Database error, falling back to environment variables')
      return NextResponse.json({
        id: 'env-config',
        accountSid: envAccountSid,
        phoneNumber: envPhoneNumber,
        isActive: true,
        source: 'environment',
        warning: 'Using environment config due to database error'
      })
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch configuration', 
      details: errorMessage,
      hint: 'Check if DATABASE_URL is set in environment variables or configure TWILIO_ACCOUNT_SID and TWILIO_PHONE_NUMBER'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Enforce admin authentication for updating config (middleware also guards mutating routes)
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
      source: 'database',
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
        hint: 'Check if DATABASE_URL is correctly set and Supabase is accessible. You can still use environment variables (TWILIO_ACCOUNT_SID, TWILIO_PHONE_NUMBER) as fallback.'
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to save configuration',
      details: errorMessage,
      hint: 'Check server logs for more details'
    }, { status: 500 })
  }
}