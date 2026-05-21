'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PORTAL_OWNER_SIGNUP_URL } from '@/lib/portal-api'

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // `/properties` is excluded because property pages render their own
  // sticky CTA (Apply Now + Schedule a Tour) — see property-sticky-cta.tsx.
  const hideOnPaths = ['/tenants', '/contact', '/franchising', '/properties']
  const shouldHide = hideOnPaths.some((p) => pathname?.startsWith(p))

  if (shouldHide) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-white/90 backdrop-blur-lg border-t border-slate-200 safe-area-pb"
        >
          <div className="flex gap-3">
            <Link
              href="tel:+18005959755"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-brand-emerald ring-1 ring-slate-200"
              aria-label="Call MoveSmart Rentals"
            >
              <Phone className="w-5 h-5" />
            </Link>
            <a
              href={PORTAL_OWNER_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center h-12 rounded-xl bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors"
            >
              List my property
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
