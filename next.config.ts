import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['192.168.68.65', '192.168.68.*'],
};

export default nextConfig;
