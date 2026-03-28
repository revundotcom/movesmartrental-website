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
import { buildRealEstateListingSchema } from '@/lib/schema-builders/real-estate-listing'
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

  return generatePageMetadata({
    seo: listing.seo,
    path: `/ca/${province}/${city}/rentals/${slug}`,
    fallbackTitle: `${listing.title} | ${cityTitle}`,
    fallbackDescription: `${listing.bedrooms} bedroom ${listing.category?.propertyType || 'rental'} for rent at ${formatPrice(listing.price)}/month in ${cityTitle}. Apply online today.`,
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

  return (
    <main>
      {/* JSON-LD */}
      <JsonLd data={listingSchema} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: provinceTitle, href: `/ca/${province}/` },
            { label: cityTitle, href: `/ca/${province}/${city}/` },
            { label: 'Rentals', href: `/ca/${province}/${city}/` },
            {
              label: listing.title,
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
                    alt={image.alt || `${listing.title} - Photo ${index + 1}`}
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
            {/* Header */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {listing.title}
            </h1>

            <p className="mt-2 text-3xl font-bold text-primary">
              {formatPrice(listing.price)}/month
            </p>

            <p className="mt-2 text-lg text-muted-foreground">
              {listing.address}
            </p>

            {/* Key Stats */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Bed className="size-5 text-muted-foreground" />
                <span className="font-medium">
                  {listing.bedrooms}{' '}
                  {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="size-5 text-muted-foreground" />
                <span className="font-medium">
                  {listing.bathrooms}{' '}
                  {listing.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                </span>
              </div>
              {listing.sqft && (
                <div className="flex items-center gap-2">
                  <Maximize className="size-5 text-muted-foreground" />
                  <span className="font-medium">
                    {listing.sqft.toLocaleString('en-CA')} sqft
                  </span>
                </div>
              )}
            </div>

            {/* Availability Badge */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
                  listing.available
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span
                  className={`size-2 rounded-full ${
                    listing.available ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                {listing.available
                  ? listing.availableDate
                    ? `Available from ${formatDate(listing.availableDate)}`
                    : 'Available'
                  : 'Not Available'}
              </span>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold">Description</h2>
                <PortableTextBody value={listing.description} />
              </div>
            )}
          </div>

          {/* Sidebar - Property Details */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-bold">Property Details</h2>
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Bed className="size-4" />
                    Bedrooms
                  </dt>
                  <dd className="font-medium">{listing.bedrooms}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Bath className="size-4" />
                    Bathrooms
                  </dt>
                  <dd className="font-medium">{listing.bathrooms}</dd>
                </div>
                {listing.sqft && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Maximize className="size-4" />
                      Square Footage
                    </dt>
                    <dd className="font-medium">
                      {listing.sqft.toLocaleString('en-CA')} sqft
                    </dd>
                  </div>
                )}
                {listing.category && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Home className="size-4" />
                      Property Type
                    </dt>
                    <dd className="font-medium capitalize">
                      {listing.category.propertyType}
                    </dd>
                  </div>
                )}
                {listing.availableDate && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-4" />
                      Available Date
                    </dt>
                    <dd className="font-medium">
                      {formatDate(listing.availableDate)}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 space-y-3">
                <Link
                  href="/contact/"
                  className="block w-full rounded-lg bg-primary px-4 py-3 text-center font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact/"
                  className="block w-full rounded-lg border border-border px-4 py-3 text-center font-medium transition-colors hover:bg-accent"
                >
                  Book a Viewing
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABannerBlock
        headline="Interested in this property?"
        primaryCta={{ label: 'Apply Now', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Viewing', href: '/contact/' }}
      />
    </main>
  )
}
