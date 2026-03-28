'use client'

import { usePathname } from 'next/navigation'
import { pushEvent, type GTMEvent } from '@/lib/analytics'

type CTAType = 'account_creation' | 'book_a_call' | 'service_to_account_conversion'

interface CTATrackerProps {
  eventType: CTAType
  city?: string
  service?: string
  children: React.ReactNode
  className?: string
}

export function CTATracker({ eventType, city, service, children, className }: CTATrackerProps) {
  const pathname = usePathname()

  function handleClick() {
    pushEvent({
      event: eventType,
      page: pathname,
      ...(city && { city }),
      ...(service && { service }),
    } as GTMEvent)
  }

  return (
    <span onClick={handleClick} className={className}>
      {children}
    </span>
  )
}
