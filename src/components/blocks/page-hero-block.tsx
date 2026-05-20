'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { CTATracker } from '@/components/tracking/cta-tracker'
import type { CtaButton } from '@/types/blocks'

/**
 * Inner-page hero - distinctly NOT the homepage hero.
 *
 * Differences from HeroBlock:
 *  - No rotating brand-wide texts, no floating "Rent Received / Tenant Placed" badges,
 *    no global Google review badge.
 *  - Smaller, magazine-style layout (not 90vh).
 *  - Editorial vertical stack: kicker line, eyebrow chip, headline, lede, CTA, page-specific meta strip.
 *  - Optional right-rail "stat panel" or visual - passed in by the page so each page feels its own.
 *  - Brick-and-mortar warmth: ivory underlay, hairline gold accents, deep navy type - not glassy SaaS.
 */

interface PageHeroMeta {
  /** Short label e.g. "Markets served" */
  label: string
  /** Display value e.g. "20+ cities" */
  value: string
}

export interface PageHeroBlockProps {
  /** Pretitle line above eyebrow chip - e.g. "Owner Hub" */
  kicker?: string
  /** Small uppercase chip - e.g. "For Property Owners" */
  eyebrow?: string
  headline: string
  /** The last word of the headline gets the emerald serif accent. Disable for one-word heads. */
  accentLastWord?: boolean
  /** Hide the trailing gold accent dot after the headline. */
  hideAccentDot?: boolean
  /** Lede paragraph below headline */
  lede?: string
  cta1?: CtaButton
  cta2?: CtaButton
  /**
   * Compact meta strip rendered under the CTAs. 2-4 items recommended.
   * These should be page-specific (not company-wide) - e.g. for /pricing:
   * [{label:'Setup fee', value:'$0'}, {label:'Cancel anytime', value:'30 days'}].
   */
  meta?: PageHeroMeta[]
  /**
   * Right-rail rendered content - page-specific. Typical uses:
   *   - a static "spec sheet" card
   *   - a single screenshot/illustration
   *   - a quoted owner with name + city
   * Should NOT be the same dashboard mock used on the homepage.
   */
  aside?: ReactNode
  /** Theme: light (default, ivory bg) or dark (navy bg). */
  theme?: 'light' | 'dark'
  /**
   * Optional full-bleed background photograph. When provided alongside
   * `theme="dark"` the photo sits behind a heavy navy gradient + emerald/gold
   * radial glows — same treatment as the /pricing/ hero. Pick a content-relevant
   * HD image (1600w+ Unsplash works well).
   */
  backgroundImageUrl?: string
  /** Alt text for the background image. Defaults to empty (decorative). */
  backgroundImageAlt?: string
  /** Tracking context */
  city?: string
  service?: string
}

function inferCTAType(href: string): 'account_creation' | 'book_a_call' {
  if (/account|sign-up|signup|register/i.test(href)) return 'account_creation'
  return 'book_a_call'
}

