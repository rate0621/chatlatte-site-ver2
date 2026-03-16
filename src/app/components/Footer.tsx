import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#4a5568] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <p className="font-bold text-lg mb-2">chatlatte</p>
            <p className="text-[#a0aec0] text-sm">
              DX推進・マーケティング支援・業務効率化
            </p>
          </div>
          <nav className="flex flex-col sm:flex-row gap-6 text-sm">
            <Link href="/blog" className="text-[#a0aec0] hover:text-white transition-colors">
              ブログ
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
