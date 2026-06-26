import { ImageResponse } from 'next/og'

export const alt = 'MoveSmart Rentals - Full-Service Leasing and Tenant Placement'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* ──────────────────────────────────────────────────────────────────
 * OG share image — rendered at 1200×630 via @vercel/og (Satori).
 *
 * Layout budget (kept under 630px total content height):
 *   56px  top padding
 *   40px  brand mark row
 *   40px  gap → gold hairline
 *    2px  gold hairline
 *   28px  gap → headline
 *  ~88px  headline line 1 ("Full-Service")
 *  ~88px  headline line 2 ("Leasing & Placement" — italic gold, fits 1 line at 80px)
 *   24px  gap → subhead
 *  ~70px  subhead (2 lines max at 24px / lh 1.4)
 *  flex   spacer
 *   28px  footer row (tagline + URL)
 *   56px  bottom padding
 *  ──────
 * = ~520px content + 56+56 padding = ~632px, contains within 630px canvas.
 *
 * Satori gotchas baked into this file:
 *   - Every container is display: flex (Satori requires this).
 *   - Every text node is the ONLY child of its wrapper (no mixed
 *     text+children inside a flex container — Satori renders them weirdly).
 *   - Headline phrasing chosen so "Leasing & Placement" fits one line at 80px.
 *   - Subhead text trimmed to ~80 characters to guarantee ≤2 wrapped lines.
 *   - Footer is in normal flow (NOT position:absolute) so flex spacer
 *     above it can grow/shrink without anything overlapping.
 * ────────────────────────────────────────────────────────────────── */

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#001E57',
          backgroundImage:
            'radial-gradient(circle at 15% 85%, rgba(0,153,102,0.28) 0%, rgba(0,30,87,0) 55%), radial-gradient(circle at 85% 10%, rgba(212,168,83,0.22) 0%, rgba(0,30,87,0) 55%)',
          padding: '56px 88px',
          color: '#FBFAF6',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        {/* Brand mark row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FBFAF6',
              color: '#001E57',
              fontSize: 26,
              fontWeight: 800,
              fontFamily: 'Georgia, serif',
              borderRadius: 5,
            }}
          >
            M
          </div>
          <div
            style={{
              display: 'flex',
              color: '#FBFAF6',
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            MoveSmart Rentals
          </div>
        </div>

        {/* Gold hairline */}
        <div
          style={{
            display: 'flex',
            width: 88,
            height: 2,
            background: '#D4A853',
            marginTop: 40,
          }}
        />

        {/* Editorial headline — two lines, sized to guarantee 1-line wrap each */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Georgia, Times, serif',
            fontSize: 80,
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: '#FBFAF6',
            marginTop: 28,
          }}
        >
          Full-Service
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Georgia, Times, serif',
            fontSize: 80,
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.08,
            letterSpacing: -2,
            color: '#D4A853',
          }}
        >
          Leasing & Placement
        </div>

        {/* Subhead — short, ≤2 lines at 1024-ish container width */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 400,
            color: 'rgba(251,250,246,0.78)',
            marginTop: 24,
            letterSpacing: -0.2,
            lineHeight: 1.4,
            maxWidth: 880,
          }}
        >
          Full-cycle leasing for landlords and rental operators across Canada and the US.
        </div>

        {/* Spacer — pushes footer to the bottom of the safe area */}
        <div
          style={{
            display: 'flex',
            flex: 1,
          }}
        />

        {/* Footer row — tagline left, URL right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 8,
                height: 8,
                borderRadius: 4,
                background: '#009966',
              }}
            />
            <div
              style={{
                display: 'flex',
                color: 'rgba(251,250,246,0.82)',
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              Strategic - Professional - Transparent
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(251,250,246,0.6)',
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            movesmartrentals.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
