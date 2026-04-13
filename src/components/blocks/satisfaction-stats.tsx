'use client'

import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const STATS = [
  { value: 98, suffix: '%', label: 'Owner Satisfaction', detail: 'Based on annual owner survey' },
  { value: 95, suffix: '%', label: 'Tenant Retention', detail: 'Lease renewal rate across portfolio' },
  { value: 14, suffix: ' days', label: 'Average Placement', detail: 'From listing to signed lease' },
]

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span className="tabular-nums">
      {display}
      <span className="text-brand-emerald">{suffix}</span>
    </span>
  )
}

export function SatisfactionStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} variant="slideUp" delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading font-bold text-4xl md:text-5xl text-brand-navy mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </p>
                <p className="font-heading font-semibold text-brand-navy text-sm mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-400">
                  {stat.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
