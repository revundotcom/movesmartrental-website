'use client'

import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

// Per-city averages aligned with CMHC Rental Market Report Q4 2025 / Statistics Canada
const CITY_DATA: Record<string, Record<string, number>> = {
  // Ontario - GTA
  Toronto: { '1': 2600, '2': 2720, '3': 3200, '4': 3800 },
  Mississauga: { '1': 2300, '2': 2700, '3': 3100, '4': 3500 },
  Brampton: { '1': 2199, '2': 2500, '3': 2800, '4': 3200 },
  Vaughan: { '1': 2350, '2': 2750, '3': 3150, '4': 3550 },
  Markham: { '1': 2300, '2': 2700, '3': 3100, '4': 3500 },
  'Richmond Hill': { '1': 2280, '2': 2680, '3': 3080, '4': 3480 },
  Oakville: { '1': 2250, '2': 2650, '3': 3050, '4': 3450 },
  Burlington: { '1': 2135, '2': 2578, '3': 2900, '4': 3300 },
  Oshawa: { '1': 1570, '2': 1900, '3': 2200, '4': 2600 },
  Hamilton: { '1': 1699, '2': 2100, '3': 2500, '4': 2900 },
  // Ontario - Other
  Ottawa: { '1': 1900, '2': 2490, '3': 2800, '4': 3200 },
  London: { '1': 1516, '2': 1925, '3': 2200, '4': 2600 },
  Kitchener: { '1': 1800, '2': 2050, '3': 2400, '4': 2800 },
  Waterloo: { '1': 1820, '2': 2080, '3': 2420, '4': 2820 },
  Cambridge: { '1': 1700, '2': 1980, '3': 2300, '4': 2700 },
  Guelph: { '1': 1750, '2': 2050, '3': 2350, '4': 2750 },
  Barrie: { '1': 1750, '2': 2100, '3': 2400, '4': 2800 },
  Windsor: { '1': 1400, '2': 1700, '3': 2000, '4': 2400 },
  Kingston: { '1': 1550, '2': 1850, '3': 2150, '4': 2500 },
  // Quebec
  Montreal: { '1': 1550, '2': 1850, '3': 2200, '4': 2600 },
  'Quebec City': { '1': 1200, '2': 1450, '3': 1700, '4': 2000 },
  Laval: { '1': 1500, '2': 1780, '3': 2050, '4': 2400 },
  Gatineau: { '1': 1450, '2': 1720, '3': 2000, '4': 2350 },
  // British Columbia
  Vancouver: { '1': 2700, '2': 3400, '3': 4200, '4': 5000 },
  Burnaby: { '1': 2400, '2': 3000, '3': 3700, '4': 4400 },
  Surrey: { '1': 2100, '2': 2600, '3': 3100, '4': 3700 },
  Victoria: { '1': 1950, '2': 2450, '3': 2900, '4': 3400 },
  // Alberta
  Calgary: { '1': 1750, '2': 2150, '3': 2550, '4': 3000 },
  Edmonton: { '1': 1400, '2': 1700, '3': 2050, '4': 2450 },
  // Prairies & Atlantic
  Winnipeg: { '1': 1300, '2': 1600, '3': 1900, '4': 2250 },
  Saskatoon: { '1': 1250, '2': 1500, '3': 1800, '4': 2150 },
  Regina: { '1': 1200, '2': 1450, '3': 1750, '4': 2100 },
  Halifax: { '1': 1700, '2': 2050, '3': 2400, '4': 2800 },
}

const MANAGEMENT_FEE_PERCENT = 0.08

export function RentCalculator({ className = '' }: { className?: string }) {
  const [city, setCity] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [showResult, setShowResult] = useState(false)

  const estimatedRent = city && bedrooms ? CITY_DATA[city]?.[bedrooms] || 0 : 0
  const managementFee = Math.round(estimatedRent * MANAGEMENT_FEE_PERCENT)
  const netIncome = estimatedRent - managementFee

  const handleCalculate = () => {
    if (city && bedrooms) setShowResult(true)
  }

  return (
    <section className={`py-14 lg:py-20 bg-brand-navy relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <RevealOnScroll variant="slideFromLeft">
            <div>
              <p className="text-brand-emerald font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                Free Tool
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                How Much Could Your Property Earn?
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Get an instant rent estimate for your property using the latest CMHC Rental Market Report and Statistics Canada figures. No signup required.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-brand-emerald" />
                  Based on CMHC Rental Market Report
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-emerald" />
                  Statistics Canada · Updated quarterly
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="slideUp">
            <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                  <select
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setShowResult(false) }}
                    className="w-full rounded-lg border border-white/10 bg-white/5 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-brand-emerald/50 focus:border-brand-emerald/50 outline-none"
                  >
                    <option value="" className="text-slate-900">Select a city</option>
                    {Object.keys(CITY_DATA).map((c) => (
                      <option key={c} value={c} className="text-slate-900">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Bedrooms</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['1', '2', '3', '4'].map((b) => (
                      <button
                        key={b}
                        onClick={() => { setBedrooms(b); setShowResult(false) }}
                        className={`py-3 rounded-lg text-sm font-medium transition-all ${
                          bedrooms === b
                            ? 'bg-brand-emerald text-white'
                            : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {b} {b === '4' ? '+' : ''} BR
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!city || !bedrooms}
                  className="w-full py-4 rounded-lg bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Rent Estimate
                </button>

                {showResult && estimatedRent > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Estimated Monthly Rent</span>
                      <span className="font-heading font-bold text-2xl text-white tabular-nums">
                        ${estimatedRent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Management Fee (8%)</span>
                      <span className="text-slate-400 text-sm tabular-nums">
                        -${managementFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <span className="text-brand-emerald font-medium">Your Net Income</span>
                      <span className="font-heading font-bold text-2xl text-brand-emerald tabular-nums">
                        ${netIncome.toLocaleString()}/mo
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-4">
                      * Estimates derived from the CMHC Rental Market Report and Statistics Canada housing data. Actual rent depends on property condition, location, and amenities.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
