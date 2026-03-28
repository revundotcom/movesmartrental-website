import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { HeroBlockProps } from '@/types/blocks'

export function HeroBlock({
  headline,
  subheadline,
  cta1,
  cta2,
  backgroundImageUrl,
  backgroundImageAlt,
  priority = false,
}: HeroBlockProps) {
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden md:min-h-[600px]">
      {/* Background */}
      {backgroundImageUrl ? (
        <>
          <Image
            src={backgroundImageUrl}
            alt={backgroundImageAlt ?? ''}
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center text-white">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {headline}
        </h1>

        {subheadline && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
            {subheadline}
          </p>
        )}

        {(cta1 || cta2) && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {cta1 && (
              <Button
                variant={cta1.variant ?? 'default'}
                size="lg"
                className="min-w-[180px]"
                render={<Link href={cta1.href} />}
              >
                {cta1.label}
              </Button>
            )}
            {cta2 && (
              <Button
                variant={cta2.variant ?? 'outline'}
                size="lg"
                className="min-w-[180px] border-white text-white hover:bg-white/10"
                render={<Link href={cta2.href} />}
              >
                {cta2.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
