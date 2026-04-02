import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogList, getBlogDetail } from "@/lib/microcms";
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
    const description = blog.description ?? "";
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

  const publishedAt = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("ja-JP")
    : "";

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            {publishedAt && (
              <time className="text-sm text-gray-500">{publishedAt}</time>
            )}
            {blog.category && (
              <span className="text-xs bg-[#5BBFB3]/10 text-[#5BBFB3] px-2 py-0.5 rounded-full font-medium">
                {blog.category.name}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">{blog.title}</h1>
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

        <div
          className="prose prose-lg prose-gray max-w-none space-y-6 text-gray-700
            prose-headings:text-gray-800 prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:my-4 prose-p:text-gray-700
            prose-a:text-[#5BBFB3] prose-a:no-underline hover:prose-a:underline
            prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc prose-li:my-1 prose-li:text-gray-700
            prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal
            prose-blockquote:border-l-4 prose-blockquote:border-[#5BBFB3]/30 prose-blockquote:pl-4 prose-blockquote:text-gray-600 prose-blockquote:italic
            prose-img:rounded-lg prose-img:my-6
            prose-strong:text-gray-700 prose-strong:font-semibold
            [&_br+br]:block [&_br+br]:content-[''] [&_br+br]:mt-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      <div className="mt-12">
        <Link href="/blog" className="text-[#5BBFB3] hover:underline text-sm">
          &larr; ブログ一覧に戻る
        </Link>
      </div>
    </main>
  );
}
