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
          className="animate-gradient absolute inset-0 bg-gradient-to-br from-[#0B1D3A] via-[#0F2847] to-[#0d2340]"
          style={{ backgroundSize: '200% 200%' }}
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
        {/* Eyebrow badge */}
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
          <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-[#10B981]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Ontario&apos;s #1 Leasing Partner
          </span>
        </div>

        <h1 className="animate-fade-up delay-100 font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {leadingWords}{' '}
          <span className="relative inline-block">
            <span className="text-[#10B981]">{lastWord}</span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#10B981]/40" aria-hidden="true" />
          </span>
        </h1>

        {subheadline && (
          <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl lg:text-2xl">
            {subheadline}
          </p>
        )}

        {(cta1 || cta2) && (
          <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {cta1 && (
              <CTATracker eventType={inferCTAType(cta1.href)} city={city} service={service}>
                <Button
                  variant="default"
                  size="lg"
                  className="group/btn min-w-[200px] cursor-pointer border-transparent bg-[#10B981] px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#059669] hover:shadow-xl hover:shadow-emerald-900/40"
                  render={<Link href={cta1.href} />}
                >
                  {cta1.label}
                  <svg className="ml-2 size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
                  className="min-w-[200px] cursor-pointer border-2 border-white/50 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                  render={<Link href={cta2.href} />}
                >
                  {cta2.label}
                </Button>
              </CTATracker>
            )}
          </div>
        )}

        {/* Trust strip */}
        <div className="animate-fade-up delay-400 mt-12 flex flex-wrap items-center justify-center gap-x-1 gap-y-3">
          {[
            { value: '500+', label: 'Properties' },
            { value: '20+', label: 'Ontario Cities' },
            { value: '98%', label: 'Occupancy Rate' },
            { value: '14 Days', label: 'Avg. Fill Time' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-sm font-bold text-[#10B981]">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
              {i < 3 && <span className="mx-1 h-8 w-px bg-white/10" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
