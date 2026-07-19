import type { MetadataRoute } from "next";
import { getBlogList } from "@/lib/microcms";

const BASE_URL = "https://www.chatlatte.com";

// ビルド時にmicroCMSから全記事を取得してサイトマップを生成する
// （記事の公開反映と同じく、再デプロイのタイミングで更新される）
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/about`, priority: 0.5 },
    { url: `${BASE_URL}/contact`, priority: 0.5 },
    { url: `${BASE_URL}/author/chatlatte`, priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, priority: 0.3 },
    { url: `${BASE_URL}/terms`, priority: 0.3 },
  ];

  const { contents } = await getBlogList({ limit: 100 });
  const blogPages: MetadataRoute.Sitemap = contents.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.id}`,
    lastModified: blog.revisedAt ?? blog.publishedAt ?? blog.updatedAt,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
