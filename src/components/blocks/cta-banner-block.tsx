import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { CTABannerBlockProps } from '@/types/blocks'

export function CTABannerBlock({
  headline,
  description,
  primaryCta,
  secondaryCta,
  variant = 'default',
}: CTABannerBlockProps) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {headline}
        </h2>

        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/90">
            {description}
          </p>
        )}

        {variant === 'form' ? (
          /* Lead capture form variant */
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            action="/api/lead"
            method="POST"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
            >
              {primaryCta.label}
            </Button>
          </form>
        ) : (
          /* Default button variant */
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant={primaryCta.variant ?? 'secondary'}
              size="lg"
              className="min-w-[160px]"
              render={<Link href={primaryCta.href} />}
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                variant={secondaryCta.variant ?? 'outline'}
                size="lg"
                className="min-w-[160px] border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                render={<Link href={secondaryCta.href} />}
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
