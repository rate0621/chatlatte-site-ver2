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
              ? "text-[#5BBFB3] border-b-2 border-[#5BBFB3]"
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
                ? "text-[#5BBFB3] border-b-2 border-[#5BBFB3]"
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
              <div className="flex items-center gap-3 mb-2">
                {post.publishedAt && (
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                  </time>
                )}
                {post.category && (
                  <span className="text-xs bg-[#5BBFB3]/10 text-[#5BBFB3] px-2 py-0.5 rounded-full font-medium">
                    {post.category.name}
                  </span>
                )}
              </div>
              <Link href={`/blog/${post.id}`} className="group">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#5BBFB3] transition-colors mb-2">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.description}
                  </p>
                )}
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