export function PageHeroBlock(props: PageHeroBlockProps) {
  // The `meta` prop is intentionally accepted but not rendered — the page-wide
  // stat strip was removed per design feedback. The prop remains on the
  // interface so existing callers compile without churn.
  const {
    kicker,
    eyebrow,
    headline,
    accentLastWord = true,
    hideAccentDot = false,
    lede,
    cta1,
    cta2,
    aside,
    theme = 'light',
    backgroundImageUrl,
    backgroundImageAlt = '',
    city,
    service,
  } = props
  const words = headline.split(' ')
  const lastWord = accentLastWord ? words.pop() : undefined
  const leadingWords = words.join(' ')

  const isDark = theme === 'dark'
  const hasPhoto = isDark && !!backgroundImageUrl

  return (
    <section
      className={
        isDark
          ? 'relative isolate overflow-hidden bg-brand-navy'
          : 'relative overflow-hidden bg-[#FBFAF6]'
      }
    >
      {/* Hairline top accent - gold ruler, brick-and-mortar feel */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />

      {/* Photographic backdrop (dark theme only) */}
      {hasPhoto && (
        <div aria-hidden={backgroundImageAlt ? undefined : 'true'} className="absolute inset-0 -z-10">
          <Image
            src={backgroundImageUrl!}
            alt={backgroundImageAlt}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Heavy navy gradient so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/85 to-brand-navy/70" />
          {/* Emerald + gold accent glows */}
          <div className="absolute -left-32 top-1/2 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.08] blur-3xl" />
        </div>
      )}

      {/* Soft tonal wash (only when no backdrop photo is used) */}
      {!hasPhoto && (
        isDark ? (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.08) 0%, transparent 60%)',
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.35]"
            style={{
              background:
                'radial-gradient(ellipse at 85% 15%, rgba(212,168,83,0.10) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.06) 0%, transparent 50%)',
            }}
          />
        )
      )}

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Left: editorial column ── */}
          <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
            {/* Kicker line - small label with rule */}
            {kicker && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 flex items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className={
                    isDark
                      ? 'h-px w-8 bg-brand-gold/60'
                      : 'h-px w-8 bg-brand-navy/30'
                  }
                />
                <span
                  className={
                    isDark
                      ? 'text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold'
                      : 'text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60'
                  }
                >
                  {kicker}
                </span>
              </motion.div>
            )}

            {/* Eyebrow chip */}
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={
                  isDark
                    ? 'mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1'
                    : 'mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1'
                }
              >
                <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
                <span
                  className={
                    isDark
                      ? 'text-[11px] font-bold uppercase tracking-widest text-emerald-300'
                      : 'text-[11px] font-bold uppercase tracking-widest text-emerald-700'
                  }
                >
                  {eyebrow}
                </span>
              </motion.div>
            )}

            {/* Headline - editorial serif/sans split */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={
                isDark
                  ? 'font-display text-[2.25rem] font-normal leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.5rem]'
                  : 'font-display text-[2.25rem] font-normal leading-[1.1] tracking-tight text-brand-navy sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.5rem]'
              }
            >
              {leadingWords}
              {lastWord && (
                <>
                  {leadingWords ? ' ' : ''}
                  <span className="font-display italic text-brand-emerald">
                    {lastWord}
                  </span>
                  {!hideAccentDot && (
                    <span
                      aria-hidden="true"
                      className="text-brand-gold"
                    >
                      .
                    </span>
                  )}
                </>
              )}
            </motion.h1>

            {/* Lede */}
            {lede && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={
                  isDark
                    ? 'mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl'
                    : 'mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl'
                }
              >
                {lede}
              </motion.p>
            )}

            {/* CTAs */}
            {(cta1 || cta2) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-row flex-wrap items-center gap-3"
              >
                {cta1 && (
                  <CTATracker eventType={inferCTAType(cta1.href)} city={city} service={service}>
                    <Button
                      size="lg"
                      className="cursor-pointer px-5 py-4 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-px hover:shadow-lg sm:px-7 sm:py-6 sm:text-base"
                      style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                      nativeButton={false}
                      render={<Link href={cta1.href} />}
                    >
                      {cta1.label}
                    </Button>
                  </CTATracker>
                )}
                {cta2 && (
                  <CTATracker eventType={inferCTAType(cta2.href)} city={city} service={service}>
                    <Button
                      variant="outline"
                      size="lg"
                      className={
                        isDark
                          ? 'cursor-pointer border-2 border-white/20 bg-transparent px-5 py-4 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/5 sm:px-7 sm:py-6 sm:text-base'
                          : 'cursor-pointer border-2 border-brand-navy/15 bg-white px-5 py-4 text-sm font-semibold text-brand-navy hover:border-brand-navy/30 hover:bg-slate-50 sm:px-7 sm:py-6 sm:text-base'
                      }
                      nativeButton={false}
                      render={<Link href={cta2.href} />}
                    >
                      {cta2.label}
                    </Button>
                  </CTATracker>
                )}
              </motion.div>
            )}

            {/* meta prop intentionally not rendered — the page-wide stat strip
                (Setup fee / Monthly retainer / Cancel anytime / Avg placement,
                and equivalents on other pages) was removed per design feedback.
                The prop is retained on the interface so existing callers compile,
                but produces no UI. */}
          </div>

          {/* ── Right: optional aside (page-specific visual or panel) ── */}
          {aside && (
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="lg:col-span-5"
            >
              {aside}
            </motion.aside>
          )}
        </div>
      </div>

      {/* Hairline bottom rule for editorial feel */}
      <div
        aria-hidden="true"
        className={
          isDark
            ? 'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent'
            : 'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent'
        }
      />
    </section>
  )
}
