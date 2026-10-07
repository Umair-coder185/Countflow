/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactCompiler: true,
  trailingSlash: false,

  // Static export mein Next.js image optimization nahi chalta
  images: { unoptimized: true },

  // Test ke liye: CSS ko <link> ki jagah HTML ke andar <style> mein daalta hai
 
};

export default nextConfig;