import path from "path";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function nextConfig(phase) {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  /** @type {import('next').NextConfig} */
  return {
    reactStrictMode: true,
    // Keep dev artifacts separate so stale/corrupt prod chunks can't affect dev.
    distDir: isDevServer ? ".next-dev" : ".next",
    webpack: (config, { dev }) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@": path.resolve(process.cwd(), "src"),
        "@shared": path.resolve(process.cwd(), "..", "shared"),
      };

      // Reduce cache corruption issues in long-running dev sessions.
      if (dev) {
        config.cache = false;
      }

      return config;
    },
  };
}
