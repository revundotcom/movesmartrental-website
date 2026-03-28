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
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0B1D3A] via-[#0F2847] to-[#10B981]">
      {/* Geometric decorative shapes */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-20 size-72 rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-16 right-1/4 size-48 rounded-full bg-white/[0.03]" />
        <div className="absolute right-10 top-10 size-24 rotate-45 rounded-lg bg-white/[0.02]" />
        <div className="absolute bottom-8 left-1/3 size-16 rotate-12 rounded-lg bg-white/[0.02]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {headline}
        </h2>

        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {description}
          </p>
        )}

        {variant === 'form' ? (
          /* Lead capture form variant */
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
              className="border-transparent bg-[#10B981] px-8 text-base font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:bg-[#059669]"
            >
              {primaryCta.label}
            </Button>
          </form>
        ) : (
          /* Default button variant */
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTATracker eventType={inferCTAType(primaryCta.href)} city={city} service={service}>
              <Button
                size="lg"
                className="min-w-[180px] border-transparent bg-[#10B981] px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:bg-[#059669] hover:shadow-xl"
                render={<Link href={primaryCta.href} />}
              >
                {primaryCta.label}
              </Button>
            </CTATracker>
            {secondaryCta && (
              <CTATracker eventType={inferCTAType(secondaryCta.href)} city={city} service={service}>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] border-2 border-white/50 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
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
