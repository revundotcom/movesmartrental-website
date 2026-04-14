import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
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
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: -1.5,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          M
        </div>
        <div
          style={{
            display: 'flex',
            width: 14,
            height: 2,
            background: '#009966',
            marginTop: 2,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
