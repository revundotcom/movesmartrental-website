'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'

interface NearbyCity {
  name: string
  slug: string
  provinceSlug: string
  medianRent?: number
}

interface NearbyCitiesProps {
  cities: NearbyCity[]
  currentCity: string
  country?: 'ca' | 'us'
}

export function NearbyCities({ cities, currentCity, country = 'ca' }: NearbyCitiesProps) {
  if (cities.length === 0) return null

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">Explore Nearby</p>
          <h2 className="font-display text-2xl font-normal tracking-tight text-[#0B1D3A] sm:text-3xl">
            White-Glove Leasing Near {currentCity}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.slice(0, 6).map((city, i) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={`/${country}/${city.provinceSlug}/${city.slug}/`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 transition-colors group-hover:bg-emerald-100">
                  <MapPin className="size-5 text-emerald-600" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0B1D3A] group-hover:text-emerald-700">{city.name}</p>
                  {city.medianRent && (
                    <p className="text-xs text-slate-400">Median rent: ${city.medianRent.toLocaleString()}/mo</p>
                  )}
                </div>
                <ArrowRight className="size-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-500" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
