'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'MoveSmart handled everything from photography to lease signing. I did not have to lift a finger and my unit was rented in 10 days.',
    name: 'Michael R.',
    city: 'Toronto, ON',
    propertyType: '2-Bed Condo',
    outcome: 'Rented in 10 days',
    rating: 5,
  },
  {
    quote: 'The structured screening process gave me total confidence in the tenant they placed. No more sleepless nights worrying about missed rent.',
    name: 'Sarah L.',
    city: 'Ottawa, ON',
    propertyType: '3-Bed Townhouse',
    outcome: 'Zero missed payments in 2 years',
    rating: 5,
  },
  {
    quote: 'I manage 12 units across three cities. MoveSmart is the only company that treats my portfolio like their own. True white-glove service.',
    name: 'James K.',
    city: 'Hamilton, ON',
    propertyType: 'Multi-Unit Portfolio',
    outcome: '12 units, 100% occupancy',
    rating: 5,
  },
  {
    quote: 'Switched from self-managing to MoveSmart and my vacancy dropped from 6 weeks to under 2 weeks. The ROI is undeniable.',
    name: 'Priya M.',
    city: 'Mississauga, ON',
    propertyType: '1-Bed Condo',
    outcome: 'Saved $4,200/year',
    rating: 5,
  },
  {
    quote: 'Their rent guarantee program saved me during a difficult eviction. I never missed a single payment thanks to MoveSmart.',
    name: 'David W.',
    city: 'Brampton, ON',
    propertyType: 'Detached Home',
    outcome: 'Protected during eviction',
    rating: 5,
  },
  {
    quote: 'As an overseas investor, I needed someone trustworthy to manage my properties. MoveSmart provides detailed monthly reports and handles everything.',
    name: 'Anika T.',
    city: 'Calgary, AB',
    propertyType: '3 Investment Properties',
    outcome: '3 properties, fully remote',
    rating: 5,
  },
]

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function Avatar({ name }: { name: string }) {
  const initials = getInitials(name)
  const colors = [
    'bg-emerald-500', 'bg-blue-500', 'bg-amber-500',
    'bg-violet-500', 'bg-rose-500', 'bg-teal-500',
  ]
  const colorIndex = name.charCodeAt(0) % colors.length
  return (
    <div className={`flex size-10 items-center justify-center rounded-full ${colors[colorIndex]} text-sm font-bold text-white`}>
      {initials}
    </div>
  )
}

function AnimatedStars({ rating, inView }: { rating: number; inView: boolean }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#D4A853"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3, ease: 'easeOut' }}
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
        </motion.svg>
      ))}
    </div>
  )
}

function QuoteMark() {
  return (
    <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-5 top-5" aria-hidden="true">
      <text x="0" y="36" fontSize="72" fontFamily="Georgia, serif" fill="#10B981" fillOpacity="0.12" fontWeight="700">&ldquo;</text>
    </svg>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-w-[320px] max-w-[400px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:min-w-[360px]"
    >
      {/* Gradient border-bottom slides in from left on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-500 group-hover:w-full" aria-hidden="true" />

      <QuoteMark />
      <AnimatedStars rating={testimonial.rating} inView={inView} />

      <blockquote className="mt-4 flex-1 font-display text-sm italic leading-relaxed text-slate-700">
        {testimonial.quote}
      </blockquote>

      <div className="mt-4 flex items-center gap-3">
        <Avatar name={testimonial.name} />
        <div>
          <p className="text-sm font-bold text-[#0B1D3A]">{testimonial.name}</p>
          <p className="text-xs text-slate-500">{testimonial.propertyType}, {testimonial.city}</p>
        </div>
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          {testimonial.outcome}
        </span>
      </div>
    </motion.div>
  )
}

function GoogleBadge() {
  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
          <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" />
        </svg>
        <span className="text-sm font-bold text-slate-700">4.9</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#D4A853" aria-hidden="true">
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
        </svg>
        <span className="text-xs text-slate-500">on Google</span>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-scroll with pause on hover/touch
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationId: number
    let scrollPos = 0
    const speed = 0.5 // px per frame

    function autoScroll() {
      if (!container || isPaused) {
        animationId = requestAnimationFrame(autoScroll)
        return
      }

      scrollPos += speed
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0
      }
      container.scrollLeft = scrollPos
      animationId = requestAnimationFrame(autoScroll)
    }

    animationId = requestAnimationFrame(autoScroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <div className="mt-8">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto py-4 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Duplicate testimonials for infinite scroll effect */}
        {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
          <TestimonialCard key={`${testimonial.name}-${idx}`} testimonial={testimonial} index={idx % TESTIMONIALS.length} />
        ))}
      </div>
      <GoogleBadge />
    </div>
  )
}
