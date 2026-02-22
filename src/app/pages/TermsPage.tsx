import { Link } from "react-router-dom";

export function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">利用規約</h1>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
        <p>
          この利用規約（以下「本規約」）は、chatlatte（以下「当サイト」）の利用条件を定めるものです。当サイトをご利用いただくすべての方（以下「ユーザー」）に本規約が適用されます。
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. 本規約への同意</h2>
          <p>
            ユーザーは、当サイトを利用することにより、本規約に同意したものとみなされます。本規約に同意いただけない場合は、当サイトのご利用をお控えください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. サービス内容</h2>
          <p>
            当サイトは、DX推進・マーケティング支援・業務効率化に関する情報発信およびサービス紹介を行うWebサイトです。掲載内容は予告なく変更・削除される場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. 禁止事項</h2>
          <p>当サイトの利用にあたり、以下の行為を禁止します。</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>法令または公序良俗に違反する行為</li>
            <li>当サイトのコンテンツを無断で複製・転載・改変する行為</li>
            <li>当サイトの運営を妨害する行為</li>
            <li>他のユーザーまたは第三者に不利益や損害を与える行為</li>
            <li>不正アクセスやそれに類する行為</li>
            <li>その他、当サイト運営者が不適切と判断する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. 著作権・知的財産権</h2>
          <p>
            当サイトに掲載されているテキスト、画像、デザイン、ロゴ等のコンテンツに関する著作権・知的財産権は、当サイト運営者または正当な権利を有する第三者に帰属します。無断での使用・複製・転載を禁じます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. 免責事項</h2>
          <p>
            当サイトに掲載された情報の正確性・完全性・有用性について、当サイト運営者は保証いたしません。当サイトの利用により生じた損害について、当サイト運営者は一切の責任を負いません。
          </p>
          <p className="mt-3">
            当サイトから外部サイトへのリンクが含まれている場合がありますが、リンク先の内容について当サイト運営者は責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. 本規約の変更</h2>
          <p>
            当サイト運営者は、必要に応じて本規約を変更することがあります。変更後の利用規約は、当サイト上に掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. 準拠法・管轄裁判所</h2>
          <p>
            本規約の解釈にあたっては日本法を準拠法とします。当サイトに関して紛争が生じた場合には、当サイト運営者の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">8. お問い合わせ</h2>
          <p>
            本規約に関するお問い合わせは、
            <Link to="/#contact" className="text-[#5BBFB3] hover:underline">お問い合わせフォーム</Link>
            よりご連絡ください。
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-12">制定日：2026年2月22日</p>
      </div>
    </main>
  );
}
