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
      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
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
