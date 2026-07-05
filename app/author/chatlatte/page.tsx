import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "著者プロフィール：chatlatte",
  description:
    "chatlatte（屋号）の著者プロフィール。エンジニア歴10年以上、ソーシャルゲーム会社でのデータアナリスト経験5年を経て、現在はテクニカルディレクターとしてDX推進・マーケティング基盤構築・業務効率化を支援。",
  alternates: {
    canonical: "/author/chatlatte",
  },
  openGraph: {
    title: "著者プロフィール：chatlatte",
    description:
      "エンジニア歴10年以上、ソーシャルゲーム業界のデータアナリスト経験を持つテクニカルディレクター。",
    type: "profile",
    url: "https://www.chatlatte.com/author/chatlatte",
  },
};

const career = [
  {
    period: "2010年〜",
    role: "システム開発・インフラ構築",
    description:
      "Web アプリケーション開発、AWS を中心としたクラウドインフラ構築・運用を担当。",
  },
  {
    period: "2013年〜2018年",
    role: "ソーシャルゲーム会社 データアナリスト",
    description:
      "5年間ソーシャルゲーム運営会社でデータアナリストとして従事。KPI設計、SQL によるデータ抽出・分析、BI ツールでの可視化、経営層向けレポーティング、施策効果検証を担当。",
  },
  {
    period: "2018年〜",
    role: "PdM / テクニカルディレクター",
    description:
      "プロダクトマネジメント、テクニカルディレクションの役割を担当。エンジニアリングと事業サイドの橋渡しを行う。",
  },
  {
    period: "現在",
    role: "フリーランス（屋号：chatlatte）",
    description:
      "山形県を拠点に、DX推進・マーケティング基盤構築・業務効率化の技術支援を提供。",
  },
];

const expertise = [
  {
    title: "データ分析・可視化",
    items: ["KPI 設計", "SQL（複雑なデータ抽出・集計）", "BI ツール（Redash / Looker Studio 等）", "GA4 / GTM 設計・実装"],
  },
  {
    title: "開発・インフラ",
    items: ["Web アプリケーション開発", "AWS クラウド構築・運用", "業務効率化ツール開発", "AI（生成AI）を活用した自動化"],
  },
  {
    title: "マネジメント",
    items: ["プロダクトマネジメント（PdM）", "テクニカルディレクション", "要件定義・プロジェクト推進", "エンジニアがいない組織での技術支援"],
  },
];

export default function AuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "chatlatte",
      alternateName: "chatlatte（屋号）",
      url: "https://www.chatlatte.com/author/chatlatte",
      image: "https://www.chatlatte.com/chatlatte_logo.png",
      jobTitle: "テクニカルディレクター / フリーランス",
      description:
        "エンジニア歴10年以上。うち5年はソーシャルゲーム会社でデータアナリスト。現在は山形県を拠点にDX推進・マーケティング基盤構築・業務効率化を支援。",
      knowsAbout: [
        "データ分析",
        "SQL",
        "GA4",
        "Google Tag Manager",
        "プロダクトマネジメント",
        "テクニカルディレクション",
        "AWS",
        "業務効率化",
        "生成AI活用",
      ],
      sameAs: ["https://x.com/chatrate0621"],
      address: {
        "@type": "PostalAddress",
        addressRegion: "山形県",
        addressCountry: "JP",
      },
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-12 text-center">
        <img
          src="/chatlatte_logo.png"
          alt="chatlatte"
          className="w-28 h-28 mx-auto rounded-full bg-white border border-gray-200 p-4 object-contain mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">chatlatte</h1>
        <p className="text-sm text-gray-500 mb-4">
          テクニカルディレクター / フリーランス（屋号：chatlatte）
        </p>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
          山形県を拠点に、DX推進・マーケティング基盤構築・業務効率化の技術支援を提供しています。
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          自己紹介
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            エンジニア歴10年以上。うち5年はソーシャルゲーム運営会社でデータアナリストとして従事し、KPI設計・SQLによるデータ抽出・BIツールでの可視化・経営層向けレポーティング・施策の効果検証まで、データを軸とした意思決定支援を担当してきました。
          </p>
          <p>
            システム開発 → インフラ構築 → データアナリスト → PdM → テクニカルディレクターと、キャリアの中で求められる役割に応じてスキルを拡張してきました。私の強みは
            <span className="font-semibold text-gray-800">「技術に固執しないこと」</span>
            。組織が本当に必要としているものを見極め、その場で調査・学習しながら課題解決を推進します。
          </p>
          <p>
            特に「エンジニアがいない／足りない組織」で、GTM・GA・SQL・AIツールなどを活用した業務改善・自動化を得意としています。
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          経歴
        </h2>
        <ol className="space-y-6">
          {career.map((item, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-28 text-sm text-gray-500 pt-1">
                {item.period}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{item.role}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          専門領域
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {expertise.map((area, i) => (
            <div
              key={i}
              className="bg-[#FAF6EF] rounded-lg p-5 border border-[#E4D6C3]"
            >
              <h3 className="font-bold text-gray-800 mb-3">{area.title}</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {area.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-[#B37A4C] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          お問い合わせ・SNS
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <Link href="/#contact" className="text-[#B37A4C] hover:underline">
              お問い合わせフォーム
            </Link>
          </li>
          <li>
            <a
              href="https://x.com/chatrate0621"
              target="_blank"
              rel="noopener noreferrer me"
              className="text-[#B37A4C] hover:underline"
            >
              X（@chatrate0621）
            </a>
          </li>
          <li>
            <Link href="/blog" className="text-[#B37A4C] hover:underline">
              ブログ記事一覧
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-12 text-center">
        <Link href="/blog" className="text-[#B37A4C] hover:underline text-sm">
          &larr; ブログ一覧に戻る
        </Link>
      </div>
    </main>
  );
}
