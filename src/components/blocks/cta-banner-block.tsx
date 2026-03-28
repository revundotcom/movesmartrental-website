import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CTATracker } from '@/components/tracking/cta-tracker'
import type { CTABannerBlockProps } from '@/types/blocks'

function inferCTAType(href: string): 'account_creation' | 'book_a_call' {
  if (/account|sign-up|signup|register/i.test(href)) return 'account_creation'
  return 'book_a_call'
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
    <section className="animate-gradient relative overflow-hidden bg-gradient-to-r from-[#0B1D3A] via-[#0d2340] to-[#064e3b]" style={{ backgroundSize: '200% 200%' }}>
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute -bottom-24 right-0 size-80 rounded-full bg-[#10B981]/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 size-64 -translate-y-1/2 rounded-full bg-white/[0.02] blur-2xl" />
        {/* Grid dots pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center md:py-24">
        {/* Eyebrow */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <svg className="size-3.5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Zero Upfront Cost
          </span>
        </div>

        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
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
              className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-[#10B981] focus:ring-[#10B981]/30"
            />
            <Button
              type="submit"
              size="lg"
              className="cursor-pointer border-transparent bg-[#10B981] px-8 text-base font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#059669]"
            >
              {primaryCta.label}
            </Button>
          </form>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTATracker eventType={inferCTAType(primaryCta.href)} city={city} service={service}>
              <Button
                size="lg"
                className="group/cb min-w-[180px] cursor-pointer border-transparent bg-[#10B981] px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#059669] hover:shadow-xl"
                render={<Link href={primaryCta.href} />}
              >
                {primaryCta.label}
                <svg className="ml-2 size-4 transition-transform duration-200 group-hover/cb:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </CTATracker>
            {secondaryCta && (
              <CTATracker eventType={inferCTAType(secondaryCta.href)} city={city} service={service}>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] cursor-pointer border-2 border-white/40 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/8"
                  render={<Link href={secondaryCta.href} />}
                >
                  {secondaryCta.label}
                </Button>
              </CTATracker>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
