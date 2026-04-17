'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Building,
  Home,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react'

const AUDIENCES = [
  {
    icon: Building,
    title: 'For Property Owners',
    description: 'White-glove leasing brokerage with zero upfront cost. Strategic pricing, professional marketing, tenant qualification, lease execution, and a documented move-in - hands-off leasing from listing to keys.',
    features: ['18-Day Avg Placement', 'Defensible Qualification', 'Rental Protection (partner)', 'Dedicated Leasing Advisor', 'Owner Portal'],
    cta: 'Explore Owner Services',
    href: '/owners/',
    accent: 'emerald' as const,
  },
  {
    icon: Home,
    title: 'For Tenants',
    description: 'Find your next home from our pipeline of professionally listed rentals across Canada. Verified listings, transparent pricing, and a smooth application-to-move-in experience.',
    features: ['Verified Listings', 'Online Applications', 'Transparent Pricing', 'Responsive Leasing Team', 'Secure E-Sign'],
    cta: 'Browse Rentals',
    href: '/tenants/',
    accent: 'gold' as const,
  },
]

const IMAGERY: Record<'emerald' | 'gold', { src: string; alt: string; eyebrow: string; kicker: string }> = {
  emerald: {
    src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    alt: 'Premium single-family rental home at dusk',
    eyebrow: '01 / Owners',
    kicker: 'Hands-off leasing, brick by brick',
  },
  gold: {
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bright, professionally staged apartment interior',
    eyebrow: '02 / Tenants',
    kicker: 'Verified listings, honest pricing',
  },
}

export function AudienceSegmentation() {
  const prefersReducedMotion = useReducedMotion()
  const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]

  const headerTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease }

  return (
    <section className="relative overflow-hidden bg-[#FBFAF6] py-16 md:py-20">
      {/* Soft ivory wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#FBFAF6] to-white"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={headerTransition}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Choose Your Path
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Two doors,{' '}
            <span className="font-display italic text-brand-emerald">one standard</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Whether you own the property or are searching for your next home, MoveSmart Rentals runs the same disciplined playbook on both sides of the lease.
          </p>
        </motion.div>

        {/* Editorial split */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 lg:gap-10">
          {AUDIENCES.map((audience, i) => (
            <AudienceCard
              key={audience.title}
              audience={audience}
              index={i}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>

        {/* Footer hairline */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease, delay: 0.2 }
          }
          className="mt-12 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-navy/60 md:mt-16"
        >
          <span className="h-px w-10 bg-brand-gold/50" />
          <Sparkles className="size-3.5 text-brand-gold" aria-hidden="true" />
          <span>Same team, both sides of the lease</span>
          <span className="h-px w-10 bg-brand-gold/50" />
        </motion.div>
      </div>
    </section>
  )
}

function AudienceCard({
  audience,
  index,
  prefersReducedMotion,
}: {
  audience: (typeof AUDIENCES)[number]
  index: number
  prefersReducedMotion: boolean
}) {
  const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
  const media = IMAGERY[audience.accent]
  const Icon = audience.icon

  const isEmerald = audience.accent === 'emerald'
  const accentText = isEmerald ? 'text-brand-emerald' : 'text-brand-gold'
  const accentBg = isEmerald ? 'bg-brand-emerald' : 'bg-brand-gold'
  const accentSoftBg = isEmerald ? 'bg-brand-emerald/10' : 'bg-brand-gold/10'
  const accentBorderHover = isEmerald
    ? 'hover:border-brand-emerald/40'
    : 'hover:border-brand-gold/40'

  const cardTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.7,
        ease,
        delay: Math.min(index * 0.12, 0.3),
      }

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={cardTransition}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_40px_-20px_rgba(11,29,58,0.22)] transition-all duration-500 hover:-translate-y-1 ${accentBorderHover} hover:shadow-[0_24px_60px_-24px_rgba(11,29,58,0.32)]`}
    >
      {/* Photographic hero */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />

        {/* Navy gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-brand-navy/10"
        />

        {/* Gold hairline at bottom of photo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
        />

        {/* Content over photo */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm italic tracking-wider text-white/85">
              {media.eyebrow}
            </span>
            <span
              className={`inline-flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 ${accentText}`}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
          </div>

          <div>
            <p
              className={`text-[0.7rem] font-bold uppercase tracking-[0.28em] ${isEmerald ? 'text-brand-emerald' : 'text-brand-gold'}`}
            >
              {media.kicker}
            </p>
            <h3 className="mt-2 font-display text-3xl font-normal leading-tight text-white sm:text-4xl">
              {audience.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <p className="text-[0.975rem] leading-relaxed text-slate-600">
          {audience.description}
        </p>

        {/* Features */}
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {audience.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-snug text-brand-navy/85"
            >
              <span
                className={`mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full ${accentSoftBg}`}
              >
                <Check
                  className={`size-2.5 ${accentText}`}
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </span>
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-navy/50">
            Zero upfront
          </span>
          <Link
            href={audience.href}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-heading text-sm font-semibold text-white transition-all duration-300 ${accentBg} hover:shadow-lg hover:shadow-brand-navy/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald`}
          >
            {audience.cta}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Accent edge on hover */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${accentBg}`}
      />
    </motion.article>
  )
}
