/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async generateBuildId() {
    return 'build-' + Date.now();
  }
};

export default nextConfig;