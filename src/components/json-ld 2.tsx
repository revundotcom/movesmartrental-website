import { sanitizeJsonLd } from '@/lib/utils'

/**
 * Render a JSON-LD structured data script tag.
 * Uses sanitizeJsonLd to prevent XSS via escaped < characters.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(data) }}
    />
  )
}
