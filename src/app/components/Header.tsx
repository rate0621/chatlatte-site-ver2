"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "ホーム", href: "/" },
  { label: "サービス", href: "/#services" },
  { label: "実績", href: "/#works" },
  { label: "お問い合わせ", href: "/#contact" },
  { label: "ブログ", href: "/blog" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleNavClick = useCallback(
    (href: string) => {
      setIsMenuOpen(false);

      // アンカーリンクの場合
      if (href.startsWith("/#")) {
        const sectionId = href.slice(2);
        if (isHome) {
          // トップページならスムーズスクロール
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          // 他ページならトップページへ遷移
          router.push(href);
        }
        return;
      }

      // 通常リンク
      router.push(href);
    },
    [isHome, router]
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#5BBFB3]">
          chatlatte
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="hover:text-[#5BBFB3] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ハンバーガーボタン */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-gray-600 hover:text-[#5BBFB3] transition-colors"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left px-6 py-3 text-sm font-medium text-gray-600 hover:text-[#5BBFB3] hover:bg-[#5BBFB3]/5 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
