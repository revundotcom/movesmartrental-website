'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CTATracker } from '@/components/tracking/cta-tracker'
import { motion } from 'framer-motion'
import { GradientMesh } from '@/components/ui/gradient-mesh'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import type { CTABannerBlockProps } from '@/types/blocks'

function inferCTAType(href: string): 'account_creation' | 'book_a_call' {
  if (/account|sign-up|signup|register/i.test(href)) return 'account_creation'
  return 'book_a_call'
}

const TRUST_POINTS = ['No contracts', 'No upfront fees', 'Results guaranteed']

function CheckCircle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.2)" />
      <path
        d="M5.5 9l2.5 2.5 4.5-5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CTABannerBlock({
  headline,
  description,
  primaryCta,
  secondaryCta,
  variant = 'default',
  city,
  service,
}: CTABannerBlockProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Emerald gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}
        aria-hidden="true"
      />

      <GradientMesh colorScheme="emerald-only" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[
          { left: '10%', top: '20%', size: 6, duration: '5s', delay: '0s' },
          { left: '85%', top: '15%', size: 4, duration: '4.5s', delay: '0.8s' },
          { left: '25%', top: '75%', size: 5, duration: '6s', delay: '1.2s' },
          { left: '70%', top: '60%', size: 3, duration: '4s', delay: '0.4s' },
          { left: '50%', top: '30%', size: 4, duration: '5.5s', delay: '1.8s' },
          { left: '90%', top: '80%', size: 5, duration: '4.8s', delay: '0.6s' },
        ].map((p, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-white/20"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--particle-duration': p.duration,
              '--particle-delay': p.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <RevealOnScroll variant="blur">
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
          <h2 className="font-display text-4xl font-normal tracking-tight text-white md:text-5xl">
            {headline}
          </h2>

          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              {description}
            </p>
          )}

          {variant === 'form' ? (
            <form
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              action="/api/lead"
              method="POST"
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
              />
              <Button
                type="submit"
                size="lg"
                className="cursor-pointer border-transparent px-8 text-base font-bold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: '#ffffff',
                  color: '#0B1D3A',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                {primaryCta.label}
              </Button>
            </form>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTATracker eventType="book_a_call" city={city} service={service}>
                <Button
                  size="lg"
                  className="group/cb min-w-[180px] cursor-pointer border-transparent px-8 py-6 text-base font-bold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: '#ffffff',
                    color: '#0B1D3A',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      '0 12px 32px rgba(0,0,0,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      '0 8px 24px rgba(0,0,0,0.3)'
                  }}
                  nativeButton={false}
                  render={<Link href="/contact/" />}
                >
                  Get Your Free Rental Analysis
                  <svg
                    className="ml-2 size-4 transition-transform duration-200 group-hover/cb:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </CTATracker>

              {secondaryCta && (
                <CTATracker eventType={inferCTAType(secondaryCta.href)} city={city} service={service}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-w-[180px] cursor-pointer border-2 border-white/20 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20"
                    nativeButton={false}
                    render={<Link href={secondaryCta.href} />}
                  >
                    {secondaryCta.label}
                  </Button>
                </CTATracker>
              )}
            </div>
          )}

          {/* Trust points - staggered */}
          <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-6">
            {TRUST_POINTS.map((label, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-2 text-sm text-white/90"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <CheckCircle />
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
