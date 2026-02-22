import { Link } from "react-router-dom";
import { blogPosts } from "@/app/pages/blogData";

export function BlogIndexPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">ブログ</h1>
      <p className="text-gray-600 mb-12">
        DX推進・マーケティング・業務効率化に関する情報をお届けします。
      </p>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3 mb-2">
              <time className="text-sm text-gray-500">{post.date}</time>
              <span className="text-xs bg-[#5BBFB3]/10 text-[#5BBFB3] px-2 py-0.5 rounded-full font-medium">
                {post.category}
              </span>
            </div>
            <Link to={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#5BBFB3] transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{post.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
