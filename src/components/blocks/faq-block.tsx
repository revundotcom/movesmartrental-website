'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import type { FAQBlockProps } from '@/types/blocks'

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div variants={revealItem}>
      <div
        className={`group/faq relative border-b border-slate-100 last:border-b-0 transition-all duration-200 ${
          isOpen
            ? 'bg-emerald-50/50'
            : 'hover:border-brand-emerald/30 hover:bg-emerald-50/30'
        }`}
      >
        {/* Left accent */}
        <div
          className={`absolute inset-y-0 left-0 w-0.5 rounded-full transition-all duration-300 ${
            isOpen ? 'bg-[#10B981]' : 'bg-transparent'
          }`}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left"
          aria-expanded={isOpen}
        >
          <div className="flex items-start gap-3 pr-4">
            <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${
              isOpen ? 'bg-[#10B981] text-white ring-pulse' : 'bg-slate-100 text-slate-500 group-hover/faq:bg-emerald-100 group-hover/faq:text-emerald-700'
            }`}>
              {index + 1}
            </span>
            <span className={`text-base font-semibold transition-colors duration-200 ${isOpen ? 'text-emerald-700' : 'text-[#0B1D3A]'}`}>
              {question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ChevronDown
              className={`size-5 shrink-0 ${
                isOpen ? 'text-[#10B981]' : 'text-slate-400 group-hover/faq:text-[#10B981]'
              }`}
              aria-hidden="true"
            />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: 'spring', stiffness: 200, damping: 30 },
                opacity: { duration: 0.3, delay: 0.1 },
              }}
              className="overflow-hidden"
            >
              <motion.div
                className="pb-5 pl-15 pr-6 text-sm leading-relaxed text-slate-600"
                style={{ paddingLeft: '3.75rem' }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {answer}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function FAQBlock({
  questions,
  title = 'Frequently Asked Questions',
  schemaEnabled = true,
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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

  return (
    <section
      className="relative bg-slate-50/50 py-14"
      style={{
        backgroundImage: 'radial-gradient(#0B1D3A0d 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="mx-auto max-w-3xl px-4">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-emerald">
            FAQs
          </p>
          <h2 className="font-display font-normal text-3xl tracking-tight text-[#0B1D3A] sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399]" />
        </div>

        <RevealOnScroll className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
            />
          ))}
        </RevealOnScroll>

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
