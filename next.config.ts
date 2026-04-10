/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digital-learning-academy.com',
        pathname: '**',
      },
    ],
    domains: ['yourdomain.com', 'digital-learning-academy.com'],
  },
};

module.exports = nextConfig;