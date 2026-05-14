import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin, ArrowRight } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { getProperties, resolvePropertyImage } from '@/lib/portal-api'
import type { Property } from '@/types/property'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'Rentals & Available Properties',
  description:
    'Browse current rental properties from MoveSmart Rentals. Verified listings across Canada with full-service leasing, screening, and tenant placement.',
  alternates: {
    canonical: '/rentals/',
  },
  openGraph: {
    title: 'Rentals & Available Properties | MoveSmart Rentals',
    description:
      'Browse verified rental homes, condos, and townhouses across Canada.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rentals & Available Properties | MoveSmart Rentals',
    description:
      'Browse verified rental homes, condos, and townhouses across Canada.',
  },
}

// Refresh listings every 5 minutes — portal data is reasonably fresh
// but no need to hit the API on every visit.
export const revalidate = 300

interface RentalsPageProps {
  searchParams: Promise<{ page?: string }>
}

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Contact for price'
  return `$${price.toLocaleString('en-CA')}/mo`
}

function parsePage(raw: string | undefined): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.floor(n)
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
      href={`/rentals/${property.slug}/`}
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
                  isAvailable
                    ? 'bg-[#10B981] text-white'
                    : 'bg-slate-600 text-white'
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
                  isAvailable
                    ? 'bg-[#10B981] text-white'
                    : 'bg-slate-600 text-white'
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

function Pagination({
  currentPage,
  lastPage,
}: {
  currentPage: number
  lastPage: number
}) {
  if (lastPage <= 1) return null
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < lastPage ? currentPage + 1 : null

  return (
    <nav
      className="mt-10 flex items-center justify-between gap-3"
      aria-label="Pagination"
    >
      <div className="text-sm text-slate-500">
        Page <span className="font-semibold text-[#0B1D3A]">{currentPage}</span>{' '}
        of <span className="font-semibold text-[#0B1D3A]">{lastPage}</span>
      </div>
      <div className="flex gap-2">
        {prevPage ? (
          <Link
            href={prevPage === 1 ? '/rentals/' : `/rentals/?page=${prevPage}`}
            className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-[#0B1D3A] transition-colors hover:bg-slate-50"
            rel="prev"
          >
            Previous
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center rounded-lg border border-slate-100 px-4 py-2 text-sm font-medium text-slate-300"
          >
            Previous
          </span>
        )}
        {nextPage ? (
          <Link
            href={`/rentals/?page=${nextPage}`}
            className="inline-flex items-center rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
            rel="next"
          >
            Next
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center rounded-lg border border-slate-100 px-4 py-2 text-sm font-medium text-slate-300"
          >
            Next
          </span>
        )}
      </div>
    </nav>
  )
}

export default async function RentalsPage({ searchParams }: RentalsPageProps) {
  const sp = await searchParams
  const page = parsePage(sp.page)
  const response = await getProperties({ page })

  const properties = response?.data ?? []
  const currentPage = response?.current_page ?? page
  const lastPage = response?.last_page ?? (properties.length > 0 ? page : 1)

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Rentals & Available Properties',
    url: `${SITE_URL}/rentals/`,
    isPartOf: { '@type': 'WebSite', name: 'MoveSmart Rentals', url: SITE_URL },
  }

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Rentals', href: '/rentals/' },
          ]}
        />

        <header className="mt-6 mb-10">
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#10B981]">
            Available Now
          </p>
          <h1 className="mt-2 font-display text-4xl text-[#0B1D3A] md:text-5xl">
            Browse Rentals
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Verified rental properties managed by MoveSmart Rentals. Every
            listing is reviewed by our leasing team, with screening, lease
            execution, and move-in coordination handled end-to-end.
          </p>
        </header>

        {properties.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <h2 className="font-display text-2xl text-[#0B1D3A]">
              No listings available right now
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {response === null
                ? 'We could not load listings at the moment. Please try again in a minute.'
                : 'New properties are added regularly. Check back soon or get in touch and we will match you with upcoming inventory.'}
            </p>
            <Link
              href="/contact/?type=tenant"
              className="mt-6 inline-flex items-center rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
            >
              Contact a leasing agent
              <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </div>
        ) : (
          <>
            <section
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Property listings"
            >
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </section>
            <Pagination currentPage={currentPage} lastPage={lastPage} />
          </>
        )}
      </div>
    </main>
  )
}
