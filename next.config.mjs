/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactCompiler: true,
  trailingSlash: false,

  // Static export mein Next.js image optimization nahi chalta
  images: { unoptimized: true },
};

export default nextConfig;