'use client'

import { motion } from 'framer-motion'

interface TimelineStep {
  title: string
  description: string
}

interface StateProcessTimelineProps {
  stateName: string
  steps: TimelineStep[]
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function StateProcessTimeline({ stateName, steps }: StateProcessTimelineProps) {
  return (
    <ol className="relative space-y-8 md:space-y-0">
      {/* Connecting rule on md+ */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-emerald/30 to-transparent md:block"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative flex flex-col items-start"
          >
            <div className="relative z-10 mb-5 flex size-16 items-center justify-center rounded-full border border-brand-emerald/30 bg-white shadow-sm">
              <span className="font-display text-2xl italic text-brand-emerald">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="font-display text-xl font-normal leading-snug tracking-tight text-brand-navy">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </motion.li>
        ))}
      </div>

      <span className="sr-only">Step-by-step leasing workflow for {stateName}.</span>
    </ol>
  )
}
