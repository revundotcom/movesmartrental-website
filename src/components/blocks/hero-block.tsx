'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { CTATracker } from '@/components/tracking/cta-tracker'
import { HeroDashboard } from '@/components/illustrations/hero-dashboard'
import { TextRotate } from '@/components/ui/text-rotate'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'
import { ANIMATION_DELAY_BASE } from '@/lib/constants'
import type { HeroBlockProps } from '@/types/blocks'

const ROTATING_TEXTS = [
  "Canada's White-Glove Leasing Brokerage",
  'Zero Upfront Cost',
  'MLS + 50-Portal Syndication',
  'Listing to Move-In, Nothing Beyond',
]

function inferCTAType(href: string): 'account_creation' | 'book_a_call' {
  if (/account|sign-up|signup|register/i.test(href)) return 'account_creation'
  return 'book_a_call'
}

export function HeroBlock({
  headline,
  subheadline,
  cta1,
  cta2,
  backgroundImageUrl,
  backgroundImageAlt,
  priority = false,
  city,
  service,
  illustration,
  eyebrow,
}: HeroBlockProps) {
  // Split headline to accent the last word in emerald
  const words = headline.split(' ')
  const lastWord = words.pop()
  const leadingWords = words.join(' ')

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#FBFAF6] md:min-h-screen">
      {/* Background */}
      {backgroundImageUrl ? (
        <>
          <Image
            src={backgroundImageUrl}
            alt={backgroundImageAlt ?? 'Hero background'}
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/88 via-[#FBFAF6]/92 to-white/88"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          {/* Clean ivory gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(145deg, #FFFFFF 0%, #FBFAF6 40%, #F3F6FB 70%, #FFFFFF 100%)',
            }}
            aria-hidden="true"
          />
          {/* Subtle emerald wash, top-left */}
          <div
            className="absolute -left-[10%] -top-[20%] h-[60%] w-[50%] opacity-60"
            style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.10) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          {/* Subtle gold wash, bottom-right */}
          <div
            className="absolute -bottom-[10%] -right-[5%] h-[50%] w-[40%] opacity-40"
            style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.12) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          {/* Hairline gold accent at top, brick-and-mortar warmth */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
          />
        </>
      )}

      {/* Content: two-column layout on desktop */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text content */}
          <div>
            {/* Eyebrow badge with rotating text */}
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm sm:mb-6"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-[#10B981]" />
              {eyebrow ? (
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  {eyebrow}
                </span>
              ) : (
                <TextRotate
                  texts={ROTATING_TEXTS}
                  rotationInterval={2500}
                  className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-widest text-emerald-700"
                />
              )}
            </motion.div>

            <motion.h1
              className="font-display text-4xl font-normal leading-[1.15] tracking-tight text-brand-navy sm:text-5xl sm:leading-[1.1] md:text-6xl"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <VerticalCutReveal
                staggerDuration={0.1}
                staggerFrom="first"
                wordClassName="mr-[0.25em] last:mr-0"
              >
                {leadingWords}
              </VerticalCutReveal>{' '}
              <span className="relative inline-block pb-[0.15em] font-display italic text-brand-emerald">
                <GradientText variant="animated">
                  <VerticalCutReveal
                    staggerDuration={ANIMATION_DELAY_BASE}
                    staggerFrom="first"
                  >
                    {lastWord ?? ''}
                  </VerticalCutReveal>
                </GradientText>
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-brand-emerald"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {subheadline && (
              <motion.p
                className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {subheadline}
              </motion.p>
            )}

            {/* Proof stats row, consistent 2x2 grid across breakpoints */}
            <motion.div
              className="mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-semibold text-brand-navy">500+ Units Leased</span>
              <span className="font-semibold text-brand-navy">20+ Cities</span>
              <span className="font-semibold text-brand-navy">94% Applicant Approval</span>
              <span className="font-semibold text-brand-navy">18-Day Avg. Placement</span>
            </motion.div>

            {/* CTA buttons */}
            {(cta1 || cta2) && (
              <motion.div
                className="mt-10 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {cta1 && (
                  <CTATracker eventType={inferCTAType(cta1.href)} city={city} service={service}>
                    <Button
                      variant="default"
                      size="lg"
                      className="cta-primary-shadow group/btn cursor-pointer border-transparent px-8 py-6 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                      }}
                      nativeButton={false}
                      render={<Link href={cta1.href} />}
                    >
                      {cta1.label}
                      <svg className="ml-2 size-4 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </CTATracker>
                )}
                {cta2 && (
                  <CTATracker eventType={inferCTAType(cta2.href)} city={city} service={service}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="cursor-pointer border-2 border-brand-navy/15 bg-white px-8 py-6 text-base font-semibold text-brand-navy transition-all duration-300 hover:-translate-y-1 hover:border-brand-navy/30 hover:bg-slate-50"
                      nativeButton={false}
                      render={<Link href={cta2.href} />}
                    >
                      {cta2.label}
                    </Button>
                  </CTATracker>
                )}
              </motion.div>
            )}

            {/* Google review badge */}
            <motion.div
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-4 py-2 shadow-sm backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-4" fill="#D4A853" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-brand-navy/80">4.9 stars from 200+ reviews on Google</span>
            </motion.div>

          </div>

          {/* Right: illustration */}
          <motion.div
            className="hidden lg:flex lg:items-center lg:justify-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-conic relative w-full max-w-[520px]">
              {/* Glow behind illustration */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl"
                style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              {illustration ?? <HeroDashboard />}
              {/* Floating badge 1 - top right: Lease Signed */}
              <motion.div
                className="absolute -right-4 top-8 flex items-center gap-2.5 rounded-2xl border border-slate-200/80 border-l-4 border-l-brand-emerald bg-white px-4 py-2.5 shadow-lg shadow-slate-900/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{ opacity: { delay: 0.9, duration: 0.5 }, x: { delay: 0.9, duration: 0.5 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
                aria-hidden="true"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-emerald-50">
                  <svg viewBox="0 0 16 16" className="size-3.5 text-brand-emerald" fill="currentColor" aria-hidden="true"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-4.5h1.5v4.5zm0-6h-1.5V4h1.5v1.5z" /></svg>
                </span>
                <div>
                  <p className="text-[11px] font-bold leading-none text-brand-navy">Lease Signed</p>
                  <p className="mt-0.5 text-[9px] leading-none text-slate-500">Compliant, deposit in trust</p>
                </div>
              </motion.div>
              {/* Floating badge 2 - bottom left: tenant placed */}
              <motion.div
                className="absolute -left-4 bottom-12 flex items-center gap-2.5 rounded-2xl border border-slate-200/80 border-l-4 border-l-brand-emerald bg-white px-4 py-2.5 shadow-lg shadow-slate-900/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{ opacity: { delay: 1.1, duration: 0.5 }, x: { delay: 1.1, duration: 0.5 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } }}
                aria-hidden="true"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-emerald-50">
                  <svg viewBox="0 0 20 20" className="size-3.5 text-brand-emerald" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </span>
                <div>
                  <p className="text-[11px] font-bold leading-none text-brand-navy">Tenant Placed</p>
                  <p className="mt-0.5 text-[9px] leading-none text-slate-500">Fully qualified</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
