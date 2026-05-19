'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Globe } from 'lucide-react'

/**
 * NorthAmericaShowcase
 *
 * North-America positioning header + a horizontally-scrolling carousel of real
 * cityscape imagery from both Canada and the United States.
 */

// Cities with VERIFIED real cityscape imagery — never use generic stock.
// Note: Calgary and Halifax were removed — their Unsplash IDs resolved to an
// unrelated stock photo (a person wearing a VR headset). Add them back only
// with confirmed-working skyline URLs.
const SCROLLING_CITIES: Array<{ name: string; region: string; img: string; alt: string }> = [
  // Canada
  { name: 'Toronto', region: 'ON, Canada', img: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=80&auto=format&fit=crop', alt: 'Toronto skyline with CN Tower at dusk' },
  { name: 'Vancouver', region: 'BC, Canada', img: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&q=80&auto=format&fit=crop', alt: 'Vancouver skyline with mountains' },
  { name: 'Montreal', region: 'QC, Canada', img: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=800&q=80&auto=format&fit=crop', alt: 'Montreal Old Port and downtown' },
  { name: 'Ottawa', region: 'ON, Canada', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80&auto=format&fit=crop', alt: 'Ottawa Parliament Hill' },
  // US
  { name: 'Miami', region: 'FL, USA', img: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&q=80&auto=format&fit=crop', alt: 'Miami beach and skyline' },
  { name: 'Austin', region: 'TX, USA', img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80&auto=format&fit=crop', alt: 'Austin Texas skyline at twilight' },
  { name: 'Los Angeles', region: 'CA, USA', img: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80&auto=format&fit=crop', alt: 'Los Angeles downtown skyline' },
  { name: 'New York', region: 'NY, USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80&auto=format&fit=crop', alt: 'New York City skyline with Empire State' },
  { name: 'Chicago', region: 'IL, USA', img: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80&auto=format&fit=crop', alt: 'Chicago skyline and river' },
  { name: 'Atlanta', region: 'GA, USA', img: 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=800&q=80&auto=format&fit=crop', alt: 'Atlanta Georgia downtown' },
  { name: 'Charlotte', region: 'NC, USA', img: 'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?w=800&q=80&auto=format&fit=crop', alt: 'Charlotte North Carolina skyline' },
  { name: 'Phoenix', region: 'AZ, USA', img: 'https://images.unsplash.com/photo-1558551649-e44c8f992010?w=800&q=80&auto=format&fit=crop', alt: 'Phoenix Arizona desert city' },
  { name: 'Denver', region: 'CO, USA', img: 'https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=800&q=80&auto=format&fit=crop', alt: 'Denver Colorado skyline with Rockies' },
  { name: 'Jersey City', region: 'NJ, USA', img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80&auto=format&fit=crop', alt: 'Jersey City waterfront' },
]

export function NorthAmericaShowcase() {
  const prefersReducedMotion = useReducedMotion()
  // Duplicate the city array for seamless marquee loop
  const marqueeCities = [...SCROLLING_CITIES, ...SCROLLING_CITIES]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 md:py-20">
      <div
        className="absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
            <Globe className="size-4" aria-hidden="true" />
            North America Footprint
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Built across{' '}
            <span className="font-display italic text-brand-emerald">North America.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            MoveSmart Rentals is a leasing brokerage operating in both Canada and the United States. Same disciplined playbook, same technology stack, same standard of execution — serving landlords and tenants across both countries.
          </p>
        </motion.div>

        {/* Scrolling city carousel */}
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" aria-hidden="true" />
          <div className="flex animate-marquee gap-4">
            {marqueeCities.map((city, idx) => (
              <article
                key={`${city.name}-${idx}`}
                className="relative h-48 w-72 shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-brand-navy/10 ring-1 ring-slate-200"
              >
                <Image
                  src={city.img}
                  alt={city.alt}
                  fill
                  sizes="288px"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-xl font-normal italic text-white">{city.name}</p>
                  <p className="mt-0.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/70">{city.region}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
