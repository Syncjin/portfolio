import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: "dist",
  output: "standalone",
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
    };

    // Production 빌드에서 console.log 제거
    if (!dev && !isServer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const terserOptions = (config.optimization.minimizer as any)?.[0]?.options?.terserOptions;
      if (terserOptions) {
        terserOptions.compress = {
          ...terserOptions.compress,
          drop_console: true,
        };
      }
    }

    return config;
  },
};

export default nextConfig;
