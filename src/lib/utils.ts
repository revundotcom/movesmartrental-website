import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Build a canonical URL from a path segment.
 * Prepends NEXT_PUBLIC_SITE_URL and ensures a trailing slash.
 */
export function buildCanonicalUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const withTrailingSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`
  return `${base}${withTrailingSlash}`
}

/**
 * Safely serialize a JSON-LD object, escaping < to prevent XSS
 * when injected via dangerouslySetInnerHTML.
 */
export function sanitizeJsonLd(obj: Record<string, unknown>): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}
