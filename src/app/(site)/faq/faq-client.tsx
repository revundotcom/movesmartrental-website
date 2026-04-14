'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import type { FaqCategory, FaqItem } from './faq-data'

/* ------------------------------------------------------------------ */
/*  Browse-by-category nav - horizontal text strip, underline style   */
/* ------------------------------------------------------------------ */

export function FAQCategoryNav({ categories }: { categories: FaqCategory[] }) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? '')

  return (
    <nav
      aria-label="Browse FAQ by category"
      className="sticky top-0 z-20 border-y border-brand-navy/10 bg-[#FBFAF6]/90 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-4 text-sm">
          <span
            className="mr-2 hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy/60 sm:inline"
            aria-hidden="true"
          >
            Browse by topic
          </span>
          {categories.map((cat) => {
            const isActive = cat.id === active
            return (
              <a
                key={cat.id}
                href={`#faq-${cat.id}`}
                onClick={() => setActive(cat.id)}
                className={cn(
                  'shrink-0 whitespace-nowrap border-b-2 px-2 pb-1 pt-1 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'border-brand-gold text-brand-navy'
                    : 'border-transparent text-slate-600 hover:border-brand-navy/20 hover:text-brand-navy',
                )}
              >
                {cat.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  Single Q/A row - editorial accordion, gold-numbered Q              */
/* ------------------------------------------------------------------ */

function QARow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const reducedMotion = useReducedMotion()
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="border-b border-brand-navy/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-start gap-5 py-6 text-left transition-colors duration-200 hover:bg-brand-navy/[0.02] sm:gap-6 sm:py-7"
      >
        <span
          className="mt-1 shrink-0 font-display text-sm font-normal tabular-nums text-brand-gold sm:text-base"
          aria-hidden="true"
        >
          {num}
        </span>
        <span className="flex-1">
          <span className="block font-display text-xl leading-snug tracking-tight text-brand-navy transition-colors sm:text-2xl">
            {item.question}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'mt-2 inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-brand-navy/60 transition-all duration-300',
            isOpen
              ? 'rotate-45 border-brand-emerald bg-brand-emerald/10 text-brand-emerald'
              : 'border-brand-navy/20 group-hover:border-brand-navy/40',
          )}
        >
          <svg
            className="size-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.15 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-[2.6rem] pr-10 sm:pl-[3.1rem]">
              <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Category block - splitReveal heading + staggered Q/A rows         */
/* ------------------------------------------------------------------ */

export function FAQCategoryBlock({
  category,
  index,
}: {
  category: FaqCategory
  index: number
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(index === 0 ? 0 : null)

  return (
    <section
      id={`faq-${category.id}`}
      className="scroll-mt-24 border-b border-brand-navy/10 py-16 last:border-b-0 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                {String(index + 1).padStart(2, '0')} · Section
              </p>
              <RevealOnScroll variant="splitReveal" duration={0.7}>
                <h2 className="mt-4 font-display text-3xl font-normal leading-[1.1] tracking-tight text-brand-navy sm:text-4xl">
                  {category.heading}
                  <span aria-hidden="true" className="text-brand-gold">
                    .
                  </span>
                </h2>
              </RevealOnScroll>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
                {category.deck}
              </p>
              <p className="mt-6 text-xs font-medium text-slate-500">
                {category.questions.length} question
                {category.questions.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {/* Q/A column */}
          <div className="lg:col-span-8">
            <RevealOnScroll variant="slideUp" stagger={0.06} duration={0.45}>
              {category.questions.map((item, i) => (
                <QARow
                  key={`${category.id}-${i}`}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  "Still have questions?" editorial panel - NOT a card              */
/* ------------------------------------------------------------------ */

export function FAQStillHaveQuestions() {
  return (
    <section
      id="still-have-questions"
      className="border-t border-brand-navy/10 bg-[#FBFAF6] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              Still have questions
            </p>
            <h2 className="mt-4 font-display text-3xl font-normal leading-[1.1] tracking-tight text-brand-navy sm:text-4xl">
              Can&apos;t find your{' '}
              <span className="font-display italic text-brand-emerald">answer</span>
              <span aria-hidden="true" className="text-brand-gold">
                ?
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              Send a note and a real advisor - not a bot - replies within 24 hours on business days.
              If it&apos;s urgent, book a call or jump into live chat during office hours.
            </p>
          </div>
          <div className="lg:col-span-7">
            <dl className="divide-y divide-brand-navy/10 border-y border-brand-navy/10">
              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:items-baseline">
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Email us
                </dt>
                <dd className="sm:col-span-2">
                  <a
                    href="mailto:contact@movesmartrentals.com"
                    className="font-display text-xl text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px] transition-colors hover:text-brand-emerald"
                  >
                    contact@movesmartrentals.com
                  </a>
                  <p className="mt-1 text-sm text-slate-500">
                    Replies within 24 hours on business days.
                  </p>
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:items-baseline">
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Book a call
                </dt>
                <dd className="sm:col-span-2">
                  <a
                    href="/contact/?intent=call"
                    className="font-display text-xl text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px] transition-colors hover:text-brand-emerald"
                  >
                    Schedule a 20-minute consultation
                  </a>
                  <p className="mt-1 text-sm text-slate-500">
                    Weekdays, 9-6 ET. No pitch - just answers.
                  </p>
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:items-baseline">
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Live chat
                </dt>
                <dd className="sm:col-span-2">
                  <a
                    href="/contact/?intent=chat"
                    className="font-display text-xl text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-[6px] transition-colors hover:text-brand-emerald"
                  >
                    Open the chat window
                  </a>
                  <p className="mt-1 text-sm text-slate-500">
                    Typical response under 3 minutes, office hours.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
