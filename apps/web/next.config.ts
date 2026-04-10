import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@talent-marketplace/contracts",
    "@talent-marketplace/design-tokens",
    "@talent-marketplace/ui",
  ],
};

export default nextConfig;
