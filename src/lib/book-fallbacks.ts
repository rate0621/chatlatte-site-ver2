// 書籍カードの自前フォールバックデータ（ASIN → 表示情報）。
// Creators API が使えない間（AssociateNotEligible 等）はこの値でカードを描画し、
// API が使えるようになれば API 側の値（発売日・ランキング等）で自動的に補完される。
// 記事で新しい本を紹介したら、ここに 1 エントリ追記する（book-interview スキルの手順に含む）。
export type BookFallback = {
  readonly title: string;
  readonly author?: string;
  readonly publisher?: string;
  readonly imageUrl?: string; // microCMSメディアにアップした書影URL
  readonly url: string; // amazon.txt のアフィリンク
};

export const BOOK_FALLBACKS: Record<string, BookFallback> = {
  // GIVE & TAKE（アダム・グラント）
  "4837957463": {
    title: "GIVE & TAKE 「与える人」こそ成功する時代",
    author: "アダム・グラント",
    publisher: "三笠書房",
    imageUrl:
      "https://images.microcms-assets.io/assets/8134d092733d41bca2593ee72c2de00b/3d956a50074246b38afd0b9dadf1ae81/cover.png",
    url: "https://amzn.to/3OGAn9D",
  },
};
