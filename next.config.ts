import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: '.',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
        port: '',
        pathname: '/th/id/**',
      },
      // Ajoutez d'autres domaines ici si nécessaire
      // Par exemple, si vous utilisez Cloudinary :
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
  typescript: {
    // !! ATTENTION !!
    // Permet au build de réussir même s'il y a des erreurs de type.
    ignoreBuildErrors: true,
  },

  // 2. Ignorer les avertissements ESLint pendant le build
  eslint: {
    // !! ATTENTION !!
    // Empêche ESLint de s'exécuter pendant le build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
