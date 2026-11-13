'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, MapPin, Building2, Maximize, Car, Box, Calendar, Flame, Snowflake, CheckCircle2 } from 'lucide-react'
import type { Property, PropertyBuilding } from '@/types/property'
import { resolvePropertyImage } from '@/lib/portal-api'

interface BuildingDetailProps {
  building: PropertyBuilding
  units: Property[]
  /** Building facts from the portal (year built, parking, …). */
  details?: { label: string; value: string | number }[]
  /** Building amenities from the portal. */
  amenities?: string[]
}

export function BuildingDetailClient({ building, units, details = [], amenities = [] }: BuildingDetailProps) {
  const address = `${building.street_number || ''} ${building.street_name || ''}, ${building.city || ''}, ${building.province || ''} ${building.postal_code || ''}`.trim()

  const [activeTab, setActiveTab] = React.useState<string>('all')

  const isUnitTowerA = (unit: Property) =>
    /tower[- ]?a/i.test(unit.slug || '') ||
    /tower a/i.test(unit.unit_address || '') ||
    /tower a/i.test((unit.describes as string) || '')

  const isUnitTowerB = (unit: Property) =>
    /tower[- ]?b/i.test(unit.slug || '') ||
    /tower b/i.test(unit.unit_address || '') ||
    /tower b/i.test((unit.describes as string) || '')

  const countTowerA = React.useMemo(() => units.filter(isUnitTowerA).length, [units])
  const countTowerB = React.useMemo(() => units.filter(isUnitTowerB).length, [units])
  const hasMultipleTowers = countTowerA > 0 && countTowerB > 0

  const isUnit294 = (unit: Property) =>
    /294/i.test(unit.slug || '') ||
    /294/i.test(unit.unit_name || '') ||
    /294/i.test(unit.unit_address || '')

  const isUnit286 = (unit: Property) =>
    /286/i.test(unit.slug || '') ||
    /286/i.test(unit.unit_name || '') ||
    /286/i.test(unit.unit_address || '')

  const count294 = React.useMemo(() => units.filter(isUnit294).length, [units])
  const count286 = React.useMemo(() => units.filter(isUnit286).length, [units])
  const hasMultipleChandler = !hasMultipleTowers && count294 > 0 && count286 > 0

  const visibleUnits = React.useMemo(() => {
    if (activeTab === 'tower-a') return units.filter(isUnitTowerA)
    if (activeTab === 'tower-b') return units.filter(isUnitTowerB)
    if (activeTab === 'bldg-294') return units.filter(isUnit294)
    if (activeTab === 'bldg-286') return units.filter(isUnit286)
    return units
  }, [units, activeTab])

  return (
    <div className="space-y-10">
      {/* Building Header */}
      <section aria-label="Building summary" className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-2 text-emerald-700">
            <Building2 className="size-6" />
          </span>
          <div>
            {Boolean(building.property_name) && (
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {String(building.property_name)}
              </span>
            )}
            <h1 className="font-display text-3xl text-[#0B1D3A] md:text-4xl">
              {building.building_name || 'Apartment Building'}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin className="size-4 text-slate-400" />
              {address}
            </p>
          </div>
        </div>
      </section>

      {/* Building features & amenities (shown only when the portal has some) */}
      {(details.length > 0 || amenities.length > 0) && (
        <section
          aria-label="Building features and amenities"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm"
        >
          <h2 className="font-display text-2xl text-[#0B1D3A]">Building Features &amp; Amenities</h2>

          {details.length > 0 && (
            <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {details.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2">
                  <dt className="text-sm text-slate-500">{d.label}</dt>
                  <dd className="text-right text-sm font-semibold text-[#0B1D3A]">{String(d.value)}</dd>
                </div>
              ))}
            </dl>
          )}

          {amenities.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {amenities.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Available Units Grid */}
      <section aria-label="Available Units">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="font-display text-2xl text-[#0B1D3A]">
            Available Units in this Building
          </h2>

          {hasMultipleTowers && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#0B1D3A] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Units ({units.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tower-a')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'tower-a'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tower A ({countTowerA})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tower-b')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'tower-b'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tower B ({countTowerB})
              </button>
            </div>
          )}

          {hasMultipleChandler && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#0B1D3A] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Units ({units.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bldg-294')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'bldg-294'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                294 Chandler ({count294})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bldg-286')}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'bldg-286'
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                286 Chandler ({count286})
              </button>
            </div>
          )}
        </div>

        {visibleUnits.length === 0 ? (
          <p className="text-slate-500 text-sm">No units are currently available.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleUnits.map((unit) => {
              const imageUrl = resolvePropertyImage(
                (unit.cover_image as string | { file_path?: string | null; external_link?: string | null } | null | undefined) ??
                (unit.cover_photo_url as string | undefined) ??
                unit.cover_thumb
              )
              const beds = unit.bedrooms ?? unit.number_of_bedrooms ?? '—'
              const baths = unit.bathrooms ?? unit.number_of_bathrooms ?? '—'
              const sqftDisplay = unit.approximate_square_footage || (unit.above_grade_sqft ? `${unit.above_grade_sqft} sqft` : '')

              const numPrice = typeof unit.website_price === 'number'
                ? unit.website_price
                : typeof unit.website_price === 'string'
                  ? parseFloat(unit.website_price)
                  : null

              const price = numPrice && !Number.isNaN(numPrice)
                ? `$${numPrice.toLocaleString('en-CA', { maximumFractionDigits: 0 })}/mo`
                : unit.website_price
                  ? `$${unit.website_price}/mo`
                  : 'Contact for price'

              const parking = unit.number_of_parking_spots || unit.total_parking_spaces
              const storage = unit.number_of_lockers
              
              // Helper to safely display array fields like heating/cooling
              const formatArray = (arr: unknown): string | undefined => {
                if (Array.isArray(arr)) return arr.filter(Boolean).join(', ')
                if (typeof arr === 'string') return arr
                return undefined
              }

              const heating = formatArray(unit.heating)
              const cooling = formatArray(unit.cooling)

              let availableDate = unit.available_date
              if (availableDate) {
                const d = new Date(availableDate)
                if (!Number.isNaN(d.getTime())) {
                  availableDate = d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
                }
              }

              const unitTower = isUnitTowerA(unit)
                ? 'Tower A'
                : isUnitTowerB(unit)
                  ? 'Tower B'
                  : hasMultipleChandler && isUnit294(unit)
                    ? '294 Chandler'
                    : hasMultipleChandler && isUnit286(unit)
                      ? '286 Chandler'
                      : null
              const unitSubtitle = (unit.describes as string) || (unit.badge as string) || null

              return (
                <Link
                  key={unit.id}
                  href={`/properties/${unit.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200"
                >
                  {/* Left Side: Image */}
                  <div className="relative w-full sm:w-36 shrink-0 bg-slate-100 aspect-video sm:aspect-auto">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={unit.unit_name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 144px"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-50">
                        <MapPin className="size-8 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      <span className="inline-flex items-center rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#0B1D3A] shadow-sm backdrop-blur-sm">
                        {unit.availability || 'Available'}
                      </span>
                      {unitTower && (
                        <span className="inline-flex items-center rounded-md bg-[#0B1D3A]/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm">
                          {unitTower}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Details */}
                  <div className="flex flex-1 flex-col p-4 justify-center">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <p className="line-clamp-1 text-lg font-bold text-[#0B1D3A] group-hover:text-[#10B981] transition-colors">
                          {unit.unit_name}
                        </p>
                        {unitSubtitle && (
                          <p className="mt-0.5 text-xs font-medium text-emerald-700">
                            {unitSubtitle}
                          </p>
                        )}
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-xl font-bold text-[#10B981]">{price}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Bed className="size-3.5 text-slate-400" /> {beds} {beds === 1 || beds === '1' ? 'Bed' : 'Beds'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath className="size-3.5 text-slate-400" /> {baths} {baths === 1 || baths === '1' ? 'Bath' : 'Baths'}
                      </span>
                      {sqftDisplay && (
                        <span className="inline-flex items-center gap-1 border-l border-slate-200 pl-4">
                          <Maximize className="size-3.5 text-slate-400" /> {sqftDisplay}
                        </span>
                      )}
                      {parking && (
                        <span className="inline-flex items-center gap-1 border-l border-slate-200 pl-4">
                          <Car className="size-3.5 text-slate-400" /> {parking} Parking
                        </span>
                      )}
                      {storage && (
                        <span className="inline-flex items-center gap-1 border-l border-slate-200 pl-4">
                          <Box className="size-3.5 text-slate-400" /> {storage} Storage
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                      {availableDate && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3.5 text-[#10B981]" /> Available {availableDate}
                        </span>
                      )}
                      {heating && (
                        <span className="inline-flex items-center gap-1">
                          <Flame className="size-3.5 text-orange-400" /> {heating}
                        </span>
                      )}
                      {cooling && (
                        <span className="inline-flex items-center gap-1">
                          <Snowflake className="size-3.5 text-blue-400" /> {cooling}
                        </span>
                      )}
                    </div>

                    {unit.website_description && (
                      <p className="mt-3 line-clamp-1 text-xs text-slate-400">
                        {unit.website_description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
