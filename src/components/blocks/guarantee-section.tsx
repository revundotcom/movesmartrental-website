'use client'

import { Shield, Clock, DollarSign, Unlock } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const GUARANTEES = [
  {
    icon: Clock,
    title: '14-Day Placement Target',
    description: 'We aim to place a qualified tenant within 14 days. If we miss, we keep marketing your unit at no extra cost until we sign one.',
    detail: 'Our average placement time is 14 days across 500+ units leased.',
  },
  {
    icon: DollarSign,
    title: 'Rental Protection Pathway',
    description: 'Optional guaranteed-rent insurance through our vetted carrier partners - coverage explained in plain English before you opt in.',
    detail: 'A partner pathway, not an in-house product. Premiums and claim mechanics sit with the carrier.',
  },
  {
    icon: Shield,
    title: 'Tenant Replacement Guarantee',
    description: 'If a tenant we placed breaks the lease in the first six months, we re-lease at no additional success fee.',
    detail: 'We carry advertising, qualification, and lease prep again on our dime.',
  },
  {
    icon: Unlock,
    title: 'No Lock-In Guarantee',
    description: 'No long-term contracts. No cancellation fees. 30-day exit, no clawback on a placement already earned.',
    detail: 'If you are not happy, you are free to leave. That is how confident we are.',
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
              We put our money where our mouth is. No other leasing brokerage in Canada writes these guarantees into the engagement.
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
