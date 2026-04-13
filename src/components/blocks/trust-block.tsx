'use client'

import { Quote } from 'lucide-react'
import { motion } from 'framer-motion'

import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import type { TrustBlockProps } from '@/types/blocks'

function TestimonialsGrid({
  testimonials,
}: {
  testimonials: TrustBlockProps['testimonials']
}) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <RevealOnScroll className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.name}
          variants={revealItem}
          className="relative flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-md"
        >
          {/* Decorative quote icon */}
          <Quote className="mb-3 size-8 text-[#10B981]/20" aria-hidden="true" />

          <blockquote className="text-sm leading-relaxed text-slate-700 italic">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          {testimonial.outcome && (
            <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-[#10B981]">
              {testimonial.outcome}
            </p>
          )}

          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="font-bold text-[#0B1D3A]">{testimonial.name}</p>
            <p className="text-sm text-slate-500">{testimonial.city}</p>
          </div>
        </motion.div>
      ))}
    </RevealOnScroll>
  )
}

function StatsRow({ stats }: { stats: TrustBlockProps['stats'] }) {
  if (!stats || stats.length === 0) return null

  return (
    <div className="rounded-3xl px-6 py-14 md:px-12 bg-brand-navy">
      <RevealOnScroll className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={revealItem} className="text-center">
            <p className="text-5xl font-black text-brand-emerald">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest text-white/50">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </RevealOnScroll>
    </div>
  )
}

export function TrustBlock({ testimonials, stats, variant }: TrustBlockProps) {
  const effectiveVariant =
    variant ||
    (testimonials && stats
      ? 'combined'
      : testimonials
        ? 'testimonials'
        : 'stats')

  const defaultTitle =
    effectiveVariant === 'stats'
      ? 'Trusted by Property Owners'
      : 'What Our Clients Say'

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section heading with emerald underline */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-normal tracking-tight text-[#0B1D3A] sm:text-4xl">
            {defaultTitle}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
        </div>

        {(effectiveVariant === 'stats' || effectiveVariant === 'combined') && (
          <div className={effectiveVariant === 'combined' ? 'mb-8' : ''}>
            <StatsRow stats={stats} />
          </div>
        )}

        {(effectiveVariant === 'testimonials' ||
          effectiveVariant === 'combined') && (
          <TestimonialsGrid testimonials={testimonials} />
        )}
      </div>
    </section>
  )
}
