import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

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
  webpack: (config) => {
    console.log("RESOLVE ALIASES:", config.resolve.alias);
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-original': require.resolve('react'),
      'react$': path.resolve(__dirname, 'src/lib/react-compat.js'),
    };
    return config;
  },
};

// Esto habilita el acceso a DB, KV, R2, etc. en desarrollo local (wrangler)
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
