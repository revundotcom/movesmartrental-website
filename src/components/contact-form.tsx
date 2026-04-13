'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, User, Briefcase, HelpCircle, ArrowRight, ArrowLeft, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

const contactSchema = z.object({
  type: z.enum(['owner', 'tenant', 'franchise', 'other']),
  propertyType: z.string().optional(),
  unitCount: z.string().optional(),
  city: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const INQUIRY_TYPES = [
  { value: 'owner' as const, label: 'Property Owner', description: 'I own rental properties', icon: Building2 },
  { value: 'tenant' as const, label: 'Tenant', description: 'I\'m looking to rent', icon: User },
  { value: 'franchise' as const, label: 'Franchise Inquiry', description: 'Business opportunity', icon: Briefcase },
  { value: 'other' as const, label: 'Other', description: 'General question', icon: HelpCircle },
] as const

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

const stepVariants = {
  enter: { x: 20, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
}

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                step < currentStep
                  ? 'bg-emerald-500 text-white'
                  : step === currentStep
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step < currentStep ? <Check className="size-4" /> : step}
            </div>
            {step < 3 && (
              <div className={`mx-2 h-0.5 w-12 rounded-full transition-all duration-300 sm:w-20 ${
                step < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-400">
        <span>Who you are</span>
        <span>Property details</span>
        <span>Contact info</span>
      </div>
    </div>
  )
}

export function ContactForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') as ContactFormData['type'] | null
  const validTypes = ['owner', 'tenant', 'franchise', 'other'] as const
  const defaultType: ContactFormData['type'] =
    typeParam && (validTypes as readonly string[]).includes(typeParam) ? typeParam : 'owner'

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !RECAPTCHA_KEY_PATTERN.test(RECAPTCHA_SITE_KEY)) return
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`
    script.async = true
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: defaultType,
      propertyType: '',
      unitCount: '',
      city: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const selectedType = watch('type')

  // Auto-advance to step 2 if type came from URL
  useEffect(() => {
    if (typeParam && (validTypes as readonly string[]).includes(typeParam)) {
      setStep(2)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeParam])

  async function onSubmit(data: ContactFormData) {
    setErrorMessage(null)
    try {
      let recaptchaToken: string | undefined
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' }).then(resolve).catch(reject)
          })
        })
      }
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      })
      if (!response.ok) {
        let msg = 'Something went wrong. Please try again.'
        try { const result = await response.json(); msg = result.error || msg } catch {}
        throw new Error(msg)
      }
      pushEvent({ event: 'contact_form_submit', page: window.location.pathname, inquiry_type: data.type })
      setSubmitted(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <>
        <Confetti active={true} />
        <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-100">
            <svg className="size-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800">Message received!</h3>
          <p className="mt-2 text-sm text-green-700">
            A member of our team will call or email you within 2 business hours. If you need immediate assistance, call us at{' '}
            <a href="tel:+14372957688" className="font-semibold underline">+1 (437) 295-7688</a>.
          </p>
        </div>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProgressBar currentStep={step} />

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Who are you? */}
        {step === 1 && (
          <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <p className="mb-4 text-sm font-medium text-slate-700">I am a...</p>
            <div className="grid grid-cols-2 gap-3">
              {INQUIRY_TYPES.map((type) => {
                const Icon = type.icon
                const isSelected = selectedType === type.value
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => { setValue('type', type.value); setStep(2) }}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <Icon className={`size-6 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className={`text-sm font-semibold ${isSelected ? 'text-emerald-700' : 'text-slate-700'}`}>{type.label}</span>
                    <span className="text-[11px] text-slate-400">{type.description}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Property details */}
        {step === 2 && (
          <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-4">
            {selectedType === 'owner' && (
              <>
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PROPERTY_TYPES.map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setValue('propertyType', pt)}
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          watch('propertyType') === pt
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Number of Units</Label>
                  <div className="flex flex-wrap gap-2">
                    {UNIT_COUNTS.map((uc) => (
                      <button
                        key={uc}
                        type="button"
                        onClick={() => setValue('unitCount', uc)}
                        className={`rounded-lg border px-4 py-2 text-xs font-medium transition-all ${
                          watch('unitCount') === uc
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                        }`}
                      >
                        {uc}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="city">City (optional)</Label>
              <Input id="city" placeholder="e.g. Toronto, Ottawa" {...register('city')} />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-1">
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button type="button" onClick={() => setStep(3)} className="flex-1 gap-1" style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white' }}>
                Continue <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact info */}
        {step === 3 && (
          <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
              <Input id="name" placeholder="Your full name" aria-invalid={!!errors.name} {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input id="email" type="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional - for faster callback)</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" {...register('phone')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us how we can help..."
                aria-invalid={!!errors.message}
                className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm"
                {...register('message')}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(2)} className="gap-1">
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1" style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white' }}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
            <p className="text-center text-xs text-slate-400">Join 500+ Canadian landlords · Zero upfront cost</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
