import { NextResponse } from 'next/server'
import OpenAI from 'openai'

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY environment variable is not set')
  return new OpenAI({ apiKey })
}

function simpleOptimize(subject: string, body: string, name?: string, notes?: string) {
  const firstName = (name || '').split(' ')[0] || ''
  const baseSubject = subject?.trim() || 'Your inquiry with Alto Property Group'
  const newSubject = baseSubject.startsWith('Re:') ? baseSubject : `Re: ${baseSubject}`
  const points = (notes || '').trim()
  const extra = points ? `\n\nKey points:\n- ${points.replace(/\n+/g, '\n- ')}` : ''
  const greeting = firstName ? `Hi ${firstName},` : 'Hello,'
  const improvedBody = `${greeting}\n\n${body?.trim() || 'Thanks for getting in touch. We will follow up shortly.'}${extra}\n\nKind regards,\nAlto Property Group`
  return { subject: newSubject, body: improvedBody }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json()
    const to = String(payload?.to || '').trim()
    const name = String(payload?.name || '').trim()
    const subject = String(payload?.subject || '').trim()
    const body = String(payload?.body || '').trim()
    const notes = String(payload?.notes || '').trim()

    // Fallback: if no OpenAI key, return a simple improved version
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(simpleOptimize(subject, body, name, notes))
    }

    const openai = getOpenAIClient()
    const systemPrompt = `You are a helpful assistant for a real estate company (Alto Property Group). Given recipient name, current subject/body, and notes, rewrite a concise, professional email suitable for property inquiries in Australian English. Keep respectful tone, clear next steps, and sign-off as "Alto Property Group". Return strict JSON: {"subject":"...","body":"..."}. Do not include code fences.`

    const userPrompt = `Recipient: ${name || to}\nSubject: ${subject}\nBody: ${body}\nNotes: ${notes}`
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.4,
      max_tokens: 600,
    })

    const content = response.choices?.[0]?.message?.content || ''
    try {
      const parsed = JSON.parse(content)
      const subj = typeof parsed.subject === 'string' ? parsed.subject : subject
      const bod = typeof parsed.body === 'string' ? parsed.body : body
      return NextResponse.json({ subject: subj, body: bod })
    } catch {
      // If parsing fails, use fallback optimizer
      return NextResponse.json(simpleOptimize(subject, body, name, notes))
    }
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}