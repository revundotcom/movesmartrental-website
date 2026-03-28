'use client'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Megaphone,
  Eye,
  FileCheck,
  ShieldCheck,
  ClipboardCheck,
  Key,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const HOW_IT_WORKS_STEPS = [
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description:
      'We analyze the market and set the right rental price to maximize your return while minimizing vacancy.',
  },
  {
    icon: Megaphone,
    title: 'Professional Marketing',
    description:
      'Professional photography, MLS distribution, and syndication across 50+ rental platforms.',
  },
  {
    icon: Eye,
    title: 'Managed Showings',
    description:
      'Our team handles all property showings, pre-screening inquiries, and follow-ups.',
  },
  {
    icon: FileCheck,
    title: 'Offer Management',
    description:
      'We present and negotiate offers, ensuring the best terms for your property.',
  },
  {
    icon: ShieldCheck,
    title: 'Tenant Qualification',
    description:
      'Credit checks, employment verification, references, and full rental history review.',
  },
  {
    icon: ClipboardCheck,
    title: 'Lease Execution',
    description:
      'Legally compliant lease preparation, signing, and documentation handled end-to-end.',
  },
  {
    icon: Key,
    title: 'Move-In Coordination',
    description:
      'Key handoff, condition reporting, and move-in inspection managed seamlessly.',
  },
] as const

interface HowItWorksStepsProps {
  /** "list" = original vertical stacked list (default), "grid" = 2-col grid for L-shape layout */
  variant?: 'list' | 'grid'
}

export function HowItWorksSteps({ variant = 'list' }: HowItWorksStepsProps) {
  if (variant === 'grid') {
    return (
      <RevealOnScroll className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {HOW_IT_WORKS_STEPS.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              variants={revealItem}
              className="group flex gap-3"
            >
              {/* Icon + number badge */}
              <div className="relative shrink-0">
                <div className="flex size-10 items-center justify-center rounded-xl border border-brand-emerald/30 bg-brand-emerald/10 transition-all duration-300 group-hover:border-brand-emerald/60 group-hover:bg-brand-emerald/20">
                  <Icon className="size-4 text-brand-emerald" aria-hidden="true" />
                </div>
                <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-brand-emerald text-[9px] font-black text-white">
                  {index + 1}
                </span>
              </div>
              {/* Text */}
              <div>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-white/50">{step.description}</p>
              </div>
            </motion.div>
          )
        })}
      </RevealOnScroll>
    )
  }

  // Default: original vertical list
  return (
    <RevealOnScroll className="mt-10 space-y-0">
      {HOW_IT_WORKS_STEPS.map((step, index) => {
        const Icon = step.icon
        return (
          <motion.div key={step.title} variants={revealItem} className="group flex gap-4">
            {/* Connector column */}
            <div className="flex shrink-0 flex-col items-center">
              <div className="relative flex size-11 items-center justify-center rounded-xl border border-brand-emerald/30 bg-brand-emerald/10 transition-all duration-300 group-hover:border-brand-emerald/60 group-hover:bg-brand-emerald/20">
                <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                {/* Step number badge */}
                <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-brand-emerald text-[9px] font-black text-white">
                  {index + 1}
                </span>
              </div>
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="my-1 h-6 w-px bg-gradient-to-b from-brand-emerald/30 to-transparent" />
              )}
            </div>
            {/* Content */}
            <div className="pt-2 pb-0">
              <h3 className="text-sm font-bold text-white">{step.title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-white/50">{step.description}</p>
            </div>
          </motion.div>
        )
      })}
    </RevealOnScroll>
  )
}
