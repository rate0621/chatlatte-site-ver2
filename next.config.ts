import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 問い合わせAPI（/api/contact）を使うため静的エクスポートは廃止。
  // Vercel の Next.js プリセットがビルド出力（.next）をそのまま扱う
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
