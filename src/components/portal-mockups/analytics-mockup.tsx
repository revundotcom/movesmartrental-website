import { Mail, MessageSquare, Phone, TrendingUp } from 'lucide-react'

const KPIS = [
  { label: 'Leads', value: '9,839', delta: '+0.57%', prev: 'Prev: 9,783' },
  { label: 'Offers Received', value: '1,155', delta: '+0.42%', prev: 'Prev: 1,150' },
  { label: 'Offers Approved', value: '545', delta: '+0.31%', prev: 'Prev: 543' },
  { label: 'Leases Signed', value: '502', delta: '+0.28%', prev: 'Prev: 501' },
]

const FUNNEL = [
  { pct: 100, label: 'Total Leads', value: '9,839', width: 100 },
  { pct: 56, label: 'Tours Booked', value: '5,510', width: 88 },
  { pct: 32.5, label: 'Tours Attended', value: '3,196', width: 76 },
  { pct: 11.7, label: 'Offers Received', value: '1,155', width: 64 },
  { pct: 5.5, label: 'Offers Approved', value: '545', width: 54 },
  { pct: 5.1, label: 'Leases Signed', value: '502', width: 46 },
]

const CHANNELS = [
  { icon: Mail, name: 'Email', count: '14,210', rate: '4.8%' },
  { icon: MessageSquare, name: 'SMS', count: '8,930', rate: '3.3%' },
  { icon: Phone, name: 'Voice', count: '6,742', rate: '5.8%' },
]

const COMMS = [
  { label: 'Messages', value: '31,680', sub: 'Outbound', after: 'After Hours: 4,820' },
  { label: 'Emails', value: '20,940', sub: 'Sent', after: 'After Hours: 3,110' },
  { label: 'Calls Handled', value: '6,742', sub: 'Total', after: 'After Hours: 1,290' },
]

export function AnalyticsMockup() {
  return (
    <div className="min-h-[520px] w-full bg-slate-50 p-4 text-slate-800 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Reporting
          </p>
          <h3 className="font-display text-xl font-medium text-brand-navy sm:text-2xl">
            Analytics
          </h3>
        </div>
        <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-500">
          Last 30 days
        </span>
      </div>

      {/* KPI row */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {k.label}
            </p>
            <p className="mt-1 font-display text-xl text-brand-navy sm:text-2xl">
              {k.value}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                <TrendingUp className="size-3" aria-hidden="true" /> {k.delta}
              </span>
              <span className="text-[10px] text-slate-400">{k.prev}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline + Channels */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Lead Conversion Pipeline
          </p>
          <div className="mt-3 space-y-2">
            {FUNNEL.map((row, i) => (
              <div key={row.label} className="flex items-center gap-2">
                <span className="w-10 shrink-0 text-right text-[11px] font-mono font-semibold text-slate-500">
                  {row.pct}%
                </span>
                <div className="flex min-w-0 flex-1 items-center">
                  <div
                    className="flex h-7 min-w-0 items-center rounded-md px-2 text-[11px] font-semibold text-white"
                    style={{
                      width: `${row.width}%`,
                      background: `linear-gradient(90deg, #0B1D3A 0%, ${
                        ['#0B1D3A', '#1E3A5F', '#1E5F8A', '#0EA5C7', '#10B981', '#22D3A5'][i]
                      } 100%)`,
                    }}
                  >
                    <span className="truncate">{row.label}</span>
                  </div>
                </div>
                <span className="w-12 shrink-0 text-right font-mono text-[11px] font-semibold text-brand-navy">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Channel Metrics
          </p>
          <div className="mt-3 divide-y divide-slate-100">
            {CHANNELS.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.name} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-brand-emerald/10">
                      <Icon className="size-3.5 text-brand-emerald" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-slate-400">{c.count} leads</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-semibold text-emerald-600">
                    {c.rate}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Comms row */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {COMMS.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {c.label}
            </p>
            <div className="mt-1 flex items-end justify-between">
              <div>
                <p className="font-display text-xl text-brand-navy">{c.value}</p>
                <p className="text-[10px] text-slate-500">{c.sub}</p>
              </div>
              <p className="text-[10px] font-medium text-slate-400">{c.after}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
