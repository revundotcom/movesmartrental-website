'use client'

import { useState } from 'react'
import { Building, MapPin, User, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const STEPS = [
  { icon: Building, label: 'Property' },
  { icon: MapPin, label: 'Location' },
  { icon: User, label: 'Contact' },
]

const PROPERTY_TYPES = ['Condo', 'House', 'Townhouse', 'Multi-Unit', 'Basement Apartment']
const CITIES = ['Toronto', 'Ottawa', 'Hamilton', 'Mississauga', 'Brampton', 'London', 'Kitchener-Waterloo', 'Barrie', 'Oshawa', 'Burlington', 'Other']

export function RentalAnalysisForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState({
    propertyType: '',
    units: '1',
    city: '',
    bedrooms: '',
    currentRent: '',
    name: '',
    email: '',
    phone: '',
  })

  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <section className="py-14 lg:py-20 bg-brand-navy">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-emerald/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-brand-emerald" />
          </div>
          <h2 className="font-display text-3xl text-white mb-4">Thank You!</h2>
          <p className="text-slate-300 text-lg">
            Your free rental analysis is on its way. A property expert will reach out within 24 hours with a personalized assessment for your property.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14 lg:py-20 bg-brand-navy relative overflow-hidden" id="rental-analysis">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll variant="blur">
          <div className="text-center mb-8">
            <p className="text-brand-emerald font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Free - No Obligation
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Get Your Free Rental Analysis
            </h2>
            <p className="text-slate-300 text-lg">
              Find out what your property could earn. Takes less than 60 seconds.
            </p>
          </div>
        </RevealOnScroll>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step > i + 1 ? 'bg-brand-emerald text-white' : step === i + 1 ? 'bg-brand-emerald text-white' : 'bg-white/10 text-slate-400'
              }`}>
                {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${step >= i + 1 ? 'text-white' : 'text-slate-500'}`}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px ${step > i + 1 ? 'bg-brand-emerald' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Property Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => updateField('propertyType', type)}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                        data.propertyType === type
                          ? 'bg-brand-emerald text-white'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Number of Units</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3', '4+'].map((n) => (
                    <button
                      key={n}
                      onClick={() => updateField('units', n)}
                      className={`py-3 rounded-lg text-sm font-medium transition-all ${
                        data.units === n
                          ? 'bg-brand-emerald text-white'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                <select
                  value={data.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 text-white px-4 py-3 text-sm focus:ring-2 focus:ring-brand-emerald/50 outline-none"
                >
                  <option value="" className="text-slate-900">Select a city</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="text-slate-900">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bedrooms</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3', '4+'].map((b) => (
                    <button
                      key={b}
                      onClick={() => updateField('bedrooms', b)}
                      className={`py-3 rounded-lg text-sm font-medium transition-all ${
                        data.bedrooms === b
                          ? 'bg-brand-emerald text-white'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {b} BR
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current Monthly Rent (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. $2,400 or 'Not sure'"
                  value={data.currentRent}
                  onChange={(e) => updateField('currentRent', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 text-white px-4 py-3 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-brand-emerald/50 outline-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 text-white px-4 py-3 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-brand-emerald/50 outline-none"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 text-white px-4 py-3 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-brand-emerald/50 outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 text-white px-4 py-3 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-brand-emerald/50 outline-none"
                  placeholder="(416) 555-0123"
                />
              </div>
              <p className="text-xs text-slate-500">
                100% free. No obligation. Your information is never shared.
              </p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={!data.name || !data.email}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-emerald text-white font-heading font-semibold text-sm hover:bg-brand-emerald-hover transition-colors disabled:opacity-50"
              >
                Get My Free Analysis <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Join 500+ property owners who trust MoveSmart Rentals
        </p>
      </div>
    </section>
  )
}
