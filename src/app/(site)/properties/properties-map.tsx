'use client'

import { useEffect, useRef, useState } from 'react'
import type { Property } from '@/types/property'
import { resolvePropertyImage } from '@/lib/portal-api'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

interface Props {
  properties: Property[]
}

type TileMode = 'map' | 'satellite'

interface GeoProperty {
  property: Property
  lat: number
  lng: number
}

function parseCoord(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string') {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : null
  }
  return null
}

function toGeoProperties(properties: Property[]): GeoProperty[] {
  const out: GeoProperty[] = []
  for (const p of properties) {
    const lat = parseCoord(p.latitude)
    const lng = parseCoord(p.longitude)
    if (lat == null || lng == null) continue
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) continue
    if (lat === 0 && lng === 0) continue
    out.push({ property: p, lat, lng })
  }
  return out
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'Contact for price'
  return `$${price.toLocaleString('en-CA')}/mo`
}

function buildPopupHtml(p: Property): string {
  const img = resolvePropertyImage(p.cover_image ?? p.cover_thumb)
  const beds = p.bedrooms ?? p.number_of_bedrooms ?? '—'
  const baths = p.bathrooms ?? p.number_of_bathrooms ?? '—'
  const href = `/properties/${escapeHtml(String(p.slug ?? ''))}/`
  const address = escapeHtml(String(p.unit_address ?? ''))
  const city = escapeHtml(String(p.building?.city ?? ''))
  const price = escapeHtml(formatPrice(p.website_price))
  const imgHtml = img
    ? `<img src="${escapeHtml(img)}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:6px;display:block;" />`
    : `<div style="width:100%;height:120px;background:#f1f5f9;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:11px;">No image</div>`
  return `
    <div style="font-family:inherit;width:220px;">
      ${imgHtml}
      <div style="margin-top:8px;color:#10B981;font-weight:700;font-size:16px;">${price}</div>
      <div style="margin-top:4px;color:#0B1D3A;font-size:13px;line-height:1.35;">${address}</div>
      ${city ? `<div style="margin-top:2px;color:#64748b;font-size:11px;">${city}</div>` : ''}
      <div style="margin-top:6px;color:#0B1D3A;font-size:12px;">
        <span style="margin-right:10px;">${escapeHtml(String(beds))} bd</span>
        <span>${escapeHtml(String(baths))} ba</span>
      </div>
      <a href="${href}" target="_blank" rel="noopener noreferrer" style="margin-top:10px;display:inline-block;color:#10B981;font-weight:600;font-size:12px;text-decoration:none;">View details →</a>
    </div>
  `
}

export function PropertiesMap({ properties }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<unknown>(null)
  const tileLayerRef = useRef<unknown>(null)
  const clusterRef = useRef<unknown>(null)
  const [tileMode, setTileMode] = useState<TileMode>('map')
  const [ready, setReady] = useState(false)

  // Init map once
  useEffect(() => {
    let cancelled = false
    const node = containerRef.current
    if (!node) return

    ;(async () => {
      const L = (await import('leaflet')).default
      await import('leaflet.markercluster')

      if (cancelled || !node) return
      if (mapRef.current) return

      // Default center: Toronto-ish (good Canada/US centroid for ON/NY corridor)
      const map = L.map(node, {
        center: [43.6532, -79.3832],
        zoom: 6,
        scrollWheelZoom: true,
        worldCopyJump: true,
      })

      const tile = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ).addTo(map)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cluster = (L as any).markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        maxClusterRadius: 60,
      })
      cluster.addTo(map)

      mapRef.current = map
      tileLayerRef.current = tile
      clusterRef.current = cluster
      setReady(true)
    })()

    return () => {
      cancelled = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const m = mapRef.current as any
      if (m && typeof m.remove === 'function') {
        m.remove()
      }
      mapRef.current = null
      tileLayerRef.current = null
      clusterRef.current = null
    }
  }, [])

  // Update markers when properties change
  useEffect(() => {
    if (!ready) return
    ;(async () => {
      const L = (await import('leaflet')).default
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cluster = clusterRef.current as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const map = mapRef.current as any
      if (!cluster || !map) return

      cluster.clearLayers()

      const geo = toGeoProperties(properties)
      if (geo.length === 0) return

      const homeIcon = L.divIcon({
        html: `
          <div style="background:#10B981;color:white;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid white;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
        `,
        className: 'movesmart-property-pin',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -16],
      })

      const markers = geo.map((g) =>
        L.marker([g.lat, g.lng], { icon: homeIcon }).bindPopup(
          buildPopupHtml(g.property),
          { maxWidth: 240 },
        ),
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.addLayers(markers as any)

      // Fit bounds to all markers, with a small padding
      const bounds = L.latLngBounds(geo.map((g) => [g.lat, g.lng]))
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
      }
    })()
  }, [properties, ready])

  // Swap tile provider on Map/Satellite toggle
  useEffect(() => {
    if (!ready) return
    ;(async () => {
      const L = (await import('leaflet')).default
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const map = mapRef.current as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const oldTile = tileLayerRef.current as any
      if (!map) return
      if (oldTile) map.removeLayer(oldTile)
      const url =
        tileMode === 'satellite'
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      const attribution =
        tileMode === 'satellite'
          ? 'Tiles &copy; Esri'
          : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      const next = L.tileLayer(url, { maxZoom: 19, attribution }).addTo(map)
      tileLayerRef.current = next
    })()
  }, [tileMode, ready])

  const mappable = toGeoProperties(properties).length
  const total = properties.length
  const missing = total - mappable

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Tile mode toggle */}
      <div className="absolute left-3 top-3 z-[1000] flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setTileMode('map')}
          className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
            tileMode === 'map'
              ? 'bg-[#0B1D3A] text-white'
              : 'text-[#0B1D3A] hover:bg-slate-50'
          }`}
        >
          Map
        </button>
        <button
          type="button"
          onClick={() => setTileMode('satellite')}
          className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
            tileMode === 'satellite'
              ? 'bg-[#0B1D3A] text-white'
              : 'text-[#0B1D3A] hover:bg-slate-50'
          }`}
        >
          Satellite
        </button>
      </div>

      {/* Count badge */}
      <div className="absolute right-3 top-3 z-[1000] rounded-lg border border-slate-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0B1D3A] shadow-sm backdrop-blur-sm">
        {mappable.toLocaleString('en-CA')} on map
        {missing > 0 && (
          <span className="ml-1 text-slate-500">
            · {missing.toLocaleString('en-CA')} without coords
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        className="h-[640px] w-full"
        role="region"
        aria-label="Property map"
      />
    </div>
  )
}
