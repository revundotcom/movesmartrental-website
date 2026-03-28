'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const TESTIMONIALS = [
  {
    quote:
      'MoveSmart handled everything from photography to lease signing. I did not have to lift a finger and my unit was rented in 10 days.',
    name: 'Michael R.',
    city: 'Toronto, ON',
    outcome: 'Unit rented in 10 days',
    initials: 'MR',
    color: 'from-brand-emerald/20 to-brand-emerald/5',
  },
  {
    quote:
      'The structured screening process gave me total confidence in the tenant they placed. No more sleepless nights worrying about missed rent.',
    name: 'Sarah L.',
    city: 'Ottawa, ON',
    outcome: 'Zero missed payments in 2 years',
    initials: 'SL',
    color: 'from-[#D4A853]/20 to-[#D4A853]/5',
  },
  {
    quote:
      'I manage 12 units across three cities. MoveSmart is the only company that treats my portfolio like their own. True white-glove service.',
    name: 'James K.',
    city: 'Hamilton, ON',
    outcome: '12 units, 100% occupancy',
    initials: 'JK',
    color: 'from-brand-navy/10 to-brand-navy/3',
  },
] as const

export function TestimonialsSection() {
  return (
    <RevealOnScroll className="mt-10 space-y-5">
      {TESTIMONIALS.map((testimonial) => (
        <motion.div
          key={testimonial.name}
          variants={revealItem}
          className="group relative flex gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-md"
        >
          {/* Left color accent */}
          <div
            className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b ${testimonial.color}`}
            aria-hidden="true"
          />

          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-xs font-black text-white">
            {testimonial.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-brand-navy">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.city}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-brand-gold text-brand-gold" aria-hidden="true" />
                ))}
              </div>
            </div>
            <blockquote className="mt-2 text-sm leading-relaxed text-slate-600">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5">
              <svg
                className="size-3.5 shrink-0 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs font-semibold text-emerald-700">{testimonial.outcome}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </RevealOnScroll>
  )
}
