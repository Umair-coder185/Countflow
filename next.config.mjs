/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/tools/sentence-calculator',
        destination: '/tools/sentence-counter',
        permanent: true, // 301 — purani SEO value naye URL pe transfer hogi
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true, // 301 — /about ke purane links safe rahenge
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000'
          }
        ]
      },
      {
        source: '/og-image.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      }
    ]
  }
};

export default nextConfig;