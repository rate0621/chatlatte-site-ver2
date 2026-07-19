import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">プライバシーポリシー</h1>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
        <p>
          chatlatte（以下「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">運営者情報</h2>
          <ul className="list-none space-y-2">
            <li><span className="font-medium text-gray-800">運営：</span>chatlatte</li>
            <li><span className="font-medium text-gray-800">所在地：</span>山形県</li>
            <li><span className="font-medium text-gray-800">お問い合わせ：</span><Link href="/contact" className="text-[#B37A4C] hover:underline">お問い合わせフォーム</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. 個人情報の収集について</h2>
          <p>
            当サイトでは、お問い合わせフォームをご利用いただく際に、お名前・メールアドレスなどの個人情報をご提供いただく場合があります。これらの情報は、お問い合わせへの回答やご連絡のために利用し、それ以外の目的では使用いたしません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. 個人情報の第三者への提供</h2>
          <p>
            当サイトでは、収集した個人情報を、以下の場合を除き第三者に提供することはありません。
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>ご本人の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命・身体または財産の保護のために必要な場合</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。Googleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p className="mt-3">
            この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。Googleアナリティクスの利用規約については、
            <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-[#B37A4C] hover:underline">Google アナリティクス利用規約</a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. 広告について</h2>
          <p>
            当サイトでは、第三者配信の広告サービス「Google Adsense」を利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
          </p>
          <p className="mt-3">
            Cookieを無効にする設定やGoogleアドセンスに関する詳細は、
            <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-[#B37A4C] hover:underline">広告 - ポリシーと規約 - Google</a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. 免責事項</h2>
          <p>
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。また、当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報やサービス等について一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. プライバシーポリシーの変更</h2>
          <p>
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. お問い合わせ</h2>
          <p>
            当サイトの個人情報の取り扱いに関するお問い合わせは、
            <Link href="/contact" className="text-[#B37A4C] hover:underline">お問い合わせフォーム</Link>
            よりご連絡ください。
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-12">制定日：2026年2月22日</p>
      </div>
    </main>
  );
}
