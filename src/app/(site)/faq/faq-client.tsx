'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FaqTab } from './faq-data'

/* ------------------------------------------------------------------ */
/*  Search result type                                                 */
/* ------------------------------------------------------------------ */

interface SearchResult {
  tabId: string
  tabLabel: string
  categoryId: string
  categoryLabel: string
  question: string
  answer: string
}

/* ------------------------------------------------------------------ */
/*  Single accordion item                                             */
/* ------------------------------------------------------------------ */

function AccordionItem({
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
      className={cn(
        'group/item relative border-b border-slate-100 last:border-b-0 transition-colors duration-200',
        isOpen ? 'bg-emerald-50/60' : 'hover:bg-slate-50/80',
      )}
    >
      {/* Left accent bar */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-0.5 rounded-full transition-all duration-300',
          isOpen ? 'bg-emerald-500' : 'bg-transparent',
        )}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'pr-4 text-sm font-semibold leading-snug transition-colors duration-200 sm:text-base',
            isOpen ? 'text-emerald-700' : 'text-[#0B1D3A]',
          )}
        >
          {question}
        </span>
        <ChevronDown
          className={cn(
            'mt-0.5 size-5 shrink-0 transition-transform duration-300',
            isOpen ? 'rotate-180 text-emerald-500' : 'text-slate-400 group-hover/item:text-emerald-500',
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-250 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4 pl-5 pr-10 text-sm leading-relaxed text-slate-600">
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Category panel — list of accordions for one category             */
/* ------------------------------------------------------------------ */

function CategoryPanel({
  questions,
  isActive,
}: {
  questions: { question: string; answer: string }[]
  isActive: boolean
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {questions.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Search results panel                                              */
/* ------------------------------------------------------------------ */

function SearchResults({ results }: { results: SearchResult[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (results.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-2xl">🔍</p>
        <p className="mt-3 font-semibold text-[#0B1D3A]">No results found</p>
        <p className="mt-1 text-sm text-slate-500">Try different keywords, or browse the categories below.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 text-sm text-slate-500">
        {results.length} result{results.length !== 1 ? 's' : ''} found
      </p>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {results.map((r, i) => (
          <div key={i} className="relative">
            <AccordionItem
              question={r.question}
              answer={r.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
            <span className="absolute right-12 top-4 hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:inline-flex">
              {r.tabLabel} › {r.categoryLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main client component                                             */
/* ------------------------------------------------------------------ */

export function FAQPageClient({ tabs }: { tabs: FaqTab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [activeCategory, setActiveCategory] = useState<string>(
    tabs[0].categories[0].id,
  )
  const [searchQuery, setSearchQuery] = useState('')

  const currentTab = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  // When switching tabs, reset to first category
  function handleTabChange(tabId: string) {
    const tab = tabs.find((t) => t.id === tabId)
    if (!tab) return
    setActiveTab(tabId)
    setActiveCategory(tab.categories[0].id)
  }

  // Full-text search across all tabs & categories
  const searchResults = useMemo<SearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    const results: SearchResult[] = []
    for (const tab of tabs) {
      for (const cat of tab.categories) {
        for (const item of cat.questions) {
          if (
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
          ) {
            results.push({
              tabId: tab.id,
              tabLabel: tab.label,
              categoryId: cat.id,
              categoryLabel: cat.label,
              question: item.question,
              answer: item.answer,
            })
          }
        }
      }
    }
    return results
  }, [searchQuery, tabs])

  const isSearching = searchQuery.trim().length > 0

  return (
    <section className="bg-slate-50/50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4">

        {/* Search bar */}
        <div className="relative mb-10">
          <Search
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-[#0B1D3A] shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 sm:text-base"
            aria-label="Search FAQ"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search results mode */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <SearchResults results={searchResults} />
            </motion.div>
          ) : (
            <motion.div
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Audience tabs */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={cn(
                        'flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                        activeTab === tab.id
                          ? 'bg-[#0B1D3A] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1D3A]',
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mt-3 text-center text-sm text-slate-500"
                  >
                    {currentTab.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Category pills */}
              <div className="mb-6 flex flex-wrap gap-2">
                {currentTab.categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                      activeCategory === cat.id
                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700',
                    )}
                  >
                    <span className="mr-1.5" aria-hidden="true">{cat.icon}</span>
                    {cat.label}
                    <span className="ml-1.5 text-xs opacity-70">
                      ({cat.questions.length})
                    </span>
                  </button>
                ))}
              </div>

              {/* FAQ accordions for active category */}
              <AnimatePresence mode="wait">
                {currentTab.categories.map((cat) => (
                  <CategoryPanel
                    key={`${activeTab}-${cat.id}`}
                    questions={cat.questions}
                    isActive={cat.id === activeCategory}
                  />
                ))}
              </AnimatePresence>

              {/* Quick links to other sections */}
              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Other sections
                </p>
                <div className="flex flex-wrap gap-2">
                  {tabs
                    .filter((t) => t.id !== activeTab)
                    .flatMap((t) =>
                      t.categories.map((cat) => ({
                        label: `${t.label}: ${cat.label}`,
                        tabId: t.id,
                        catId: cat.id,
                        count: cat.questions.length,
                      })),
                    )
                    .map((item) => (
                      <button
                        key={`${item.tabId}-${item.catId}`}
                        type="button"
                        onClick={() => {
                          handleTabChange(item.tabId)
                          setActiveCategory(item.catId)
                        }}
                        className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {item.label}
                        <span className="ml-1 opacity-60">({item.count})</span>
                      </button>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
