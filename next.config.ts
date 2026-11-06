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
  // Slovenian moved from /sl to the bare paths when it became the default
  // language. Everything that was published under /sl keeps its ranking by
  // redirecting permanently to its new home: /sl -> /, /sl/privacy ->
  // /privacy, and so on. Nothing is served under /sl any more, so the
  // catch-all cannot loop. 301 rather than Next's default 308 (`permanent:
  // true`): search engines treat the two the same, and 301 is the status the
  // move was specified in.
  async redirects() {
    return [
      { source: "/sl", destination: "/", statusCode: 301 },
      { source: "/sl/:path*", destination: "/:path*", statusCode: 301 },
    ];
  },
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
