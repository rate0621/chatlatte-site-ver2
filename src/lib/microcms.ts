import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

// microCMS クライアント
const serviceDomain = (process.env.MICROCMS_SERVICE_DOMAIN ?? "").replace(
  ".microcms.io",
  ""
);

export const client = createClient({
  serviceDomain,
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

// タグの型
export type Tag = {
  readonly name: string;
} & MicroCMSListContent;

// ブログ記事の型
export type Blog = {
  readonly title: string;
  readonly content: string;
  readonly eyecatch?: MicroCMSImage;
  readonly tag?: readonly Tag[];
  readonly description?: string;
} & MicroCMSListContent;

// ブログ一覧を取得
export async function getBlogList(queries?: {
  limit?: number;
  offset?: number;
}) {
  return client.getList<Blog>({
    endpoint: "blogs",
    queries: {
      limit: queries?.limit ?? 20,
      offset: queries?.offset ?? 0,
      orders: "-publishedAt",
    },
  });
}

// ブログ記事を1件取得
export async function getBlogDetail(contentId: string) {
  return client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
  });
}
