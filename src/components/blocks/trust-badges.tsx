'use client'

import { Shield, BadgeCheck, Award, ScrollText, Building } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const BADGES = [
  {
    acronym: 'RECO',
    name: 'Real Estate Council of Ontario',
    description: 'Licensed real estate professionals',
    icon: Shield,
  },
  {
    acronym: 'FRPO',
    name: 'Federation of Rental-housing Providers',
    description: 'Ontario landlord industry body',
    icon: Building,
  },
  {
    acronym: 'BBB',
    name: 'Better Business Bureau',
    description: 'Accredited business member',
    icon: BadgeCheck,
  },
  {
    acronym: 'Equal Housing',
    name: 'Equal Housing Opportunity',
    description: 'Fair housing compliant',
    icon: ScrollText,
  },
  {
    acronym: 'OREA',
    name: 'Ontario Real Estate Association',
    description: 'Professional association member',
    icon: Award,
  },
]

export function TrustBadges() {
  return (
    <RevealOnScroll variant="fade">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {BADGES.map((badge) => {
          const Icon = badge.icon
          return (
            <div
              key={badge.acronym}
              className="group relative flex flex-col items-center text-center rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-lg"
            >
              {/* Verified tick */}
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-emerald flex items-center justify-center opacity-80">
                <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 6l2.5 2.5 4.5-5" />
                </svg>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-navy to-[#132D54] flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <Icon className="w-6 h-6 text-brand-emerald" aria-hidden="true" />
              </div>

              {/* Acronym */}
              <p className="font-heading font-bold text-sm text-brand-navy tracking-tight mb-1">
                {badge.acronym}
              </p>

              {/* Description */}
              <p className="text-[11px] text-slate-500 leading-snug">
                {badge.description}
              </p>
            </div>
          )
        })}
      </div>
    </RevealOnScroll>
  )
}
