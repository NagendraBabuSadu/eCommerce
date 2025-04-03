import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: "/products",
        destination: "http://localhost:3000/products",
      },
      {
        source: "/products/:path*",
        destination: "http://localhost:3000/products/:path*",
      },
    ];
  },
};
