import { ImageResponse } from 'next/og'

export const alt = 'MoveSmart Rentals - White-Glove Leasing Brokerage'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          padding: '80px 96px',
          color: '#FBFAF6',
          fontFamily: 'Helvetica, Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top row - brand mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FBFAF6',
              color: '#001E57',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -2,
              fontFamily: 'Georgia, serif',
              borderRadius: 6,
            }}
          >
            M
          </div>
          <div
            style={{
              display: 'flex',
              color: '#FBFAF6',
              fontSize: 22,
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
            width: 96,
            height: 2,
            background: '#D4A853',
            marginTop: 96,
          }}
        />

        {/* Editorial headline */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Georgia, Times, serif',
            fontSize: 108,
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: '#FBFAF6',
            marginTop: 28,
            maxWidth: 980,
          }}
        >
          White-Glove
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Georgia, Times, serif',
            fontSize: 108,
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.02,
            letterSpacing: -3,
            color: '#D4A853',
            maxWidth: 980,
          }}
        >
          Leasing Brokerage
        </div>

        {/* Subhead */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 400,
            color: 'rgba(251,250,246,0.78)',
            marginTop: 32,
            letterSpacing: -0.3,
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          Full-cycle leasing execution for landlords, property managers, and institutional rental operators across Canada.
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 60,
            left: 96,
            right: 96,
            alignItems: 'center',
            justifyContent: 'space-between',
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
                width: 10,
                height: 10,
                borderRadius: 5,
                background: '#009966',
              }}
            />
            <div
              style={{
                display: 'flex',
                color: 'rgba(251,250,246,0.82)',
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              Strategic - Professional - Concierge
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(251,250,246,0.6)',
              fontSize: 20,
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
