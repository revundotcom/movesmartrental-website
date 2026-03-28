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
    <section className="relative overflow-hidden">
      {/* Rich gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #071228 0%, #0B1D3A 40%, #0d3a2a 100%)' }}
        aria-hidden="true"
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -left-20 top-1/2 size-[300px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 top-1/2 size-[300px] -translate-y-1/2 rounded-full bg-brand-emerald/8 blur-3xl" aria-hidden="true" />

      {/* Decorative left illustration */}
      <svg
        className="absolute left-0 top-1/2 h-full -translate-y-1/2 opacity-10"
        viewBox="0 0 200 300"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="0" cy="150" r="120" stroke="#10B981" strokeWidth="1" fill="none" strokeDasharray="8 8" />
        <circle cx="0" cy="150" r="80" stroke="#10B981" strokeWidth="0.8" fill="none" />
        <circle cx="0" cy="150" r="40" stroke="#10B981" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Decorative right illustration */}
      <svg
        className="absolute right-0 top-1/2 h-full -translate-y-1/2 opacity-10"
        viewBox="0 0 200 300"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="200" cy="150" r="120" stroke="#10B981" strokeWidth="1" fill="none" strokeDasharray="8 8" />
        <circle cx="200" cy="150" r="80" stroke="#10B981" strokeWidth="0.8" fill="none" />
        <circle cx="200" cy="150" r="40" stroke="#10B981" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Top emerald stripe */}
      <div
        className="absolute left-0 top-0 h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #10B981 20%, #34D399 50%, #10B981 80%, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center md:py-28">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-brand-emerald" />
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-emerald">
            Zero Upfront Cost
          </span>
        </div>

        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            {description}
          </p>
        )}

        {/* Trust icons row */}
        <div className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-6">
          {[
            { label: 'No contracts', icon: '✓' },
            { label: 'No upfront fees', icon: '✓' },
            { label: 'Results guaranteed', icon: '✓' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-sm text-white/50">
              <span className="flex size-4 items-center justify-center rounded-full bg-brand-emerald/20 text-[10px] font-black text-brand-emerald">
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>

        {variant === 'form' ? (
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            action="/api/lead"
            method="POST"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 border-white/15 bg-white/8 text-white placeholder:text-white/40 focus:border-brand-emerald focus:ring-brand-emerald/30"
            />
            <Button
              type="submit"
              size="lg"
              className="cursor-pointer border-transparent px-8 text-base font-bold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
            >
              {primaryCta.label}
            </Button>
          </form>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTATracker eventType={inferCTAType(primaryCta.href)} city={city} service={service}>
              <Button
                size="lg"
                className="group/cb min-w-[180px] cursor-pointer border-transparent px-8 py-6 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 24px rgba(16,185,129,0.35)' }}
                render={<Link href={primaryCta.href} />}
              >
                {primaryCta.label}
                <svg className="ml-2 size-4 transition-transform duration-200 group-hover/cb:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </CTATracker>
            {secondaryCta && (
              <CTATracker eventType={inferCTAType(secondaryCta.href)} city={city} service={service}>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] cursor-pointer border-2 border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
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
