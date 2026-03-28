'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

import type { CityGridBlockProps } from '@/types/blocks'

function formatPopulation(population: number): string {
  return population.toLocaleString('en-CA')
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function CityGridBlock({
  cities,
  province,
  columns = 3,
  showHeading = true,
}: CityGridBlockProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  if (cities.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 304 // 288px card + 16px gap
    el.scrollBy({ left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' })
  }

  // For small city lists (≤ 3), fall back to the grid layout
  const useCarousel = cities.length > 3

  if (!useCarousel) {
    const COLUMN_CLASSES: Record<number, string> = {
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
    }
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4">
          {showHeading && province && (
            <RevealOnScroll>
              <motion.div variants={revealItem} className="mb-12 text-center">
                <h2 className="font-display text-3xl font-normal tracking-tight text-[#0B1D3A] sm:text-4xl">
                  {province}
                </h2>
                <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
              </motion.div>
            </RevealOnScroll>
          )}
          <RevealOnScroll
            className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${COLUMN_CLASSES[columns] ?? 'lg:grid-cols-3'}`}
            stagger={0.08}
          >
            {cities.map((city) => (
              <motion.div variants={revealItem} key={city.slug}>
                <CityCard city={city} />
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {showHeading && province && (
          <RevealOnScroll>
            <motion.div variants={revealItem} className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-normal tracking-tight text-[#0B1D3A] sm:text-4xl">
                  {province}
                </h2>
                <div className="mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
              </div>
              {/* Desktop arrow buttons */}
              <div className="hidden items-center gap-2 md:flex">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                  className="flex size-10 items-center justify-center rounded-full border border-[#0B1D3A]/20 text-[#0B1D3A] transition-all hover:border-[#0B1D3A] hover:bg-[#0B1D3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                  className="flex size-10 items-center justify-center rounded-full border border-[#0B1D3A]/20 text-[#0B1D3A] transition-all hover:border-[#0B1D3A] hover:bg-[#0B1D3A] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </motion.div>
          </RevealOnScroll>
        )}

        {/* Carousel scroll container */}
        <div className="relative">
          {/* Left fade gradient */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent transition-opacity duration-300"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
          />
          {/* Right fade gradient */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
            style={{ opacity: canScrollRight ? 1 : 0 }}
          />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {cities.map((city, index) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
                className="w-72 shrink-0"
                style={{ scrollSnapAlign: 'start' }}
              >
                <CityCard city={city} />
              </motion.div>
            ))}
            {/* Trailing spacer so last card doesn't hide behind right gradient */}
            <div className="w-4 shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Mobile swipe hint — only on first render / small screens */}
        <p className="mt-3 text-center text-xs text-[#0B1D3A]/40 md:hidden">
          Swipe to explore all cities &rarr;
        </p>
      </div>
    </section>
  )
}

interface CityCardProps {
  city: {
    title: string
    slug: string
    provinceSlug: string
    population?: number
    medianRent?: number
    heroImageUrl?: string
    heroImageAlt?: string
  }
}

function CityCard({ city }: CityCardProps) {
  return (
    <Link
      href={`/ca/${city.provinceSlug}/${city.slug}/`}
      className="group cursor-pointer"
    >
      <div className="relative h-full overflow-hidden rounded-2xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#0B1D3A]/15">
        {/* Image area */}
        {city.heroImageUrl ? (
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src={city.heroImageUrl}
              alt={city.heroImageAlt ?? `${city.title} skyline`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-107"
              sizes="288px"
            />
            {/* Rich gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/90 via-[#0B1D3A]/20 to-transparent transition-all duration-300 group-hover:from-[#0B1D3A]/95" />
          </div>
        ) : (
          <div className="relative flex h-60 w-full items-end bg-gradient-to-br from-[#0B1D3A] to-[#132B4F]">
            <MapPin className="absolute right-4 top-4 size-8 text-white/10" aria-hidden="true" />
          </div>
        )}

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-emerald-300">
                {city.title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {city.population != null && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Users className="size-3" aria-hidden="true" />
                    {formatPopulation(city.population)}
                  </span>
                )}
                {city.medianRent != null && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/25 px-2.5 py-1 text-xs font-medium text-emerald-200 backdrop-blur-sm">
                    <DollarSign className="size-3" aria-hidden="true" />
                    {formatCurrency(city.medianRent)}/mo
                  </span>
                )}
              </div>
            </div>
            {/* Arrow */}
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/0 transition-all duration-300 group-hover:bg-emerald-500/20">
              <svg className="size-4 -translate-x-0.5 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
