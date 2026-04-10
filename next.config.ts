const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,   // ← ye add karo
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