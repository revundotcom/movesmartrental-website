'use client'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import type { HowItWorksBlockProps } from '@/types/blocks'
import { LeasingFlywheel } from '@/components/illustrations/leasing-flywheel'

export function HowItWorksBlock({
  steps,
  title = 'How It Works',
}: HowItWorksBlockProps) {
  if (!steps || steps.length === 0) return null

  const displaySteps = steps.slice(0, 6)

  return (
    <section className="relative bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-6 text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-[#0B1D3A] sm:text-4xl">
              {title}
            </h2>
          </motion.div>
        </RevealOnScroll>

        {/* Animated flywheel diagram */}
        <div className="mb-16 -mx-4">
          <LeasingFlywheel />
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line in emerald-200 — outside RevealOnScroll so it stays static */}
            {displaySteps.length > 1 && (
              <div
                className="absolute top-7 h-0.5 bg-emerald-200"
                style={{
                  left: `calc(${100 / displaySteps.length / 2}%)`,
                  right: `calc(${100 / displaySteps.length / 2}%)`,
                }}
              />
            )}

            <RevealOnScroll className="contents" stagger={0.1}>
              {displaySteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={revealItem}
                  className="relative flex flex-col items-center text-center"
                  style={{ width: `${100 / displaySteps.length}%` }}
                >
                  {/* Emerald numbered circle */}
                  <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-[#10B981] text-lg font-bold text-white shadow-lg shadow-emerald-300/50 ring-4 ring-emerald-200/40">
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
                </motion.div>
              ))}
            </RevealOnScroll>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical connecting line — outside RevealOnScroll so it stays static */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-emerald-200" />

            <RevealOnScroll className="relative space-y-0" stagger={0.1}>
              {displaySteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={revealItem}
                  className="relative flex gap-5 pb-8 last:pb-0"
                >
                  {/* Emerald numbered circle */}
                  <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-lg font-bold text-white shadow-lg shadow-emerald-300/50 ring-4 ring-emerald-200/40">
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
                </motion.div>
              ))}
            </RevealOnScroll>
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
