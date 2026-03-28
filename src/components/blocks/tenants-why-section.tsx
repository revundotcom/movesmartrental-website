'use client'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const WHY_PILLARS = [
  {
    title: 'Verified Listings',
    desc: 'Every property is owner-verified with professional photos and accurate pricing — no bait-and-switch.',
    icon: '✓',
  },
  {
    title: 'Fast Applications',
    desc: 'Apply online in minutes. Upload documents securely and get a decision within 48 hours.',
    icon: '⚡',
  },
  {
    title: 'Tenant Support',
    desc: 'A dedicated team available for maintenance requests, lease questions, and anything in between.',
    icon: '★',
  },
]

export function TenantsWhySection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 text-white">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />
      {/* Ambient glow blobs */}
      <div
        className="absolute -right-32 -top-32 size-[400px] rounded-full bg-brand-emerald/[0.08] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-brand-emerald/[0.06] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Why MoveSmart
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-4xl">
            Renting,{' '}
            <span className="text-brand-emerald">Done Right</span>
          </h2>
        </div>

        <RevealOnScroll className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {WHY_PILLARS.map((item) => (
            <motion.div
              key={item.title}
              variants={revealItem}
              className="rounded-2xl border border-white/[0.08] bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand-emerald/20 text-xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
