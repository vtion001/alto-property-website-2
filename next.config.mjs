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
  // In dev, reduce HMR 404 noise by avoiding custom buildId or assetPrefix
}

export default nextConfig;