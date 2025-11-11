import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('media') as File | null
    if (!file) return NextResponse.json({ error: 'Missing media file' }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`
    const fullPath = path.join(uploadsDir, filename)
    await fs.writeFile(fullPath, buffer)
    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (_e) {
    const message = _e instanceof Error ? _e.message : String(_e)
    return NextResponse.json({ error: 'Upload failed', detail: message }, { status: 500 })
  }
}