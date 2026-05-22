import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  CheckCircle2,
  Building2,
  Car,
  Snowflake,
  Flame,
  PawPrint,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import {
  getProperty,
  portalReserveOfferUrl,
  portalShowingScheduleUrl,
  resolvePropertyImage,
} from '@/lib/portal-api'
import type { Property, PropertyMedia } from '@/types/property'
import {
  PropertyGate,
  PropertyMediaTabs,
} from '@/components/properties/property-detail-client'
import { RentCalculator } from '@/components/blocks/rent-calculator'
import { PropertyStickyCTA } from './property-sticky-cta'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

// Per-slug pages refresh every 5 minutes via the lib's default revalidate.
export const revalidate = 300
// Allow on-demand rendering for slugs not in generateStaticParams (none).
export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const detail = await getProperty(slug)
  if (!detail) {
    return {
      title: 'Property not found',
      robots: { index: false, follow: false },
    }
  }

  const unit = detail.data.unit
  const title = `${unit.unit_name} | MoveSmart Rentals`
  const description =
    unit.description?.slice(0, 200) ||
    `${unit.number_of_bedrooms || unit.bedrooms || ''} bed, ${unit.number_of_bathrooms || unit.bathrooms || ''} bath ${
      unit.property_sub_type || 'rental'
    } at ${unit.unit_address}.`

  const image = resolvePropertyImage(unit.cover_image ?? unit.cover_thumb)

  return {
    title: unit.unit_name,
    description,
    alternates: { canonical: `/properties/${slug}/` },
    openGraph: {
      title,
      description,
      images: image ? [image] : ['/og-default.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : ['/og-default.png'],
    },
  }
}

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Contact for price'
  return `$${price.toLocaleString('en-CA')}`
}

