'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin, ArrowRight, Search, X } from 'lucide-react'

import { resolvePropertyImage } from '@/lib/portal-api'
import type { Property } from '@/types/property'

interface Props {
  properties: Property[]
}

type BedFilter = 'any' | '1' | '2' | '3' | '4+'
type PriceFilter = 'any' | 'under-2000' | '2000-3000' | '3000-4000' | '4000-plus'
type TypeFilter = 'any' | string

const BED_OPTIONS: BedFilter[] = ['any', '1', '2', '3', '4+']

const PRICE_OPTIONS: { value: PriceFilter; label: string }[] = [
  { value: 'any', label: 'Any price' },
  { value: 'under-2000', label: 'Under $2,000' },
  { value: '2000-3000', label: '$2,000 – $3,000' },
  { value: '3000-4000', label: '$3,000 – $4,000' },
  { value: '4000-plus', label: '$4,000+' },
]

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Contact for price'
  return `$${price.toLocaleString('en-CA')}/mo`
}

function bedsOf(p: Property): number {
  if (typeof p.bedrooms === 'number' && p.bedrooms > 0) return p.bedrooms
  const n = parseInt(String(p.number_of_bedrooms || '').replace(/[^\d]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

function matchesBeds(p: Property, f: BedFilter): boolean {
  if (f === 'any') return true
  const b = bedsOf(p)
  if (f === '4+') return b >= 4
  return b === parseInt(f, 10)
}

function matchesPrice(p: Property, f: PriceFilter): boolean {
  if (f === 'any') return true
  const price = p.website_price ?? 0
  if (price === 0) return false
  switch (f) {
    case 'under-2000':
      return price < 2000
    case '2000-3000':
      return price >= 2000 && price < 3000
    case '3000-4000':
      return price >= 3000 && price < 4000
    case '4000-plus':
      return price >= 4000
  }
}

function PropertyCard({ property }: { property: Property }) {
  const imageUrl = resolvePropertyImage(property.cover_image ?? property.cover_thumb)
  const beds = property.bedrooms ?? property.number_of_bedrooms ?? '—'
  const baths = property.bathrooms ?? property.number_of_bathrooms ?? '—'
  const sqftLabel = property.approximate_square_footage || property.above_grade_sqft
  const isAvailable =
    (property.availability ?? '').toLowerCase() === 'available' ||
    (property.status ?? '').toLowerCase() === 'available'

  return (
    <Link
      href={`/properties/${property.slug}/`}
      className="group block"
      aria-label={`View details for ${property.unit_name}`}
    >
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
        {imageUrl ? (
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={property.unit_name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute left-3 top-3">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                  isAvailable ? 'bg-[#10B981] text-white' : 'bg-slate-600 text-white'
                }`}
              >
                {isAvailable ? 'Available' : property.availability || 'Unavailable'}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative flex aspect-video w-full items-center justify-center bg-slate-100">
            <MapPin className="size-8 text-slate-300" />
            <div className="absolute left-3 top-3">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                  isAvailable ? 'bg-[#10B981] text-white' : 'bg-slate-600 text-white'
                }`}
              >
                {isAvailable ? 'Available' : property.availability || 'Unavailable'}
              </span>
            </div>
          </div>
        )}

        <div className="p-5">
          <p className="text-2xl font-bold text-[#10B981]">
            {formatPrice(property.website_price)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
              <Bed className="size-3.5" />
              {beds} {String(beds) === '1' ? 'Bed' : 'Beds'}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
              <Bath className="size-3.5" />
              {baths} {String(baths) === '1' ? 'Bath' : 'Baths'}
            </span>
            {sqftLabel && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                <Maximize className="size-3.5" />
                {sqftLabel} sqft
              </span>
            )}
          </div>

          <p className="mt-3 flex items-start gap-1.5 text-sm text-slate-500">
            <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <span className="line-clamp-2">{property.unit_address}</span>
          </p>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <span className="inline-flex items-center text-sm font-medium text-[#10B981] transition-colors group-hover:text-[#059669]">
              View Details
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function PropertiesBrowser({ properties }: Props) {
  const [query, setQuery] = useState('')
  const [cityFilter, setCityFilter] = useState<string>('any')
  const [bedFilter, setBedFilter] = useState<BedFilter>('any')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('any')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('any')

  const cities = useMemo(() => {
    const set = new Set<string>()
    for (const p of properties) {
      const c = p.building?.city
      if (c) set.add(c)
    }
    return Array.from(set).sort()
  }, [properties])

  const propertyTypes = useMemo(() => {
    const set = new Set<string>()
    for (const p of properties) {
      const t = p.property_sub_type || p.property_type
      if (t) set.add(t)
    }
    return Array.from(set).sort()
  }, [properties])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return properties.filter((p) => {
      if (cityFilter !== 'any' && p.building?.city !== cityFilter) return false
      if (!matchesBeds(p, bedFilter)) return false
      if (!matchesPrice(p, priceFilter)) return false
      if (typeFilter !== 'any') {
        const t = p.property_sub_type || p.property_type
        if (t !== typeFilter) return false
      }
      if (q) {
        const haystack = `${p.unit_name} ${p.unit_address} ${p.building?.neighbourhood ?? ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [properties, query, cityFilter, bedFilter, priceFilter, typeFilter])

  const hasActiveFilter =
    query.trim() !== '' ||
    cityFilter !== 'any' ||
    bedFilter !== 'any' ||
    priceFilter !== 'any' ||
    typeFilter !== 'any'

  function clearFilters() {
    setQuery('')
    setCityFilter('any')
    setBedFilter('any')
    setPriceFilter('any')
    setTypeFilter('any')
  }

  return (
    <>
      {/* Filter bar */}
      <section
        className="sticky top-16 z-10 -mx-4 mb-6 border-b border-slate-100 bg-white/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-[72px] lg:-mx-8 lg:px-8"
        aria-label="Filter properties"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by address, neighbourhood…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-[#0B1D3A] placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0B1D3A] focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200"
            aria-label="Filter by city"
          >
            <option value="any">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={bedFilter}
            onChange={(e) => setBedFilter(e.target.value as BedFilter)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0B1D3A] focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200"
            aria-label="Filter by bedrooms"
          >
            {BED_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b === 'any' ? 'Any beds' : b === '4+' ? '4+ beds' : `${b} bed${b === '1' ? '' : 's'}`}
              </option>
            ))}
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0B1D3A] focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200"
            aria-label="Filter by price"
          >
            {PRICE_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          {propertyTypes.length > 0 && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0B1D3A] focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200"
              aria-label="Filter by property type"
            >
              <option value="any">Any type</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}

          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              <X className="size-4" /> Clear
            </button>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Showing <span className="font-semibold text-[#0B1D3A]">{filtered.length}</span>{' '}
          of <span className="font-semibold text-[#0B1D3A]">{properties.length}</span> live listings
        </p>
      </section>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <h2 className="font-display text-2xl text-[#0B1D3A]">
            No properties match those filters
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Try widening your search, or clear filters to see every available unit.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <section
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Property listings"
        >
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </section>
      )}
    </>
  )
}
