import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const BARS = [
  { month: 'Mar 2026', inc: 60, exp: 35 },
  { month: 'Apr 2026', inc: 90, exp: 55 },
  { month: 'May 2026', inc: 75, exp: 40 },
  { month: 'Jun 2026', inc: 85, exp: 50 },
]

const TRANSACTIONS = [
  {
    title: 'Tenant Screening - Singlekey',
    subject: 'Tenant Twenty One',
    date: 'May 15, 2026',
    status: 'Paid',
    amount: '-$28.24',
    negative: true,
  },
  {
    title: 'Monthly Rent Collection',
    subject: 'Tenant Nineteen',
    date: 'May 14, 2026',
    status: 'Paid',
    amount: '+$2,450.00',
    negative: false,
  },
  {
    title: 'Listing Photography Package',
    subject: '86 Chandler Drive, Unit 29',
    date: 'May 12, 2026',
    status: 'Paid',
    amount: '-$185.00',
    negative: true,
  },
  {
    title: 'Tenant Screening - Singlekey',
    subject: 'Tenant Twenty',
    date: 'May 10, 2026',
    status: 'Paid',
    amount: '-$28.24',
    negative: true,
  },
  {
    title: 'Lease Signing Bonus',
    subject: 'Tenant Eighteen',
    date: 'May 08, 2026',
    status: 'Paid',
    amount: '+$2,000.00',
    negative: false,
  },
  {
    title: 'MLS Listing Fee',
    subject: '30-86 Chandler Drive',
    date: 'May 05, 2026',
    status: 'Paid',
    amount: '-$95.00',
    negative: true,
  },
]

export function WalletMockup() {
  return (
    <div className="min-h-[520px] w-full bg-slate-50 p-4 text-slate-800 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Owner Banking
          </p>
          <h3 className="font-display text-xl font-medium text-brand-navy sm:text-2xl">
            My Wallet
          </h3>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-brand-emerald/30 bg-brand-emerald/5 px-3 py-1.5 text-xs font-semibold text-brand-emerald"
        >
          <Plus className="size-3.5" aria-hidden="true" /> Direct Deposit Info
        </button>
      </div>

      {/* Net income card */}
      <div className="mt-4 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-brand-navy p-5 text-white lg:grid-cols-5">
        <div className="lg:col-span-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Net Income
          </p>
          <p className="mt-1 font-display text-3xl text-white sm:text-4xl">
            $2,217.02
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                <ArrowUpRight className="size-3" aria-hidden="true" /> Income
              </p>
              <p className="mt-1 font-display text-xl text-emerald-300">
                $4,450.00
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
                <ArrowDownRight className="size-3" aria-hidden="true" /> Expense
              </p>
              <p className="mt-1 font-display text-xl text-rose-300">
                $2,232.98
              </p>
            </div>
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="lg:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
            Trend
          </p>
          <div className="mt-3 flex h-24 items-end gap-2">
            {BARS.map((b) => (
              <div key={b.month} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-20 w-full items-end justify-center gap-0.5">
                  <div
                    className="w-2 rounded-t bg-emerald-400"
                    style={{ height: `${b.inc}%` }}
                  />
                  <div
                    className="w-2 rounded-t bg-rose-400"
                    style={{ height: `${b.exp}%` }}
                  />
                </div>
                <p className="text-[8px] text-white/50">{b.month.slice(0, 3)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Wallet Transactions
        </p>
        <div className="mt-3 divide-y divide-slate-100">
          {TRANSACTIONS.map((t, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-brand-navy">
                  {t.title}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {t.subject} · {t.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                  {t.status}
                </span>
                <span
                  className={`font-mono text-sm font-semibold ${
                    t.negative ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {t.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
