import { NextResponse } from 'next/server'

import { analyzeMessage, isModelConfigured } from '@/lib/analysis/service'
import { MAX_MESSAGE_LENGTH } from '@/lib/analysis/types'

export const dynamic = 'force-dynamic'

const noStore = { 'Cache-Control': 'no-store' }

export async function GET() {
  return NextResponse.json({ modelConfigured: isModelConfigured() }, { headers: noStore })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400, headers: noStore })
  }

  const message = (body as { message?: unknown } | null)?.message
  if (typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Please provide a message to analyze.' }, { status: 400, headers: noStore })
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Messages must be ${MAX_MESSAGE_LENGTH.toLocaleString()} characters or fewer.` },
      { status: 413, headers: noStore },
    )
  }

  try {
    const result = await analyzeMessage(message.trim())
    return NextResponse.json(result, { headers: noStore })
  } catch {
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500, headers: noStore })
  }
}
