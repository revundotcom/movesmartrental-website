'use client'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  DollarSign,
  Monitor,
  Users,
  Megaphone,
  Shield,
  CheckCircle,
  Paintbrush,
  TrendingUp,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* Icon registry - server can pass string keys, client resolves to components */
const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  Monitor,
  Users,
  Megaphone,
  Shield,
  CheckCircle,
  Paintbrush,
  TrendingUp,
  Zap,
}

interface Feature {
  iconKey: string
  title: string
  description: string
}

export function OwnersFeaturesBento({ features }: { features: Feature[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-emerald/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">Everything Included</p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Your Property. <span className="font-display italic text-brand-emerald">Our Execution.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Nine services working in concert - so your rental income flows without you lifting a finger.
          </p>
        </div>

        <RevealOnScroll className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = ICON_MAP[item.iconKey] ?? DollarSign
            return (
              <motion.div
                key={item.title}
                variants={revealItem}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-xl hover:shadow-brand-navy/10"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-3xl bg-gradient-to-r from-brand-emerald to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="relative z-10 mb-5 flex size-13 items-center justify-center rounded-2xl bg-brand-emerald/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-emerald/15 group-hover:shadow-md">
                  <Icon className="size-6 text-brand-emerald" aria-hidden="true" />
                </div>
                <h3 className="relative z-10 text-lg font-bold text-brand-navy">{item.title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}
