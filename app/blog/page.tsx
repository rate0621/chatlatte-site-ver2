import { Suspense } from "react";
import Link from "next/link";
import { getBlogList } from "@/lib/microcms";
import { BlogTagSidebar } from "./BlogTagSidebar";
import { BlogGrid } from "./BlogGrid";
import { BlogCta } from "@/app/components/BlogCta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "エンジニアがいない会社の「最初のエンジニア」が、現場の実録と考えごとを書いています。AI業務自動化やベンダーとの付き合い方から、山形の暮らしまで。",
};

// ブログ記事からタグごとの件数を集計する（1記事が複数タグを持てるためflatMapで集約）
function extractTagsWithCount(
  blogs: Awaited<ReturnType<typeof getBlogList>>["contents"]
) {
  const tagMap = new Map<string, { id: string; name: string; count: number }>();
  for (const blog of blogs) {
    for (const tag of blog.tags ?? []) {
      const entry = tagMap.get(tag.id);
      if (entry) {
        entry.count += 1;
      } else {
        tagMap.set(tag.id, { id: tag.id, name: tag.name, count: 1 });
      }
    }
  }
  return [...tagMap.values()].sort((a, b) => b.count - a.count);
}

export default async function BlogPage() {
  let cmsBlogs: Awaited<ReturnType<typeof getBlogList>>["contents"] = [];

  try {
    const res = await getBlogList({ limit: 100 });
    cmsBlogs = res.contents;
  } catch (err) {
    console.error("microCMS記事の取得に失敗:", err);
  }

  const tags = extractTagsWithCount(cmsBlogs);
  const featured = cmsBlogs[0];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display mb-4 text-3xl font-bold tracking-wide text-[#33261C]">
        ブログ
      </h1>
      <p className="mb-10 leading-relaxed text-[#6E5B4A]">
        エンジニアがいない会社の「最初のエンジニア」が、現場で見たこと・考えたことを書いています。
        仕事の実録から、山形の暮らしまで。
      </p>

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:items-start lg:gap-12">
        <aside className="mb-8 lg:order-2 lg:mb-0">
          <Suspense>
            <BlogTagSidebar tags={tags} totalCount={cmsBlogs.length} />
          </Suspense>
        </aside>

        <div className="lg:order-1">
          {/* 最新記事のフィーチャーカード */}
          {featured && (
            <Link
              href={`/blog/${featured.id}`}
              className="group mb-12 flex flex-col gap-6 rounded-3xl border-2 border-[#E4D6C3] bg-[#FFFDF9] p-6 transition-shadow hover:shadow-lg md:flex-row md:items-center md:p-8"
            >
              {featured.eyecatch && (
                <img
                  src={`${featured.eyecatch.url}?w=600&fm=webp`}
                  alt=""
                  className="aspect-[1200/630] w-full shrink-0 rounded-xl border border-[#E4D6C3] object-cover md:w-72"
                />
              )}
              <div className="flex flex-1 flex-col">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-[#B37A4C] px-3 py-1 text-xs font-bold text-[#FFFDF9]">
                    新着
                  </span>
                  {featured.publishedAt && (
                    <time className="text-sm text-[#8A7461]">
                      {new Date(featured.publishedAt).toLocaleDateString("ja-JP")}
                    </time>
                  )}
                </div>
                {/* タイトルは視覚上はサムネイル画像内にあるため、SEO・支援技術向けにDOMにのみ残す */}
                <h2 className="sr-only">{featured.title}</h2>
                {featured.description && (
                  <p className="line-clamp-3 text-sm leading-relaxed text-[#6E5B4A]">
                    {featured.description}
                  </p>
                )}
                <span className="mt-4 text-sm font-bold text-[#B37A4C]">
                  読む →
                </span>
              </div>
            </Link>
          )}

          <Suspense>
            <BlogGrid cmsBlogs={cmsBlogs} featuredId={featured?.id} />
          </Suspense>
        </div>
      </div>

      <BlogCta />
    </main>
  );
}
