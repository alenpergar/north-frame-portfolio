import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/aurelia", destination: "/aurelia/index.html" },
      { source: "/lumiere-dental", destination: "/lumiere-dental/index.html" },
      { source: "/nova-performance", destination: "/nova-performance/index.html" },
      { source: "/vivelle-beauty", destination: "/vivelle-beauty/index.html" },
    ];
  },
};

export default nextConfig;
