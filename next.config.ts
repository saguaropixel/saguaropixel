// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Main Prismic image CDN
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        pathname: '/**', // or `/saguaropixel/**` if you want to be strict
      },
      // (Optional) repo-scoped CDN some setups use
      {
        protocol: 'https',
        hostname: 'saguaropixel.cdn.prismic.io',
        pathname: '/**',
      },
      // (Optional) if you ever let editors pick Unsplash images
      // { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
