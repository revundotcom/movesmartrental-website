'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, ArrowRight, Mail } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

import type { FAQBlockProps } from '@/types/blocks'

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
  prefersReducedMotion,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
  prefersReducedMotion: boolean
}) {
  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="group/faq border-b border-slate-200/70 last:border-b-0"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between gap-6 px-2 py-6 text-left transition-colors duration-200 hover:bg-slate-50/60 sm:px-3"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          <span
            className={`mt-1 font-display text-sm italic tracking-wide transition-colors duration-300 ${
              isOpen ? 'text-brand-emerald' : 'text-brand-gold'
            }`}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className={`font-display text-lg font-normal leading-snug tracking-tight transition-all duration-300 md:text-xl ${
              isOpen ? 'text-brand-emerald' : 'text-brand-navy group-hover/faq:translate-x-[2px]'
            }`}
          >
            {question}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 260, damping: 22 }
          }
          className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? 'border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald'
              : 'border-brand-gold/30 bg-white text-brand-gold group-hover/faq:border-brand-gold/60 group-hover/faq:bg-brand-gold/5'
          }`}
          aria-hidden="true"
        >
          <Plus className="size-4" strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    height: { type: 'spring', stiffness: 220, damping: 30 },
                    opacity: { duration: 0.3, delay: 0.08 },
                  }
            }
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
              }
              className="pb-6 pl-2 pr-12 text-base leading-relaxed text-slate-600 sm:pl-3"
            >
              <div className="pl-10 sm:pl-11">{answer}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQBlock({
  questions,
  title = 'Common Questions, Direct Answers',
  schemaEnabled = true,
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const prefersReducedMotion = useReducedMotion() ?? false

  if (questions.length === 0) return null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  const headerVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
        },
      }

  return (
    <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
      {/* Subtle editorial backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(#0B1D3A 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-emerald">
            Frequently Asked
          </p>
          <h2 className="font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-[2.75rem]">
            {title.includes(',') ? (
              <>
                {title.split(',')[0]},
                <span className="block italic text-brand-navy/90">
                  {title.split(',').slice(1).join(',').trim()}
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-5 block h-px w-20 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
          />
        </motion.div>

        {/* FAQ list, editorial, no card shadow */}
        <div className="border-t border-slate-200/70">
          {questions.map((item, index) => (
            <FAQItem
              key={item.question}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Still have questions? closer */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200/80 bg-white/70 px-6 py-6 backdrop-blur-sm sm:flex-row sm:items-center sm:px-8"
        >
          <div>
            <p className="font-display text-lg font-normal text-brand-navy sm:text-xl">
              Still have questions?
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Talk to a leasing advisor. No pressure, no obligation.
            </p>
          </div>
          <div className="flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-navy/80 transition-colors hover:text-brand-emerald"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email us
            </Link>
            <Link
              href="/contact/"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-emerald px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:bg-brand-emerald-hover hover:shadow-md"
            >
              Book a 20-minute call
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>

        {schemaEnabled && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
            }}
          />
        )}
      </div>
    </section>
  )
}
