/**
 * CTABannerBlock — intentionally disabled component.
 *
 * The previous emerald-gradient CTA banner ("Get Your Free Rental Analysis" with
 * a giant green background) was removed per design feedback. Rather than ripping
 * out every call site across ~22 pages, this component now accepts its props as
 * before but renders nothing. Pages that still reference it will simply omit the
 * banner from their output.
 *
 * Safe to delete the component entirely once every call site has been
 * removed — but leaving it as a no-op avoids churn across server/client
 * components.
 */

import type { CTABannerBlockProps } from '@/types/blocks'

export function CTABannerBlock(props: CTABannerBlockProps) {
  // Intentional: props accepted but unused — see file header.
  void props
  return null
}
