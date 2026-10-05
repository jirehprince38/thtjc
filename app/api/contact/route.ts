import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const name = String(body.name || '').trim()
  const message = String(body.message || '').trim()

  if (!name || message.length < 3 || name.length > 120 || message.length > 3000) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
