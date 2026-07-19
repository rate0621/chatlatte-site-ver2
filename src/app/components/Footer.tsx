import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#33261C] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <p className="font-display mb-2 text-lg font-bold">chatlatte</p>
            <p className="mb-1 text-sm text-[#C9B7A4]">
              エンジニアがいない会社の、「最初のエンジニア」。
            </p>
            <p className="mb-3 text-sm text-[#C9B7A4]">
              山形県天童市から、全国対応（オンライン）
            </p>
            <a
              href="https://x.com/chatrate0621"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="X (Twitter) @chatrate0621"
              className="inline-flex items-center gap-2 text-sm text-[#C9B7A4] transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>@chatrate0621</span>
            </a>
          </div>
          <nav className="flex flex-col gap-x-6 gap-y-2 text-sm sm:flex-row sm:flex-wrap">
            <Link href="/blog" className="text-[#C9B7A4] transition-colors hover:text-white">
              ブログ
            </Link>
            <Link href="/author/chatlatte" className="text-[#C9B7A4] transition-colors hover:text-white">
              著者プロフィール
            </Link>
            <Link href="/about" className="text-[#C9B7A4] transition-colors hover:text-white">
              運営者情報
            </Link>
            <Link href="/contact" className="text-[#C9B7A4] transition-colors hover:text-white">
              お問い合わせ
            </Link>
            <Link href="/privacy-policy" className="text-[#C9B7A4] transition-colors hover:text-white">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-[#C9B7A4] transition-colors hover:text-white">
              利用規約
            </Link>
          </nav>
        </div>
        <div className="border-t border-[#5C4A3B] pt-6">
          <div className="text-center text-sm text-[#C9B7A4]">
            &copy; 2026 chatlatte. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
