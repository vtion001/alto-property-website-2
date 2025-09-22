import { NextRequest, NextResponse } from 'next/server'
import { jwt } from 'twilio'

const AccessToken = jwt.AccessToken
const VoiceGrant = AccessToken.VoiceGrant

// Type definitions
interface TwilioCredentials {
  accountSid: string
  apiKey: string
  apiSecret: string
  applicationSid: string
}

interface ValidationSuccess {
  valid: true
  credentials: TwilioCredentials
}

interface ValidationFailure {
  valid: false
  error: string
  missing?: string[]
}

type ValidationResult = ValidationSuccess | ValidationFailure

// Validation functions
const validateEnvironmentVariables = (): ValidationResult => {
  const required = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
    applicationSid: process.env.TWILIO_TWIML_APP_SID
  }

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key, _]) => key)

  if (missing.length > 0) {
    return {
      valid: false,
      missing,
      error: `Missing required environment variables: ${missing.join(', ')}`
    }
  }

  // Validate format of credentials
  if (required.accountSid && !required.accountSid.startsWith('AC')) {
    return { valid: false, error: 'Invalid TWILIO_ACCOUNT_SID format (should start with AC)' }
  }

  if (required.apiKey && !required.apiKey.startsWith('SK')) {
    return { valid: false, error: 'Invalid TWILIO_API_KEY format (should start with SK)' }
  }

  if (required.applicationSid && !required.applicationSid.startsWith('AP')) {
    return { valid: false, error: 'Invalid TWILIO_TWIML_APP_SID format (should start with AP)' }
  }

  return { 
    valid: true, 
    credentials: required as TwilioCredentials 
  }
}

const validateIdentity = (identity: string) => {
  if (!identity || typeof identity !== 'string') {
    return { valid: false, error: 'Identity must be a non-empty string' }
  }

  if (identity.length > 100) {
    return { valid: false, error: 'Identity must be less than 100 characters' }
  }

  // Allow alphanumeric, underscore, hyphen, and dot
  if (!/^[a-zA-Z0-9._-]+$/.test(identity)) {
    return { valid: false, error: 'Identity contains invalid characters' }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    console.log('🔄 Processing Twilio access token request...')

    // Check if we're in mock mode
    if (process.env.TWILIO_MOCK === 'true') {
      console.log('🧪 Twilio mock mode enabled - returning mock access token')
      return NextResponse.json({ 
        accessToken: 'mock_access_token_for_development',
        identity: 'mock_user',
        mock: true,
        generatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
      })
    }

    // Validate environment variables
    const envValidation = validateEnvironmentVariables()
    if (!envValidation.valid) {
      console.error('❌ Environment validation failed:', envValidation.error)
      return NextResponse.json({ 
        error: 'Server configuration error',
        details: envValidation.error
      }, { status: 500 })
    }

    // TypeScript now knows envValidation.valid is true, so credentials exist
    const credentials = envValidation.credentials

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json({ 
        error: 'Invalid JSON in request body' 
      }, { status: 400 })
    }

    // Generate or validate identity
    const identity = body.identity || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const identityValidation = validateIdentity(identity)
    
    if (!identityValidation.valid) {
      return NextResponse.json({ 
        error: 'Invalid identity',
        details: identityValidation.error
      }, { status: 400 })
    }

    // Create access token with enhanced security
    const tokenTTL = 3600 // 1 hour
    const accessToken = new AccessToken(
      credentials.accountSid,
      credentials.apiKey,
      credentials.apiSecret,
      { 
        identity,
        ttl: tokenTTL,
        // Add additional claims for security
        region: 'us1', // Specify region
        nbf: Math.floor(Date.now() / 1000), // Not before (current time)
      }
    )

    // Create voice grant with specific permissions
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: credentials.applicationSid,
      incomingAllow: true,
      // Add push credential SID if available for mobile
      pushCredentialSid: process.env.TWILIO_PUSH_CREDENTIAL_SID
    })

    accessToken.addGrant(voiceGrant)

    // Generate JWT token
    const jwtToken = accessToken.toJwt()
    const generatedAt = new Date()
    const expiresAt = new Date(Date.now() + (tokenTTL * 1000))

    console.log('✅ Generated Twilio access token:', {
      identity,
      generatedAt: generatedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      ttl: tokenTTL,
      processingTime: `${Date.now() - startTime}ms`
    })

    // Return token with metadata
    return NextResponse.json({ 
      accessToken: jwtToken,
      identity,
      generatedAt: generatedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      ttl: tokenTTL,
      capabilities: {
        outgoingCalls: true,
        incomingCalls: true,
        applicationSid: credentials.applicationSid
      }
    })

  } catch (error: any) {
    const processingTime = Date.now() - startTime
    console.error('❌ Twilio access token generation failed:', {
      error: error.message,
      stack: error.stack,
      processingTime: `${processingTime}ms`
    })

    // Determine error type and appropriate response
    let statusCode = 500
    let errorMessage = 'Token generation failed'
    
    if (error.message?.includes('Invalid credentials')) {
      statusCode = 401
      errorMessage = 'Invalid Twilio credentials'
    } else if (error.message?.includes('Account')) {
      statusCode = 403
      errorMessage = 'Twilio account access denied'
    } else if (error.message?.includes('Application')) {
      statusCode = 404
      errorMessage = 'TwiML application not found'
    }

    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString(),
      processingTime: `${processingTime}ms`
    }, { status: statusCode })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Twilio Access Token API',
    method: 'POST',
    body: { identity: 'string (optional)' }
  })
}