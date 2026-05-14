import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'

import { submitLead, type LeadUserType } from '@/lib/portal-api'

// ---------------------------------------------------------------------------
// Rate limiting (per-IP, in-memory)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Input validation
// ---------------------------------------------------------------------------

// Strip CR/LF to prevent header/log injection in downstream consumers.
const noCRLF = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

// Phone must match the portal API's expected format: "(123) 456-7890".
const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/

const contactSchema = z.object({
  type: z.enum(['owner', 'tenant', 'franchise', 'other']),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name is too long')
    .transform(noCRLF),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name is too long')
    .transform(noCRLF),
  email: z
    .string()
    .email('Please enter a valid email')
    .max(254, 'Email is too long')
    .transform(noCRLF),
  phone: z
    .string()
    .regex(PHONE_REGEX, 'Phone must be in the format (123) 456-7890')
    .transform(noCRLF),
  message: z
    .string()
    .max(5000, 'Message is too long')
    .transform((s) => s.trim())
    .optional(),
  propertyType: z.string().max(100).transform(noCRLF).optional(),
  unitCount: z.string().max(50).transform(noCRLF).optional(),
  city: z.string().max(100).transform(noCRLF).optional(),
  source: z.string().max(50).transform(noCRLF).optional(),
  recaptchaToken: z.string().max(4096).optional(),
})

const MAX_BODY_BYTES = 20 * 1024

// ---------------------------------------------------------------------------
// reCAPTCHA verification
// ---------------------------------------------------------------------------

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    // Graceful degradation: skip verification when secret key is not
    // configured (local dev / preview).
    console.warn('RECAPTCHA_SECRET_KEY not set - skipping reCAPTCHA verification')
    return true
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
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

// ---------------------------------------------------------------------------
// Field mappers
// ---------------------------------------------------------------------------

// Per API spec only "Owner" or "Tenant" are accepted. We collapse the
// four front-end inquiry types onto those two values and preserve the
// original inquiry type in `source` so the CRM team can filter.
function mapUserType(type: z.infer<typeof contactSchema>['type']): LeadUserType {
  return type === 'tenant' ? 'Tenant' : 'Owner'
}

function buildSource(
  type: z.infer<typeof contactSchema>['type'],
  override: string | undefined,
): string {
  if (override) return override.slice(0, 50)
  // Always include the form context so the CRM team can distinguish
  // franchise/other inquiries from genuine owner/tenant leads.
  const label =
    type === 'owner'
      ? 'Website - Owner'
      : type === 'tenant'
        ? 'Website - Tenant'
        : type === 'franchise'
          ? 'Website - Franchise'
          : 'Website - Other'
  return label.slice(0, 50)
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  try {
    const contentLength = Number(req.headers.get('content-length') || '0')
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 },
      )
    }

    const raw = await req.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 },
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
        { status: 400 },
      )
    }

    const { recaptchaToken } = parsed.data

    if (recaptchaToken) {
      const isValid = await verifyRecaptcha(recaptchaToken)
      if (!isValid) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 },
        )
      }
    } else if (process.env.RECAPTCHA_SECRET_KEY) {
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 },
      )
    }

    // ----- Forward to portal.revun.com -----
    const data = parsed.data
    const result = await submitLead({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      user_type: mapUserType(data.type),
      source: buildSource(data.type, data.source),
      property_type: data.propertyType || undefined,
      number_of_units: data.unitCount || undefined,
      city: data.city || undefined,
    })

    if (!result.ok) {
      const errorId = crypto.randomUUID()
      console.error(`[contact] portal lead-submit failed [${errorId}]:`, {
        status: result.status,
        message: result.message,
        data: result.data,
      })
      // Map upstream 4xx through as 400 so the client can surface the
      // message; treat everything else as a 502 (bad gateway).
      const status =
        result.status >= 400 && result.status < 500 ? 400 : 502
      return NextResponse.json(
        {
          error:
            status === 400 && result.message
              ? result.message
              : 'We could not submit your message right now. Please try again or call us at +1 (800) 595-9755.',
          errorId,
        },
        { status },
      )
    }

    return NextResponse.json(
      { message: 'Message received' },
      { status: 200 },
    )
  } catch (error) {
    const errorId = crypto.randomUUID()
    console.error(`Contact form error [${errorId}]:`, error)
    return NextResponse.json(
      { error: 'Internal server error', errorId },
      { status: 500 },
    )
  }
}
