'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  /** Portal reserve/offer deep link, or null when zcrm_id is missing. */
  reserveUrl: string | null
  /** Portal showing-schedule deep link, or null when zcrm_id is missing. */
  scheduleUrl: string | null
  /** Property slug — used for the contact-form fallback links. */
  slug: string
}

/**
 * Mobile sticky CTA shown on individual property pages.
 * Permanently pinned to the bottom of the viewport (not scroll-gated) so
 * the two property actions — Apply Now + Schedule a Tour — are always
 * reachable. Both reuse the exact portal deep links from the page body,
 * with a contact-form fallback so a lead is never dropped.
 */
export function PropertyStickyCTA({ reserveUrl, scheduleUrl, slug }: Props) {
  const applyHref =
    reserveUrl ??
    `/contact/?type=tenant&intent=apply&property=${encodeURIComponent(slug)}`
  const scheduleHref =
    scheduleUrl ?? `/contact/?type=tenant&property=${encodeURIComponent(slug)}`

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="safe-area-pb fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-lg lg:hidden"
    >
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
        {scheduleUrl ? (
          <a
            href={scheduleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white font-heading text-sm font-semibold text-[#0B1D3A] transition-colors hover:border-[#10B981]/40 hover:bg-emerald-50"
          >
            Schedule a Tour
          </a>
        ) : (
          <Link
            href={scheduleHref}
            className="flex h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white font-heading text-sm font-semibold text-[#0B1D3A] transition-colors hover:border-[#10B981]/40 hover:bg-emerald-50"
          >
            Schedule a Tour
          </Link>
        )}
      </div>
    </motion.div>
  )
}
