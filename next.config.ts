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
};

export default nextConfig;
