import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#4a5568] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <p className="font-bold text-lg mb-2">chatlatte</p>
            <p className="text-[#a0aec0] text-sm mb-3">
              DX推進・マーケティング支援・業務効率化
            </p>
            <a
              href="https://x.com/chatrate0621"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="X (Twitter) @chatrate0621"
              className="inline-flex items-center gap-2 text-[#a0aec0] hover:text-white text-sm transition-colors"
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
          <nav className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/blog" className="text-[#a0aec0] hover:text-white transition-colors">
              ブログ
            </Link>
            <Link href="/author/chatlatte" className="text-[#a0aec0] hover:text-white transition-colors">
              著者プロフィール
            </Link>
            <Link href="/#contact" className="text-[#a0aec0] hover:text-white transition-colors">
              お問い合わせ
            </Link>
            <Link href="/privacy-policy" className="text-[#a0aec0] hover:text-white transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-[#a0aec0] hover:text-white transition-colors">
              利用規約
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-600 pt-6">
          <div className="text-[#a0aec0] text-sm text-center">
            &copy; 2026 chatlatte. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
