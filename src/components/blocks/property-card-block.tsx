import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'

import type { PropertyCardBlockProps } from '@/types/blocks'

function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-CA')}/mo`
}

export function PropertyCardBlock({ listings }: PropertyCardBlockProps) {
  if (!listings || listings.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Link
            key={listing.slug}
            href={`/ca/${listing.provinceSlug}/${listing.citySlug}/rentals/${listing.slug}/`}
            className="group block"
          >
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
              {/* Image area */}
              {listing.imageUrl ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.imageAlt || listing.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Availability badge on image */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                        listing.available
                          ? 'bg-[#10B981] text-white'
                          : 'bg-slate-600 text-white'
                      }`}
                    >
                      {listing.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  {/* Street View embed as fallback thumbnail when no photo exists. */}
                  <iframe
                    title={`Street view of ${listing.title}`}
                    src={`https://maps.google.com/maps?q=&layer=c&cbll=&cbp=&output=svembed&q=${encodeURIComponent(
                      listing.address || listing.title,
                    )}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen={false}
                    className="pointer-events-none absolute inset-0 size-full border-0"
                    aria-hidden="true"
                  />
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B1D3A]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                    <MapPin className="size-3" aria-hidden="true" />
                    Street View
                  </div>
                  {/* Availability badge */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                        listing.available
                          ? 'bg-[#10B981] text-white'
                          : 'bg-slate-600 text-white'
                      }`}
                    >
                      {listing.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="p-5">
                {/* Price - prominent emerald */}
                <p className="text-2xl font-bold text-[#10B981]">
                  {formatPrice(listing.price)}
                </p>

                {/* Bedroom / bathroom badges */}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                    <Bed className="size-3.5" />
                    {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                    <Bath className="size-3.5" />
                    {listing.bathrooms}{' '}
                    {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
                  </span>
                  {listing.sqft && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                      <Maximize className="size-3.5" />
                      {listing.sqft.toLocaleString('en-CA')} sqft
                    </span>
                  )}
                </div>

                {/* Address */}
                <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="size-4 shrink-0 text-slate-400" />
                  {listing.address}
                </p>

                {/* View Details link */}
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center text-sm font-medium text-[#10B981] transition-colors group-hover:text-[#059669]">
                    View Details
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
