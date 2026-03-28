import { AlertCircle, CheckCircle } from 'lucide-react'
import type { PainPointBlockProps } from '@/types/blocks'

export function PainPointBlock({
  painPoints,
  title = 'Common Challenges & Our Solutions',
}: PainPointBlockProps) {
  if (!painPoints || painPoints.length === 0) return null

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>

        <div className="space-y-6">
          {painPoints.map((painPoint, index) => {
            const isReversed = index % 2 === 1

            return (
              <div
                key={index}
                className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${
                  isReversed ? 'md:[&>:first-child]:order-2' : ''
                }`}
              >
                {/* Problem */}
                <div className="flex gap-3 rounded-lg bg-red-50 p-6">
                  <AlertCircle className="mt-0.5 size-6 shrink-0 text-red-500" />
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                      Challenge
                    </p>
                    <p className="text-sm text-red-900">{painPoint.problem}</p>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex gap-3 rounded-lg bg-green-50 p-6">
                  <CheckCircle className="mt-0.5 size-6 shrink-0 text-green-500" />
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-600">
                      Our Solution
                    </p>
                    <p className="text-sm text-green-900">
                      {painPoint.solution}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
