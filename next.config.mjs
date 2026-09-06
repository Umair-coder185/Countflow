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

      // Fix old Syllable Counter URL
      {
        source: '/syllable-counter',
        destination: '/tools/syllable-counter',
        permanent: true,
      },

      // Fix old ChatGPT Watermark Remover URL
      {
        source: '/chatgpt-watermark-remover',
        destination: '/tools/chatgpt-watermark-remover',
        permanent: true,
      },

      // Fix old CamelCase blog URL
      {
        source: '/blog/what-is-camelcase',
        destination: '/blog/camelcase-pascalcase-snake-case-explained',
        permanent: true,
      },

      // Fix malformed internal URL
      {
        source: '/https\\:/countflows.com/blog/best-speed-reading-programs',
        destination: '/blog/best-speed-reading-programs',
        permanent: true,
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