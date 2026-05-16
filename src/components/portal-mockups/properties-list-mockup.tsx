import { Bell, Plus, Calendar, ChevronRight } from 'lucide-react'

const TABS = [
  { label: 'All', count: 43, active: true },
  { label: 'Condos', count: 3 },
  { label: 'Houses', count: 5 },
  { label: 'Apartments', count: 14 },
]

const PROPS = [
  {
    address: '50 Stone Road East, Guelph, Ontario, N1G 2W1',
    id: null,
    gradient: 'from-emerald-100 to-teal-200',
    badges: [
      { label: '2 Units', color: 'bg-slate-100 text-slate-700' },
      {
        label: 'Listing Agreement signed — Waiting for MLS',
        color: 'bg-amber-50 text-amber-700 border border-amber-200',
      },
    ],
    showings: true,
  },
  {
    address: '29-86 Chandler Drive, Toronto, Ontario, M1S 4N5',
    id: 'MS-31429',
    gradient: 'from-sky-100 to-blue-200',
    badges: [
      { label: 'Vacant', color: 'bg-rose-50 text-rose-600' },
      {
        label: 'Property Added to System',
        color: 'border border-slate-200 text-slate-500',
      },
    ],
    showings: false,
  },
  {
    address: '14 Maple Ridge Crescent, Mississauga, Ontario',
    id: 'MS-31201',
    gradient: 'from-amber-100 to-orange-200',
    badges: [
      { label: 'Occupied', color: 'bg-emerald-50 text-emerald-600' },
      {
        label: 'Lease Active — Renews Aug 2026',
        color: 'border border-slate-200 text-slate-500',
      },
    ],
    showings: true,
  },
  {
    address: '8 Royal Oak Drive, Oakville, Ontario, L6J 2K3',
    id: 'MS-31102',
    gradient: 'from-purple-100 to-fuchsia-200',
    badges: [
      { label: 'Occupied', color: 'bg-emerald-50 text-emerald-600' },
      {
        label: 'Property Added to System',
        color: 'border border-slate-200 text-slate-500',
      },
    ],
    showings: false,
  },
  {
    address: '212 Front Street West, Toronto, Ontario, M5V 1B6',
    id: null,
    gradient: 'from-rose-100 to-pink-200',
    badges: [
      { label: '5 Units', color: 'bg-slate-100 text-slate-700' },
      {
        label: 'Active Showings This Week',
        color: 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30',
      },
    ],
    showings: true,
  },
  {
    address: '1101 Bay Street, Toronto, Ontario, M5S 2W8',
    id: 'MS-30988',
    gradient: 'from-slate-200 to-slate-400',
    badges: [
      { label: 'Vacant', color: 'bg-rose-50 text-rose-600' },
      {
        label: 'Photos Scheduled — May 21',
        color: 'border border-slate-200 text-slate-500',
      },
    ],
    showings: true,
  },
]

export function PropertiesListMockup() {
  return (
    <div className="min-h-[520px] w-full bg-slate-50 p-4 text-slate-800 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Portfolio
          </p>
          <h3 className="font-display text-xl font-medium text-brand-navy sm:text-2xl">
            Properties
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white"
              aria-label="Notifications"
            >
              <Bell className="size-4 text-slate-500" aria-hidden="true" />
            </button>
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
              3
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-brand-emerald/30 bg-brand-emerald/5 px-3 py-1.5 text-xs font-semibold text-brand-emerald"
          >
            <Plus className="size-3.5" aria-hidden="true" /> Add Property
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-1 overflow-x-auto border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.label}
            type="button"
            className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 pb-2 text-xs font-semibold uppercase tracking-wider ${
              t.active
                ? 'border-brand-navy text-brand-navy'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                t.active ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Rows */}
      <div className="mt-3 space-y-2">
        {PROPS.map((p, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            <div
              className={`size-14 shrink-0 rounded-lg bg-gradient-to-br ${p.gradient}`}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-brand-navy">
                {p.address}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                {p.id && (
                  <span className="text-[10px] font-mono text-slate-400">
                    {p.id}
                  </span>
                )}
                {p.badges.map((b, bi) => (
                  <span
                    key={bi}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${b.color}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
            {p.showings && (
              <span className="hidden items-center gap-1 whitespace-nowrap rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 sm:inline-flex">
                <Calendar className="size-3" aria-hidden="true" /> Showings &amp; Offers
                <ChevronRight className="size-3" aria-hidden="true" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
