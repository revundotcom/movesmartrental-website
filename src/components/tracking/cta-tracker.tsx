'use client'

import { usePathname } from 'next/navigation'
import { trackCTA, type CTAType as CoreCTAType } from '@/lib/analytics-events'

// `service_to_account_conversion` is retained in the public prop union so
// that existing callers that import this type continue to compile, but it is
// now emitted automatically as a funnel event whenever an `account_creation`
// click occurs on a service page (see `trackCTA`).
type CTAType = CoreCTAType | 'service_to_account_conversion'

interface CTATrackerProps {
  eventType: CTAType
  city?: string
  service?: string
  section?: string
  ctaLabel?: string
  children: React.ReactNode
  className?: string
}

export function CTATracker({
  eventType,
  city,
  service,
  section,
  ctaLabel,
  children,
  className,
}: CTATrackerProps) {
  const pathname = usePathname()

  function handleClick() {
    // Normalize legacy `service_to_account_conversion` callers to
    // `account_creation`; trackCTA emits the conversion funnel event
    // automatically when the page is a service page.
    const resolved: CoreCTAType =
      eventType === 'service_to_account_conversion' ? 'account_creation' : eventType

    const payload: Record<string, string | undefined> = {
      page: pathname,
    }
    if (city) payload.city = city
    if (service) payload.service = service
    if (section) payload.section = section
    if (ctaLabel) payload.cta_label = ctaLabel

    trackCTA(resolved, payload)
  }

  return (
    <span
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick()
      }}
      role="presentation"
      className={className}
    >
      {children}
    </span>
  )
}
