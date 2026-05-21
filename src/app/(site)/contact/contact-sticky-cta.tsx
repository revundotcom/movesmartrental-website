'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'

/**
 * Mobile sticky CTA for the Contact page.
 * Mirrors the hero's two actions — "Send a Message" (jumps to the
 * inline form) and the phone number — pinned to the bottom of the
 * viewport so they stay reachable while the visitor scrolls.
 */
export function ContactStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="safe-area-pb fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-lg lg:hidden"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
