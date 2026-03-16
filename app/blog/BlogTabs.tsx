"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Blog } from "@/lib/microcms";
import type { BlogPost } from "@/app/pages/blogData";

type Tab = "diary" | "business";

const TABS: readonly { readonly id: Tab; readonly label: string }[] = [
  { id: "diary", label: "個人日記" },
  { id: "business", label: "ビジネス" },
] as const;

interface BlogTabsProps {
  readonly cmsBlogs: readonly Blog[];
  readonly staticPosts: readonly BlogPost[];
}

export function BlogTabs({ cmsBlogs, staticPosts }: BlogTabsProps) {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as Tab) || "diary";

  return (
    <>
      {/* タブ */}
      <div className="flex gap-1 mb-10 border-b border-gray-200">
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={`/blog?tab=${tab.id}`}
            className={`px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer relative -mb-px ${
              currentTab === tab.id
                ? "text-[#5BBFB3] border-b-2 border-[#5BBFB3]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* 個人日記タブ（microCMS記事） */}
      {currentTab === "diary" && (
        <>
          {cmsBlogs.length > 0 ? (
            <div className="space-y-8">
              {cmsBlogs.map((post) => (
                <article key={post.id} className="border-b border-gray-100 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    {post.publishedAt && (
                      <time className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                      </time>
                    )}
                    {post.tag?.map((t) => (
                      <span
                        key={t.id}
                        className="text-xs bg-[#5BBFB3]/10 text-[#5BBFB3] px-2 py-0.5 rounded-full font-medium"
                      >
                        {t.name}
                      </span>
                    ))}
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
      )}

      {/* ビジネスタブ（静的記事） */}
      {currentTab === "business" && (
        <div className="space-y-8">
          {staticPosts.map((post) => (
            <article key={post.slug} className="border-b border-gray-100 pb-8">
              <div className="flex items-center gap-3 mb-2">
                <time className="text-sm text-gray-500">{post.date}</time>
                <span className="text-xs bg-[#5BBFB3]/10 text-[#5BBFB3] px-2 py-0.5 rounded-full font-medium">
                  {post.category}
                </span>
              </div>
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#5BBFB3] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.summary}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
