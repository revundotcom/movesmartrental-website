import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { getAllProperties } from '@/lib/portal-api'
import { PropertiesBrowser } from './properties-browser'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'Properties & Available Rentals',
  description:
    'Browse every available rental property from MoveSmart Rentals. Verified listings across Canada and the United States with full-service leasing, screening, and tenant placement.',
  alternates: {
    canonical: '/properties/',
  },
  // /properties/ is hidden from public surfaces per client direction
  // (Jun 2026). The route still resolves by direct URL but is noindexed,
  // absent from nav/footer/sitemap, and Disallow'd in robots.txt.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
    },
  },
  openGraph: {
    title: 'Properties & Available Rentals | MoveSmart Rentals',
    description:
      'Browse verified rental homes, condos, and townhouses across Canada and the United States.',
    images: ['/og-default.png?v=2'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties & Available Rentals | MoveSmart Rentals',
    description:
      'Browse verified rental homes, condos, and townhouses across Canada and the United States.',
  },
}

// Refresh the entire catalog every 5 minutes — listing data turns
// over quickly, but we don't need to hit the API on every visit.
export const revalidate = 300

export default async function PropertiesPage() {
  // Fetch EVERY property across all paginated API pages so visitors
  // see the full catalog with no Previous/Next clicks required.
  const properties = await getAllProperties()

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Properties & Available Rentals',
    url: `${SITE_URL}/properties/`,
    isPartOf: { '@type': 'WebSite', name: 'MoveSmart Rentals', url: SITE_URL },
    numberOfItems: properties.length,
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
            { label: 'Properties', href: '/properties/' },
          ]}
        />

        <header className="mt-6 mb-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#10B981]">
            {properties.length > 0
              ? `${properties.length} Live Listings`
              : 'Live Listings'}
          </p>
          <h1 className="mt-2 font-display text-4xl text-[#0B1D3A] md:text-5xl">
            Browse Properties
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Every verified rental managed by MoveSmart Rentals, live from
            our portal. Filter by city, beds, baths, price, and type —
            every listing is screened, lease-executed, and move-in
            coordinated end-to-end.
          </p>
        </header>

        {properties.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <h2 className="font-display text-2xl text-[#0B1D3A]">
              No listings available right now
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We could not load listings at the moment. Please try again in a
              minute, or get in touch and we will match you with upcoming
              inventory.
            </p>
            <Link
              href="/contact/?type=tenant"
              className="mt-6 inline-flex items-center rounded-lg bg-[#10B981] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#059669]"
            >
              Contact a leasing agent
            </Link>
          </div>
        ) : (
          <PropertiesBrowser properties={properties} />
        )}
      </div>
    </main>
  )
}
