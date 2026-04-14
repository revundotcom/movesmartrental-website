import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Bed, Bath, Maximize, Calendar, Home } from 'lucide-react'
import type { PortableTextBlock } from '@portabletext/types'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { PortableTextBody } from '@/components/portable-text'
import { JsonLd } from '@/components/json-ld'
import { sanityFetch } from '@/sanity/fetch'
import { generatePageMetadata } from '@/lib/metadata'
import {
  PROPERTY_LISTING_QUERY,
  PROPERTY_LISTING_PARAMS_QUERY,
} from '@/sanity/queries/property-listing'
import {
  buildRealEstateListingSchema,
  buildBreadcrumbListSchema,
} from '@/lib/schema-builders'
import type { SeoFields } from '@/types/sanity'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ListingImage {
  asset: { _ref: string; _type: string; url?: string }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

interface ListingData {
  _id: string
  title: string
  slug: { current: string }
  price: number
  bedrooms: number
  bathrooms: number
  sqft?: number
  address: string
  description?: PortableTextBlock[]
  images?: ListingImage[]
  available: boolean
  availableDate?: string
  city: {
    _id: string
    title: string
    slug: { current: string }
    tier: number
    population?: number
    medianRent?: number
  }
  province: {
    _id: string
    title: string
    slug: { current: string }
    country: string
    abbreviation?: string
  }
  category: {
    _id: string
    title: string
    slug: { current: string }
    propertyType: string
  }
  seo?: SeoFields
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

/** Build a Sanity CDN image URL from an asset reference */
function sanityImageUrl(ref: string): string {
  const parts = ref.replace('image-', '').split('-')
  const ext = parts.pop()
  const rest = parts.join('-')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${rest}.${ext}`
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(price)
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Map a raw property-type string to the canonical /categories/ slug used by the
 * property-category template. Falls back to the single category most likely
 * to match. Keeps hrefs honest even for irregular pluralisations.
 */
function mapToCategorySlug(propertyTypeRaw: string): string {
  const t = propertyTypeRaw.toLowerCase().trim()
  if (t.includes('basement')) return 'basement-apartments-for-rent'
  if (t.includes('duplex')) return 'duplex-for-rent'
  if (t.includes('townhouse') || t.includes('town-house'))
    return 'townhouses-for-rent'
  if (t.includes('condo')) return 'condos-for-rent'
  if (t.includes('house')) return 'houses-for-rent'
  if (t.includes('apartment')) return 'apartments-for-rent'
  return 'apartments-for-rent'
}

/** Truncate description to fit meta description range (140-160 chars). */
function trimDescription(text: string, max = 158): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export const dynamicParams = true

export async function generateStaticParams() {
  const params = await sanityFetch<
    Array<{ slug: string; citySlug: string; provinceSlug: string }>
  >({
    query: PROPERTY_LISTING_PARAMS_QUERY,
    tags: ['propertyListing'],
  })

  return (params ?? []).map((p) => ({
    province: p.provinceSlug,
    city: p.citySlug,
    slug: p.slug,
  }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string; slug: string }>
}): Promise<Metadata> {
  const { province, city, slug } = await params

  const listing = await sanityFetch<ListingData | null>({
    query: PROPERTY_LISTING_QUERY,
    params: { slug },
    tags: ['propertyListing'],
  })

  if (!listing) return {}

  const cityTitle = listing.city.title
  const provinceTitle = listing.province.title
  const propertyType = capitalize(
    listing.category?.propertyType || listing.category?.title || 'Rental'
  )

  // Contract §7.5 pattern: {PropertyType} for Rent: {address} | {City}, {Province}
  const fallbackTitle = `${propertyType} for Rent: ${listing.address} | ${cityTitle}, ${provinceTitle}`

  const descBase = `${listing.bedrooms}-bedroom ${listing.bathrooms}-bathroom ${propertyType.toLowerCase()} at ${listing.address} in ${cityTitle}, ${provinceTitle} - ${formatPrice(listing.price)}/month. Apply online with MoveSmart Rentals.`

  return generatePageMetadata({
    seo: listing.seo,
    path: `/ca/${province}/${city}/rentals/${slug}`,
    fallbackTitle,
    fallbackDescription: trimDescription(descBase),
  })
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ province: string; city: string; slug: string }>
}) {
  const { province, city, slug } = await params

  const listing = await sanityFetch<ListingData | null>({
    query: PROPERTY_LISTING_QUERY,
    params: { slug },
    tags: ['propertyListing'],
  })

  if (!listing) {
    notFound()
  }

  const cityTitle = listing.city.title
  const provinceTitle = listing.province.title
  const propertyTypeRaw =
    listing.category?.propertyType || listing.category?.title || 'rental'
  const propertyType = capitalize(propertyTypeRaw)
  const pageUrl = `${SITE_URL}/ca/${province}/${city}/rentals/${slug}/`

  // Build image URLs for JSON-LD
  const imageUrls = (listing.images ?? [])
    .filter((img) => img.asset?._ref)
    .map((img) => sanityImageUrl(img.asset._ref))

  // RealEstateListing JSON-LD (SCHEMA-07)
  const listingSchema = buildRealEstateListingSchema({
    name: listing.title,
    price: listing.price,
    address: listing.address,
    numberOfRooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    sqft: listing.sqft,
    url: pageUrl,
    images: imageUrls,
    available: listing.available,
  })

  // Breadcrumb JSON-LD
  const breadcrumbSchema = buildBreadcrumbListSchema({
    crumbs: [
      { name: 'Home', url: SITE_URL },
      { name: provinceTitle, url: `${SITE_URL}/ca/${province}/` },
      { name: cityTitle, url: `${SITE_URL}/ca/${province}/${city}/` },
      {
        name: `${propertyType} Rentals`,
        url: `${SITE_URL}/ca/${province}/${city}/`,
      },
      { name: listing.address, url: pageUrl },
    ],
  })

  return (
    <main className="bg-[#FBFAF6]">
      {/* JSON-LD */}
      <JsonLd data={listingSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: provinceTitle, href: `/ca/${province}/` },
            { label: cityTitle, href: `/ca/${province}/${city}/` },
            {
              label: `${propertyType} Rentals`,
              href: `/ca/${province}/${city}/`,
            },
            {
              label: listing.address,
              href: `/ca/${province}/${city}/rentals/${slug}/`,
            },
          ]}
        />
      </div>

      {/* Image Gallery */}
      {listing.images && listing.images.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {listing.images.map((image, index) => {
              if (!image.asset?._ref) return null
              const url = sanityImageUrl(image.asset._ref)
              const altText =
                image.alt ||
                `${propertyType} at ${listing.address}, ${cityTitle} - photo ${index + 1}`
              return (
                <div
                  key={image.asset._ref}
                  className={`relative overflow-hidden rounded-lg ${
                    index === 0
                      ? 'md:col-span-2 md:row-span-2 aspect-[4/3]'
                      : 'aspect-video'
                  }`}
                >
                  <Image
                    src={url}
                    alt={altText}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes={
                      index === 0
                        ? '(max-width: 768px) 100vw, 66vw'
                        : '(max-width: 768px) 100vw, 33vw'
                    }
                  />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Listing Details */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header - single H1 */}
            <h1 className="font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
              {propertyType} for Rent at{' '}
              <span className="font-display italic text-brand-emerald">
                {listing.address}
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h1>

            <p className="mt-2 text-lg text-brand-navy/70">
              {cityTitle}, {provinceTitle}
            </p>

            <p className="mt-4 font-display text-3xl font-normal text-brand-emerald">
              {formatPrice(listing.price)}
              <span className="text-lg text-brand-navy/60">/month</span>
            </p>

            {/* Key Stats - H3 level */}
            <h3 className="sr-only">Unit at a glance</h3>
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Bed className="size-5 text-brand-emerald" />
                <span className="font-medium text-brand-navy">
                  {listing.bedrooms}{' '}
                  {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="size-5 text-brand-emerald" />
                <span className="font-medium text-brand-navy">
                  {listing.bathrooms}{' '}
                  {listing.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                </span>
              </div>
              {listing.sqft && (
                <div className="flex items-center gap-2">
                  <Maximize className="size-5 text-brand-emerald" />
                  <span className="font-medium text-brand-navy">
                    {listing.sqft.toLocaleString('en-CA')} sqft
                  </span>
                </div>
              )}
              {listing.category && (
                <div className="flex items-center gap-2">
                  <Home className="size-5 text-brand-emerald" />
                  <span className="font-medium capitalize text-brand-navy">
                    {propertyTypeRaw}
                  </span>
                </div>
              )}
            </div>

            {/* Availability Badge */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
                  listing.available
                    ? 'bg-brand-emerald/10 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <span
                  className={`size-2 rounded-full ${
                    listing.available ? 'bg-brand-emerald' : 'bg-slate-400'
                  }`}
                />
                {listing.available
                  ? listing.availableDate
                    ? `Available from ${formatDate(listing.availableDate)}`
                    : 'Available now'
                  : 'Currently not available'}
              </span>
            </div>

            {/* Address detail block - crawlable */}
            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-display text-2xl font-normal text-brand-navy">
                About this{' '}
                <span className="font-display italic text-brand-emerald">
                  listing
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-brand-navy">Address:</span>{' '}
                {listing.address}, {cityTitle}, {provinceTitle}
              </p>
              {listing.description && (
                <div className="mt-4 text-slate-700">
                  <PortableTextBody value={listing.description} />
                </div>
              )}
            </section>

            {/* Related rentals & resources - H2 */}
            <section className="mt-8">
              <h2 className="font-display text-2xl font-normal text-brand-navy">
                Keep exploring{' '}
                <span className="font-display italic text-brand-emerald">
                  {cityTitle}
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <li>
                  <Link
                    href={`/ca/${province}/${city}/`}
                    className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5"
                  >
                    All rentals in {cityTitle}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/ca/${province}/${city}/categories/${mapToCategorySlug(propertyTypeRaw)}/`}
                    className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5"
                  >
                    More {propertyTypeRaw.toLowerCase()}s for rent in {cityTitle}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/ca/${province}/`}
                    className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5"
                  >
                    Browse all {provinceTitle} cities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tenants/"
                    className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5"
                  >
                    Tenant Hub & application resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq/"
                    className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5"
                  >
                    Renter FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact/?intent=apply"
                    className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-brand-navy transition hover:border-brand-emerald hover:bg-brand-emerald/5"
                  >
                    Start a rental application
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar - Property Details */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-xl font-normal text-brand-navy">
                Property details
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-slate-600">
                    <Bed className="size-4" />
                    Bedrooms
                  </dt>
                  <dd className="font-medium text-brand-navy">
                    {listing.bedrooms}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-slate-600">
                    <Bath className="size-4" />
                    Bathrooms
                  </dt>
                  <dd className="font-medium text-brand-navy">
                    {listing.bathrooms}
                  </dd>
                </div>
                {listing.sqft && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-slate-600">
                      <Maximize className="size-4" />
                      Square footage
                    </dt>
                    <dd className="font-medium text-brand-navy">
                      {listing.sqft.toLocaleString('en-CA')} sqft
                    </dd>
                  </div>
                )}
                {listing.category && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-slate-600">
                      <Home className="size-4" />
                      Property type
                    </dt>
                    <dd className="font-medium capitalize text-brand-navy">
                      {propertyTypeRaw}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-slate-600">
                    City
                  </dt>
                  <dd className="font-medium text-brand-navy">{cityTitle}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-slate-600">
                    Province
                  </dt>
                  <dd className="font-medium text-brand-navy">
                    {provinceTitle}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-slate-600">
                    Monthly rent
                  </dt>
                  <dd className="font-medium text-brand-navy">
                    {formatPrice(listing.price)}
                  </dd>
                </div>
                {listing.availableDate && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-slate-600">
                      <Calendar className="size-4" />
                      Available date
                    </dt>
                    <dd className="font-medium text-brand-navy">
                      {formatDate(listing.availableDate)}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 space-y-3">
                <Link
                  href="/contact/?intent=apply"
                  className="block w-full rounded-lg bg-brand-emerald px-4 py-3 text-center font-medium text-white transition-colors hover:bg-emerald-600"
                >
                  Apply now
                </Link>
                <Link
                  href="/contact/?intent=viewing"
                  className="block w-full rounded-lg border border-brand-navy/15 bg-white px-4 py-3 text-center font-medium text-brand-navy transition-colors hover:border-brand-navy/30 hover:bg-slate-50"
                >
                  Book a viewing
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline="Interested in this rental?"
        description={`Start your application or book a private viewing for ${listing.address} in ${cityTitle}.`}
        primaryCta={{ label: 'Apply now', href: '/contact/?intent=apply' }}
        secondaryCta={{
          label: 'Book a viewing',
          href: '/contact/?intent=viewing',
        }}
        city={city}
      />
    </main>
  )
}
