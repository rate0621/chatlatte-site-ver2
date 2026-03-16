import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getBlogList, getBlogDetail } from "@/lib/microcms";
import { blogPosts } from "@/app/pages/blogData";
import { GtmGuidePage } from "@/app/pages/blog/GtmGuidePage";
import { Ga4SetupPage } from "@/app/pages/blog/Ga4SetupPage";
import { DxForSmallBusinessPage } from "@/app/pages/blog/DxForSmallBusinessPage";
import { NoCodeToolsPage } from "@/app/pages/blog/NoCodeToolsPage";
import { WebsiteImprovementPage } from "@/app/pages/blog/WebsiteImprovementPage";
import { MarketingFoundationPage } from "@/app/pages/blog/MarketingFoundationPage";
import { AiBusinessToolsPage } from "@/app/pages/blog/AiBusinessToolsPage";
import { SqlBasicsPage } from "@/app/pages/blog/SqlBasicsPage";
import { SlackTipsPage } from "@/app/pages/blog/SlackTipsPage";
import { ProjectManagementPage } from "@/app/pages/blog/ProjectManagementPage";
import { SpreadsheetTipsPage } from "@/app/pages/blog/SpreadsheetTipsPage";
import { AutomationStartPage } from "@/app/pages/blog/AutomationStartPage";
import type { Metadata } from "next";

const staticArticles: Record<string, React.ComponentType> = {
  "gtm-guide": GtmGuidePage,
  "ga4-setup": Ga4SetupPage,
  "dx-for-small-business": DxForSmallBusinessPage,
  "no-code-tools": NoCodeToolsPage,
  "website-improvement": WebsiteImprovementPage,
  "marketing-foundation": MarketingFoundationPage,
  "ai-business-tools": AiBusinessToolsPage,
  "sql-basics": SqlBasicsPage,
  "slack-tips": SlackTipsPage,
  "project-management": ProjectManagementPage,
  "spreadsheet-tips": SpreadsheetTipsPage,
  "automation-start": AutomationStartPage,
};

export async function generateStaticParams() {
  const staticSlugs = blogPosts.map((post) => ({ slug: post.slug }));

  let cmsSlugs: { slug: string }[] = [];
  try {
    const res = await getBlogList({ limit: 100 });
    cmsSlugs = res.contents.map((post) => ({ slug: post.id }));
  } catch (err) {
    console.error("microCMS記事のslug取得に失敗:", err);
  }

  return [...staticSlugs, ...cmsSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 静的記事のメタデータ
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    return {
      title: staticPost.title,
      description: staticPost.summary,
    };
  }

  // microCMS記事のメタデータ
  try {
    const blog = await getBlogDetail(slug);
    return {
      title: blog.title,
      description: blog.description ?? "",
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

  // 静的記事の場合
  const StaticComponent = staticArticles[slug];
  if (StaticComponent) {
    return <StaticComponent />;
  }

  // microCMS記事の場合
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
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-[#5BBFB3] hover:underline mb-8"
      >
        <ArrowLeft size={16} />
        ブログ一覧に戻る
      </Link>

      {blog.eyecatch && (
        <img
          src={blog.eyecatch.url}
          alt={blog.title}
          width={blog.eyecatch.width}
          height={blog.eyecatch.height}
          className="w-full rounded-lg mb-8 object-cover max-h-96"
        />
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

      <div className="flex items-center gap-3 mb-8">
        {publishedAt && (
          <time className="text-sm text-gray-500">{publishedAt}</time>
        )}
        {blog.tag?.map((t) => (
          <span
            key={t.id}
            className="text-xs bg-[#5BBFB3]/10 text-[#5BBFB3] px-2 py-0.5 rounded-full font-medium"
          >
            {t.name}
          </span>
        ))}
      </div>

      <div
        className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-a:text-[#5BBFB3] prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </main>
  );
}
