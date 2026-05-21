import type { Metadata } from 'next'

import { SiloServicePage, buildServiceMetadata } from '../silo-service-page'

export const metadata: Metadata = buildServiceMetadata('move-in-coordination')

export default function Page() {
  return <SiloServicePage slug="move-in-coordination" />
}
