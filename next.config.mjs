/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    esmExternals: true
  },
  async generateBuildId() {
    return 'build-' + Date.now();
  }
};

export default nextConfig;