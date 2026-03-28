import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CTATracker } from '@/components/tracking/cta-tracker'
import type { HeroBlockProps } from '@/types/blocks'

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
}: HeroBlockProps) {
  // Split headline to accent the last word in emerald
  const words = headline.split(' ')
  const lastWord = words.pop()
  const leadingWords = words.join(' ')

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden md:min-h-[85vh]">
      {/* Background */}
      {backgroundImageUrl ? (
        <>
          <Image
            src={backgroundImageUrl}
            alt={backgroundImageAlt ?? ''}
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
          />
          {/* Navy overlay for text readability and brand consistency */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0B1D3A]/90 via-[#132B4F]/85 to-[#0B1D3A]/90"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0B1D3A] via-[#132B4F] to-[#0B1D3A]"
          aria-hidden="true"
        />
      )}

      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(30deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(150deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(30deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(150deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff), linear-gradient(60deg, rgba(255,255,255,0.6) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,0.6)), linear-gradient(60deg, rgba(255,255,255,0.6) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,0.6))',
          backgroundSize: '80px 140px',
          backgroundPosition:
            '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center text-white md:py-28">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {leadingWords}{' '}
          <span className="text-[#10B981]">{lastWord}</span>
        </h1>

        {subheadline && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl lg:text-2xl">
            {subheadline}
          </p>
        )}

        {(cta1 || cta2) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {cta1 && (
              <CTATracker eventType={inferCTAType(cta1.href)} city={city} service={service}>
                <Button
                  variant="default"
                  size="lg"
                  className="min-w-[200px] border-transparent bg-[#10B981] px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:bg-[#059669] hover:shadow-xl hover:shadow-emerald-900/40"
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
                  className="min-w-[200px] border-2 border-white/60 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  render={<Link href={cta2.href} />}
                >
                  {cta2.label}
                </Button>
              </CTATracker>
            )}
          </div>
        )}

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-[#10B981]" />
            500+ Properties
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-[#10B981]" />
            20+ Ontario Cities
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-[#10B981]" />
            98% Occupancy Rate
          </span>
        </div>
      </div>
    </section>
  )
}
