'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Screen {
  title: string
  description: string
  url: string
  /** Pre-wrapped in <BrowserFrame> by the server component */
  frame: ReactNode
}

interface PortalScreensTabbedProps {
  screens: Screen[]
}

/**
 * Tabbed product-showcase pattern (as used by Stripe, Linear, Vercel).
 *
 * Each tab swaps the visible dashboard mockup in a full-width, properly
 * sized browser frame — replacing the cramped zigzag two-column layout
 * that compressed both the copy and the mockup content.
 *
 * Mockups are passed in as pre-rendered React nodes from the server
 * component, so all 7 are server-rendered once; the client only decides
 * which one is visible.
 */
export function PortalScreensTabbed({ screens }: PortalScreensTabbedProps) {
  const [active, setActive] = useState(0)
  const current = screens[active]

  return (
    <section
      id="portal-screens"
      className="relative bg-gradient-to-b from-[#FBFAF6] via-white to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Inside The Portal
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
            See what your{' '}
            <span className="font-display italic text-brand-emerald">
              owner portal
            </span>{' '}
            looks like
            <span className="text-brand-gold">.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Seven real screens. The same views your leasing manager sees, with
            owner-scoped permissions. No demo videos — just the actual product.
          </p>
        </div>

        {/* Tab list */}
        <div className="mt-10 sm:mt-12">
          <div
            role="tablist"
            aria-label="Portal screens"
            className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0"
          >
            <div className="mx-auto flex w-max gap-1 rounded-2xl border border-brand-navy/10 bg-white p-1.5 shadow-sm sm:w-max">
              {screens.map((s, i) => {
                const isActive = active === i
                return (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`portal-tab-panel-${i}`}
                    id={`portal-tab-${i}`}
                    onClick={() => setActive(i)}
                    className={`relative whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-sm ${
                      isActive
                        ? 'text-white'
                        : 'text-brand-navy/60 hover:bg-slate-50 hover:text-brand-navy'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="portal-tab-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-brand-navy shadow-sm"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {s.title}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <span>{String(active + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-slate-300" aria-hidden="true" />
            <span>{String(screens.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Active panel: copy + mockup */}
        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              id={`portal-tab-panel-${active}`}
              role="tabpanel"
              aria-labelledby={`portal-tab-${active}`}
            >
              {/* Copy above mockup, centered */}
              <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
                <h3 className="font-display text-2xl font-normal text-brand-navy sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                  {current.description}
                </p>
              </div>

              {/* Mockup, full container width with a subtle decorative glow */}
              <div className="relative mx-auto max-w-5xl">
                <div
                  aria-hidden="true"
                  className="absolute -inset-x-6 -inset-y-4 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-50/60 via-white to-emerald-50/30 blur-2xl"
                />
                {current.frame}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
