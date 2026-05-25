'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Phone } from 'lucide-react'

/**
 * Mobile sticky CTA for the Contact page.
 * Both actions — "Send a Message" (jumps to the inline form) and the
 * phone number — pinned side-by-side at the bottom of the viewport on
 * mobile, visible the entire time the user scrolls the page.
 *
 * Mounted via React portal to <body> after hydration so:
 *   1. No transformed / filtered ancestor in the page tree can become
 *      its containing block (position:fixed always anchors to the
 *      viewport).
 *   2. No parent stacking context can sink the z-index below other
 *      page chrome.
 *   3. No parent overflow:hidden can clip the bar off-screen.
 */
export function ContactStickyCTA() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const stickyStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    background: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    boxShadow: '0 -8px 24px -12px rgba(11, 29, 58, 0.18)',
    paddingTop: '0.75rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
  }

  if (!mounted) return null

  const bar = (
    <div className="lg:hidden" style={stickyStyle}>
      <div className="flex gap-3">
        <a
          href="#contact-form"
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-brand-emerald font-heading text-sm font-bold text-white transition-colors hover:bg-emerald-600"
        >
          Send a Message
        </a>
        <a
          href="tel:+18005959755"
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white font-heading text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy/40 hover:bg-slate-50"
          aria-label="Call MoveSmart Rentals at +1 (800) 595-9755"
        >
          <Phone className="size-4 shrink-0 text-brand-emerald" aria-hidden="true" />
          (800) 595-9755
        </a>
      </div>
    </div>
  )

  return createPortal(bar, document.body)
}
