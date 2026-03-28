'use client'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export function OwnersFeaturesBento({ features }: { features: Feature[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Dot-grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-emerald/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">Everything Included</p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Your Property. <span className="font-display italic text-brand-emerald">Our Execution.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Nine services working in concert — so your rental income flows without you lifting a finger.
          </p>
        </div>

        <RevealOnScroll className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon
            const isHero = index === 0 // Make first card span 2 cols on desktop
            return (
              <motion.div
                key={item.title}
                variants={revealItem}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 ${
                  isHero
                    ? 'lg:col-span-2 border-brand-emerald/30 bg-gradient-to-br from-brand-navy via-[#0d2d50] to-[#082a20] text-white'
                    : 'border-slate-200 hover:border-brand-emerald/30'
                }`}
              >
                {/* Top accent bar on hover (non-hero cards) */}
                {!isHero && (
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-3xl bg-gradient-to-r from-brand-emerald to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />
                )}

                {/* Hero card glow */}
                {isHero && (
                  <>
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '32px 32px' }} aria-hidden="true" />
                    <div className="absolute -top-16 -right-16 size-48 rounded-full bg-brand-emerald/15 blur-3xl pointer-events-none" aria-hidden="true" />
                  </>
                )}

                <div className={`relative z-10 flex size-13 items-center justify-center rounded-2xl mb-5 transition-all duration-300 group-hover:scale-110 ${isHero ? 'bg-brand-emerald/20' : 'bg-brand-emerald/10 group-hover:bg-brand-emerald/15 group-hover:shadow-md'}`}>
                  <Icon className="size-6 text-brand-emerald" aria-hidden="true" />
                </div>

                <h3 className={`relative z-10 text-lg font-bold ${isHero ? 'text-white' : 'text-brand-navy'}`}>{item.title}</h3>
                <p className={`relative z-10 mt-2 text-sm leading-relaxed ${isHero ? 'text-white/65' : 'text-muted-foreground'}`}>{item.description}</p>
              </motion.div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}
