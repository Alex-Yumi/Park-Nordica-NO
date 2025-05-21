/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // ESLint-Fehler werden ignoriert und verhindern den Build nicht mehr
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 