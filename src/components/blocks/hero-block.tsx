'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#0B1D3A] md:min-h-screen">
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
          {/* Rich multi-stop gradient: warm deep blue → forest green tint at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #071830 0%, #0B1D3A 35%, #0a2535 60%, #071f2e 80%, #061a1a 100%)',
            }}
            aria-hidden="true"
          />
          {/* Subtle warm horizon glow at bottom center */}
          <div
            className="absolute bottom-0 left-1/2 h-[40%] w-[80%] -translate-x-1/2"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.12) 0%, rgba(10,40,30,0.08) 40%, transparent 70%)' }}
            aria-hidden="true"
          />
          {/* City skyline silhouette — bottom of hero */}
          <svg
            className="absolute bottom-0 left-0 w-full opacity-[0.07]"
            viewBox="0 0 1440 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
          >
            {/* Far background buildings */}
            <rect x="0" y="120" width="60" height="100" fill="white" />
            <rect x="10" y="95" width="8" height="26" fill="white" />
            <rect x="25" y="100" width="8" height="20" fill="white" />
            <rect x="65" y="110" width="45" height="110" fill="white" />
            <rect x="75" y="85" width="10" height="26" fill="white" />
            <rect x="115" y="130" width="30" height="90" fill="white" />
            <rect x="150" y="105" width="55" height="115" fill="white" />
            <rect x="165" y="80" width="10" height="26" fill="white" />
            <rect x="210" y="115" width="40" height="105" fill="white" />
            <rect x="255" y="95" width="70" height="125" fill="white" />
            <rect x="270" y="70" width="12" height="26" fill="white" />
            <rect x="285" y="65" width="8" height="32" fill="white" />
            <rect x="330" y="120" width="35" height="100" fill="white" />
            <rect x="370" y="100" width="50" height="120" fill="white" />
            <rect x="375" y="75" width="10" height="26" fill="white" />
            <rect x="425" y="90" width="65" height="130" fill="white" />
            <rect x="440" y="60" width="12" height="32" fill="white" />
            <rect x="455" y="55" width="8" height="37" fill="white" />
            <rect x="495" y="115" width="40" height="105" fill="white" />
            <rect x="540" y="105" width="55" height="115" fill="white" />
            <rect x="555" y="80" width="10" height="26" fill="white" />
            {/* CN Tower silhouette center */}
            <rect x="690" y="10" width="6" height="210" fill="white" />
            <ellipse cx="693" cy="75" rx="18" ry="8" fill="white" />
            <rect x="685" y="60" width="16" height="90" fill="white" />
            <rect x="680" y="100" width="26" height="6" fill="white" />
            <rect x="670" y="140" width="46" height="80" fill="white" />
            {/* Right side buildings */}
            <rect x="720" y="100" width="55" height="120" fill="white" />
            <rect x="730" y="75" width="10" height="26" fill="white" />
            <rect x="780" y="115" width="40" height="105" fill="white" />
            <rect x="825" y="95" width="65" height="125" fill="white" />
            <rect x="840" y="65" width="12" height="32" fill="white" />
            <rect x="895" y="110" width="45" height="110" fill="white" />
            <rect x="945" y="100" width="55" height="120" fill="white" />
            <rect x="960" y="75" width="8" height="26" fill="white" />
            <rect x="1005" y="120" width="35" height="100" fill="white" />
            <rect x="1045" y="105" width="50" height="115" fill="white" />
            <rect x="1100" y="115" width="40" height="105" fill="white" />
            <rect x="1145" y="95" width="60" height="125" fill="white" />
            <rect x="1160" y="70" width="10" height="26" fill="white" />
            <rect x="1210" y="110" width="45" height="110" fill="white" />
            <rect x="1260" y="100" width="50" height="120" fill="white" />
            <rect x="1315" y="120" width="35" height="100" fill="white" />
            <rect x="1355" y="105" width="85" height="115" fill="white" />
            <rect x="1365" y="80" width="10" height="26" fill="white" />
            {/* Foreground ground */}
            <rect x="0" y="200" width="1440" height="20" fill="white" />
          </svg>
          {/* Subtle film grain for texture depth */}
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
            aria-hidden="true"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              backgroundSize: '200px 200px',
            }}
          />
        </>
      )}

      {/* Animated orb 1: emerald top-left — 12s cycle */}
      <motion.div
        className="pointer-events-none absolute size-[600px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18)_0%,transparent_70%)] blur-[80px]"
        style={{ top: -200, left: -100 }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 80, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {/* Animated orb 2: navy-light bottom-right — 16s cycle */}
      <motion.div
        className="pointer-events-none absolute size-[700px] rounded-full bg-[radial-gradient(circle,rgba(20,60,100,0.5)_0%,transparent_70%)] blur-[100px]"
        style={{ bottom: -200, right: -150 }}
        animate={{ x: [0, -60, 40, 0], y: [0, -80, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {/* Animated orb 3: gold center-right — 8s cycle */}
      <motion.div
        className="pointer-events-none absolute size-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.08)_0%,transparent_70%)] blur-[60px]"
        style={{ top: '30%', right: '10%' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-1.5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-[#10B981]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/75">
                Ontario&apos;s #1 Leasing Partner
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {leadingWords}{' '}
              <span className="relative inline-block font-display italic text-brand-emerald">
                {lastWord}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-brand-emerald"
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
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {subheadline}
              </motion.p>
            )}

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
                      className="cta-primary-shadow group/btn cursor-pointer border-transparent px-8 py-6 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
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
              </motion.div>
            )}

            {/* Trust strip */}
            <motion.div
              className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
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
            </motion.div>
          </div>

          {/* Right: illustration */}
          <motion.div
            className="hidden lg:flex lg:items-center lg:justify-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[520px]">
              {/* Glow behind illustration */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl"
                style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <HeroIllustration className="relative w-full drop-shadow-2xl" />
              {/* Floating badge 1 — top right: Rent Received */}
              <motion.div
                className="absolute -right-4 top-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/80 px-4 py-2.5 shadow-xl backdrop-blur-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{ opacity: { delay: 0.9, duration: 0.5 }, x: { delay: 0.9, duration: 0.5 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
                aria-hidden="true"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-brand-emerald/20">
                  <svg viewBox="0 0 16 16" className="size-3.5 text-brand-emerald" fill="currentColor" aria-hidden="true"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-4.5h1.5v4.5zm0-6h-1.5V4h1.5v1.5z" /></svg>
                </span>
                <div>
                  <p className="text-[11px] font-bold leading-none text-white">Rent Received</p>
                  <p className="mt-0.5 text-[9px] leading-none text-white/50">On time, every month</p>
                </div>
              </motion.div>
              {/* Floating badge 2 — bottom left: tenant placed */}
              <motion.div
                className="absolute -left-4 bottom-12 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/80 px-4 py-2.5 shadow-xl backdrop-blur-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{ opacity: { delay: 1.1, duration: 0.5 }, x: { delay: 1.1, duration: 0.5 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } }}
                aria-hidden="true"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-brand-emerald/20">
                  <svg viewBox="0 0 20 20" className="size-3.5 text-brand-emerald" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </span>
                <div>
                  <p className="text-[11px] font-bold leading-none text-white">Tenant Placed</p>
                  <p className="mt-0.5 text-[9px] leading-none text-emerald-400">14-day avg. fill</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
