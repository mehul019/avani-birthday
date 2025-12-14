import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc",
      },
    ],
  },
  // `reactCompiler` disabled because babel-plugin-react-compiler dev dependency
  // was removed. Re-enable if you install the plugin again and intentionally
  // want to use the React Compiler.
  reactCompiler: false,
};

export default nextConfig;
