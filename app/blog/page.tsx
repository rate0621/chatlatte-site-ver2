import { Suspense } from "react";
import Link from "next/link";
import { getBlogList, type Category } from "@/lib/microcms";
import { BlogTabs } from "./BlogTabs";
import { BlogCta } from "@/app/components/BlogCta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "エンジニアがいない会社の「最初のエンジニア」が、現場の実録と考えごとを書いています。AI業務自動化やベンダーとの付き合い方から、山形の暮らしまで。",
};

// ブログ記事からユニークなカテゴリを抽出
function extractUniqueCategories(
  blogs: Awaited<ReturnType<typeof getBlogList>>["contents"]
): Category[] {
  const catMap = new Map<string, Category>();
  for (const blog of blogs) {
    if (blog.category && !catMap.has(blog.category.id)) {
      catMap.set(blog.category.id, blog.category);
    }
  }
  return [...catMap.values()];
}

export default async function BlogPage() {
  let cmsBlogs: Awaited<ReturnType<typeof getBlogList>>["contents"] = [];

  try {
    const res = await getBlogList({ limit: 100 });
    cmsBlogs = res.contents;
  } catch (err) {
    console.error("microCMS記事の取得に失敗:", err);
  }

  const categories = extractUniqueCategories(cmsBlogs);
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

      {/* 最新記事のフィーチャーカード */}
      {featured && (
        <Link
          href={`/blog/${featured.id}`}
          className="group mb-12 flex flex-col overflow-hidden rounded-3xl border-2 border-[#E4D6C3] bg-[#FFFDF9] transition-shadow hover:shadow-lg md:flex-row"
        >
          {featured.eyecatch && (
            <img
              src={`${featured.eyecatch.url}?w=1000&fm=webp`}
              alt=""
              className="aspect-[1200/630] w-full object-cover md:w-[55%]"
            />
          )}
          <div className="flex flex-col justify-center p-6 md:p-8">
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
            <h2 className="font-display mb-3 text-xl font-bold leading-snug text-[#33261C] transition-colors group-hover:text-[#B37A4C] md:text-2xl">
              {featured.title}
            </h2>
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
        <BlogTabs
          cmsBlogs={cmsBlogs}
          categories={categories}
          featuredId={featured?.id}
        />
      </Suspense>

      <BlogCta />
    </main>
  );
}
