import Link from "next/link";

// カスタム404。存在しないURL（削除済みの旧記事URL等）でもデッドエンドにせず、
// トップ・ブログ・お問い合わせへ誘導する。Header/Footerはルートレイアウトが囲む。
export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <p className="font-display text-6xl font-bold text-[#B37A4C]">404</p>
      <h1 className="mt-6 text-2xl font-bold text-[#33261C]">
        お探しのページが見つかりませんでした
      </h1>
      <p className="mt-4 leading-relaxed text-[#6E5B4A]">
        ページが移動・削除されたか、URLが間違っている可能性があります。
        下のリンクからお探しください。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[#33261C] px-6 py-3 text-sm font-bold text-[#F6F1E8] transition-colors hover:bg-[#4A382B]"
        >
          トップページへ
        </Link>
        <Link
          href="/blog"
          className="rounded-full border-2 border-[#E4D6C3] bg-[#FFFDF9] px-6 py-3 text-sm font-bold text-[#6E5B4A] transition-colors hover:border-[#B37A4C] hover:text-[#B37A4C]"
        >
          ブログを読む
        </Link>
        <Link
          href="/contact"
          className="rounded-full border-2 border-[#E4D6C3] bg-[#FFFDF9] px-6 py-3 text-sm font-bold text-[#6E5B4A] transition-colors hover:border-[#B37A4C] hover:text-[#B37A4C]"
        >
          お問い合わせ
        </Link>
      </div>
    </main>
  );
}
