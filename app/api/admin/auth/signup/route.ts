
import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByUsername } from '@/lib/auth-supabase'

// Use Node.js runtime for compatibility with supabase server client
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { username, password, role } = await request.json()

    // Validation
    if (!username || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await findUserByUsername(username)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password and create user
    const user = await createUser({ username, password, role })

    // Return success response (don't include password)
    const { ...userWithoutPassword } = user
    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
