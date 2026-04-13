'use client'

const PARTNERS = [
  { name: 'Toronto Star', width: 120 },
  { name: 'Globe and Mail', width: 130 },
  { name: 'REIC', width: 60 },
  { name: 'FRPO', width: 60 },
  { name: 'REP Magazine', width: 110 },
  { name: 'Realtor.ca', width: 100 },
  { name: 'Kijiji', width: 70 },
  { name: 'Zumper', width: 80 },
  { name: 'PadMapper', width: 100 },
  { name: 'MLS', width: 50 },
]

function LogoPlaceholder({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white/80 px-4 py-2"
      style={{ minWidth: width }}
    >
      <span className="whitespace-nowrap text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600">
        {name}
      </span>
    </div>
  )
}

export function PartnerLogosMarquee({ className = '' }: { className?: string }) {
  return (
    <section className={`overflow-hidden py-10 ${className}`}>
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        As Seen In & Advertised On
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

        <div className="flex animate-marquee-scroll gap-8">
          {/* Double the items for seamless loop */}
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <LogoPlaceholder key={`${partner.name}-${i}`} name={partner.name} width={partner.width} />
          ))}
        </div>
      </div>
    </section>
  )
}
