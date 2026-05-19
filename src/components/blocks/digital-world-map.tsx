'use client'

import { motion, useMotionValue, animate } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Plus, Minus, Maximize2 } from 'lucide-react'
import { geoEqualEarth, geoPath, type GeoPath, type GeoProjection } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, FeatureCollection, Geometry } from 'geojson'

/**
 * DigitalWorldMap
 *
 * Real-world geographic map using d3-geo's equal-earth projection.
 * Country shapes are drawn from a 110m world atlas TopoJSON. Pins are
 * projected through the same projection so they sit precisely over the
 * correct city on the map. Pan + zoom controls included.
 */

interface CityPin {
  name: string
  /** [longitude, latitude] in degrees */
  lonLat: [number, number]
  status: 'active' | 'target'
}

const CITY_PINS: CityPin[] = [
  // ── Active markets (Canada + USA) ──
  { name: 'Vancouver',     lonLat: [-123.1207,  49.2827], status: 'active' },
  { name: 'Calgary',       lonLat: [-114.0719,  51.0447], status: 'active' },
  { name: 'Toronto',       lonLat: [ -79.3832,  43.6532], status: 'active' },
  { name: 'Montreal',      lonLat: [ -73.5674,  45.5017], status: 'active' },
  { name: 'New York',      lonLat: [ -74.0060,  40.7128], status: 'active' },
  { name: 'Chicago',       lonLat: [ -87.6298,  41.8781], status: 'active' },
  { name: 'Los Angeles',   lonLat: [-118.2437,  34.0522], status: 'active' },
  { name: 'Miami',         lonLat: [ -80.1918,  25.7617], status: 'active' },
  { name: 'Dallas',        lonLat: [ -96.7970,  32.7767], status: 'active' },

  // ── Target / future territories (international) ──
  { name: 'Mexico City',   lonLat: [ -99.1332,  19.4326], status: 'target' },
  { name: 'São Paulo',     lonLat: [ -46.6333, -23.5505], status: 'target' },
  { name: 'London',        lonLat: [  -0.1278,  51.5074], status: 'target' },
  { name: 'Paris',         lonLat: [   2.3522,  48.8566], status: 'target' },
  { name: 'Berlin',        lonLat: [  13.4050,  52.5200], status: 'target' },
  { name: 'Dubai',         lonLat: [  55.2708,  25.2048], status: 'target' },
  { name: 'Mumbai',        lonLat: [  72.8777,  19.0760], status: 'target' },
  { name: 'Singapore',     lonLat: [ 103.8198,   1.3521], status: 'target' },
  { name: 'Tokyo',         lonLat: [ 139.6917,  35.6895], status: 'target' },
  { name: 'Sydney',        lonLat: [ 151.2093, -33.8688], status: 'target' },
]

const ACTIVE_COUNTRY_IDS = new Set(['124', '840']) // Canada + United States ISO numeric codes

const VIEWBOX_W = 1000
const VIEWBOX_H = 520
const MIN_SCALE = 1
const MAX_SCALE = 4

type CountryProps = { name?: string }
type CountryFeature = Feature<Geometry, CountryProps>

