'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

const STATS = [
  { value: 500, suffix: '+', label: 'Properties Managed' },
  { value: 20,  suffix: '+', label: 'Cities Served' },
  { value: 98,  suffix: '%', label: 'Occupancy Rate' },
  { value: 14,  suffix: '',  label: 'Days Avg. Fill Time' },
] as const

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: 1500, bounce: 0 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' as const },
  }),
} as const

export function StatGrid() {
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6"
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
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
            variants={cardVariants}
            className="flex flex-col items-center text-center px-4 py-6"
            style={{ borderTop: '2px solid #10B981' }}
          >
            <p className="text-4xl font-extrabold text-white md:text-5xl">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white/60">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
