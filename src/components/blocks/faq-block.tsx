'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
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
    <div
      className={`group/faq relative border-b border-slate-100 last:border-b-0 transition-all duration-200 ${
        isOpen ? 'bg-emerald-50/50' : 'hover:bg-slate-50/60'
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
            isOpen ? 'bg-[#10B981] text-white' : 'bg-slate-100 text-slate-500 group-hover/faq:bg-emerald-100 group-hover/faq:text-emerald-700'
          }`}>
            {index + 1}
          </span>
          <span className={`text-base font-semibold transition-colors duration-200 ${isOpen ? 'text-emerald-700' : 'text-[#0B1D3A]'}`}>
            {question}
          </span>
        </div>
        <ChevronDown
          className={`size-5 shrink-0 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-[#10B981]' : 'text-slate-400 group-hover/faq:text-[#10B981]'
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`grid transition-all duration-250 ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pl-15 pr-6 text-sm leading-relaxed text-slate-600" style={{ paddingLeft: '3.75rem' }}>
            {answer}
          </div>
        </div>
      </div>
    </div>
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
    <section className="bg-slate-50/50 py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-emerald">
            FAQs
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399]" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {questions.map((item, index) => (
            <FAQItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>

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
