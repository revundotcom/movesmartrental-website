'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, MapPin, Building2, Maximize, Car, Box, Calendar, Flame, Snowflake } from 'lucide-react'
import type { Property, PropertyBuilding } from '@/types/property'
import { resolvePropertyImage } from '@/lib/portal-api'

interface BuildingDetailProps {
  building: PropertyBuilding
  units: Property[]
}

export function BuildingDetailClient({ building, units }: BuildingDetailProps) {
  const address = `${building.street_number || ''} ${building.street_name || ''}, ${building.city || ''}, ${building.province || ''} ${building.postal_code || ''}`.trim()

  return (
    <div className="space-y-10">
      {/* Building Header */}
      <section aria-label="Building summary" className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-2 text-emerald-700">
            <Building2 className="size-6" />
          </span>
          <div>
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

      {/* Available Units Grid */}
      <section aria-label="Available Units">
        <h2 className="font-display text-2xl text-[#0B1D3A] mb-6">
          Available Units in this Building
        </h2>
        {units.length === 0 ? (
          <p className="text-slate-500 text-sm">No units are currently available.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {units.map((unit) => {
              const imageUrl = resolvePropertyImage(unit.cover_image ?? unit.cover_thumb)
              const beds = unit.bedrooms ?? unit.number_of_bedrooms ?? '—'
              const baths = unit.bathrooms ?? unit.number_of_bathrooms ?? '—'
              const sqftDisplay = unit.approximate_square_footage || (unit.above_grade_sqft ? `${unit.above_grade_sqft} sqft` : '')
              const price = unit.website_price ? `$${unit.website_price.toLocaleString('en-CA')}/mo` : 'Contact for price'
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

              return (
                <Link
                  key={unit.id}
                  href={`/properties/${unit.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200"
                >
                  {/* Left Side: Image */}
                  <div className="relative w-full sm:w-32 shrink-0 bg-slate-100 aspect-video sm:aspect-auto">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={unit.unit_name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 128px"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-50">
                        <MapPin className="size-8 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="inline-flex items-center rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#0B1D3A] shadow-sm backdrop-blur-sm">
                        {unit.availability || 'Available'}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Details */}
                  <div className="flex flex-1 flex-col p-4 justify-center">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <p className="line-clamp-1 text-lg font-bold text-[#0B1D3A] group-hover:text-[#10B981] transition-colors">
                          {unit.unit_name}
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-xl font-bold text-[#10B981]">{price}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Bed className="size-3.5 text-slate-400" /> {beds} Beds
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath className="size-3.5 text-slate-400" /> {baths} Baths
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
