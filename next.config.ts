import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // v1 had a separate pricing page; v2 is a single page with #packages.
      { source: "/pricing", destination: "/#packages", permanent: true },
    ];
  },
};

export default nextConfig;
