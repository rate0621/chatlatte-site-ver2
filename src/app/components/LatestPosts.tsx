import Link from "next/link";
import { getBlogList } from "@/lib/microcms";

// トップページ用：最新記事3件（ビルド時に取得）
export async function LatestPosts() {
  let posts: Awaited<ReturnType<typeof getBlogList>>["contents"] = [];
  try {
    const res = await getBlogList({ limit: 3 });
    posts = res.contents;
  } catch (err) {
    console.error("最新記事の取得に失敗:", err);
  }

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#F6F1E8] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display mb-4 text-center text-2xl font-bold tracking-wide text-[#33261C] md:text-3xl">
          現場の話を、書いています
        </h2>
        <p className="mb-12 text-center leading-relaxed text-[#6E5B4A]">
          実績の裏側や、ベンダーとの付き合い方の考えごと。
          <br className="hidden md:block" />
          「どんな人か」は、読んでもらうのが早いと思っています。
        </p>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block"
            >
              {post.eyecatch && (
                <img
                  src={`${post.eyecatch.url}?w=480&fm=webp`}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-[1200/630] w-full rounded-xl border border-[#E4D6C3] object-cover transition-shadow group-hover:shadow-md"
                />
              )}
              {post.publishedAt && (
                <time className="mt-2 block text-xs text-[#8A7461]">
                  {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                </time>
              )}
              <h3 className="sr-only">{post.title}</h3>
            </Link>
          ))}
        </div>

        <p className="text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full border-2 border-[#E4D6C3] bg-[#FFFDF9] px-8 py-3 font-bold text-[#33261C] transition-colors hover:border-[#B37A4C] hover:text-[#B37A4C]"
          >
            ブログをもっと読む →
          </Link>
        </p>
      </div>
    </section>
  );
}
