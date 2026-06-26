import { ImageResponse } from 'next/og'

export const alt = 'MoveSmart Rentals - Full-Service Leasing and Tenant Placement'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* ──────────────────────────────────────────────────────────────────
 * OG share image — rendered at 1200×630 via @vercel/og (Satori).
 *
 * Per client direction (Jun 2026): no brand-mark header at the top
 * (the "M" logo box + "MOVESMART RENTALS" wordmark are gone — they
 * felt cluttered and conflicted with the editorial style). Identity
 * is carried entirely by the URL in the footer.
 *
 * Layout budget (kept under 630px total content height):
 *   72px  top padding
 *    2px  gold hairline accent
 *   40px  gap → headline
 *  ~104px headline line 1 ("Full-Service" at 96px / lh 1.08)
 *  ~104px headline line 2 ("Leasing & Placement" italic gold, fits 1 line)
 *   36px  gap → subhead
 *  ~70px  subhead (≤2 lines at 24px / lh 1.4)
 *  flex   spacer (auto)
 *   30px  footer URL
 *   72px  bottom padding
 *  ──────
 * = ~530px content + 144px padding, fits in 630px with breathing room.
 *
 * Satori gotchas: every container has display:flex; text is the only
 * child of its flex wrapper; footer is in-flow (NOT position:absolute)
 * so the flex:1 spacer above absorbs any size variance.
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
            'radial-gradient(circle at 15% 85%, rgba(0,153,102,0.32) 0%, rgba(0,30,87,0) 55%), radial-gradient(circle at 85% 10%, rgba(212,168,83,0.25) 0%, rgba(0,30,87,0) 55%)',
          padding: '72px 88px',
          color: '#FBFAF6',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        {/* Gold hairline accent (single visual anchor, no logo) */}
        <div
          style={{
            display: 'flex',
            width: 96,
            height: 2,
            background: '#D4A853',
          }}
        />

        {/* Editorial headline — two lines, sized so each fits cleanly */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Georgia, Times, serif',
            fontSize: 96,
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: -2.5,
            color: '#FBFAF6',
            marginTop: 40,
          }}
        >
          Full-Service
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Georgia, Times, serif',
            fontSize: 96,
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.08,
            letterSpacing: -2.5,
            color: '#D4A853',
          }}
        >
          Leasing & Placement
        </div>

        {/* Subhead — short, ≤2 lines */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 400,
            color: 'rgba(251,250,246,0.78)',
            marginTop: 36,
            letterSpacing: -0.2,
            lineHeight: 1.4,
            maxWidth: 880,
          }}
        >
          Full-cycle leasing for landlords and rental operators across Canada and the US.
        </div>

        {/* Flex spacer pushes footer to the bottom of the safe area */}
        <div style={{ display: 'flex', flex: 1 }} />

        {/* Footer — just the URL, right-aligned. Identity without clutter. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
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
                width: 8,
                height: 8,
                borderRadius: 4,
                background: '#009966',
              }}
            />
            <div
              style={{
                display: 'flex',
                color: '#FBFAF6',
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 0.5,
              }}
            >
              movesmartrentals.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
