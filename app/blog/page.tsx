import { Suspense } from "react";
import { getBlogList, type Category } from "@/lib/microcms";
import { BlogTabs } from "./BlogTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "個人の日記及び、DX推進・マーケティング・業務効率化に関する情報をお届けします。",
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

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">ブログ</h1>
      <p className="text-gray-600 mb-8">
        個人の日記及び、DX推進・マーケティング・業務効率化に関する情報をお届けします。
      </p>
      <Suspense>
        <BlogTabs cmsBlogs={cmsBlogs} categories={categories} />
      </Suspense>
    </main>
  );
}
