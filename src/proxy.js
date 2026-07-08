import { NextResponse } from 'next/server'

// Force HTTPS and canonical host (countflows.com)
export function proxy(request) {
  try {
    const url = request.nextUrl.clone()
    const host = request.headers.get('host') || ''
    const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol || 'https'

    // Skip local development
    if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
      return NextResponse.next()
    }

    const needsHttps = proto !== 'https'
    const needsCanonicalHost = host.toLowerCase().startsWith('www.') || host.toLowerCase() !== 'countflows.com'

    if (needsHttps || needsCanonicalHost) {
      url.protocol = 'https'
      url.hostname = 'countflows.com'
      const redirectResponse = NextResponse.redirect(url, 301)
      redirectResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
      return redirectResponse
    }

    const nextResponse = NextResponse.next()
    // Add HSTS header for HTTPS responses in production
    try {
      const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
      if (!isLocal) {
        nextResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
      }
    } catch (e) {
      // ignore header set errors
    }

    return nextResponse
  } catch (e) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/:path*',
}
