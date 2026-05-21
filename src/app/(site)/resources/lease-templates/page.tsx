import type { Metadata } from 'next'

import { SiloResourcePage, buildResourceMetadata } from '../silo-resource-page'

export const metadata: Metadata = buildResourceMetadata('lease-templates')

export default function Page() {
  return <SiloResourcePage slug="lease-templates" />
}