export function DigitalWorldMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [countries, setCountries] = useState<CountryFeature[] | null>(null)
  // Track when we're on the client to avoid hydration mismatch from
  // floating-point string formatting differences between Node and the browser.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch the world atlas TopoJSON on mount and convert to GeoJSON
  useEffect(() => {
    let cancelled = false
    fetch('/data/countries-110m.json')
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (cancelled) return
        const collection = topo.objects.countries as GeometryCollection
        const geo = feature(topo, collection) as unknown as FeatureCollection<Geometry, CountryProps>
        setCountries(geo.features)
      })
      .catch(() => {
        if (!cancelled) setCountries([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Set up an equal-earth projection that fits the world inside the viewBox
  const { projection, pathGenerator } = useMemo(() => {
    const proj: GeoProjection = geoEqualEarth()
      .scale(170)
      .translate([VIEWBOX_W / 2, VIEWBOX_H / 2 + 10])
    const path: GeoPath = geoPath(proj)
    return { projection: proj, pathGenerator: path }
  }, [])

  // Project city pins through the same projection so they sit on real coords
  const projectedPins = useMemo(() => {
    return CITY_PINS.map((pin) => {
      const projected = projection(pin.lonLat)
      return { ...pin, point: projected }
    }).filter(
      (p): p is CityPin & { point: [number, number] } => Array.isArray(p.point),
    )
  }, [projection])

  // ---- Drag-to-pan ----
  const dragStateRef = useRef<{
    startX: number
    startY: number
    motionStartX: number
    motionStartY: number
    pointerId: number | null
  }>({ startX: 0, startY: 0, motionStartX: 0, motionStartY: 0, pointerId: null })

  function clampPan(nextX: number, nextY: number, s: number) {
    const el = containerRef.current
    if (!el) return { x: nextX, y: nextY }
    const w = el.clientWidth
    const h = el.clientHeight
    const maxX = ((s - 1) * w) / 2
    const maxY = ((s - 1) * h) / 2
    return {
      x: Math.max(-maxX, Math.min(maxX, nextX)),
      y: Math.max(-maxY, Math.min(maxY, nextY)),
    }
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (scale <= 1) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      motionStartX: x.get(),
      motionStartY: y.get(),
      pointerId: e.pointerId,
    }
    setIsDragging(true)
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragStateRef.current.pointerId !== e.pointerId) return
    const dx = e.clientX - dragStateRef.current.startX
    const dy = e.clientY - dragStateRef.current.startY
    const next = clampPan(
      dragStateRef.current.motionStartX + dx,
      dragStateRef.current.motionStartY + dy,
      scale,
    )
    x.set(next.x)
    y.set(next.y)
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragStateRef.current.pointerId !== e.pointerId) return
    dragStateRef.current.pointerId = null
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  function zoomTo(nextScale: number) {
    const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, nextScale))
    setScale(clamped)
    const next = clampPan(x.get(), y.get(), clamped)
    animate(x, next.x, { duration: 0.4, ease: [0.22, 1, 0.36, 1] })
    animate(y, next.y, { duration: 0.4, ease: [0.22, 1, 0.36, 1] })
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      if (!e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 8) return
      e.preventDefault()
      const direction = e.deltaY < 0 ? 1 : -1
      const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + direction * 0.25))
      if (next !== scale) zoomTo(next)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale])

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#061226] via-[#0B1D3A] to-[#0a1e3d] shadow-2xl shadow-brand-navy/40 ring-1 ring-brand-emerald/15">
      {/* Faint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-1/3 size-[520px] -translate-y-1/2 rounded-full bg-brand-emerald/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-[420px] rounded-full bg-brand-gold/[0.07] blur-3xl" />

      {/* Top + bottom hairlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
      />

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative aspect-[1000/520] w-full touch-none select-none"
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
        role="img"
        aria-label="Interactive world map highlighting MoveSmart Rentals active markets and franchise targets"
      >
        <motion.div
          style={{ x, y, scale }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="absolute inset-0 origin-center"
        >
          {mounted && (
          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="pinGlowActive" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#10B981" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="pinGlowTarget" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4A853" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#D4A853" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Graticule lines (subtle grid) */}
            <g
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            >
              {[-60, -30, 0, 30, 60].map((lat) => {
                const a = projection([-179, lat])
                const b = projection([179, lat])
                if (!a || !b) return null
                return (
                  <line
                    key={`lat-${lat}`}
                    x1={a[0]}
                    y1={a[1]}
                    x2={b[0]}
                    y2={b[1]}
                    strokeDasharray="2 5"
                  />
                )
              })}
            </g>

            {/* Country shapes */}
            <g>
              {countries?.map((f, i) => {
                const id = typeof f.id === 'number' ? String(f.id) : f.id ?? ''
                const isActive = ACTIVE_COUNTRY_IDS.has(id)
                const d = pathGenerator(f) ?? ''
                if (!d) return null
                return (
                  <path
                    key={i}
                    d={d}
                    fill={
                      isActive
                        ? 'rgba(16,185,129,0.22)'
                        : 'rgba(255,255,255,0.04)'
                    }
                    stroke={
                      isActive
                        ? 'rgba(16,185,129,0.65)'
                        : 'rgba(255,255,255,0.18)'
                    }
                    strokeWidth={isActive ? 0.7 : 0.4}
                    strokeLinejoin="round"
                  />
                )
              })}
            </g>

            {/* Pins */}
            {projectedPins.map((pin, i) => {
              const isActive = pin.status === 'active'
              const fill = isActive ? '#10B981' : '#D4A853'
              const glow = isActive ? 'url(#pinGlowActive)' : 'url(#pinGlowTarget)'
              const baseR = isActive ? 13 : 10
              const [cx, cy] = pin.point
              return (
                <g key={pin.name}>
                  <circle cx={cx} cy={cy} r={baseR} fill={glow}>
                    <animate
                      attributeName="r"
                      values={`${baseR};${baseR + 4};${baseR}`}
                      dur={isActive ? '2.4s' : '3.4s'}
                      begin={`${i * 0.15}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? 2.8 : 2.2}
                    fill={fill}
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="0.7"
                  />
                </g>
              )
            })}
          </svg>
          )}
        </motion.div>

        {/* Loading skeleton until topology resolves */}
        {(!mounted || countries === null) && (
          <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.22em] text-white/40">
            Loading map…
          </div>
        )}

        {/* Country legend */}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
            <span className="size-2 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            Active · CA &amp; US
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
            <span className="size-2 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(212,168,83,0.8)]" />
            Target territories
          </div>
        </div>

        {/* Live counter */}
        <div className="pointer-events-none absolute right-4 top-4 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-right backdrop-blur-md">
          <p className="font-display text-2xl font-normal tabular-nums text-white">
            {CITY_PINS.length}+
          </p>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">
            Markets mapped
          </p>
        </div>

        {/* Coordinate HUD */}
        <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          ZOOM · {scale.toFixed(2)}× · DRAG TO PAN
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => zoomTo(scale - 0.5)}
            disabled={scale <= MIN_SCALE}
            className="flex size-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Zoom out"
          >
            <Minus className="size-4" strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              setScale(1)
              animate(x, 0, { duration: 0.4, ease: [0.22, 1, 0.36, 1] })
              animate(y, 0, { duration: 0.4, ease: [0.22, 1, 0.36, 1] })
            }}
            className="flex size-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10"
            aria-label="Reset view"
          >
            <Maximize2 className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => zoomTo(scale + 0.5)}
            disabled={scale >= MAX_SCALE}
            className="flex size-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Zoom in"
          >
            <Plus className="size-4" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {/* Live status pill bottom-center */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur-md sm:inline-flex">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-emerald" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
            Live · Drag to explore
          </span>
        </div>
      </div>
    </div>
  )
}
