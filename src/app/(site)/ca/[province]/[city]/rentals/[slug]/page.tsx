import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// ---------------------------------------------------------------------------
// Dynamic Params
// ---------------------------------------------------------------------------
// No static rental listings data source. 404 every request cleanly.

export const dynamicParams = false

export async function generateStaticParams() {
  // TODO: no static data for individual rental listings
  return []
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  return {}
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function PropertyDetailPage() {
  // TODO: no static data — individual rental listing pages are not rendered
  // until a listings data source is wired in.
  notFound()
}
