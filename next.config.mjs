/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
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
