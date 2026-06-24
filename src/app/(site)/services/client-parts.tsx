'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/* ────────────────────────────────────────────────────────────────────────
 * RevealRow — generic stagger-on-scroll wrapper used by the dark
 * "What you get" band. Mirrors the pattern from the Tenants page.
 * ──────────────────────────────────────────────────────────────────────── */
export function RevealRow({
  index,
  children,
  className,
}: {
  index: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * BentoTile — flexible asymmetric grid tile used by the Services overview
 * page. Three visual variants:
 *   - "image": full-bleed photo with overlaid title/summary/tag
 *   - "stat":  text-only emerald/navy/gold tile with a giant figure
 *   - "cta":   text-only tile with a CTA arrow + link styling
 * The caller controls size via className (col-span/row-span Tailwind utils).
 * ──────────────────────────────────────────────────────────────────────── */
export function BentoTile({
  index,
  variant,
  className,
  href,
  tag,
  number,
  title,
  summary,
  imageSrc,
  imageAlt,
  bg = 'navy',
  statValue,
  statLabel,
  ctaLabel,
  bodySize = 'md',
}: {
  index: number
  variant: 'image' | 'stat' | 'cta'
  className?: string
  href?: string
  tag?: string
  number?: string
  title?: string
  summary?: string
  imageSrc?: string
  imageAlt?: string
  bg?: 'navy' | 'emerald' | 'gold' | 'cream'
  statValue?: string
  statLabel?: string
  ctaLabel?: string
  bodySize?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const titleSizeClass =
    bodySize === 'xl'
      ? 'text-3xl sm:text-4xl md:text-5xl'
      : bodySize === 'lg'
        ? 'text-2xl sm:text-3xl md:text-4xl'
        : bodySize === 'sm'
          ? 'text-lg sm:text-xl'
          : 'text-xl sm:text-2xl'

  const wrapperBase =
    'group relative h-full overflow-hidden rounded-3xl transition-all duration-500'

  /* ── Variant 1: image-led full-bleed tile ─────────────────────────── */
  if (variant === 'image') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
        className={className}
      >
        <Link
          href={href ?? '#'}
          className={`${wrapperBase} block border border-slate-200 bg-brand-navy shadow-sm hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-2xl hover:shadow-brand-navy/20`}
        >
          <Image
            src={imageSrc!}
            alt={imageAlt ?? ''}
            fill
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
            unoptimized
          />
          {/* Bottom half of every tile is FULLY SOLID navy — guarantees
              the title and summary sit on a clean opaque backdrop with
              ZERO possibility of underlying image content (blueprint
              lines, building windows, office detail) showing through and
              creating ghost-text artifacts. Image remains visible in
              the top half for the image-led aesthetic. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-navy from-50% to-transparent"
          />
          {/* Gold hairline at the top */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
          />

          {tag && (
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
              <span>{tag}</span>
            </div>
          )}

          {number && (
            <span
              aria-hidden="true"
              className="absolute right-5 top-5 font-mono text-[11px] font-semibold tracking-[0.22em] text-white/70"
            >
              {number}
            </span>
          )}

          {/* Bottom content overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-7">
            {/* DM Serif Display Regular has TIGHT default kerning designed
                for large headlines — at mobile sizes adjacent letters'
                serifs visually merge ("Tenant Placement" reads as if the
                tops are connected). Fix: `not-italic` (defensive, blocks
                any inherited italic) + `tracking-[0.01em]` (small positive
                letter-spacing that breaks the visual merge).
                Heavy text-shadow gives every letter its own dark halo so
                the title stays clean even on the most cluttered photos. */}
            <h3
              className={`font-display font-normal not-italic leading-[1.2] tracking-[0.01em] text-white [text-shadow:_0_2px_8px_rgba(11,29,58,0.9)] ${titleSizeClass}`}
            >
              {title}
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h3>
            {summary && (
              <p className="max-w-prose text-[13px] leading-relaxed text-white/85 sm:text-sm">
                {summary}
              </p>
            )}
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold transition-colors group-hover:text-amber-200">
              Learn more
            </span>
          </div>
        </Link>
      </motion.div>
    )
  }

  /* ── Variant 2: stat tile - solid colour with a giant figure ─────── */
  if (variant === 'stat') {
    const bgClass =
      bg === 'emerald'
        ? 'bg-brand-emerald text-white'
        : bg === 'gold'
          ? 'bg-brand-gold text-brand-navy'
          : bg === 'cream'
            ? 'bg-[#F4F0E5] text-brand-navy'
            : 'bg-brand-navy text-white'

    const labelTone =
      bg === 'gold' || bg === 'cream'
        ? 'text-brand-navy/65'
        : bg === 'emerald'
          ? 'text-white/80'
          : 'text-white/65'

    // Compact stat values like "20+", "$0", "12+" can render giant
    // (text-7xl). Word-stats like "18 Days" need a smaller scale so they
    // don't wrap awkwardly inside a 1-col bento cell at sm/lg breakpoints.
    const isWordStat = (statValue?.length ?? 0) > 4
    const statValueSize = isWordStat
      ? 'text-4xl sm:text-5xl md:text-6xl'
      : 'text-5xl sm:text-6xl md:text-7xl'

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
        className={className}
      >
        <div
          className={`${wrapperBase} flex flex-col justify-between p-6 sm:p-7 ${bgClass}`}
        >
          {/* Decorative hairline */}
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 h-px ${bg === 'gold' || bg === 'cream' ? 'bg-brand-navy/20' : 'bg-white/20'}`}
          />
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.22em] ${labelTone}`}
          >
            {tag ?? 'By the numbers'}
          </p>
          <div className="my-4">
            <p className={`font-display font-normal leading-[1.05] ${statValueSize}`}>
              {statValue}
              <span aria-hidden="true" className={bg === 'gold' ? 'text-brand-navy' : 'text-brand-gold'}>
                .
              </span>
            </p>
            <p className={`mt-3 text-sm font-medium leading-snug sm:text-base ${labelTone}`}>
              {statLabel}
            </p>
          </div>
          {summary && (
            <p
              className={`text-[12px] leading-relaxed ${bg === 'gold' || bg === 'cream' ? 'text-brand-navy/70' : 'text-white/65'}`}
            >
              {summary}
            </p>
          )}
        </div>
      </motion.div>
    )
  }

  /* ── Variant 3: cta tile - text-only link tile ───────────────────── */
  const bgClass =
    bg === 'emerald'
      ? 'bg-brand-emerald text-white'
      : bg === 'gold'
        ? 'bg-brand-gold text-brand-navy'
        : bg === 'cream'
          ? 'bg-[#F4F0E5] text-brand-navy'
          : 'bg-brand-navy text-white'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
      className={className}
    >
      <Link
        href={href ?? '#'}
        className={`${wrapperBase} flex h-full flex-col justify-between p-6 sm:p-7 ${bgClass} hover:-translate-y-1`}
      >
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.22em] ${bg === 'gold' || bg === 'cream' ? 'text-brand-navy/65' : 'text-brand-gold'}`}
        >
          {tag ?? 'Next step'}
        </p>
        <div className="mt-4">
          <h3 className={`font-display font-normal not-italic leading-[1.2] tracking-[0.01em] ${titleSizeClass}`}>
            {title}
            <span aria-hidden="true" className={bg === 'gold' ? 'text-brand-navy' : 'text-brand-gold'}>
              .
            </span>
          </h3>
          {summary && (
            <p
              className={`mt-3 text-[13px] leading-relaxed ${bg === 'gold' || bg === 'cream' ? 'text-brand-navy/70' : 'text-white/75'} sm:text-sm`}
            >
              {summary}
            </p>
          )}
        </div>
        <span
          className={`mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-transform ${bg === 'gold' || bg === 'cream' ? 'text-brand-navy' : 'text-white'}`}
        >
          {ctaLabel ?? 'Get started'}
        </span>
      </Link>
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
 * ServiceImageCard — image-led card for one of the 9 services on the
 * Services overview page. Full-bleed photo, glassmorphic tag pill,
 * white body card below with title, summary, and a "Learn more" link.
 * ──────────────────────────────────────────────────────────────────────── */
export function ServiceImageCard({
  index,
  number,
  tag,
  title,
  summary,
  href,
  imageSrc,
  imageAlt,
}: {
  index: number
  number: string
  tag: string
  title: string
  summary: string
  href: string
  imageSrc: string
  imageAlt: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.07 }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-2xl hover:shadow-brand-navy/10"
      >
        {/* Hero image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            unoptimized
          />
          {/* Navy gradient for text legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/15 to-transparent"
          />

          {/* Top-left glassmorphism tag pill */}
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
            <span>{tag}</span>
          </div>

          {/* Bottom-left service number */}
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-5 font-mono text-[11px] font-semibold tracking-[0.22em] text-white/80"
          >
            {number}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <h3 className="font-display text-xl font-normal not-italic leading-[1.2] tracking-[0.01em] text-brand-navy sm:text-2xl">
            {title}
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {summary}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-emerald transition-colors group-hover:text-emerald-700">
            Learn more
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
