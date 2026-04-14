'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

// ─────────────────────────────────────────────────────────────
// Shared data shapes
// ─────────────────────────────────────────────────────────────

export interface ProvinceCard {
  name: string
  slug: string
  country: 'CA'
  cityCount: number
  note: string
  positioning: string
}

export interface StateCard {
  name: string
  slug: string
  cityCount: number
  note: string
  positioning: string
  status: 'Now live' | 'Coverage rolling out'
}

export interface OntarioCity {
  name: string
  slug: string
  marketNote: string
}

export interface USCity {
  name: string
  slug: string
  state: string
  stateSlug: string
}

// ─────────────────────────────────────────────────────────────
// Canada - Province Grid
// ─────────────────────────────────────────────────────────────

export function ProvinceGrid({ provinces }: { provinces: ProvinceCard[] }) {
  return (
    <RevealOnScroll variant="fade" duration={0.8}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {provinces.map((p) => (
          <Link
            key={p.slug}
            href={`/ca/${p.slug}/`}
            className="group relative flex flex-col rounded-2xl border border-brand-navy/10 bg-white p-7 transition-all duration-300 hover:border-brand-emerald/40 hover:shadow-[0_24px_48px_-28px_rgba(10,46,37,0.35)]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
              Province
            </p>
            <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-brand-navy sm:text-3xl">
              {p.name}
              <span className="text-brand-gold" aria-hidden="true">
                .
              </span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {p.positioning}
            </p>
            <div className="mt-6 flex items-end justify-between border-t border-brand-navy/10 pt-4">
              <div>
                <p className="font-display text-2xl font-normal text-brand-navy">
                  {p.cityCount}+
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Tier-1 cities
                </p>
              </div>
              <span className="font-heading text-sm font-semibold text-brand-emerald transition-colors group-hover:text-brand-navy">
                Explore {p.name} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </RevealOnScroll>
  )
}

// ─────────────────────────────────────────────────────────────
// Ontario - searchable tier-1 city grid
// ─────────────────────────────────────────────────────────────

export function OntarioCityDirectory({ cities }: { cities: OntarioCity[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cities
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.marketNote.toLowerCase().includes(q),
    )
  }, [cities, query])

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-heading text-sm text-slate-600">
          <span className="font-semibold text-brand-navy">{cities.length}</span>{' '}
          tier-1 Ontario cities serviced
        </p>
        <label className="relative block w-full max-w-xs">
          <span className="sr-only">Filter Ontario cities</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter cities…"
            className="w-full rounded-full border border-brand-navy/15 bg-white px-5 py-2.5 font-heading text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-brand-emerald/20"
          />
        </label>
      </div>

      <RevealOnScroll variant="fade" duration={0.7}>
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-brand-navy/15 bg-white/60 p-8 text-center font-heading text-sm text-slate-500">
            No Ontario cities match &ldquo;{query}&rdquo;. Try a different
            filter, or browse the full list.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/ca/ontario/${city.slug}/`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-brand-navy/10 bg-white px-5 py-4 transition-all duration-200 hover:border-brand-emerald/40 hover:bg-white hover:shadow-[0_16px_32px_-24px_rgba(10,46,37,0.35)]"
                >
                  <p className="font-display text-lg font-normal text-brand-navy group-hover:text-brand-emerald">
                    {city.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {city.marketNote}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </RevealOnScroll>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// US - State Grid (dark band)
// ─────────────────────────────────────────────────────────────

export function StateGrid({ states }: { states: StateCard[] }) {
  return (
    <RevealOnScroll variant="fade" duration={0.8}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {states.map((s) => (
          <Link
            key={s.slug}
            href={`/us/${s.slug}/`}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-brand-gold/50 hover:bg-white/[0.06]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                State
              </p>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  s.status === 'Now live'
                    ? 'border-brand-emerald/40 bg-brand-emerald/10 text-brand-emerald'
                    : 'border-white/20 bg-white/5 text-white/60'
                }`}
              >
                {s.status}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-white sm:text-[26px]">
              {s.name}
              <span className="text-brand-gold" aria-hidden="true">
                .
              </span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {s.positioning}
            </p>
            <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
              <div>
                <p className="font-display text-xl font-normal text-white">
                  {s.cityCount}+
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Priority cities
                </p>
              </div>
              <span className="font-heading text-xs font-semibold text-brand-gold transition-colors group-hover:text-white">
                Explore <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </RevealOnScroll>
  )
}

// ─────────────────────────────────────────────────────────────
// US - Tier-1 city directory, grouped by state, searchable
// ─────────────────────────────────────────────────────────────

export function USCityDirectory({ cities }: { cities: USCity[] }) {
  const [query, setQuery] = useState('')

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = q
      ? cities.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.state.toLowerCase().includes(q),
        )
      : cities
    const map = new Map<string, { state: string; stateSlug: string; items: USCity[] }>()
    for (const c of filtered) {
      const key = c.stateSlug
      if (!map.has(key)) {
        map.set(key, { state: c.state, stateSlug: c.stateSlug, items: [] })
      }
      map.get(key)!.items.push(c)
    }
    return Array.from(map.values())
  }, [cities, query])

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-heading text-sm text-slate-600">
          <span className="font-semibold text-brand-navy">{cities.length}</span>{' '}
          priority U.S. cities across{' '}
          <span className="font-semibold text-brand-navy">10</span> states
        </p>
        <label className="relative block w-full max-w-xs">
          <span className="sr-only">Filter U.S. cities</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by city or state…"
            className="w-full rounded-full border border-brand-navy/15 bg-white px-5 py-2.5 font-heading text-sm text-brand-navy placeholder:text-slate-400 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-brand-emerald/20"
          />
        </label>
      </div>

      <RevealOnScroll variant="fade" duration={0.7}>
        {grouped.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-brand-navy/15 bg-white/60 p-8 text-center font-heading text-sm text-slate-500">
            No U.S. cities match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="space-y-10">
            {grouped.map((group) => (
              <div key={group.stateSlug}>
                <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-brand-navy/10 pb-3">
                  <h3 className="font-display text-xl font-normal text-brand-navy">
                    <Link
                      href={`/us/${group.stateSlug}/`}
                      className="transition-colors hover:text-brand-emerald"
                    >
                      {group.state}
                    </Link>
                  </h3>
                  <span className="font-heading text-xs text-slate-500">
                    {group.items.length} cities
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {group.items.map((city) => (
                    <li key={`${city.stateSlug}-${city.slug}`}>
                      <Link
                        href={`/us/${city.stateSlug}/${city.slug}/`}
                        className="group flex h-full flex-col rounded-xl border border-brand-navy/10 bg-white px-4 py-3 transition-all duration-200 hover:border-brand-emerald/40 hover:shadow-[0_12px_28px_-22px_rgba(10,46,37,0.35)]"
                      >
                        <p className="font-display text-base font-normal text-brand-navy group-hover:text-brand-emerald">
                          {city.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {city.state}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </RevealOnScroll>
    </div>
  )
}
