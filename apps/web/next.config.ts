import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@my-app/utils"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
