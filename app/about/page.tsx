import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "chatlatteの運営者情報・このサイトについて。「エンジニアがいない会社の、最初のエンジニア」として、AI業務自動化・技術顧問・スポット開発を山形から全国オンラインで支援しています。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">運営者情報</h1>

      <div className="prose prose-gray max-w-none space-y-8 leading-relaxed text-gray-700">
        <p>
          当サイト「chatlatte（チャットラテ）」は、
          <strong>「エンジニアがいない会社の、最初のエンジニア」</strong>
          として、中小企業や個人事業のデジタル面を支える個人事業のサイトです。
          社内にITに詳しい人がいない現場で、業務の自動化やベンダーとのやり取り、
          仕組みづくりを「一杯目の相談」から伴走することを大切にしています。
        </p>

        <section>
          <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800">
            運営者情報
          </h2>
          <ul className="list-none space-y-2">
            <li>
              <span className="font-medium text-gray-800">屋号：</span>chatlatte
            </li>
            <li>
              <span className="font-medium text-gray-800">所在地：</span>
              山形県天童市
            </li>
            <li>
              <span className="font-medium text-gray-800">対応エリア：</span>
              全国（オンライン中心。必要に応じて対面）
            </li>
            <li>
              <span className="font-medium text-gray-800">事業内容：</span>
              AI業務自動化の設計・開発／技術顧問（テクニカルディレクション）／スポット開発・改善
            </li>
            <li>
              <span className="font-medium text-gray-800">お問い合わせ：</span>
              <Link href="/contact" className="text-[#B37A4C] hover:underline">
                お問い合わせフォーム
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800">
            運営者の経歴
          </h2>
          <p>
            エンジニア歴10年以上。うち5年はソーシャルゲーム運営会社でデータアナリストとして、
            KPI設計・SQL・BIツール活用による意思決定支援に従事しました。現在はテクニカルディレクターとして、
            DX推進・マーケティング基盤構築・業務効率化を支援しています。
            より詳しい経歴は
            <Link href="/author/chatlatte" className="text-[#B37A4C] hover:underline">
              著者プロフィール
            </Link>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800">
            発信について
          </h2>
          <p>
            <Link href="/blog" className="text-[#B37A4C] hover:underline">
              ブログ
            </Link>
            では、現場で実際に見たこと・考えたことを一次情報として書いています。
            日々の発信は X（
            <a
              href="https://x.com/chatrate0621"
              target="_blank"
              rel="noopener noreferrer me"
              className="text-[#B37A4C] hover:underline"
            >
              @chatrate0621
            </a>
            ）でも行っています。
          </p>
        </section>

        <section>
          <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800">
            関連ページ
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <Link href="/privacy-policy" className="text-[#B37A4C] hover:underline">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#B37A4C] hover:underline">
                利用規約
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#B37A4C] hover:underline">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
