import type { HowItWorksBlockProps } from '@/types/blocks'

export function HowItWorksBlock({
  steps,
  title = 'How It Works',
}: HowItWorksBlockProps) {
  if (!steps || steps.length === 0) return null

  const displaySteps = steps.slice(0, 6)

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section heading with emerald underline */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line in emerald-200 */}
            {displaySteps.length > 1 && (
              <div
                className="absolute top-7 h-0.5 bg-emerald-200"
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
                {/* Emerald numbered circle */}
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-[#10B981] text-lg font-bold text-white shadow-lg shadow-emerald-200">
                  {step.stepNumber}
                </div>

                {/* Step card */}
                <div className="mt-5 w-full max-w-[220px] rounded-xl bg-white p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-[#0B1D3A]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative space-y-0">
            {/* Vertical connecting line */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-emerald-200" />

            {displaySteps.map((step, index) => (
              <div key={index} className="relative flex gap-5 pb-8 last:pb-0">
                {/* Emerald numbered circle */}
                <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-lg font-bold text-white shadow-lg shadow-emerald-200">
                  {step.stepNumber}
                </div>

                {/* Step card */}
                <div className="flex-1 rounded-xl bg-white p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-[#0B1D3A]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {steps.length > 6 && (
          <p className="mt-6 text-center text-sm text-slate-500">
            Showing first 6 of {steps.length} steps
          </p>
        )}
      </div>
    </section>
  )
}
