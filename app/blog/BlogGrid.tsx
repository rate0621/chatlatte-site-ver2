import Link from "next/link";
import type { Blog } from "@/lib/microcms";

interface BlogGridProps {
  readonly cmsBlogs: readonly Blog[];
  /** フィーチャーカードで表示済みの記事ID（グリッドから除外する） */
  readonly featuredId?: string;
  /** 現在選択中のタグID（未選択は空文字）。サーバーで searchParams から解決して渡す */
  readonly currentTag: string;
}

// サーバーコンポーネント。タグ絞り込みもサーバー側で行い、記事リンク・タイトル・抜粋を
// すべて初期HTMLに出す（クローラ／ユーザー双方に読める一覧にする）。
export function BlogGrid({ cmsBlogs, featuredId, currentTag }: BlogGridProps) {
  const gridBlogs = cmsBlogs.filter((post) => post.id !== featuredId);
  const filteredBlogs =
    currentTag === ""
      ? gridBlogs
      : gridBlogs.filter((post) => post.tags?.some((t) => t.id === currentTag));

  if (filteredBlogs.length === 0) {
    return (
      <p className="py-12 text-center text-[#8A7461]">まだ記事がありません。</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
      {filteredBlogs.map((post) => (
        <article key={post.id}>
          <Link href={`/blog/${post.id}`} className="group block">
            {post.eyecatch && (
              <img
                src={`${post.eyecatch.url}?w=600&fm=webp`}
                alt=""
                loading="lazy"
                className="aspect-[1200/630] w-full rounded-xl border border-[#E4D6C3] object-cover transition-shadow group-hover:shadow-md"
              />
            )}
            {post.publishedAt && (
              <time className="mt-2.5 block text-xs text-[#8A7461]">
                {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
              </time>
            )}
            <h2 className="mt-1 text-base font-bold leading-snug text-[#33261C] transition-colors group-hover:text-[#B37A4C]">
              {post.title}
            </h2>
            {post.description && (
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#6E5B4A]">
                {post.description}
              </p>
            )}
          </Link>
        </article>
      ))}
    </div>
  );
}
