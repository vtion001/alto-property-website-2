/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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