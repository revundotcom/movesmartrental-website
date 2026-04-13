'use client'
import Link from 'next/link'
import { Building, Building2, Castle, Home, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

interface PropertyType {
  title: string
  description: string
  icon: LucideIcon
  href: string
  id: string
}

const PROPERTY_TYPES: PropertyType[] = [
  {
    title: 'Apartments for Rent',
    description:
      'Find affordable apartment rentals with verified listings and transparent pricing.',
    icon: Building2,
    href: '/tenants/',
    id: 'apartments',
  },
  {
    title: 'Condos for Rent',
    description:
      'Browse modern condo rentals with amenities like gyms, pools, and concierge services.',
    icon: Building,
    href: '/tenants/',
    id: 'condos',
  },
  {
    title: 'Houses for Rent',
    description:
      'Discover spacious house rentals with yards, garages, and family-friendly neighbourhoods.',
    icon: Home,
    href: '/tenants/',
    id: 'houses',
  },
  {
    title: 'Townhouses for Rent',
    description:
      'Explore townhouse rentals that combine the space of a house with low-maintenance living.',
    icon: Castle,
    href: '/tenants/',
    id: 'townhouses',
  },
]

export function TenantsPropertyTypes() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            Browse by Property Type
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Find Your Perfect Home
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            From downtown condos to suburban houses - verified listings across Ontario with
            transparent pricing.
          </p>
        </div>

        {/* 2×2 bento grid */}
        <RevealOnScroll className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROPERTY_TYPES.map((type) => {
            const Icon = type.icon
            return (
              <motion.div key={type.id} variants={revealItem}>
                <Link
                  href={type.href}
                  className="group relative flex items-start gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-xl hover:shadow-brand-navy/10"
                >
                  {/* Top accent bar on hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-3xl bg-gradient-to-r from-brand-emerald to-emerald-400 transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-emerald/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-emerald/15 group-hover:shadow-md">
                    <Icon className="size-7 text-brand-emerald" aria-hidden="true" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-navy transition-colors duration-200 group-hover:text-brand-emerald">
                      {type.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {type.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-emerald">
                      Browse listings
                      <svg
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}
