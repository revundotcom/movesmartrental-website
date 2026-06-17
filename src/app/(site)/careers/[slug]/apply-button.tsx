'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface Props {
  /** Role title — shown in the modal header and sent in the payload. */
  role: string
  /** Stable role ID — sent in the payload so the backend can route. */
  jobId: string
  /** Optional className wrapper around the trigger button so the
   *  detail page can style it differently in the hero vs. the
   *  end-of-page CTA row. */
  className?: string
  /** Visual variant. "primary" = lime/emerald pill, "ghost" = navy
   *  outline. Both styles match the GE Vernova layout reference. */
  variant?: 'primary' | 'ghost'
  /** Override the button label (defaults to "Apply Now"). */
  label?: string
}

/**
 * Client-side Apply button. Opens a modal with the application form
 * so the parent detail page can remain a server component (better
 * SEO and metadata generation). The form posts to /api/careers-apply
 * which is wired up to email + CRM downstream.
 */
export function ApplyButton({
  role,
  jobId,
  className = '',
  variant = 'primary',
  label = 'Apply Now',
}: Props) {
  const [open, setOpen] = useState(false)

  const triggerBase =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all whitespace-nowrap'
  const triggerVariant =
    variant === 'primary'
      ? 'bg-[var(--brand-emerald)] text-white hover:-translate-y-0.5 hover:bg-[var(--brand-emerald-hover)]'
      : 'border border-brand-navy/20 bg-white text-brand-navy hover:border-brand-navy/40 hover:bg-slate-50'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${triggerBase} ${triggerVariant} ${className}`}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && <ApplyModal role={role} jobId={jobId} onClose={() => setOpen(false)} />}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Modal — same form fields as the previous listing-page modal so the
// /api/careers-apply endpoint contract stays identical.
// ─────────────────────────────────────────────────────────────────────

function ApplyModal({
  role,
  jobId,
  onClose,
}: {
  role: string
  jobId: string
  onClose: () => void
}) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Lock background scroll while the modal is open so the page does
  // not move behind the dialog. Compensate for the scrollbar width to
  // prevent the layout from jumping when the body overflow toggles.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [])

  // Close on Escape.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    const payload = {
      role,
      jobId,
      firstName: fd.get('firstName'),
      lastName: fd.get('lastName'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      linkedin: fd.get('linkedin'),
      resumeUrl: fd.get('resumeUrl'),
      whyYou: fd.get('whyYou'),
      referral: fd.get('referral'),
    }
    try {
      const res = await fetch('/api/careers-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-navy)]/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-slate-100 bg-white px-6 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">
              Apply Now · {jobId}
            </p>
            <h2 className="mt-0.5 text-[18px] font-bold text-[var(--brand-navy)]">
              {role}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 transition-colors hover:text-[var(--brand-navy)]"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-[var(--brand-emerald)]" />
            <h3 className="text-xl font-bold text-[var(--brand-navy)]">
              Application received
            </h3>
            <p className="max-w-sm text-sm text-slate-600">
              Thank you for applying to the {role} position at MoveSmart
              Rentals. We will be in touch within 5 business days.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-[var(--brand-navy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-navy-light)]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                  placeholder="+1 416 555 0100"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                LinkedIn Profile URL
              </label>
              <input
                name="linkedin"
                type="url"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Resume URL (Google Drive, Dropbox, etc.)
              </label>
              <input
                name="resumeUrl"
                type="url"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Why do you want this role?{' '}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                name="whyYou"
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
                placeholder="What draws you to this position..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                How did you hear about us?
              </label>
              <select
                name="referral"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"
              >
                <option value="">Select one</option>
                <option>Google Search</option>
                <option>LinkedIn</option>
                <option>Indeed</option>
                <option>Referral</option>
                <option>Other</option>
              </select>
            </div>
            {status === 'error' && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-emerald)] py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-emerald-hover)] disabled:opacity-60"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
