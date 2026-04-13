'use client'

import { XCircle, CheckCircle, AlertTriangle, ShieldCheck, Clock, Ban, ThumbsUp, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'

import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import type { PainPointBlockProps } from '@/types/blocks'

// Rotate through problem/solution icon pairs for visual variety
const PROBLEM_ICONS = [AlertTriangle, XCircle, Clock, Ban]
const SOLUTION_ICONS = [CheckCircle, ShieldCheck, ThumbsUp, Wrench]

export function PainPointBlock({
  painPoints,
  title = 'Common Challenges & Our Solutions',
  showHeading = true,
}: PainPointBlockProps) {
  if (!painPoints || painPoints.length === 0) return null

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        {showHeading && (
          <RevealOnScroll variant="blur" className="mb-8 text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-[#0B1D3A] sm:text-4xl">
              {title}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
          </RevealOnScroll>
        )}

        <RevealOnScroll className="space-y-6" stagger={0.1}>
          {painPoints.map((painPoint, index) => {
            const ProblemIcon = PROBLEM_ICONS[index % PROBLEM_ICONS.length]
            const SolutionIcon = SOLUTION_ICONS[index % SOLUTION_ICONS.length]
            const isReversed = index % 2 === 1

            return (
              <motion.div
                key={painPoint.problem}
                variants={revealItem}
                className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${
                  isReversed ? 'md:[&>:first-child]:order-2' : ''
                }`}
              >
                {/* Problem - navy card */}
                <div className="flex gap-4 rounded-xl bg-[#0B1D3A] p-6 shadow-sm">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <ProblemIcon className="size-5 text-white/80" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                      Challenge
                    </p>
                    <p className="text-sm leading-relaxed text-white/90">
                      {painPoint.problem}
                    </p>
                  </div>
                </div>

                {/* Solution - emerald tinted card */}
                <div className="flex gap-4 rounded-xl bg-emerald-50 p-6 shadow-sm">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10">
                    <SolutionIcon className="size-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#10B981]">
                      Our Solution
                    </p>
                    <p className="text-sm leading-relaxed text-[#0B1D3A]">
                      {painPoint.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}
