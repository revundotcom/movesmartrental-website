import {
  Home,
  Building2,
  DoorOpen,
  Calendar,
  FileText,
  Plus,
  ChevronRight,
} from 'lucide-react'

const NAV_ICONS = [
  { icon: Home, label: 'Home', active: true },
  { icon: Building2, label: 'Properties' },
  { icon: DoorOpen, label: 'Units' },
  { icon: Calendar, label: 'Calendar' },
  { icon: FileText, label: 'Documents' },
]

const PROPERTIES = [
  {
    id: 'MS-31429',
    address: '29-86 Chandler Drive, Toronto, Ontario',
    tint: 'from-emerald-100 to-emerald-200',
    statusPill: 'Vacant',
    secondaryPill: 'Property Added to System',
  },
  {
    id: 'MS-31430',
    address: '30-86 Chandler Drive, Toronto, Ontario',
    tint: 'from-amber-100 to-orange-200',
    statusPill: 'Vacant',
    secondaryPill: 'Property Added to System',
  },
  {
    id: 'MS-31428',
    address: '28-86 Chandler Drive, Toronto, Ontario',
    tint: 'from-sky-100 to-blue-200',
    statusPill: 'Vacant',
    secondaryPill: 'Property Added to System',
  },
]

export function OwnerDashboardMockup() {
  return (
    <div className="flex min-h-[520px] w-full bg-slate-50 text-slate-800">
      {/* Sidebar icon rail */}
      <aside className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-slate-200 bg-white py-5 md:flex">
        <div className="mb-3 size-8 rounded-lg bg-brand-navy text-center font-display text-sm leading-8 text-white">
          M
        </div>
        {NAV_ICONS.map((n) => {
          const Icon = n.icon
          return (
            <div
              key={n.label}
              className={`flex size-10 items-center justify-center rounded-lg ${
                n.active
                  ? 'bg-brand-emerald/10 text-brand-emerald'
                  : 'text-slate-400 hover:bg-slate-100'
              }`}
              aria-label={n.label}
            >
              <Icon className="size-4" aria-hidden="true" />
            </div>
          )
        })}
      </aside>

      {/* Main */}
      <div className="flex-1 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Owner Dashboard
            </p>
            <h3 className="font-display text-xl font-medium text-brand-navy sm:text-2xl">
              My Properties
            </h3>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-brand-emerald/30 bg-brand-emerald/5 px-3 py-1.5 text-xs font-semibold text-brand-emerald"
          >
            <Plus className="size-3.5" aria-hidden="true" /> Add Property
          </button>
        </div>

        {/* Stats + types row */}
        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-5">
          {/* Stats */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Offers
              </p>
              <p className="mt-1 font-display text-2xl text-brand-navy">4</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Tours
              </p>
              <p className="mt-1 font-display text-2xl text-brand-navy">6</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Occupancy
              </p>
              <div className="mt-1 flex items-center gap-2">
                {/* Circular progress */}
                <div className="relative size-9">
                  <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray="88"
                      strokeDashoffset="83.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="font-display text-xl text-brand-navy">5%</p>
              </div>
            </div>
          </div>

          {/* Pill counts */}
          <div className="flex flex-wrap items-center gap-2 lg:col-span-2 lg:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Condos <span className="rounded-full bg-brand-navy px-1.5 py-0.5 text-white">3</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Houses <span className="rounded-full bg-brand-navy px-1.5 py-0.5 text-white">5</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Apartments <span className="rounded-full bg-brand-navy px-1.5 py-0.5 text-white">14</span>
            </span>
          </div>
        </div>

        {/* Property list */}
        <div className="mt-5 rounded-xl border border-slate-100 bg-white shadow-sm">
          {PROPERTIES.map((p, i) => (
            <div
              key={p.id}
              className={`flex flex-wrap items-center gap-3 p-3 sm:p-4 ${
                i !== PROPERTIES.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div
                className={`size-12 shrink-0 rounded-lg bg-gradient-to-br ${p.tint}`}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-brand-navy">
                  {p.address}
                </p>
                <p className="mt-0.5 text-[11px] font-mono text-slate-400">
                  {p.id}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                  {p.statusPill}
                </span>
                <span className="hidden rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500 sm:inline">
                  {p.secondaryPill}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-4 text-right">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-emerald">
            View All Properties (43) <ChevronRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  )
}
