import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-[#5BBFB3]">
          chatlatte
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-[#5BBFB3] transition-colors">
            ホーム
          </Link>
          <Link to="/blog" className="hover:text-[#5BBFB3] transition-colors">
            ブログ
          </Link>
        </nav>
      </div>
    </header>
  );
}
