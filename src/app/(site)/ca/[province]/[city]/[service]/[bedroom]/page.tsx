import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// ---------------------------------------------------------------------------
// Dynamic Params
// ---------------------------------------------------------------------------
// No static data for bedroom-specific pages. 404 every request cleanly.

export const dynamicParams = false

export async function generateStaticParams() {
  // TODO: no static data for bedroom-specific rentals
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

export default async function BedroomPage() {
  // TODO: no static data — bedroom-specific rental pages are not rendered
  // until a listings data source is wired in.
  notFound()
}
