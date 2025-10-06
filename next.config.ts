import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 This enables static HTML export instead of server rendering
  output: "export",

  // 👇 Required for GitHub Pages (since Next Image Optimization won’t work)
  images: {
    unoptimized: true,
  },

  // 👇 Optional: if deploying to a subpath like /future-facts-frontend
  basePath: "/future-facts-frontend",

  // 👇 Optional: ensures your links & assets work correctly on GitHub Pages
  assetPrefix: "/future-facts-frontend/",
};

export default nextConfig;