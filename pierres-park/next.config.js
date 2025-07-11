/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // ESLint-Fehler werden ignoriert und verhindern den Build nicht mehr
    ignoreDuringBuilds: true,
  },
  // Konfiguriere das Image Optimization für externe Bilder
  images: {
    // Erhöhe die maximale Größe für Bilder
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Aktiviere Remote-Patterns für diverse Image Hosting Services
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/Alex-Yumi/Park-Nordica-NO/**',
      },
      {
        protocol: 'https',
        hostname: 'media.githubusercontent.com',
        port: '',
        pathname: '/media/Alex-Yumi/Park-Nordica-NO/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 