import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogList, getBlogDetail, type Blog } from "@/lib/microcms";
import { BlogCta } from "@/app/components/BlogCta";
import { BookCard } from "@/app/components/BookCard";
import { getBookByAsin, mergeBook, type BookInfo } from "@/lib/creators-api";
import { BOOK_FALLBACKS } from "@/lib/book-fallbacks";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const res = await getBlogList({ limit: 100 });
    return res.contents.map((post) => ({ slug: post.id }));
  } catch (err) {
    console.error("microCMS記事のslug取得に失敗:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlogDetail(slug);
    // descriptionが未設定の記事は本文冒頭から抜粋を生成する
    const excerpt = blog.content
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);
    const description = blog.description || excerpt;
    const images = blog.eyecatch ? [{ url: blog.eyecatch.url, width: blog.eyecatch.width, height: blog.eyecatch.height }] : [];

    return {
      title: blog.title,
      description,
      openGraph: {
        title: blog.title,
        description,
        type: "article",
        publishedTime: blog.publishedAt ?? undefined,
        ...(images.length > 0 && { images }),
      },
      twitter: {
        card: blog.eyecatch ? "summary_large_image" : "summary",
        title: blog.title,
        description,
        ...(blog.eyecatch && { images: [blog.eyecatch.url] }),
      },
    };
  } catch {
    return {
      title: "記事が見つかりません",
    };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let blog;
  try {
    blog = await getBlogDetail(slug);
  } catch {
    notFound();
  }

  // 関連記事：タグを1つでも共有する最新3件（自身を除く）。共有タグが無ければ全体の最新3件
  let relatedPosts: readonly Blog[] = [];
  try {
    const res = await getBlogList({ limit: 100 });
    const others = res.contents.filter((post) => post.id !== slug);
    const blogTagIds = new Set((blog.tags ?? []).map((t) => t.id));
    const sharesTag = others.filter((post) =>
      post.tags?.some((t) => blogTagIds.has(t.id))
    );
    relatedPosts = (sharesTag.length > 0 ? sharesTag : others).slice(0, 3);
  } catch (err) {
    console.error("関連記事の取得に失敗:", err);
  }

  const publishedAt = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("ja-JP")
    : "";
  const publishedAtIso = blog.publishedAt
    ? new Date(blog.publishedAt).toISOString().slice(0, 10)
    : "";

  // 書籍カード（[[bookcard:...]]）は自前で開示を持つため、上部の[PR]バナーは
  // 「カード以外の本文中アフィリエイトリンク（インラインのamzn.to等）」がある場合のみ出す。
  const hasInlineAffiliate =
    /amzn\.to|amazon\.co\.jp|amazon\.com|rakuten\.co\.jp|a8\.net/.test(
      blog.content.replace(/\[\[bookcard:[A-Z0-9]{10}\]\]/g, "")
    );

  // 本文中の [[bookcard:ASIN]] マーカーを書籍カードに差し替える。
  // マーカーがラップされた <p>…</p> は取り除いてから分割する。
  const cleanedContent = blog.content.replace(
    /<p>\s*(\[\[bookcard:[A-Z0-9]{10}\]\])\s*<\/p>/g,
    "$1"
  );
  type Segment = { type: "html"; html: string } | { type: "book"; asin: string };
  const segments: Segment[] = [];
  const asinSet = new Set<string>();
  let lastIndex = 0;
  for (const m of cleanedContent.matchAll(/\[\[bookcard:([A-Z0-9]{10})\]\]/g)) {
    segments.push({ type: "html", html: cleanedContent.slice(lastIndex, m.index) });
    segments.push({ type: "book", asin: m[1] });
    asinSet.add(m[1]);
    lastIndex = (m.index ?? 0) + m[0].length;
  }
  segments.push({ type: "html", html: cleanedContent.slice(lastIndex) });

  // マーカーで参照された各ASINを描画データにする。
  // 自前フォールバック（書影・書名・著者）を主に、Creators API が使えれば発売日・ランキング等で補完する。
  const bookEntries = await Promise.all(
    [...asinSet].map(async (asin): Promise<[string, BookInfo]> => {
      const info = await getBookByAsin(asin);
      return [asin, mergeBook(asin, BOOK_FALLBACKS[asin], info)];
    })
  );
  const booksByAsin = new Map(bookEntries);

  const proseClass = `prose prose-lg prose-gray max-w-none space-y-6 text-gray-700
    prose-headings:text-gray-800 prose-headings:font-bold
    prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
    prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
    prose-p:my-4 prose-p:text-gray-700
    prose-a:text-[#B37A4C] prose-a:no-underline hover:prose-a:underline
    prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc prose-li:my-1 prose-li:text-gray-700
    prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal
    prose-blockquote:border-l-4 prose-blockquote:border-[#B37A4C]/30 prose-blockquote:pl-4 prose-blockquote:text-gray-600 prose-blockquote:italic
    prose-img:rounded-lg prose-img:my-6 prose-img:mx-auto prose-img:w-auto prose-img:max-h-72
    prose-strong:text-gray-700 prose-strong:font-semibold
    [&_br+br]:block [&_br+br]:content-[''] [&_br+br]:mt-4`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description ?? "",
    image: blog.eyecatch?.url,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt ?? blog.publishedAt,
    author: {
      "@type": "Person",
      name: "chatlatte",
      url: "https://www.chatlatte.com/author/chatlatte",
      jobTitle: "テクニカルディレクター",
      description:
        "エンジニア歴10年以上。うち5年はソーシャルゲーム会社でデータアナリスト。現在はDX推進・マーケティング基盤構築・業務効率化を支援。",
    },
    publisher: {
      "@type": "Organization",
      name: "chatlatte",
      logo: {
        "@type": "ImageObject",
        url: "https://www.chatlatte.com/chatlatte_logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.chatlatte.com/blog/${slug}`,
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            {publishedAt && (
              <time
                dateTime={publishedAtIso}
                className="text-sm text-gray-500"
              >
                公開日：{publishedAt}
              </time>
            )}
            {blog.tags?.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-[#B37A4C]/10 text-[#B37A4C] px-2 py-0.5 rounded-full font-medium"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">{blog.title}</h1>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <img
              src="/chatlatte_logo.png"
              alt=""
              aria-hidden="true"
              className="w-7 h-7 rounded-full bg-white border border-gray-200 p-1 object-contain"
            />
            <span className="text-gray-500">文：</span>
            <Link
              href="/author/chatlatte"
              rel="author"
              className="font-medium text-gray-800 hover:text-[#B37A4C] transition-colors"
            >
              chatlatte
            </Link>
            <a
              href="https://x.com/chatrate0621"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="X (Twitter) @chatrate0621"
              className="text-gray-400 hover:text-gray-800 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </header>

        {blog.eyecatch && (
          <img
            src={blog.eyecatch.url}
            alt={blog.title}
            width={blog.eyecatch.width}
            height={blog.eyecatch.height}
            className="w-full rounded-lg mb-10 object-cover max-h-96"
          />
        )}

        {hasInlineAffiliate && (
          <p className="mb-8 px-4 py-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-md text-xs leading-relaxed">
            <span className="font-semibold">[PR]</span>{" "}
            本記事にはアフィリエイトリンクが含まれています。リンク経由で購入された場合、運営者が紹介料を受け取ることがあります。
          </p>
        )}

        {segments.map((seg, i) =>
          seg.type === "book" ? (
            <BookCard key={i} book={booksByAsin.get(seg.asin)!} />
          ) : seg.html.trim() ? (
            <div
              key={i}
              className={proseClass}
              dangerouslySetInnerHTML={{ __html: seg.html }}
            />
          ) : null
        )}

        <aside className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex items-start gap-4 bg-[#FAF6EF] rounded-lg p-6">
            <img
              src="/chatlatte_logo.png"
              alt="chatlatte"
              className="w-16 h-16 rounded-full bg-white p-2 shrink-0 object-contain"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1">この記事を書いた人</p>
              <p className="font-bold text-gray-800 mb-2">chatlatte</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                エンジニア歴10年以上。うち5年はソーシャルゲーム会社でデータアナリストとして従事し、KPI設計・SQL・BIツール活用による意思決定支援を担当。現在はテクニカルディレクターとしてDX推進・マーケティング基盤構築・業務効率化を支援。
              </p>
              <div className="flex items-center gap-4 mt-3">
                <Link
                  href="/author/chatlatte"
                  className="text-sm text-[#B37A4C] hover:underline inline-block"
                >
                  プロフィールを見る &rarr;
                </Link>
                <a
                  href="https://x.com/chatrate0621"
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="X (Twitter) @chatrate0621"
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>@chatrate0621</span>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </article>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-lg font-bold text-[#33261C]">
            あわせて読む
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedPosts.map((post) => (
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
                <h3 className="sr-only">{post.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <BlogCta />

      <div className="mt-12">
        <Link href="/blog" className="text-[#B37A4C] hover:underline text-sm">
          &larr; ブログ一覧に戻る
        </Link>
      </div>
    </main>
  );
}
