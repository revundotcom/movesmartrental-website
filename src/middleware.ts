import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || request.nextUrl.hostname).toLowerCase()

  // Canonical Domain Enforcement: 301 Permanent Redirect (www -> non-www)
  if (host.includes('www.movesmartrentals.com')) {
    const url = request.nextUrl.clone()
    url.hostname = 'movesmartrentals.com'
    url.protocol = 'https'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  const { pathname } = request.nextUrl

  // Skip API routes, static files, Next.js internals, and Studio
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Lowercase enforcement (308 permanent redirect)
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio).*)'],
}
