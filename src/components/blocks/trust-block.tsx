import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import type { TrustBlockProps } from '@/types/blocks'

function TestimonialsGrid({
  testimonials,
}: {
  testimonials: TrustBlockProps['testimonials']
}) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Card key={index}>
          <CardContent className="space-y-4 pt-6">
            <Quote className="size-8 text-primary/30" />
            <blockquote className="text-sm italic text-muted-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            {testimonial.outcome && (
              <p className="rounded-md bg-primary/5 px-3 py-2 text-sm font-semibold text-primary">
                {testimonial.outcome}
              </p>
            )}
            <div>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.city}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatsRow({ stats }: { stats: TrustBlockProps['stats'] }) {
  if (!stats || stats.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <p className="text-4xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export function TrustBlock({ testimonials, stats, variant }: TrustBlockProps) {
  // Determine effective variant
  const effectiveVariant =
    variant ||
    (testimonials && stats
      ? 'combined'
      : testimonials
        ? 'testimonials'
        : 'stats')

  // Determine default title based on variant
  const defaultTitle =
    effectiveVariant === 'stats'
      ? 'Trusted by Property Owners'
      : 'What Our Clients Say'

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold">{defaultTitle}</h2>

        {(effectiveVariant === 'stats' || effectiveVariant === 'combined') && (
          <div className={effectiveVariant === 'combined' ? 'mb-12' : ''}>
            <StatsRow stats={stats} />
          </div>
        )}

        {(effectiveVariant === 'testimonials' ||
          effectiveVariant === 'combined') && (
          <TestimonialsGrid testimonials={testimonials} />
        )}
      </div>
    </section>
  )
}
