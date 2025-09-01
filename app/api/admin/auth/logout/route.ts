import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' })
  res.cookies.set('alto_admin', '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}


