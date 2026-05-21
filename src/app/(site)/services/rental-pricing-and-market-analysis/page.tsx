import type { Metadata } from 'next'

import { SiloServicePage, buildServiceMetadata } from '../silo-service-page'

export const metadata: Metadata = buildServiceMetadata('rental-pricing-and-market-analysis')

export default function Page() {
  return <SiloServicePage slug="rental-pricing-and-market-analysis" />
}
