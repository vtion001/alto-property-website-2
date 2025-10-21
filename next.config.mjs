/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  experimental: {
    esmExternals: true
  },
  // Help Next determine the correct workspace root for file tracing
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig;