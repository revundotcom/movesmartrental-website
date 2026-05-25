'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Search,
  X,
  SlidersHorizontal,
  Map as MapIcon,
  List as ListIcon,
} from 'lucide-react'

import { resolvePropertyImage } from '@/lib/portal-api'
import type { Property } from '@/types/property'

const PropertiesMap = dynamic(
  () => import('./properties-map').then((m) => m.PropertiesMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[640px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Loading map…
      </div>
    ),
  },
)

type ViewMode = 'list' | 'map'

interface Props {
  properties: Property[]
}

type BedFilter = 'any' | '0' | '1' | '2' | '3' | '4+'
type BathFilter = 'any' | '1' | '1.5' | '2' | '2.5' | '3+'
type TypeFilter =
  | 'any'
  | 'condo'
  | 'apartment'
  | 'townhouse'
  | 'detached'
  | 'semi-detached'
type SortKey = 'newest' | 'price-asc' | 'price-desc'

const BED_OPTIONS: { value: BedFilter; label: string }[] = [
  { value: 'any', label: 'Any' },
  { value: '0', label: 'Studio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' },
]

const BATH_OPTIONS: { value: BathFilter; label: string }[] = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1' },
  { value: '1.5', label: '1.5' },
  { value: '2', label: '2' },
  { value: '2.5', label: '2.5' },
  { value: '3+', label: '3+' },
]

const TYPE_OPTIONS: { value: TypeFilter; label: string; match: string[] }[] = [
  { value: 'any', label: 'Any', match: [] },
  { value: 'condo', label: 'Condo', match: ['condo', 'condominium'] },
  { value: 'apartment', label: 'Apartment', match: ['apartment', 'apt'] },
  { value: 'townhouse', label: 'Townhouse', match: ['townhouse', 'town home', 'town house', 'townhome'] },
  { value: 'detached', label: 'Detached', match: ['detached'] },
  {
    value: 'semi-detached',
    label: 'Semi-detached',
    match: ['semi-detached', 'semi detached', 'semidetached'],
  },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Contact for price'
  return `$${price.toLocaleString('en-CA')}/mo`
}

