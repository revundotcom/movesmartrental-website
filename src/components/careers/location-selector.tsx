'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { City, Country, State } from 'country-state-city'
import { MapPin, X, Check, Building2 } from 'lucide-react'

export interface LocationValue {
  city: string
  state: string
  stateCode: string
  country: string
  countryCode: string
}

interface LocationSelectorProps {
  value: LocationValue
  onChange: (value: LocationValue) => void
  errors?: {
    city?: string
    state?: string
    country?: string
  }
  defaultCountryCode?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

interface LocationItem {
  key: string
  type: 'city' | 'state'
  city: string
  state: string
  stateCode: string
  country: string
  countryCode: string
  flag: string
  title: string
  subtitle: string
}

function getFormattedCountryName(isoCode: string, rawName: string): string {
  if (isoCode === 'MK') return 'North Macedonia'
  return rawName
}

export function LocationSelector({
  value,
  onChange,
  errors = {},
  defaultCountryCode = '',
  required = true,
  disabled = false,
  className = '',
}: LocationSelectorProps) {
  // Initial display string
  const initialDisplayText = useMemo(() => {
    if (!value.city && !value.state) return ''
    if (value.city && value.state && value.city === value.state) {
      return [value.state, value.country].filter(Boolean).join(', ')
    }
    return [value.city, value.state, value.country].filter(Boolean).join(', ')
  }, [value.city, value.state, value.country])

  const [query, setQuery] = useState(initialDisplayText)
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<LocationItem[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Keep input in sync if parent resets
  useEffect(() => {
    const formatted =
      value.city && value.state && value.city === value.state
        ? [value.state, value.country].filter(Boolean).join(', ')
        : [value.city, value.state, value.country].filter(Boolean).join(', ')
    setQuery(formatted)
  }, [value.city, value.state, value.country])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Unified Search across City, State/Province, and Country
  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed || trimmed.length < 2) {
      setResults([])
      setHighlightedIndex(0)
      return
    }

    // If query matches current selection exactly, don't open dropdown
    const currentFormatted =
      value.city && value.state && value.city === value.state
        ? [value.state, value.country].filter(Boolean).join(', ')
        : [value.city, value.state, value.country].filter(Boolean).join(', ')
    if (currentFormatted && trimmed.toLowerCase() === currentFormatted.toLowerCase()) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      const qLower = trimmed.toLowerCase()
      const parts = qLower.split(',').map((p) => p.trim()).filter(Boolean)
      const mainQuery = parts[0]
      const secondaryQuery = parts[1] || ''

      const output: LocationItem[] = []
      const seen = new Set<string>()
      const MAX_ITEMS = 30

      // Priority country codes
      const priorityCountries = new Set(
        [defaultCountryCode, 'CA', 'US', 'MK', 'GB', 'IN'].filter(Boolean).map((c) => c.toUpperCase()),
      )

      // ─── 1. Check Matching States / Provinces ─────────────────────────────
      // If user typed e.g. "rajasthan", "ontario", "california", "bavaria":
      // We load that state AND all its cities!
      const allStates = State.getAllStates()
      const matchedStates: ReturnType<typeof State.getAllStates> = []

      for (let i = 0; i < allStates.length; i++) {
        const s = allStates[i]
        const sLower = s.name.toLowerCase()
        if (sLower.startsWith(mainQuery) || sLower.includes(mainQuery)) {
          matchedStates.push(s)
          if (matchedStates.length >= 4) break
        }
      }

      for (const s of matchedStates) {
        const country = Country.getCountryByCode(s.countryCode)
        const countryName = country
          ? getFormattedCountryName(s.countryCode, country.name)
          : s.countryCode
        const flag = country ? country.flag : '📍'

        // Add the State / Province itself as an option (e.g. "Rajasthan (State / Province)")
        const stateKey = `state-${s.countryCode}-${s.isoCode}`
        if (!seen.has(stateKey)) {
          seen.add(stateKey)
          output.push({
            key: stateKey,
            type: 'state',
            city: s.name,
            state: s.name,
            stateCode: s.isoCode,
            country: countryName,
            countryCode: s.countryCode,
            flag,
            title: `${s.name} (Province / State)`,
            subtitle: countryName,
          })
        }

        // Add all cities in this matched state
        const citiesInState = City.getCitiesOfState(s.countryCode, s.isoCode) || []
        for (let i = 0; i < citiesInState.length && output.length < MAX_ITEMS; i++) {
          const c = citiesInState[i]
          const cityKey = `city-${c.name}-${s.isoCode}-${s.countryCode}`
          if (!seen.has(cityKey)) {
            seen.add(cityKey)
            output.push({
              key: cityKey,
              type: 'city',
              city: c.name,
              state: s.name,
              stateCode: s.isoCode,
              country: countryName,
              countryCode: s.countryCode,
              flag,
              title: c.name,
              subtitle: `${s.name}, ${countryName}`,
            })
          }
        }
      }

      // ─── 2. Check Matching Cities Directly ────────────────────────────────
      // If user typed a city name (e.g. "jaipur", "toronto", "skopje", "chicago"):
      const allCities = City.getAllCities()
      const exactCities: LocationItem[] = []
      const prefixCities: LocationItem[] = []
      const containsCities: LocationItem[] = []

      for (let i = 0; i < allCities.length; i++) {
        const c = allCities[i]
        const cLower = c.name.toLowerCase()

        let matchType: 'exact' | 'prefix' | 'contains' | null = null
        if (cLower === mainQuery) {
          matchType = 'exact'
        } else if (cLower.startsWith(mainQuery)) {
          matchType = 'prefix'
        } else if (cLower.includes(mainQuery)) {
          matchType = 'contains'
        }

        if (matchType) {
          const country = Country.getCountryByCode(c.countryCode)
          const state = State.getStateByCodeAndCountry(c.stateCode, c.countryCode)

          const countryName = country
            ? getFormattedCountryName(c.countryCode, country.name)
            : c.countryCode
          const stateName = state ? state.name : c.stateCode || ''
          const flag = country ? country.flag : '📍'

          if (secondaryQuery) {
            const contextStr = `${stateName} ${countryName} ${c.countryCode}`.toLowerCase()
            if (!contextStr.includes(secondaryQuery)) {
              continue
            }
          }

          const cityKey = `city-${c.name}-${c.stateCode}-${c.countryCode}`
          if (!seen.has(cityKey)) {
            seen.add(cityKey)
            const item: LocationItem = {
              key: cityKey,
              type: 'city',
              city: c.name,
              state: stateName,
              stateCode: c.stateCode,
              country: countryName,
              countryCode: c.countryCode,
              flag,
              title: c.name,
              subtitle: [stateName, countryName].filter(Boolean).join(', '),
            }

            if (matchType === 'exact') {
              exactCities.push(item)
            } else if (matchType === 'prefix') {
              prefixCities.push(item)
            } else {
              containsCities.push(item)
            }

            if (exactCities.length + prefixCities.length >= MAX_ITEMS) break
          }
        }
      }

      // Sort priority countries
      const prioritySort = (a: LocationItem, b: LocationItem) => {
        const aP = priorityCountries.has(a.countryCode.toUpperCase()) ? 1 : 0
        const bP = priorityCountries.has(b.countryCode.toUpperCase()) ? 1 : 0
        return bP - aP
      }

      exactCities.sort(prioritySort)
      prefixCities.sort(prioritySort)

      // Merge results: exact cities, matched state + state cities, prefix cities, contains cities
      const combined = [
        ...exactCities,
        ...output,
        ...prefixCities,
        ...containsCities,
      ].slice(0, MAX_ITEMS)

      setResults(combined)
      setHighlightedIndex(0)
      setIsOpen(true)
    }, 120)

    return () => clearTimeout(timer)
  }, [query, defaultCountryCode, value.city, value.state, value.country])

  function selectLocation(item: LocationItem) {
    const formatted =
      item.type === 'state'
        ? `${item.state}, ${item.country}`
        : `${item.city}, ${item.state ? `${item.state}, ` : ''}${item.country}`

    setQuery(formatted)
    setIsOpen(false)
    setResults([])

    onChange({
      city: item.city,
      state: item.state,
      stateCode: item.stateCode,
      country: item.country,
      countryCode: item.countryCode,
    })
  }

  function handleClear() {
    setQuery('')
    setResults([])
    setIsOpen(false)
    onChange({
      city: '',
      state: '',
      stateCode: '',
      country: '',
      countryCode: '',
    })
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) {
      if (e.key === 'ArrowDown' && results.length > 0) {
        setIsOpen(true)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1))
      scrollIntoView(highlightedIndex + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
      scrollIntoView(highlightedIndex - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[highlightedIndex]) {
        selectLocation(results[highlightedIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
    }
  }

  function scrollIntoView(index: number) {
    const list = listRef.current
    if (!list) return
    const el = list.children[index] as HTMLElement | undefined
    if (el) {
      el.scrollIntoView({ block: 'nearest' })
    }
  }

  const errorMessage = errors.city || errors.state || errors.country

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {/* Hidden inputs for form data submission */}
      <input type="hidden" name="city" value={value.city || ''} />
      <input type="hidden" name="state" value={value.state || ''} />
      <input type="hidden" name="province" value={value.state || ''} />
      <input type="hidden" name="state_province" value={value.state || ''} />
      <input type="hidden" name="country" value={value.country || ''} />
      <input type="hidden" name="country_code" value={value.countryCode || ''} />
      <input
        type="hidden"
        name="residential_location"
        value={[value.city, value.state, value.country].filter(Boolean).join(', ')}
      />

      <label
        htmlFor="city-autocomplete-input"
        className="mb-1 block text-xs font-semibold text-slate-600"
      >
        City / Residential Location {required && <span className="text-red-500">*</span>}
      </label>

      {/* Single Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MapPin className="h-4 w-4 text-slate-400" />
        </div>

        <input
          id="city-autocomplete-input"
          ref={inputRef}
          type="text"
          autoComplete="off"
          disabled={disabled}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search city or province (e.g. Toronto, Montreal, Chicago, Phoenix)..."
          className={`w-full rounded-lg border pl-9 pr-9 py-2 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 ${errorMessage
            ? 'border-red-500 bg-red-50/20 focus:ring-red-400'
            : 'border-slate-200 bg-slate-50 focus:border-[var(--brand-emerald)] focus:bg-white focus:ring-[var(--brand-emerald)]/20'
            } ${disabled ? 'cursor-not-allowed bg-slate-100 text-slate-400' : ''}`}
        />

        {query && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            aria-label="Clear location input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 animate-in fade-in-50 zoom-in-95 duration-100">
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-64 overflow-y-auto divide-y divide-slate-100 py-1 text-xs"
          >
            {results.length === 0 ? (
              <li className="p-4 text-center text-xs text-slate-500">
                <p className="font-semibold text-slate-700">No matching location found</p>
                <p className="mt-1 text-slate-400">
                  Try searching for a nearby major city, district, or your state/province name.
                </p>
              </li>
            ) : (
              results.map((item, index) => {
                const isHighlighted = index === highlightedIndex
                const isSelected =
                  value.city &&
                  value.countryCode === item.countryCode &&
                  (value.city.toLowerCase() === item.city.toLowerCase() ||
                    (item.type === 'state' && value.state.toLowerCase() === item.state.toLowerCase()))

                return (
                  <li
                    key={item.key}
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => selectLocation(item)}
                    className={`flex cursor-pointer items-center justify-between px-3.5 py-2.5 transition-colors ${isHighlighted
                      ? 'bg-emerald-50/80 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200/80 shrink-0">
                        {item.countryCode}
                      </span>
                      {item.type === 'state' ? (
                        <Building2 className="h-3.5 w-3.5 text-brand-emerald shrink-0" />
                      ) : (
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      )}
                      <div className="truncate">
                        <span
                          className={`font-semibold ${item.type === 'state' ? 'text-brand-navy' : 'text-slate-900'
                            }`}
                        >
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <span className="ml-1.5 text-slate-400">({item.subtitle})</span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-[var(--brand-emerald)]" />
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
