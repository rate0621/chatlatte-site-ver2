import { notFound } from "next/navigation";
import { getBlogDetail } from "@/lib/microcms";
import { BlogArticle } from "../../[slug]/BlogArticle";
import type { Metadata } from "next";

// 下書きは常に最新を取りたいのでキャッシュも静的生成もしない
export const dynamic = "force-dynamic";

type SearchParams = Readonly<Record<string, string | string[] | undefined>>;

type Props = {
  readonly params: Promise<{ slug: string }>;
  readonly searchParams: Promise<SearchParams>;
};

// draftKey はクエリで複数指定され得るため、文字列1件に正規化する
function toDraftKey(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && raw.length > 0 ? raw : undefined;
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const draftKey = toDraftKey(query.draftKey);

  // プレビューは検索エンジンに載せない。OGPは不要なので出力しない
  const robots = { index: false, follow: false } as const;

  if (!draftKey) {
    return { title: "【下書き】プレビューキーがありません", robots };
  }

  try {
    const blog = await getBlogDetail(slug, { draftKey });
    return { title: `【下書き】${blog.title}`, robots };
  } catch {
    return { title: "【下書き】記事が見つかりません", robots };
  }
}

/**
 * 下書きプレビューページ。
 * microCMSの「画面プレビュー」から `/blog/preview/<ID>?draftKey=<KEY>` で開く。
 */
export default async function BlogPreviewPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const draftKey = toDraftKey(query.draftKey);

  // draftKey が無いアクセスはプレビューとして扱わない
  if (!draftKey) {
    notFound();
  }

  let blog;
  try {
    blog = await getBlogDetail(slug, { draftKey });
  } catch {
    notFound();
  }

  return <BlogArticle blog={blog} slug={slug} isPreview />;
}
