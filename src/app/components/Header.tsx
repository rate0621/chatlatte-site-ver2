"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "実績", href: "/#works" },
  { label: "頼めること", href: "/#services" },
  { label: "進め方", href: "/#process" },
  { label: "ブログ", href: "/blog" },
] as const;

const CTA_ITEM = { label: "無料相談", href: "/#contact" } as const;

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
    <header className="sticky top-0 z-50 border-b border-[#E4D6C3] bg-[#FFFDF9]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-wide text-[#33261C]"
        >
          chatlatte
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#6E5B4A] md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="cursor-pointer transition-colors hover:text-[#B37A4C]"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick(CTA_ITEM.href)}
            className="cursor-pointer rounded-full bg-[#B37A4C] px-5 py-2 font-bold text-[#FFFDF9] transition-colors hover:bg-[#9A6238]"
          >
            {CTA_ITEM.label}
          </button>
        </nav>

        {/* ハンバーガーボタン */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2 text-[#6E5B4A] transition-colors hover:text-[#B37A4C] md:hidden"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <nav className="border-t border-[#E4D6C3] bg-[#FFFDF9]/95 backdrop-blur-sm md:hidden">
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="w-full cursor-pointer px-6 py-3 text-left text-sm font-medium text-[#6E5B4A] transition-colors hover:bg-[#B37A4C]/5 hover:text-[#B37A4C]"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="px-6 py-3">
              <button
                onClick={() => handleNavClick(CTA_ITEM.href)}
                className="w-full cursor-pointer rounded-full bg-[#B37A4C] px-5 py-2.5 text-sm font-bold text-[#FFFDF9] transition-colors hover:bg-[#9A6238]"
              >
                {CTA_ITEM.label}（30分・無料）
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
