"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Blog } from "@/lib/microcms";

interface BlogGridProps {
  readonly cmsBlogs: readonly Blog[];
  /** フィーチャーカードで表示済みの記事ID（グリッドから除外する） */
  readonly featuredId?: string;
}

export function BlogGrid({ cmsBlogs, featuredId }: BlogGridProps) {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") ?? "";

  const gridBlogs = cmsBlogs.filter((post) => post.id !== featuredId);
  const filteredBlogs =
    currentTag === ""
      ? gridBlogs
      : gridBlogs.filter((post) => post.tags?.some((t) => t.id === currentTag));

  return filteredBlogs.length > 0 ? (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
      {filteredBlogs.map((post) => (
        <article key={post.id}>
          <Link href={`/blog/${post.id}`} className="group block">
            {post.eyecatch && (
              <img
                src={`${post.eyecatch.url}?w=600&fm=webp`}
                alt={post.title}
                loading="lazy"
                className="aspect-[1200/630] w-full rounded-xl border border-[#E4D6C3] object-cover transition-shadow group-hover:shadow-md"
              />
            )}
            {/* タグは画像内のチップで表示済みのため、ここでは日付のみ */}
            {post.publishedAt && (
              <time className="mt-2.5 block text-xs text-[#8A7461]">
                {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
              </time>
            )}
            {/* タイトルは視覚上は画像内にあるため、SEO・支援技術向けにDOMにのみ残す */}
            <h2 className="sr-only">{post.title}</h2>
          </Link>
        </article>
      ))}
    </div>
  ) : (
    <p className="py-12 text-center text-[#8A7461]">まだ記事がありません。</p>
  );
}
