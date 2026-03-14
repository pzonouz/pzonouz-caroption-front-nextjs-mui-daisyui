import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "127.0.0.1", "192.168.1.105", "192.168.1.12"],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
