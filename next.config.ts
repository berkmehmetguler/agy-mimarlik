import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-3626123a908346a7a8be8d9295f44e26.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.stablediffusionapi.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      }
    ],
    // Fallback for legacy domains (deprecated but still works)
    domains: [
      "ik.imagekit.io",
      "images.unsplash.com", 
      "via.placeholder.com",
      "pub-3626123a908346a7a8be8d9295f44e26.r2.dev",
      "cdn2.stablediffusionapi.com",
      "res.cloudinary.com"
    ],
  },
};

export default nextConfig;
