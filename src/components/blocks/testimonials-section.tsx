'use client'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote:
      'MoveSmart handled everything from photography to lease signing. I did not have to lift a finger and my unit was rented in 10 days.',
    name: 'Michael R.',
    city: 'Toronto, ON',
    outcome: 'Unit rented in 10 days',
  },
  {
    quote:
      'The structured screening process gave me total confidence in the tenant they placed. No more sleepless nights worrying about missed rent.',
    name: 'Sarah L.',
    city: 'Ottawa, ON',
    outcome: 'Zero missed payments in 2 years',
  },
  {
    quote:
      'I manage 12 units across three cities. MoveSmart is the only company that treats my portfolio like their own. True white-glove service.',
    name: 'James K.',
    city: 'Hamilton, ON',
    outcome: '12 units, 100% occupancy',
  },
] as const

const HOVER_SHADOW =
  '0 11px 21px rgba(11,29,58,0.04), 0 14px 27px rgba(11,29,58,0.07), 0 19px 38px rgba(11,29,58,0.09), 0 27px 54px rgba(11,29,58,0.12)'

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#D4A853"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function QuoteMark() {
  return (
    <svg
      width="48"
      height="36"
      viewBox="0 0 48 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-5 top-5"
      aria-hidden="true"
    >
      <text
        x="0"
        y="36"
        fontSize="72"
        fontFamily="Georgia, serif"
        fill="#10B981"
        fillOpacity="0.12"
        fontWeight="700"
      >
        &ldquo;
      </text>
    </svg>
  )
}

function GoogleBadge() {
  return (
    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
      {/* Google G icon */}
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
        />
      </svg>
      <span className="text-sm font-bold text-slate-700">4.9</span>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#D4A853" aria-hidden="true">
        <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
      </svg>
      <span className="text-xs text-muted-foreground">on Google</span>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <div className="mt-8">
      {/* 3-col grid desktop, stacked mobile */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {TESTIMONIALS.map((testimonial, idx) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
            whileHover={{
              y: -8,
              boxShadow: HOVER_SHADOW,
            }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-brand-emerald/30"
          >
            <QuoteMark />

            {/* Stars */}
            <StarRating />

            {/* Quote */}
            <blockquote className="mt-4 flex-1 font-display text-sm italic leading-relaxed text-slate-700">
              {testimonial.quote}
            </blockquote>

            {/* Name + location */}
            <div className="mt-4">
              <p className="text-sm font-bold text-brand-navy">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.city}</p>
            </div>

            {/* Outcome badge */}
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-emerald/10 px-3 py-1.5 text-xs font-semibold text-brand-emerald">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {testimonial.outcome}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Google Reviews badge */}
      <GoogleBadge />
    </div>
  )
}
