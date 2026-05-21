import type { Metadata } from 'next'

import { SiloResourcePage, buildResourceMetadata } from '../silo-resource-page'

export const metadata: Metadata = buildResourceMetadata('landlord-guides')

export default function Page() {
  return <SiloResourcePage slug="landlord-guides" />
}
