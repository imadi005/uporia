/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digital-learning-academy.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
module.exports = {
  images: {
    domains: ['yourdomain.com', 'digital-learning-academy.com'],
  },
};