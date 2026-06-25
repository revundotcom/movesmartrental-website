'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    const handleModal = (e: Event) => setModalOpen((e as CustomEvent).detail)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('apply-modal-state', handleModal as EventListener)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('apply-modal-state', handleModal as EventListener)
    }
  }, [])

  // `/properties` is excluded because property pages render their own
  // sticky CTA (Apply Now + Schedule a Tour) — see property-sticky-cta.tsx.
  const hideOnPaths = ['/tenants', '/contact', '/franchising', '/properties']
  const shouldHide = hideOnPaths.some((p) => pathname?.startsWith(p))

  if (shouldHide || modalOpen) return null

  // Context-aware CTA — swap the default "List my property" button for a
  // page-relevant action (per client direction, June 2026):
  //   • /careers/<slug>/        → "Apply Now" — finds the first ApplyButton
  //                                on the page (tagged with data-apply-trigger)
  //                                and clicks it, so the same modal opens.
  //   • /careers/               → "See open roles" — anchor to the positions list.
  //   • /meet-the-team/         → "Join the Team" — link to /careers/.
  //   • /about/team/<slug>/     → "Join the Team" — link to /careers/.
  const normalized = (pathname ?? '').replace(/\/$/, '')
  const isCareersLanding = normalized === '/careers'
  const isCareersDetail = normalized.startsWith('/careers/') && !isCareersLanding
  const isMeetTheTeam = normalized === '/meet-the-team'
  const isTeamProfile = normalized.startsWith('/about/team/')
  const isJoinTheTeamContext = isMeetTheTeam || isTeamProfile

  const triggerApplyModal = () => {
    const trigger = document.querySelector<HTMLButtonElement>(
      'button[data-apply-trigger]',
    )
    trigger?.click()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mobile-sticky-cta fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-white/90 backdrop-blur-lg border-t border-slate-200 safe-area-pb"
        >
          <div className="flex gap-3">
            <Link
              href="tel:+18005959755"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-brand-emerald ring-1 ring-slate-200"
              aria-label="Call MoveSmart Rentals"
            >
              <Phone className="w-5 h-5" />
            </Link>

            {isCareersDetail ? (
              <button
                type="button"
                onClick={triggerApplyModal}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : isCareersLanding ? (
              <Link
                href="/careers/#positions"
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors"
              >
                See open roles
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            ) : isJoinTheTeamContext ? (
              <Link
                href="/careers/"
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors"
              >
                Join the Team
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            ) : (
              <a
                href={PORTAL_OWNER_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center h-12 rounded-xl bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors"
              >
                List my property
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
