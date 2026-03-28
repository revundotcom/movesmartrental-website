import type { HowItWorksBlockProps } from '@/types/blocks'

export function HowItWorksBlock({
  steps,
  title = 'How It Works',
}: HowItWorksBlockProps) {
  if (!steps || steps.length === 0) return null

  const displaySteps = steps.slice(0, 6)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            {displaySteps.length > 1 && (
              <div
                className="absolute top-6 h-0.5 bg-border"
                style={{
                  left: `calc(${100 / displaySteps.length / 2}%)`,
                  right: `calc(${100 / displaySteps.length / 2}%)`,
                }}
              />
            )}

            {displaySteps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
                style={{ width: `${100 / displaySteps.length}%` }}
              >
                <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.stepNumber}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-[200px] text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="space-y-8 md:hidden">
          {displaySteps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex shrink-0 items-start">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.stepNumber}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {steps.length > 6 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Showing first 6 of {steps.length} steps
          </p>
        )}
      </div>
    </section>
  )
}
