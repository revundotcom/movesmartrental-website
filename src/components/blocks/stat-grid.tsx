'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Building2, MapPin, BarChart3, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatItem {
  value: number
  suffix: string
  label: string
  icon: LucideIcon
}

const STATS: StatItem[] = [
  { value: 500, suffix: '+', label: 'Units Leased', icon: Building2 },
  { value: 20,  suffix: '+', label: 'Cities Served', icon: MapPin },
  { value: 94,  suffix: '%', label: 'Qualification Approval', icon: BarChart3 },
  { value: 18,  suffix: '',  label: 'Days Avg. Placement', icon: Clock },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 50, damping: 15, mass: 1 })
  const display = useTransform(spring, (v) => Math.round(v).toString())
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (Math.round(v) >= value && !done) {
        setDone(true)
      }
    })
    return unsubscribe
  }, [spring, value, done])

  return (
    <span ref={ref} className="tabular-nums inline-flex items-baseline">
      <motion.span>{display}</motion.span>
      <motion.span
        className="ml-0.5"
        initial={{ opacity: 0, x: -4 }}
        animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {suffix}
      </motion.span>
    </span>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function StatGrid() {
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 px-6"
      style={{ background: 'linear-gradient(135deg, #071228 0%, #0B1D3A 100%)' }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-5xl grid grid-cols-2 gap-6 sm:grid-cols-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              animate={sectionInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="group flex flex-col items-center text-center px-4 py-6 relative"
              style={{ borderTop: '2px solid #10B981' }}
            >
              {/* Icon above number */}
              <motion.div
                className="mb-3 flex items-center justify-center size-10 rounded-xl bg-emerald-500/10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={sectionInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
              >
                <Icon className="size-5 text-emerald-400" aria-hidden="true" />
              </motion.div>

              {/* Number with spring overshoot */}
              <p className="text-4xl font-extrabold text-white md:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>

              {/* Label */}
              <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white/60">
                {stat.label}
              </p>

              {/* Radial glow on completion - appears when counter reaches target */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 30%, rgba(16,185,129,0.08) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
            </motion.div>
          )
        })}
      </div>

      {/* Data source line */}
      <motion.p
        className="relative mx-auto mt-8 max-w-5xl text-center text-xs text-slate-400"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Based on 500+ units leased across Canada. Updated monthly.
      </motion.p>
    </section>
  )
}
