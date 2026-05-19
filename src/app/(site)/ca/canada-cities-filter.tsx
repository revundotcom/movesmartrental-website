'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, MapPin } from 'lucide-react'

import { CANADA_PROVINCES } from '@/data/geo-market-data'

interface FlatCity {
  name: string
  slug: string
  population: string
  medianRent: string
  imageUrl: string
  imageAlt: string
  province: string
  provinceSlug: string
}

const ALL_CITIES: FlatCity[] = CANADA_PROVINCES.flatMap((p) =>
  p.topCities.map((c) => ({
    name: c.name,
    slug: c.slug,
    population: c.population,
    medianRent: c.medianRent,
    imageUrl: c.imageUrl,
    imageAlt: c.imageAlt,
    province: p.name,
    provinceSlug: p.slug,
  }))
)

const PROVINCE_PILLS: Array<{ label: string; slug: string | 'all' }> = [
  { label: 'All', slug: 'all' },
  { label: 'Ontario', slug: 'ontario' },
  { label: 'Quebec', slug: 'quebec' },
  { label: 'BC', slug: 'british-columbia' },
  { label: 'Alberta', slug: 'alberta' },
  { label: 'Manitoba', slug: 'manitoba' },
  { label: 'Nova Scotia', slug: 'nova-scotia' },
]

export function CanadaCitiesFilter() {
  const [query, setQuery] = useState('')
  const [province, setProvince] = useState<string>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_CITIES.filter((c) => {
      const matchesProvince = province === 'all' || c.provinceSlug === province
      if (!matchesProvince) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.province.toLowerCase().includes(q)
      )
    })
  }, [query, province])

  return (
    <div>
      {/* Province filter pill row */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {PROVINCE_PILLS.map((pill) => {
          const isActive = province === pill.slug
          return (
            <button
              key={pill.slug}
              type="button"
              onClick={() => setProvince(pill.slug)}
              aria-pressed={isActive}
              className={[
                'rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200',
                isActive
                  ? 'border-brand-emerald bg-brand-emerald text-white shadow-sm'
                  : 'border-brand-navy/15 bg-white text-brand-navy/70 hover:border-brand-emerald/50 hover:text-brand-emerald',
              ].join(' ')}
            >
              {pill.label}
            </button>
          )
        })}
      </div>

      {/* Search input */}
      <div className="mx-auto mb-10 w-full max-w-md">
        <label htmlFor="ca-city-search" className="sr-only">
          Search Canadian cities
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-navy/40"
          />
          <input
            id="ca-city-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or province"
            className="w-full rounded-full border border-brand-navy/15 bg-white py-3.5 pl-12 pr-5 text-sm text-brand-navy shadow-sm transition-colors placeholder:text-brand-navy/40 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-brand-emerald/30 sm:text-base"
          />
        </div>
        <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-brand-navy/50">
          Showing {filtered.length} of {ALL_CITIES.length} cities
        </p>
      </div>

      {/* Cities grid */}
      {filtered.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-brand-navy/10 bg-white px-8 py-12 text-center shadow-sm">
          <div className="mx-auto mb-4 inline-flex size-12 items-center justify-center rounded-full bg-brand-emerald/10 text-brand-emerald">
            <Search className="size-5" aria-hidden="true" />
          </div>
          <p className="font-display text-xl font-normal text-brand-navy">
            No cities match your search
          </p>
          <p className="mt-2 text-sm text-brand-navy/60">
            Try a different city name or pick another province above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((city, i) => (
            <motion.div
              key={`${city.provinceSlug}-${city.slug}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: Math.min(i, 12) * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <Link
                href={`/ca/${city.provinceSlug}/${city.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy/5">
                  <Image
                    src={city.imageUrl}
                    alt={city.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="font-display text-lg font-normal leading-tight text-brand-navy transition-colors group-hover:text-brand-emerald">
                      {city.name}
                    </h3>
                    <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-brand-navy/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-navy/60">
                      <MapPin className="size-3" aria-hidden="true" />
                      {city.province}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-2 text-[11px] font-medium">
                    <span className="rounded-full bg-brand-navy/[0.04] px-2.5 py-1 text-brand-navy/70">
                      {city.population}
                    </span>
                    <span className="rounded-full bg-brand-emerald/10 px-2.5 py-1 text-brand-emerald">
                      {city.medianRent}/mo
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
