/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dbviya1rj/image/upload/**'
      }
    ]
  },
  experimental: {
    esmExternals: true
  },
  // Help Next determine the correct workspace root for file tracing
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig;