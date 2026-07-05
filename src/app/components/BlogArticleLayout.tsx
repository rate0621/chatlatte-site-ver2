import Link from "next/link";

interface RelatedArticle {
  readonly slug: string;
  readonly title: string;
}

interface BlogArticleLayoutProps {
  readonly title: string;
  readonly date: string;
  readonly children: React.ReactNode;
  readonly relatedArticles: readonly RelatedArticle[];
}

export function BlogArticleLayout({ title, date, children, relatedArticles }: BlogArticleLayoutProps) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <article>
        <header className="mb-10">
          <p className="text-sm text-gray-500 mb-2">{date}</p>
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">{title}</h1>
        </header>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          {children}
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <aside className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">関連記事</h2>
          <ul className="space-y-2">
            {relatedArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-[#B37A4C] hover:underline"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-12">
        <Link href="/blog" className="text-[#B37A4C] hover:underline text-sm">
          &larr; ブログ一覧に戻る
        </Link>
      </div>
    </main>
  );
}
