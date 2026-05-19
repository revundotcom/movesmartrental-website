'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Home as HomeIcon, TrendingDown } from 'lucide-react'

import type { CityFeature } from '@/data/geo-market-data'

interface StateCityGridProps {
  cities: CityFeature[]
  stateName: string
  stateSlug: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function StateCityGrid({ cities, stateName, stateSlug }: StateCityGridProps) {
  if (cities.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {cities.map((city, i) => {
        const href = `/us/${stateSlug}/${city.slug}/`
        return (
          <motion.article
            key={city.slug}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-lg"
          >
            {/* Photo header 16:10 */}
            <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
              <Image
                src={city.imageUrl}
                alt={city.imageAlt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent"
              />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                <span aria-hidden="true" className="text-sm">
                  {String.fromCodePoint(0x1f1fa, 0x1f1f8)}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  {city.name}
                </span>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-6">
              {/* Neighborhood chips (limit 4 visible) */}
              {city.neighborhoods.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {city.neighborhoods.slice(0, 4).map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              )}

              {/* Stat chips */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-navy/5 px-2 py-1 text-[11px] font-semibold text-brand-navy">
                  <Users className="size-3" aria-hidden="true" />
                  {city.population}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-emerald/10 px-2 py-1 text-[11px] font-semibold text-brand-emerald">
                  <HomeIcon className="size-3" aria-hidden="true" />
                  {city.medianRent}
                </span>
                {city.vacancy && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-brand-gold/10 px-2 py-1 text-[11px] font-semibold text-amber-700">
                    <TrendingDown className="size-3" aria-hidden="true" />
                    {city.vacancy} vacancy
                  </span>
                )}
              </div>

              {/* Why-here blurb */}
              <p className="mt-auto text-sm leading-relaxed text-slate-600">{city.whyHere}</p>
            </div>
          </motion.article>
        )
      })}
      {/* Force-render stateName in DOM for accessibility on screen-readers traversing the section */}
      <span className="sr-only">All cities served in {stateName}.</span>
    </div>
  )
}
