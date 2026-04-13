'use client'

import { TrendingUp, Clock, MapPin } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

interface CaseStudy {
  clientName: string
  propertyType: string
  city: string
  challenge: string
  outcome: string
  daysToRent: number
  annualSavings?: string
  rentAchieved?: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    clientName: 'Sarah M.',
    propertyType: '2-Bed Condo',
    city: 'Toronto',
    challenge: 'Unit sat vacant for 3 months with previous manager. Losing $7,200 in rental income.',
    outcome: 'Rented to a qualified tenant at $2,600/mo - $200 above asking.',
    daysToRent: 9,
    annualSavings: '$4,200',
    rentAchieved: '$2,600/mo',
  },
  {
    clientName: 'David & Lisa R.',
    propertyType: '3-Bed Townhouse',
    city: 'Mississauga',
    challenge: 'First-time landlords overwhelmed by tenant screening, lease paperwork, and compliance.',
    outcome: 'Fully managed from listing to move-in. Tenant placed, lease signed, rent flowing.',
    daysToRent: 12,
    annualSavings: '$3,800',
    rentAchieved: '$3,100/mo',
  },
  {
    clientName: 'Michael K.',
    propertyType: 'Basement Apartment',
    city: 'Hamilton',
    challenge: 'Previous tenant left owing 2 months rent. Property needed turnover prep.',
    outcome: 'Unit prepared, advertised on 50+ platforms, qualified tenant placed with rent guarantee.',
    daysToRent: 7,
    annualSavings: '$2,400',
    rentAchieved: '$1,750/mo',
  },
]

export function CaseStudySection() {
  return (
    <section className="py-14 lg:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="blur">
          <div className="text-center mb-10">
            <p className="text-brand-emerald font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Real Results
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-navy mb-6">
              See What We&apos;ve Done for Property Owners
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Real stories from real property owners across Ontario. No fluff - just measurable outcomes.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, i) => (
            <RevealOnScroll key={study.clientName} variant="slideUp" delay={i * 0.1}>
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                {/* Location badge */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{study.city} - {study.propertyType}</span>
                </div>

                {/* Challenge */}
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  &ldquo;{study.challenge}&rdquo;
                </p>

                {/* Outcome */}
                <p className="text-brand-navy font-medium mb-6 leading-relaxed">
                  {study.outcome}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-brand-emerald" />
                      <span className="text-xs text-slate-500">Days to Rent</span>
                    </div>
                    <p className="font-heading font-bold text-2xl text-brand-navy tabular-nums">
                      {study.daysToRent}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-brand-emerald" />
                      <span className="text-xs text-slate-500">Rent Achieved</span>
                    </div>
                    <p className="font-heading font-bold text-2xl text-brand-navy">
                      {study.rentAchieved}
                    </p>
                  </div>
                </div>

                {/* Client name */}
                <p className="mt-6 text-sm font-medium text-slate-500">
                  - {study.clientName}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
