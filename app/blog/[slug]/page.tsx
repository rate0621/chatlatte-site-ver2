import { notFound } from "next/navigation";
import { getBlogList, getBlogDetail } from "@/lib/microcms";
import { BlogArticle } from "./BlogArticle";
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

  return <BlogArticle blog={blog} slug={slug} />;
}
