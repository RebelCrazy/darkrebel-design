import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// Esto habilita el acceso a DB, KV, R2, etc. en desarrollo local (wrangler)
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