function formatAvailableDate(value: string | null | undefined): string | null {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// "Slot-but-empty" placeholder used for IDX fields the brokerage feed will
// fill in once TREB credentials land. Renders an em-dash so the layout slot
// is visibly present (RECO requires the structure to exist before approval).
const EMPTY = '—'

function FeatureList({
  title,
  items,
  icon: Icon,
}: {
  title: string
  items: (string | null | undefined)[] | null | undefined
  icon: React.ComponentType<{ className?: string }>
}) {
  const visible = (items || []).filter(
    (v): v is string => Boolean(v) && v !== 'None',
  )
  if (visible.length === 0) return null
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-[#0B1D3A]">
        <Icon className="size-4 text-[#10B981]" />
        {title}
      </h3>
      <ul className="space-y-1.5">
        {visible.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10B981]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SimilarPropertyCard({ property }: { property: Property }) {
  const imageUrl = resolvePropertyImage(property.cover_image ?? property.cover_thumb)
  const beds = property.bedrooms ?? property.number_of_bedrooms ?? '—'
  const baths = property.bathrooms ?? property.number_of_bathrooms ?? '—'

  return (
    <Link
      href={`/properties/${property.slug}/`}
      className="group block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-video bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.unit_name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <MapPin className="size-8 text-slate-300" />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-[#10B981]">
          {property.website_price
            ? `$${property.website_price.toLocaleString('en-CA')}/mo`
            : 'Contact for price'}
        </p>
        <p className="mt-1 line-clamp-1 text-sm font-medium text-[#0B1D3A]">
          {property.unit_name}
        </p>
        <p className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Bed className="size-3.5" /> {beds}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="size-3.5" /> {baths}
          </span>
        </p>
      </div>
    </Link>
  )
}

/**
 * Two-column "label / value" card. Values that come back undefined render
 * an em-dash so the IDX-required slot is structurally present even before
 * the TREB feed is wired in.
 */
function FactCard({
  title,
  rows,
  id,
  bold = false,
}: {
  title: string
  rows: Array<{ label: string; value?: string | number | null }>
  id?: string
  bold?: boolean
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <h3
        className={
          bold
            ? 'font-heading text-base font-bold uppercase tracking-wider text-[#0B1D3A]'
            : 'font-heading text-sm font-normal uppercase tracking-wider text-[#0B1D3A]/80'
        }
      >
        {title}
      </h3>
      <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2 last:border-0 sm:last:border-b"
          >
            <dt className="shrink-0 text-slate-500">{label}</dt>
            <dd className="min-w-0 break-words text-right font-medium text-[#0B1D3A]">
              {value != null && value !== '' ? value : EMPTY}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/**
 * Room Info table. Structure required even when empty — IDX feed fills in
 * room-level data (Living Room / Bedroom / Kitchen, etc) post-approval.
 */
function RoomInfoTable() {
  const rows = [
    'Living Room',
    'Dining Room',
    'Kitchen',
    'Primary Bedroom',
    'Bedroom 2',
    'Bathroom',
  ]
  return (
    <details
      id="room-information"
      open
      className="group scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-sm font-semibold uppercase tracking-wider text-[#0B1D3A]">
        Room Information
        <span className="text-xs font-normal text-slate-400 group-open:hidden">
          Show
        </span>
        <span className="hidden text-xs font-normal text-slate-400 group-open:inline">
          Hide
        </span>
      </summary>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="py-2 pr-4 font-medium">Room</th>
              <th className="py-2 pr-4 font-medium">Level</th>
              <th className="py-2 pr-4 font-medium">Dimensions (m)</th>
              <th className="py-2 pr-4 font-medium">Dimensions (ft)</th>
              <th className="py-2 font-medium">Features</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((room) => (
              <tr key={room} className="border-b border-slate-100 last:border-0">
                <td className="py-2 pr-4 font-medium text-[#0B1D3A]">{room}</td>
                <td className="py-2 pr-4 text-slate-500">{EMPTY}</td>
                <td className="py-2 pr-4 text-slate-500">{EMPTY}</td>
                <td className="py-2 pr-4 text-slate-500">{EMPTY}</td>
                <td className="py-2 text-slate-500">{EMPTY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const detail = await getProperty(slug)

  if (!detail) {
    notFound()
  }

  const unit = detail.data.unit
  const similar = (detail.data.similar_properties || []).slice(0, 3)
  const building = unit.building
  const availableDate = formatAvailableDate(unit.available_date)
  const isAvailable =
    (unit.availability ?? '').toLowerCase() === 'available' ||
    (unit.status ?? '').toLowerCase() === 'available'

  // Portal deep links (User Action Flow §2 in the API doc).
  // Both buttons require unit.zcrm_id; when missing we fall back to the
  // contact form so the lead isn't dropped.
  const scheduleUrl = portalShowingScheduleUrl(unit.zcrm_id)
  const reserveUrl = portalReserveOfferUrl(unit.zcrm_id)

  // Collect every gallery image for the new lightbox-capable tabs panel.
  const galleryImages: string[] = []
  const cover = resolvePropertyImage(unit.cover_image ?? unit.cover_thumb)
  if (cover) galleryImages.push(cover)
  const media: PropertyMedia[] = Array.isArray(unit.media) ? unit.media : []
  for (const m of media) {
    const url = resolvePropertyImage(m)
    if (url && !galleryImages.includes(url)) galleryImages.push(url)
  }

  // Display strings for the hero / key-facts. API values fill what they
  // can; the remaining slots are intentionally left blank for the IDX feed.
  const sqftDisplay =
    unit.approximate_square_footage ||
    (unit.above_grade_sqft ? `${unit.above_grade_sqft} sqft` : undefined)

  // Schema.org for rental listing.
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: unit.unit_name,
    description: unit.description || undefined,
    url: `${SITE_URL}/properties/${slug}/`,
    numberOfBedrooms: unit.bedrooms ?? undefined,
    numberOfBathroomsTotal: unit.bathrooms ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: building?.street_number
        ? `${building.street_number} ${building.street_name || ''}`.trim()
        : undefined,
      addressLocality: building?.city || undefined,
      addressRegion: building?.province || undefined,
      postalCode: building?.postal_code || undefined,
      addressCountry: 'CA',
    },
    geo:
      unit.latitude && unit.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: unit.latitude,
            longitude: unit.longitude,
          }
        : undefined,
    offers: unit.website_price
      ? {
          '@type': 'Offer',
          price: unit.website_price,
          priceCurrency: 'CAD',
          availability: isAvailable
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        }
      : undefined,
  }

  // ------------------------------------------------------------------
  // Build the gated body once on the server so the client gate can swap
  // it in/out without re-fetching. Everything below the hero info bar
  // is RECO-protected detail data.
  // ------------------------------------------------------------------
  const gatedBody = (
    <div className="space-y-10">
      {/* Sticky quick-nav bar — jump to in-page sections */}
      <nav
        aria-label="Property section navigation"
        className="sticky top-14 z-30 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:top-16 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { label: 'Key Facts', href: '#key-facts' },
            { label: 'Property Details', href: '#property-details' },
            { label: 'Room Information', href: '#room-information' },
            { label: 'Utilities', href: '#utilities' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#0B1D3A] transition-colors hover:border-brand-emerald/40 hover:bg-emerald-50 hover:text-brand-emerald"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* About */}
      {unit.description && (
        <section aria-label="About this property">
          <h2 className="font-display text-2xl text-[#0B1D3A]">
            About this property
          </h2>
          <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate-700">
            {unit.description}
          </div>
        </section>
      )}

      {/* Key Facts (IDX) */}
      <FactCard
        id="key-facts"
        title="Key Facts"
        bold
        rows={[
          { label: 'Data Source', value: undefined },
          { label: 'MLS ID', value: undefined },
          { label: 'Price', value: formatPrice(unit.website_price) },
          { label: 'Listed By', value: undefined },
          { label: 'Days on Market', value: undefined },
          { label: 'Property Tax / annum', value: undefined },
          { label: 'Listing Date', value: undefined },
          {
            label: 'Status',
            value: isAvailable
              ? 'Active'
              : unit.status || unit.availability || undefined,
          },
        ]}
      />

      {/* Property Details */}
      <FactCard
        id="property-details"
        title="Property Details"
        rows={[
          { label: 'Type', value: unit.property_type || unit.property_sub_type },
          { label: 'Style', value: unit.style },
          { label: 'Size', value: sqftDisplay },
          { label: 'Lot Size', value: undefined },
          { label: 'Year Built', value: building?.year_built },
          {
            label: 'Heating',
            value: Array.isArray(unit.heating)
              ? unit.heating.filter(Boolean).join(', ') || undefined
              : undefined,
          },
          {
            label: 'Cooling',
            value: Array.isArray(unit.cooling)
              ? unit.cooling.filter(Boolean).join(', ') || undefined
              : undefined,
          },
          { label: 'Basement', value: unit.basement_type },
        ]}
      />

      {/* Room Info */}
      <RoomInfoTable />

      {/* Utilities */}
      <FactCard
        id="utilities"
        title="Utilities"
        rows={[
          { label: 'Electricity', value: undefined },
          { label: 'Gas', value: undefined },
          { label: 'Water', value: undefined },
          { label: 'Sewage', value: undefined },
        ]}
      />

      {/* Parking */}
      <FactCard
        title="Parking"
        rows={[
          {
            label: 'Type',
            value: Array.isArray(unit.parking_type)
              ? unit.parking_type.filter(Boolean).join(', ') || undefined
              : undefined,
          },
          { label: 'Spaces', value: unit.total_parking_spaces },
          { label: 'Garage', value: building?.garage as string | undefined },
          { label: 'Driveway', value: undefined },
        ]}
      />

      {/* Existing feature lists — kept so we don't lose data the API DOES return today */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <FeatureList
          title="Interior features"
          items={unit.interior_features}
          icon={Building2}
        />
        <FeatureList title="Heating" items={unit.heating} icon={Flame} />
        <FeatureList title="Cooling" items={unit.cooling} icon={Snowflake} />
        <FeatureList title="Parking" items={unit.parking_type} icon={Car} />
        <FeatureList
          title="Included in lease cost"
          items={unit.included_in_lease_cost}
          icon={CheckCircle2}
        />
        <FeatureList
          title="Laundry"
          items={unit.laundry_features}
          icon={CheckCircle2}
        />
        <FeatureList
          title="Security"
          items={unit.security_features}
          icon={CheckCircle2}
        />
        <FeatureList
          title="Accessibility"
          items={unit.accessible_features}
          icon={CheckCircle2}
        />
      </section>

      {/* Building information (kept from the prior layout) */}
      {building && (
        <section aria-label="Building information">
          <h2 className="font-display text-2xl text-[#0B1D3A]">
            Building information
          </h2>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {building.neighbourhood && (
              <div>
                <dt className="text-slate-500">Neighbourhood</dt>
                <dd className="font-medium text-[#0B1D3A]">
                  {building.neighbourhood}
                </dd>
              </div>
            )}
            {building.cross_street && (
              <div>
                <dt className="text-slate-500">Cross street</dt>
                <dd className="font-medium text-[#0B1D3A]">
                  {building.cross_street}
                </dd>
              </div>
            )}
            {building.year_built && (
              <div>
                <dt className="text-slate-500">Year built</dt>
                <dd className="font-medium text-[#0B1D3A]">
                  {building.year_built}
                </dd>
              </div>
            )}
            {building.condo_level && (
              <div>
                <dt className="text-slate-500">Floor / level</dt>
                <dd className="font-medium text-[#0B1D3A]">
                  {building.condo_level}
                </dd>
              </div>
            )}
            {building.pets_allowed && (
              <div>
                <dt className="text-slate-500">Pets</dt>
                <dd className="inline-flex items-center gap-1 font-medium text-[#0B1D3A]">
                  <PawPrint className="size-4 text-[#10B981]" />
                  {building.pets_allowed}
                </dd>
              </div>
            )}
            {building.elementary_school && (
              <div>
                <dt className="text-slate-500">Elementary school</dt>
                <dd className="font-medium text-[#0B1D3A]">
                  {building.elementary_school}
                </dd>
              </div>
            )}
            {building.high_school && (
              <div>
                <dt className="text-slate-500">High school</dt>
                <dd className="font-medium text-[#0B1D3A]">
                  {building.high_school}
                </dd>
              </div>
            )}
          </dl>

          {Array.isArray(building.condo_amenities) &&
            building.condo_amenities.length > 0 && (
              <div className="mt-6">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-[#0B1D3A]">
                  Building amenities
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {building.condo_amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#0B1D3A]"
                    >
                      <CheckCircle2 className="size-3.5 text-[#10B981]" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </section>
      )}

      {/* Rent vs Buy calculator — embedded so visitors can comparison-shop
          without leaving the listing. */}
      <section aria-label="Rent vs buy calculator">
        <h2 className="font-display text-2xl text-[#0B1D3A]">
          Should you rent or buy?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Compare the monthly cost of this rental against buying a similar
          unit in the same neighbourhood.
        </p>
        <div className="mt-6">
          <RentCalculator />
        </div>
      </section>
    </div>
  )

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Properties', href: '/properties/' },
            { label: unit.unit_name, href: `/properties/${slug}/` },
          ]}
        />

        {/* Photos / Map / Street View tabs (client) */}
        <section className="mt-6">
          <PropertyMediaTabs
            images={galleryImages}
            propertyName={unit.unit_name}
            address={unit.unit_address}
            lat={unit.latitude}
            lng={unit.longitude}
          />
        </section>

        {/* Hero info bar: Price · Beds/Baths/SqFt · Address · MLS status */}
        <section
          aria-label="Listing summary"
          className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                isAvailable
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {isAvailable ? 'Active' : unit.availability || 'Status —'}
            </span>
            {unit.property_sub_type && (
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                {unit.property_sub_type}
              </span>
            )}
            {unit.furnished && (
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-[#0B1D3A]">
                {unit.furnished}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-3xl text-[#0B1D3A] md:text-4xl">
                {unit.unit_name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="size-4 text-slate-400" />
                {unit.unit_address}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Monthly rent
              </p>
              <p className="font-display text-3xl text-[#10B981]">
                {formatPrice(unit.website_price)}
                {unit.website_price != null && (
                  <span className="text-base text-slate-500">/mo</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-4 text-sm text-[#0B1D3A]">
            <span className="inline-flex items-center gap-1.5">
              <Bed className="size-4 text-[#10B981]" />
              {unit.number_of_bedrooms || unit.bedrooms || EMPTY} Beds
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-4 text-[#10B981]" />
              {unit.number_of_bathrooms || unit.bathrooms || EMPTY} Baths
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize className="size-4 text-[#10B981]" />
              {sqftDisplay || EMPTY}
            </span>
            {unit.total_parking_spaces && (
              <span className="inline-flex items-center gap-1.5">
                <Car className="size-4 text-[#10B981]" />
                {unit.total_parking_spaces} Parking
              </span>
            )}
            {availableDate && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-[#10B981]" />
                Available {availableDate}
              </span>
            )}
          </div>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main column — gated body */}
          <div className="lg:col-span-2">
            <PropertyGate>{gatedBody}</PropertyGate>
          </div>

          {/* Sidebar (kept outside the gate so the conversion CTA is always visible) */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
              <p className="font-display text-3xl text-[#0B1D3A]">
                {formatPrice(unit.website_price)}
                {unit.website_price != null && (
                  <span className="text-base font-normal text-slate-500">
                    /month
                  </span>
                )}
              </p>
              {availableDate && (
                <p className="mt-1 text-sm text-slate-500">
                  Available {availableDate}
                </p>
              )}

              <div className="my-5 border-t border-slate-100" />

              <p className="text-sm font-medium text-[#0B1D3A]">
                Interested in this property?
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Schedule a viewing or reserve this unit through the secure
                MoveSmart portal — sign in or create an account in seconds.
              </p>

              <div className="mt-4 space-y-2">
                {/* Apply Now — primary CTA, routes to portal apply/reserve flow */}
                {reserveUrl ? (
                  <a
                    href={reserveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
                  >
                    Apply Now
                  </a>
                ) : (
                  <Link
                    href={`/contact/?type=tenant&intent=apply&property=${encodeURIComponent(slug)}`}
                    className="flex w-full items-center justify-center rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
                  >
                    Apply Now
                  </Link>
                )}
                {scheduleUrl ? (
                  <a
                    href={scheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0B1D3A] transition-colors hover:border-[#10B981]/40 hover:bg-emerald-50"
                  >
                    Schedule a Tour
                  </a>
                ) : (
                  <Link
                    href={`/contact/?type=tenant&property=${encodeURIComponent(slug)}`}
                    className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0B1D3A] transition-colors hover:border-[#10B981]/40 hover:bg-emerald-50"
                  >
                    Request a Viewing
                  </Link>
                )}
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                <p>
                  Listing brokered by{' '}
                  <span className="font-semibold text-[#0B1D3A]">
                    Valery Real Estate Inc., Brokerage
                  </span>
                  . MoveSmart Rentals is the marketing partner — screening,
                  lease execution, and move-in coordination are included.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-16" aria-label="Similar properties">
            <h2 className="font-display text-2xl text-[#0B1D3A] md:text-3xl">
              Similar properties
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <SimilarPropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

        {/* RECO / IDX legal disclaimer footer */}
        <section
          aria-label="Listing disclaimer"
          className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs leading-relaxed text-slate-600"
        >
          <p>
            Listing data sourced from TREB IDX feed. This listing is brokered
            by{' '}
            <span className="font-semibold text-[#0B1D3A]">
              Valery Real Estate Inc., Brokerage
            </span>
            . MoveSmart Rentals is a marketing partner. Information deemed
            reliable but not guaranteed. The trademarks REALTOR&reg;,
            REALTORS&reg;, and the REALTOR&reg; logo are controlled by The
            Canadian Real Estate Association (CREA) and identify real estate
            professionals who are members of CREA.
          </p>
        </section>
      </div>

      {/* Mobile sticky CTA — Apply Now + Schedule a Tour */}
      <PropertyStickyCTA
        reserveUrl={reserveUrl}
        scheduleUrl={scheduleUrl}
        slug={slug}
      />
    </main>
  )
}
