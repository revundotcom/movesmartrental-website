import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#001E57',
          padding: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -6,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          M
        </div>
        <div
          style={{
            display: 'flex',
            width: 72,
            height: 4,
            background: '#009966',
            marginTop: 10,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            display: 'flex',
            color: '#D4A853',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 3,
            marginTop: 10,
            textTransform: 'uppercase',
            fontFamily: 'Helvetica, Arial, sans-serif',
          }}
        >
          MoveSmart
        </div>
      </div>
    ),
    { ...size },
  )
}
