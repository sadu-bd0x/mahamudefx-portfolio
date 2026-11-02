import type { NextConfig } from "next";

// The normal build serves the Next.js app in the platform preview.
// Cloudflare Pages can build a fully static copy with PORTFOLIO_STATIC_EXPORT=1.
const staticExport = process.env.PORTFOLIO_STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
  : {
      async redirects() {
        return [{ source: "/admin", destination: "/admin/index.html", permanent: false }];
      },
    };

export default nextConfig;
