import type { NextConfig } from "next";

// Videos are never in the repo. Locally they come from the git-ignored
// public/_media symlink; on Vercel that folder does not exist, so a build
// without the Blob base URL would ship a site whose films all 404. Fail the
// build instead of deploying it.
if (process.env.VERCEL && !process.env.NEXT_PUBLIC_MEDIA_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_MEDIA_BASE_URL is not set. Point it at the Vercel Blob folder that holds the site's videos (see .env.example)."
  );
}

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
