import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ik.imagekit.io",
      "images.unsplash.com",
      "via.placeholder.com",
      "pub-3626123a908346a7a8be8d9295f44e26.r2.dev", // ModelsLab URL
      "cdn2.stablediffusionapi.com"                   // Proxy link
    ],
  },
};

export default nextConfig;
