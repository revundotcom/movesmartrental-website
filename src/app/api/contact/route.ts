import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // 5 requests per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  record.count++
  return record.count > RATE_LIMIT_MAX
}

// Strip CR/LF to prevent header/log injection in downstream email/SMTP consumers
const noCRLF = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

const contactSchema = z.object({
  type: z.enum(['owner', 'tenant', 'franchise', 'other']),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .transform(noCRLF),
  email: z
    .string()
    .email('Please enter a valid email')
    .max(254, 'Email is too long')
    .transform(noCRLF),
  phone: z
    .string()
    .max(32, 'Phone is too long')
    .transform(noCRLF)
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long')
    .transform((s) => s.trim()),
  recaptchaToken: z.string().max(4096).optional(),
})

// Hard cap on JSON body size (bytes). ~20KB is plenty for a contact form.
const MAX_BODY_BYTES = 20 * 1024

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    // Graceful degradation: skip verification when secret key is not configured (local dev)
    console.warn('RECAPTCHA_SECRET_KEY not set - skipping reCAPTCHA verification')
    return true
  }

  try {
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    })
    const result = await response.json()

    if (!result.success || result.score < 0.7) {
      console.warn('reCAPTCHA verification failed:', {
        success: result.success,
        score: result.score,
        action: result.action,
      })
      return false
    }

    return true
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    // Enforce body-size limit before parsing (defense in depth; Next also caps)
    const contentLength = Number(req.headers.get('content-length') || '0')
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      )
    }

    const raw = await req.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      )
    }

    let body: unknown
    try {
      body = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { recaptchaToken } = parsed.data

    // Verify reCAPTCHA token if provided
    if (recaptchaToken) {
      const isValid = await verifyRecaptcha(recaptchaToken)
      if (!isValid) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 }
        )
      }
    } else if (process.env.RECAPTCHA_SECRET_KEY) {
      // If reCAPTCHA is configured but no token was provided, reject the request
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      )
    }

    // TODO: Add email notification integration (e.g., SendGrid, Resend)

    return NextResponse.json({ message: 'Message received' }, { status: 200 })
  } catch (error) {
    const errorId = crypto.randomUUID()
    console.error(`Contact form error [${errorId}]:`, error)
    return NextResponse.json(
      { error: 'Internal server error', errorId },
      { status: 500 }
    )
  }
}
