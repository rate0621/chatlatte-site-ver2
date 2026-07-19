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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const currentTag = tag ?? "";

  let cmsBlogs: Awaited<ReturnType<typeof getBlogList>>["contents"] = [];

  try {
    const res = await getBlogList({ limit: 100 });
    cmsBlogs = res.contents;
  } catch (err) {
    console.error("microCMS記事の取得に失敗:", err);
  }

  const tags = extractTagsWithCount(cmsBlogs);
  // タグ未選択のときだけ最新記事をフィーチャー表示する（タグ選択時は一覧に集約）
  const featured = currentTag === "" ? cmsBlogs[0] : undefined;

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
          <BlogTagSidebar
            tags={tags}
            totalCount={cmsBlogs.length}
            currentTag={currentTag}
          />
        </aside>

        <div className="lg:order-1">
          {/* 最新記事のフィーチャーカード */}
          {featured && (
            <Link
              href={`/blog/${featured.id}`}
              className="group mb-12 flex flex-col overflow-hidden rounded-3xl border-2 border-[#E4D6C3] bg-[#FFFDF9] transition-shadow hover:shadow-lg md:flex-row"
            >
              {featured.eyecatch && (
                <div className="flex shrink-0 items-center justify-center bg-[#F1E7D8] md:w-[58%]">
                  <img
                    src={`${featured.eyecatch.url}?w=800&fm=webp`}
                    alt=""
                    className="aspect-[1200/630] w-full object-contain"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:p-8">
                <div>
                  <h2 className="text-xl font-bold leading-snug text-[#33261C] transition-colors group-hover:text-[#B37A4C] md:text-2xl">
                    {featured.title}
                  </h2>
                  {featured.description && (
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#6E5B4A]">
                      {featured.description}
                    </p>
                  )}
                </div>
                {featured.publishedAt && (
                  <time className="self-end text-sm text-[#8A7461]">
                    {new Date(featured.publishedAt).toLocaleDateString("ja-JP")}
                  </time>
                )}
              </div>
            </Link>
          )}

          <BlogGrid
            cmsBlogs={cmsBlogs}
            featuredId={featured?.id}
            currentTag={currentTag}
          />
        </div>
      </div>

      <BlogCta />
    </main>
  );
}
