"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Blog, Category } from "@/lib/microcms";

interface BlogTabsProps {
  readonly cmsBlogs: readonly Blog[];
  readonly categories: readonly Category[];
}

export function BlogTabs({ cmsBlogs, categories }: BlogTabsProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  const filteredBlogs =
    currentCategory === ""
      ? cmsBlogs
      : cmsBlogs.filter((post) => post.category?.id === currentCategory);

  return (
    <>
      {/* タブ */}
      <div className="flex gap-1 mb-10 border-b border-gray-200 overflow-x-auto">
        <Link
          href="/blog"
          className={`shrink-0 px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer relative -mb-px ${
            currentCategory === ""
              ? "text-[#B37A4C] border-b-2 border-[#B37A4C]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          すべて
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog?category=${cat.id}`}
            className={`shrink-0 px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer relative -mb-px ${
              currentCategory === cat.id
                ? "text-[#B37A4C] border-b-2 border-[#B37A4C]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* 記事一覧 */}
      {filteredBlogs.length > 0 ? (
        <div className="space-y-8">
          {filteredBlogs.map((post) => (
            <article key={post.id} className="border-b border-gray-100 pb-8">
              <Link
                href={`/blog/${post.id}`}
                className="group flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
              >
                {post.eyecatch && (
                  <img
                    src={`${post.eyecatch.url}?w=600&fm=webp`}
                    alt=""
                    loading="lazy"
                    className="aspect-[1200/630] w-full shrink-0 rounded-xl border border-[#E4D6C3] object-cover transition-shadow group-hover:shadow-md sm:w-60"
                  />
                )}
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-3">
                    {post.publishedAt && (
                      <time className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                      </time>
                    )}
                    {post.category && (
                      <span className="rounded-full bg-[#B37A4C]/10 px-2 py-0.5 text-xs font-medium text-[#B37A4C]">
                        {post.category.name}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-800 transition-colors group-hover:text-[#B37A4C]">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-sm leading-relaxed text-gray-600">
                      {post.description}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          まだ記事がありません。
        </p>
      )}
    </>
  );
}
