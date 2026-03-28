'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '28rem' }}>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0A2647',
                marginBottom: '0.75rem',
              }}
            >
              Something went wrong
            </h1>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#10B981',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginRight: '0.75rem',
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                display: 'inline-block',
                color: '#0A2647',
                border: '1px solid #0A2647',
                borderRadius: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Go to homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
