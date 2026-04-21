import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  // dev は .next（Next.js 既定）、本番ビルドは Vercel が参照する dist を使う
  distDir: isDev ? ".next" : "dist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
