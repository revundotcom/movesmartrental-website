'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

interface Props {
  /** Portal reserve/offer deep link, or null when zcrm_id is missing. */
  reserveUrl: string | null
  /** Portal showing-schedule deep link, or null when zcrm_id is missing. */
  scheduleUrl: string | null
  /** Property slug — used for the contact-form fallback links. */
  slug: string
  /** Unit ID for the Schedule Tour modal. */
  unitId: string
}

/**
 * Mobile sticky CTA shown on individual property pages.
 * Permanently pinned to the bottom of the viewport so the two property
 * actions — Apply Now + Schedule a Tour — are always reachable on every
 * property page, regardless of the unit's availability status (leased
 * units still benefit from waitlist / schedule-a-tour leads).
 *
 * Critical positioning is set via inline styles so it cannot be
 * overridden by a Tailwind purge edge case or framework reset, and
 * the component is rendered as a sibling of <main> so any transformed
 * ancestor inside the page body cannot become its containing block.
 */
import { ScheduleTourButton } from '@/components/properties/schedule-tour-button'

export function PropertyStickyCTA({
  reserveUrl,
  scheduleUrl,
  slug,
  unitId,
}: Props) {
  // Mount via React portal to <body> AFTER hydration. This guarantees that:
  //   1. No transformed / filtered / clipped ancestor in the page tree
  //      can become its containing block (position:fixed always anchors
  //      to the viewport).
  //   2. No parent stacking context can sink the z-index below other
  //      page chrome.
  //   3. No parent overflow:hidden can clip the bar off-screen.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const applyHref =
    reserveUrl ??
    `/contact/?type=tenant&intent=apply&property=${encodeURIComponent(slug)}`
  const scheduleHref =
    scheduleUrl ?? `/contact/?type=tenant&property=${encodeURIComponent(slug)}`

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
        {/* Apply Now — primary */}
        {reserveUrl ? (
          <a
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#10B981] font-heading text-sm font-semibold text-white transition-colors hover:bg-[#059669]"
          >
            Apply Now
          </a>
        ) : (
          <Link
            href={applyHref}
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#10B981] font-heading text-sm font-semibold text-white transition-colors hover:bg-[#059669]"
          >
            Apply Now
          </Link>
        )}

        {/* Schedule a Tour — secondary */}
        <ScheduleTourButton 
          unitId={unitId}
          className="flex h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white font-heading text-sm font-semibold text-[#0B1D3A] transition-colors hover:border-[#10B981]/40 hover:bg-emerald-50"
        />
      </div>
    </div>
  )

  return createPortal(bar, document.body)
}
