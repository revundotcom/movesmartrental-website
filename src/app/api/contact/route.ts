import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  type: z.enum(['owner', 'tenant', 'franchise', 'other']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  recaptchaToken: z.string().optional(),
})

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    // Graceful degradation: skip verification when secret key is not configured (local dev)
    console.warn('RECAPTCHA_SECRET_KEY not set — skipping reCAPTCHA verification')
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

    if (!result.success || result.score < 0.5) {
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
  try {
    const body = await req.json()
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

    // TODO: Add rate limiting per IP in a future enhancement
    // TODO: Add email notification integration (e.g., SendGrid, Resend)

    return NextResponse.json({ message: 'Message received' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
