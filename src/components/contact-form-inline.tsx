'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Building2, User, Briefcase, HelpCircle, Check, Loader2 } from 'lucide-react'

import { Confetti } from '@/components/ui/confetti'
import { pushEvent } from '@/lib/analytics'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

// Phone format required by portal lead-submit API: (123) 456-7890.
const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/

function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length < 4) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const schema = z.object({
  type: z.enum(['owner', 'tenant', 'franchise', 'other']),
  firstName: z.string().min(1, 'First name is required').max(100, 'Too long'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Too long'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(1, 'Phone is required').regex(PHONE_REGEX, 'Use the format (123) 456-7890'),
  city: z.string().max(100).optional(),
  propertyType: z.string().max(100).optional(),
  unitCount: z.string().max(50).optional(),
  message: z.string().min(10, 'Tell us a bit more (min 10 characters)').max(5000, 'Too long'),
})

type FormValues = z.infer<typeof schema>

const INQUIRY_TYPES = [
  { value: 'owner' as const, label: 'Property Owner', helper: 'I own rental properties', icon: Building2 },
  { value: 'tenant' as const, label: 'Tenant', helper: "I'm looking to rent", icon: User },
  { value: 'franchise' as const, label: 'Franchise', helper: 'Business opportunity', icon: Briefcase },
  { value: 'other' as const, label: 'Other', helper: 'General question', icon: HelpCircle },
]

const PROPERTY_TYPES = [
  'Single Family Home',
  'Condo / Apartment',
  'Townhouse',
  'Multi-Unit (2-4)',
  'Multi-Unit (5+)',
  'Commercial',
]
const UNIT_COUNTS = ['1', '2-4', '5-10', '11-25', '25+']

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const RECAPTCHA_KEY_PATTERN = /^[a-zA-Z0-9_-]+$/

export function ContactFormInline() {
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') as FormValues['type'] | null
  const validTypes = ['owner', 'tenant', 'franchise', 'other'] as const
  const defaultType: FormValues['type'] =
    typeParam && (validTypes as readonly string[]).includes(typeParam) ? typeParam : 'owner'
  // Pre-fill from URL params (e.g. newsletter signup redirects with ?email=...)
  const emailParam = searchParams.get('email') ?? ''
  const defaultEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailParam) ? emailParam : ''

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !RECAPTCHA_KEY_PATTERN.test(RECAPTCHA_SITE_KEY)) return
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: defaultType,
      firstName: '',
      lastName: '',
      email: defaultEmail,
      phone: '',
      city: '',
      propertyType: '',
      unitCount: '',
      message: '',
    },
  })

  const selectedType = watch('type')
  const phoneValue = watch('phone')

  async function onSubmit(data: FormValues) {
    setErrorMessage(null)
    try {
      let recaptchaToken: string | undefined
      if (RECAPTCHA_SITE_KEY && typeof window !== 'undefined' && window.grecaptcha) {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })
              .then(resolve)
              .catch(reject)
          })
        })
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      })
      if (!res.ok) {
        let msg = 'Something went wrong. Please try again.'
        try {
          const json = await res.json()
          msg = json.error || msg
        } catch {}
        throw new Error(msg)
      }
      pushEvent({
        event: 'contact_form_submit',
        page: window.location.pathname,
        inquiry_type: data.type,
      })
      setSubmitted(true)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <>
        <Confetti active />
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-emerald-50">
            <Check className="size-7 text-emerald-600" aria-hidden="true" />
          </div>
          <h3 className="font-display text-2xl text-brand-navy">
            Message received. We&apos;re on it.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
            A real human on our leasing team will reply within one business day — usually within
            2 to 4 hours during Monday–Friday, 9 AM to 5 PM ET.
          </p>
          <p className="mt-5 text-sm text-slate-500">
            Need us sooner? Call{' '}
            <a href="tel:+18005959755" className="font-semibold text-brand-emerald underline">
              +1 (800) 595-9755
            </a>
            .
          </p>
        </div>
      </>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-sm sm:p-8 md:p-10"
    >
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </motion.div>
      )}

      {/* Inquiry type */}
      <fieldset>
        <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
          1 — Who are you?
        </legend>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {INQUIRY_TYPES.map((t) => {
            const Icon = t.icon
            const isActive = selectedType === t.value
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setValue('type', t.value, { shouldValidate: true })}
                aria-pressed={isActive}
                className={`flex flex-col items-start gap-1.5 rounded-xl border-2 p-3 text-left transition-all ${
                  isActive
                    ? 'border-brand-emerald bg-emerald-50/60 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-brand-emerald/40 hover:bg-emerald-50/30'
                }`}
              >
                <Icon
                  className={`size-5 ${isActive ? 'text-brand-emerald' : 'text-slate-400'}`}
                  aria-hidden="true"
                />
                <span
                  className={`text-sm font-semibold ${
                    isActive ? 'text-brand-emerald' : 'text-brand-navy'
                  }`}
                >
                  {t.label}
                </span>
                <span className="text-[11px] text-slate-500">{t.helper}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Personal info */}
      <fieldset className="mt-8">
        <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
          2 — Your details
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First name" required error={errors.firstName?.message}>
            <input
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              {...register('firstName')}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            />
          </Field>
          <Field label="Last name" required error={errors.lastName?.message}>
            <input
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              {...register('lastName')}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            />
          </Field>
          <Field label="Email" required error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              {...register('email')}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            />
          </Field>
          <Field label="Phone" required error={errors.phone?.message} helper="Format: (123) 456-7890">
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(416) 555-0123"
              value={phoneValue || ''}
              onChange={(e) =>
                setValue('phone', formatPhone(e.target.value), { shouldValidate: true })
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            />
          </Field>
          <Field label="City" helper="Optional">
            <input
              type="text"
              autoComplete="address-level2"
              placeholder="Toronto"
              {...register('city')}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            />
          </Field>
        </div>
      </fieldset>

      {/* Owner-only conditional fields */}
      {selectedType === 'owner' && (
        <motion.fieldset
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 overflow-hidden"
        >
          <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
            3 — About your property
            <span className="ml-2 text-slate-400">(optional, helps us prep)</span>
          </legend>
          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">Property type</p>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_TYPES.map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => setValue('propertyType', pt)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      watch('propertyType') === pt
                        ? 'border-brand-emerald bg-emerald-50 text-brand-emerald'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-emerald/40'
                    }`}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">Number of units</p>
              <div className="flex flex-wrap gap-2">
                {UNIT_COUNTS.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setValue('unitCount', u)}
                    className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-all ${
                      watch('unitCount') === u
                        ? 'border-brand-emerald bg-emerald-50 text-brand-emerald'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-brand-emerald/40'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.fieldset>
      )}

      {/* Message */}
      <fieldset className="mt-8">
        <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-emerald">
          {selectedType === 'owner' ? '4' : '3'} — How can we help?
        </legend>
        <div className="mt-4">
          <Field label="Message" required error={errors.message?.message}>
            <textarea
              rows={5}
              placeholder="Tell us about your property, your timeline, and what you're trying to solve. Three sentences is plenty."
              {...register('message')}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            />
          </Field>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="mt-8 flex flex-col-reverse items-stretch gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-xs text-slate-500 sm:text-left">
          By submitting, you agree we may contact you about your inquiry. We never share your
          details — see our{' '}
          <Link href="/privacy/" className="font-semibold text-brand-emerald underline">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────
// Field wrapper
// ─────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  helper,
  error,
  children,
}: {
  label: string
  required?: boolean
  helper?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold text-brand-navy">
          {label}
          {required && <span className="ml-0.5 text-brand-emerald">*</span>}
        </span>
        {helper && !error && (
          <span className="text-[10px] font-medium text-slate-400">{helper}</span>
        )}
      </div>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </label>
  )
}
