'use client'

import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const CITY_DATA: Record<string, Record<string, number>> = {
  Toronto: { '1': 2600, '2': 2720, '3': 3200, '4': 3800 },
  Ottawa: { '1': 1900, '2': 2490, '3': 2800, '4': 3200 },
  Hamilton: { '1': 1699, '2': 2100, '3': 2500, '4': 2900 },
  Mississauga: { '1': 2300, '2': 2700, '3': 3100, '4': 3500 },
  Brampton: { '1': 2199, '2': 2500, '3': 2800, '4': 3200 },
  London: { '1': 1516, '2': 1925, '3': 2200, '4': 2600 },
  'Kitchener-Waterloo': { '1': 1800, '2': 2050, '3': 2400, '4': 2800 },
  Barrie: { '1': 1750, '2': 2100, '3': 2400, '4': 2800 },
  Oshawa: { '1': 1570, '2': 1900, '3': 2200, '4': 2600 },
  Burlington: { '1': 2135, '2': 2578, '3': 2900, '4': 3300 },
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
                Get an instant rent estimate for your property based on current market data across Ontario. No signup required.
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-brand-emerald" />
                  Based on 2026 market data
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-emerald" />
                  Updated monthly
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
                      * Estimates based on current market data. Actual rent depends on property condition, location, and amenities.
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
