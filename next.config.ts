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
      const minimizers = config.optimization.minimizer as any[];
      if (minimizers && minimizers.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const terserPlugin = minimizers.find((minimizer: any) => minimizer.constructor.name === "TerserPlugin");
        if (terserPlugin && terserPlugin.options) {
          terserPlugin.options.terserOptions = {
            ...terserPlugin.options.terserOptions,
            compress: {
              ...terserPlugin.options.terserOptions?.compress,
              drop_console: true,
            },
          };
        }
      }
    }

    return config;
  },
};

export default nextConfig;
