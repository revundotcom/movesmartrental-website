import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CTATracker } from '@/components/tracking/cta-tracker'
import { HeroIllustration } from '@/components/illustrations'
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
    <section className="relative flex min-h-[90vh] items-center overflow-hidden md:min-h-screen">
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
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0B1D3A]/92 via-[#132B4F]/88 to-[#0B1D3A]/92"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <div
            className="animate-gradient absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, #0F2847 0%, #0B1D3A 50%, #071228 100%)',
              backgroundSize: '200% 200%',
            }}
            aria-hidden="true"
          />
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            aria-hidden="true"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />
        </>
      )}

      {/* Radial glow top-left */}
      <div
        className="absolute -left-32 -top-32 size-[500px] rounded-full bg-[#10B981]/8 blur-3xl"
        aria-hidden="true"
      />
      {/* Radial glow bottom-right */}
      <div
        className="absolute -bottom-20 -right-20 size-[400px] rounded-full bg-[#132D54]/60 blur-3xl"
        aria-hidden="true"
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content: two-column layout on desktop */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text content */}
          <div>
            {/* Eyebrow badge */}
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-1.5 backdrop-blur-sm">
              <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-[#10B981]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/75">
                Ontario&apos;s #1 Leasing Partner
              </span>
            </div>

            <h1 className="animate-fade-up delay-100 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
              {leadingWords}{' '}
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #10B981 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {lastWord}
                </span>
                <span
                  className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #10B981, #34D399, #10B981)' }}
                  aria-hidden="true"
                />
              </span>
            </h1>

            {subheadline && (
              <p className="animate-fade-up delay-200 mt-6 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
                {subheadline}
              </p>
            )}

            {(cta1 || cta2) && (
              <div className="animate-fade-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
                {cta1 && (
                  <CTATracker eventType={inferCTAType(cta1.href)} city={city} service={service}>
                    <Button
                      variant="default"
                      size="lg"
                      className="group/btn cursor-pointer border-transparent px-8 py-6 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
                      }}
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
                      className="cursor-pointer border-2 border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                      render={<Link href={cta2.href} />}
                    >
                      {cta2.label}
                    </Button>
                  </CTATracker>
                )}
              </div>
            )}

            {/* Trust strip */}
            <div className="animate-fade-up delay-400 mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: '500+', label: 'Properties' },
                { value: '20+', label: 'Ontario Cities' },
                { value: '98%', label: 'Occupancy Rate' },
                { value: '14 Days', label: 'Avg. Fill Time' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/8 bg-white/4 p-3 text-center backdrop-blur-sm"
                >
                  <p className="text-base font-extrabold text-[#10B981]">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: illustration */}
          <div className="animate-fade-up delay-200 hidden lg:flex lg:items-center lg:justify-center">
            <div className="relative w-full max-w-[520px]">
              {/* Glow behind illustration */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl"
                style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <HeroIllustration className="relative w-full drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B1D3A]/30 to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
