import type { Metadata } from 'next'

import { SiloServicePage, buildServiceMetadata } from '../silo-service-page'

export const metadata: Metadata = buildServiceMetadata('lease-execution')

export default function Page() {
  return <SiloServicePage slug="lease-execution" />
}
