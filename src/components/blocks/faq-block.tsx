'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQBlockProps } from '@/types/blocks'

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`border-b border-slate-200 transition-colors ${
        isOpen ? 'border-l-2 border-l-[#10B981]' : 'border-l-2 border-l-transparent'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-5 text-left transition-colors hover:bg-slate-50"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-base font-medium text-[#0B1D3A]">
          {question}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-[#10B981] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 text-sm leading-relaxed text-slate-600">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Section heading with emerald underline */}
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {questions.map((item, index) => (
            <FAQItem
              key={index}
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
