'use client'

import { Shield, Clock, DollarSign, Unlock } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const GUARANTEES = [
  {
    icon: Clock,
    title: '14-Day Placement Guarantee',
    description: 'We find a qualified tenant within 14 days or the first month of management is free.',
    detail: 'Our average fill time is just 14 days across 500+ managed properties.',
  },
  {
    icon: DollarSign,
    title: 'Rent Protection Guarantee',
    description: 'Your rental income is protected. If a tenant we place misses rent, we cover it.',
    detail: 'Peace of mind that your investment is always generating income.',
  },
  {
    icon: Shield,
    title: '24-Hour Response Guarantee',
    description: 'Every inquiry answered within 24 hours. Your dedicated manager is always a call away.',
    detail: 'Real humans, real responses. No automated runarounds.',
  },
  {
    icon: Unlock,
    title: 'No Lock-In Guarantee',
    description: 'No long-term contracts. No cancellation fees. We earn your business every month.',
    detail: 'If you\'re not happy, you\'re free to leave. That\'s how confident we are.',
  },
]

export function GuaranteeSection() {
  return (
    <section className="relative bg-brand-navy py-14 lg:py-20 overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="blur">
          <div className="text-center mb-10">
            <p className="text-brand-emerald font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Our Promise to You
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              The MoveSmart Guarantee
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We put our money where our mouth is. No other property management company in Canada offers these guarantees.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {GUARANTEES.map((guarantee, i) => (
            <RevealOnScroll key={guarantee.title} variant="slideUp" delay={i * 0.1}>
              <div className="group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] hover:border-brand-emerald/30 hover:bg-white/[0.06]">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-emerald/10 flex items-center justify-center group-hover:bg-brand-emerald/20 transition-colors">
                    <guarantee.icon className="w-6 h-6 text-brand-emerald" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      {guarantee.title}
                    </h3>
                    <p className="text-slate-300 mb-2 leading-relaxed">
                      {guarantee.description}
                    </p>
                    <p className="text-sm text-slate-400">
                      {guarantee.detail}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
