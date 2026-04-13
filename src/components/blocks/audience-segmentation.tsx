'use client'

import Link from 'next/link'
import { Building, Home, ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const AUDIENCES = [
  {
    icon: Building,
    title: 'For Property Owners',
    description: 'Full-service property management with zero upfront cost. Tenant placement, screening, rent guarantee, and ongoing management - so you can earn passive income without the headaches.',
    features: ['14-Day Tenant Placement', 'Professional Screening', 'Rent Guarantee', 'Dedicated Manager', 'Self-Serve Portal'],
    cta: 'Explore Owner Services',
    href: '/owners/',
    accent: 'emerald' as const,
  },
  {
    icon: Home,
    title: 'For Tenants',
    description: 'Find your next home from our portfolio of professionally managed properties across Ontario. Verified listings, transparent pricing, and a smooth rental experience from application to move-in.',
    features: ['Verified Listings', 'Online Applications', 'Transparent Pricing', 'Responsive Management', 'Maintenance Portal'],
    cta: 'Browse Rentals',
    href: '/tenants/',
    accent: 'gold' as const,
  },
]

export function AudienceSegmentation() {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="blur">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-brand-navy mb-6">
              How Can We Help You?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Whether you own rental property or are searching for your next home, MoveSmart Rentals has you covered.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {AUDIENCES.map((audience, i) => (
            <RevealOnScroll key={audience.title} variant="slideUp" delay={i * 0.15}>
              <Link href={audience.href} className="group block">
                <div className={`relative rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 border ${
                  audience.accent === 'emerald'
                    ? 'bg-brand-navy hover:bg-brand-navy-light border-white/10 hover:border-brand-emerald/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-brand-gold/30 shadow-sm hover:shadow-lg'
                }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    audience.accent === 'emerald'
                      ? 'bg-brand-emerald/10'
                      : 'bg-brand-gold/10'
                  }`}>
                    <audience.icon className={`w-7 h-7 ${
                      audience.accent === 'emerald' ? 'text-brand-emerald' : 'text-brand-gold'
                    }`} />
                  </div>

                  <h3 className={`font-heading font-bold text-2xl mb-4 ${
                    audience.accent === 'emerald' ? 'text-white' : 'text-brand-navy'
                  }`}>
                    {audience.title}
                  </h3>

                  <p className={`mb-6 leading-relaxed ${
                    audience.accent === 'emerald' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {audience.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {audience.features.map((feature) => (
                      <li key={feature} className={`flex items-center gap-2 text-sm ${
                        audience.accent === 'emerald' ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          audience.accent === 'emerald' ? 'bg-brand-emerald' : 'bg-brand-gold'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <span className={`inline-flex items-center gap-2 font-heading font-semibold transition-colors ${
                    audience.accent === 'emerald'
                      ? 'text-brand-emerald group-hover:text-brand-emerald-light'
                      : 'text-brand-gold group-hover:text-brand-gold-light'
                  }`}>
                    {audience.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
