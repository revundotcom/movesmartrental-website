import type { Metadata } from 'next'

import { SiloServicePage, buildServiceMetadata } from '../silo-service-page'

export const metadata: Metadata = buildServiceMetadata('property-showings')

export default function Page() {
  return <SiloServicePage slug="property-showings" />
}
