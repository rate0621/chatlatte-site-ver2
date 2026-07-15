import type { BookInfo } from "@/lib/creators-api";

// 記事本文に埋め込む書籍アフィリエイトカード（横型）。
// Creators API から取得した BookInfo を表示。title が空（API失敗）のときはリンクのみのフォールバック。
export function BookCard({ book }: { book: BookInfo }) {
  const rel = "nofollow sponsored noopener";

  if (!book.title) {
    return (
      <div className="my-8">
        <a
          href={book.url}
          target="_blank"
          rel={rel}
          className="inline-flex items-center gap-1 rounded bg-[#FF9900] px-4 py-1.5 text-sm font-bold text-[#232F3E] hover:brightness-95"
        >
          Amazonで見る
        </a>
        <p className="mt-1 text-xs text-gray-400">
          PR・Amazonアソシエイトのリンクです
        </p>
      </div>
    );
  }

  return (
    <div className="not-prose relative my-8 flex gap-4 rounded-lg border border-[#E4D6C3] border-l-4 border-l-[#B37A4C] bg-white p-4 pb-6">
      {book.imageUrl && (
        <a href={book.url} target="_blank" rel={rel} className="shrink-0 self-start">
          {/* Amazonの書影。next/imageの外部ドメイン設定を避けるため素のimgを使う */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.imageUrl}
            alt={book.title}
            loading="lazy"
            className="h-32 w-auto rounded object-contain"
          />
        </a>
      )}
      <div className="min-w-0 flex-1">
        <a
          href={book.url}
          target="_blank"
          rel={rel}
          className="font-bold leading-snug text-[#B37A4C] hover:underline"
        >
          {book.title}
        </a>
        <dl className="mt-2 space-y-0.5 text-sm text-gray-600">
          {book.author && <div>{book.author}</div>}
          {book.publisher && <div>{book.publisher}</div>}
          {book.publicationDate && (
            <div>
              <span className="text-gray-400">発売日</span>　{book.publicationDate}
            </div>
          )}
          {typeof book.salesRank === "number" && (
            <div>
              <span className="text-gray-400">商品ランキング</span>
              {book.salesRank.toLocaleString("ja-JP")}位
            </div>
          )}
        </dl>
        <a
          href={book.url}
          target="_blank"
          rel={rel}
          className="mt-3 inline-flex items-center gap-1 rounded bg-[#FF9900] px-4 py-1.5 text-sm font-bold text-[#232F3E] hover:brightness-95"
        >
          Amazonで見る
        </a>
      </div>
      <p className="absolute bottom-2 right-3 text-xs text-gray-400">
        PR・Amazonアソシエイトのリンクです
      </p>
    </div>
  );
}