function bedsOf(p: Property): number {
  if (typeof p.bedrooms === 'number' && p.bedrooms >= 0) return p.bedrooms
  const n = parseInt(String(p.number_of_bedrooms || '').replace(/[^\d]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

function bathsOf(p: Property): number {
  if (typeof p.bathrooms === 'number' && p.bathrooms >= 0) return p.bathrooms
  const raw = String(p.number_of_bathrooms || '').replace(/[^\d.]/g, '')
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}

function sqftOf(p: Property): number {
  if (typeof p.above_grade_sqft === 'number' && p.above_grade_sqft > 0) {
    return p.above_grade_sqft
  }
  const raw = String(p.approximate_square_footage || '').replace(/[^\d]/g, '')
  const n = parseInt(raw, 10)
  return Number.isFinite(n) ? n : 0
}

function typeKey(p: Property): TypeFilter | null {
  const raw = `${p.property_sub_type ?? ''} ${p.property_type ?? ''} ${p.style ?? ''}`
    .toLowerCase()
    .trim()
  if (!raw) return null
  for (const opt of TYPE_OPTIONS) {
    if (opt.value === 'any') continue
    if (opt.match.some((m) => raw.includes(m))) return opt.value
  }
  return null
}

function displayType(p: Property): string {
  const key = typeKey(p)
  if (key) {
    const opt = TYPE_OPTIONS.find((o) => o.value === key)
    if (opt) return opt.label
  }
  return p.property_sub_type || p.property_type || 'Rental'
}

function matchesBeds(p: Property, f: BedFilter): boolean {
  if (f === 'any') return true
  const b = bedsOf(p)
  if (f === '4+') return b >= 4
  return b === parseInt(f, 10)
}

function matchesBaths(p: Property, f: BathFilter): boolean {
  if (f === 'any') return true
  const b = bathsOf(p)
  if (f === '3+') return b >= 3
  return b === parseFloat(f)
}

function matchesType(p: Property, f: TypeFilter): boolean {
  if (f === 'any') return true
  return typeKey(p) === f
}

function chipClass(active: boolean): string {
  return [
    'inline-flex items-center justify-center rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
    active
      ? 'border-[#10B981] bg-[#10B981] text-white shadow-sm'
      : 'border-slate-200 bg-white text-slate-700 hover:border-[#10B981]/40 hover:bg-emerald-50',
  ].join(' ')
}

function PropertyCard({ property }: { property: Property }) {
  const imageUrl = resolvePropertyImage(property.cover_image ?? property.cover_thumb)
  const beds = bedsOf(property)
  const baths = bathsOf(property)
  const sqft = sqftOf(property)
  const sqftLabel =
    property.approximate_square_footage ||
    (sqft > 0 ? sqft.toLocaleString('en-CA') : '')
  const type = displayType(property)
  const neighbourhood = property.building?.neighbourhood
  const city = property.building?.city

  // When no photo is available, fall back to a Google Street View embed
  // anchored to the unit's coordinates (preferred) or full address.
  const streetViewSrc =
    property.latitude && property.longitude
      ? `https://www.google.com/maps?layer=c&cbll=${property.latitude},${property.longitude}&cbp=11,0,0,0,0&output=svembed`
      : `https://maps.google.com/maps?q=&layer=c&cbll=&cbp=&output=svembed&q=${encodeURIComponent(property.unit_address || property.unit_name)}`

  return (
    <Link
      href={`/properties/${property.slug}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 rounded-xl"
      aria-label={`View details for ${property.unit_name} (opens in new tab)`}
    >
      <article className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-slate-200 group-hover:shadow-xl">
        {imageUrl ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={property.unit_name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            {type && (
              <div className="absolute left-3 top-3">
                <span className="inline-block rounded-full bg-[#0B1D3A]/90 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                  {type}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
            {/* Street View embed as fallback thumbnail when no photo exists.
                `pointer-events-none` lets the parent <Link> handle the click. */}
            <iframe
              title={`Street view of ${property.unit_name}`}
              src={streetViewSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
              className="pointer-events-none absolute inset-0 size-full border-0"
              aria-hidden="true"
            />
            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B1D3A]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
              <MapPin className="size-3" aria-hidden="true" />
              Street View
            </div>
            {type && (
              <div className="absolute right-3 top-3">
                <span className="inline-block rounded-full bg-[#0B1D3A]/90 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                  {type}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-2xl font-bold text-[#10B981]">
              {formatPrice(property.website_price)}
            </p>
          </div>

          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[#0B1D3A]">
            <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <span className="line-clamp-2">{property.unit_address}</span>
          </p>
          {(neighbourhood || city) && (
            <p className="mt-1 pl-5 text-xs text-slate-500">
              {[neighbourhood, city].filter(Boolean).join(', ')}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-sm text-[#0B1D3A]">
            <span className="inline-flex items-center gap-1.5">
              <Bed className="size-4 text-slate-400" />
              <span className="font-semibold">{beds || '—'}</span>
              <span className="text-slate-500">{beds === 1 ? 'Bed' : 'Beds'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-4 text-slate-400" />
              <span className="font-semibold">{baths || '—'}</span>
              <span className="text-slate-500">{baths === 1 ? 'Bath' : 'Baths'}</span>
            </span>
            {sqftLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Maximize className="size-4 text-slate-400" />
                <span className="font-semibold">{sqftLabel}</span>
                <span className="text-slate-500">SqFt</span>
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="inline-flex items-center text-sm font-semibold text-[#10B981] transition-colors group-hover:text-[#059669]">
              View Details
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">
              Opens in new tab
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export function PropertiesBrowser({ properties }: Props) {
  const [query, setQuery] = useState('')
  const [cityFilter, setCityFilter] = useState<string>('any')
  const [bedFilter, setBedFilter] = useState<BedFilter>('any')
  const [bathFilter, setBathFilter] = useState<BathFilter>('any')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('any')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minSqft, setMinSqft] = useState<string>('')
  const [maxSqft, setMaxSqft] = useState<string>('')
  const [sortKey, setSortKey] = useState<SortKey>('newest')
  const [moreOpen, setMoreOpen] = useState<boolean>(false)
  const [view, setView] = useState<ViewMode>('list')

  const cities = useMemo(() => {
    const set = new Set<string>()
    for (const p of properties) {
      const c = p.building?.city
      if (c) set.add(c)
    }
    return Array.from(set).sort()
  }, [properties])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const min = minPrice ? parseInt(minPrice, 10) : null
    const max = maxPrice ? parseInt(maxPrice, 10) : null
    const minSq = minSqft ? parseInt(minSqft, 10) : null
    const maxSq = maxSqft ? parseInt(maxSqft, 10) : null

    const out = properties.filter((p) => {
      if (cityFilter !== 'any' && p.building?.city !== cityFilter) return false
      if (!matchesBeds(p, bedFilter)) return false
      if (!matchesBaths(p, bathFilter)) return false
      if (!matchesType(p, typeFilter)) return false

      const price = p.website_price ?? 0
      if (min != null && (price === 0 || price < min)) return false
      if (max != null && (price === 0 || price > max)) return false

      const sq = sqftOf(p)
      if (minSq != null && (sq === 0 || sq < minSq)) return false
      if (maxSq != null && (sq === 0 || sq > maxSq)) return false

      if (q) {
        const haystack = `${p.unit_name} ${p.unit_address} ${p.building?.neighbourhood ?? ''} ${p.building?.city ?? ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    const sorted = [...out]
    switch (sortKey) {
      case 'price-asc':
        sorted.sort(
          (a, b) =>
            (a.website_price ?? Number.MAX_SAFE_INTEGER) -
            (b.website_price ?? Number.MAX_SAFE_INTEGER),
        )
        break
      case 'price-desc':
        sorted.sort(
          (a, b) => (b.website_price ?? -1) - (a.website_price ?? -1),
        )
        break
      case 'newest':
      default:
        sorted.sort((a, b) => {
          const ad = a.created_at ? new Date(a.created_at).getTime() : 0
          const bd = b.created_at ? new Date(b.created_at).getTime() : 0
          return bd - ad
        })
        break
    }
    return sorted
  }, [
    properties,
    query,
    cityFilter,
    bedFilter,
    bathFilter,
    typeFilter,
    minPrice,
    maxPrice,
    minSqft,
    maxSqft,
    sortKey,
  ])

  const hasActiveFilter =
    query.trim() !== '' ||
    cityFilter !== 'any' ||
    bedFilter !== 'any' ||
    bathFilter !== 'any' ||
    typeFilter !== 'any' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    minSqft !== '' ||
    maxSqft !== ''

  function clearFilters() {
    setQuery('')
    setCityFilter('any')
    setBedFilter('any')
    setBathFilter('any')
    setTypeFilter('any')
    setMinPrice('')
    setMaxPrice('')
    setMinSqft('')
    setMaxSqft('')
  }

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-[#0B1D3A] placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm'

  return (
    <>
      {/* Filter bar — scrolls with the page (not pinned) so the
          viewport isn't crowded on small screens. */}
      <section
        className="-mx-4 mb-6 border-b border-slate-200 bg-white px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        aria-label="Filter properties"
      >
        {/* Row 1: search + city + sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by address or neighbourhood…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-base text-[#0B1D3A] placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            />
          </div>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base text-[#0B1D3A] focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
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
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base text-[#0B1D3A] focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:text-sm"
            aria-label="Sort properties"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Sort: {o.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-[#0B1D3A] transition-colors hover:bg-slate-50"
            aria-expanded={moreOpen}
            aria-controls="advanced-filters"
          >
            <SlidersHorizontal className="size-4" />
            {moreOpen ? 'Hide filters' : 'Filters'}
          </button>

          <div
            className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white"
            role="group"
            aria-label="View toggle"
          >
            <button
              type="button"
              onClick={() => setView('list')}
              aria-pressed={view === 'list'}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors ${
                view === 'list'
                  ? 'bg-[#0B1D3A] text-white'
                  : 'text-[#0B1D3A] hover:bg-slate-50'
              }`}
            >
              <ListIcon className="size-4" />
              List
            </button>
            <button
              type="button"
              onClick={() => setView('map')}
              aria-pressed={view === 'map'}
              className={`inline-flex items-center gap-1.5 border-l border-slate-200 px-3 py-2.5 text-sm font-medium transition-colors ${
                view === 'map'
                  ? 'bg-[#0B1D3A] text-white'
                  : 'text-[#0B1D3A] hover:bg-slate-50'
              }`}
            >
              <MapIcon className="size-4" />
              Map
            </button>
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            >
              <X className="size-4" /> Clear all
            </button>
          )}
        </div>

        {/* Collapsible filter panel — beds, baths, type, price, sqft.
            All filter fields live here so the bar stays compact. */}
        {moreOpen && (
          <div
            id="advanced-filters"
            className="mt-4 space-y-4 rounded-lg border border-slate-100 bg-slate-50/50 p-4"
          >
            {/* Beds */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Beds
              </span>
              {BED_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setBedFilter(o.value)}
                  className={chipClass(bedFilter === o.value)}
                  aria-pressed={bedFilter === o.value}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {/* Baths */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Baths
              </span>
              {BATH_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setBathFilter(o.value)}
                  className={chipClass(bathFilter === o.value)}
                  aria-pressed={bathFilter === o.value}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {/* Type */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Type
              </span>
              {TYPE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setTypeFilter(o.value)}
                  className={chipClass(typeFilter === o.value)}
                  aria-pressed={typeFilter === o.value}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {/* Price + square footage */}
            <div className="grid grid-cols-1 gap-4 border-t border-slate-200/70 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Min price ($/mo)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="e.g. 2000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value.replace(/[^\d]/g, ''))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Max price ($/mo)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="e.g. 4500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value.replace(/[^\d]/g, ''))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Min sqft
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="e.g. 600"
                  value={minSqft}
                  onChange={(e) => setMinSqft(e.target.value.replace(/[^\d]/g, ''))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Max sqft
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="e.g. 1500"
                  value={maxSqft}
                  onChange={(e) => setMaxSqft(e.target.value.replace(/[^\d]/g, ''))}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="font-semibold text-[#0B1D3A]">{filtered.length}</span>{' '}
            of{' '}
            <span className="font-semibold text-[#0B1D3A]">{properties.length}</span>{' '}
            live listings
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-[#10B981] hover:text-[#059669] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </section>

      {/* Results: empty state, map view, or grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <h2 className="font-display text-2xl text-[#0B1D3A]">
            No properties match those filters
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Try widening your search, or clear filters to see every available
            unit.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
          >
            Clear all filters
          </button>
        </div>
      ) : view === 'map' ? (
        <PropertiesMap properties={filtered} />
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
