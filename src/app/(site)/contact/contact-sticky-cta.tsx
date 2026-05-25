'use client'

import { Phone } from 'lucide-react'

/**
 * Mobile sticky CTA for the Contact page.
 * Mirrors the hero's two actions — "Send a Message" (jumps to the
 * inline form) and the phone number — permanently pinned to the
 * bottom of the viewport. Rendered in final position on first paint
 * (no animation / no scroll gate / fully opaque) so the bar is
 * guaranteed visible from the moment the page loads.
 */
export function ContactStickyCTA() {
  return (
    <div className="safe-area-pb fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 shadow-[0_-8px_24px_-12px_rgba(11,29,58,0.18)] lg:hidden">
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
}
