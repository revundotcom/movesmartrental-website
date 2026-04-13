'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Building2, TrendingUp } from 'lucide-react'

interface LivePropertyCountProps {
  /** Override the count. Default 347 */
  count?: number
  className?: string
}

export function LivePropertyCount({ count = 347, className = '' }: LivePropertyCountProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 40, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v).toString())

  useEffect(() => {
    if (inView) motionVal.set(count)
  }, [inView, count, motionVal])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative mx-auto flex max-w-xl flex-col items-center text-center ${className}`}
    >
      {/* Eyebrow with pulsing dot */}
      <div className="inline-flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span
            className="absolute inline-flex size-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: '#10B981' }}
          />
          <span
            className="relative inline-flex size-2.5 rounded-full"
            style={{ backgroundColor: '#10B981' }}
          />
        </span>
        <span
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: '#10B981' }}
        >
          Live Right Now
        </span>
      </div>

      {/* Number with gradient glow */}
      <div className="relative mt-5 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 mx-auto h-40 w-72 rounded-full bg-brand-emerald/10 blur-3xl"
        />
        <div className="flex items-center gap-4">
          <Building2
            className="size-10 md:size-12"
            style={{ color: '#0B1D3A' }}
            aria-hidden="true"
          />
          <motion.span
            className="font-heading text-6xl font-bold tabular-nums leading-none md:text-7xl"
            style={{ color: '#0B1D3A' }}
          >
            {display}
          </motion.span>
        </div>
      </div>

      {/* Label */}
      <p className="mt-5 text-base font-medium text-slate-600 md:text-lg">
        Properties Currently Under Management
      </p>

      {/* Trend indicator */}
      <div className="mt-3 inline-flex items-center gap-1.5">
        <TrendingUp
          className="size-4"
          style={{ color: '#10B981' }}
          aria-hidden="true"
        />
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ color: '#10B981' }}
        >
          +12 this month
        </span>
      </div>
    </motion.div>
  )
}
