import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/aurelia", destination: "/aurelia/aurelia.html" },
      { source: "/lumiere-dental", destination: "/lumiere-dental/lumiere-dental.html" },
      { source: "/nova-performance", destination: "/nova-performance/nova-performance.html" },
      { source: "/vivelle-beauty", destination: "/vivelle-beauty/vivelle-beauty.html" },
    ];
  },
};

export default nextConfig;
