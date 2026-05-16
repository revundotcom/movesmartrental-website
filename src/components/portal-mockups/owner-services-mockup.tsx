import { Wrench, Camera, ArrowUpRight } from 'lucide-react'

const MONTHS = [
  { month: 'Feb', inc: 40, exp: 25 },
  { month: 'Mar', inc: 55, exp: 30 },
  { month: 'Apr', inc: 95, exp: 60 },
  { month: 'May', inc: 75, exp: 45 },
  { month: 'Jun', inc: 65, exp: 35 },
  { month: 'Jul', inc: 70, exp: 40 },
]

export function OwnerServicesMockup() {
  return (
    <div className="min-h-[520px] w-full bg-slate-50 p-4 text-slate-800 sm:p-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Owner Tools
        </p>
        <h3 className="font-display text-xl font-medium text-brand-navy sm:text-2xl">
          Owner Services + Transactions
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Owner Services */}
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Owner Services
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Request work, book photography, or chat with your leasing manager.
          </p>

          <div className="mt-4 space-y-2">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 text-left transition hover:border-brand-emerald/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-emerald/10">
                  <Wrench className="size-4 text-brand-emerald" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    Request Maintenance
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Vendor dispatch · trade matched
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-slate-400" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 text-left transition hover:border-brand-emerald/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-navy/10">
                  <Camera className="size-4 text-brand-navy" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    Book Listing Photos
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Pro shoot · floorplan · 3D tour
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-slate-400" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm lg:col-span-3">
          {/* Header stats */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Transactions
            </p>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-sm bg-emerald-500" aria-hidden="true" />
                <span className="font-semibold text-slate-600">Income</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-sm bg-rose-500" aria-hidden="true" />
                <span className="font-semibold text-slate-600">Expense</span>
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Units
              </p>
              <p className="font-display text-lg text-brand-navy">43</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Total Balance
              </p>
              <p className="font-display text-lg text-emerald-600">
                CA$ 2,217.02
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Retainer
              </p>
              <p className="font-display text-lg text-brand-navy">CA$ 0.00</p>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-4 flex h-40 items-end gap-3 border-b border-slate-100 px-2 pb-1">
            {MONTHS.map((m) => (
              <div
                key={m.month}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div className="flex h-32 w-full items-end justify-center gap-1">
                  <div
                    className="w-3 rounded-t bg-emerald-500"
                    style={{ height: `${m.inc}%` }}
                    title={`Income ${m.inc}`}
                  />
                  <div
                    className="w-3 rounded-t bg-rose-500"
                    style={{ height: `${m.exp}%` }}
                    title={`Expense ${m.exp}`}
                  />
                </div>
                <p className="text-[10px] font-semibold text-slate-500">
                  {m.month} 2026
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
