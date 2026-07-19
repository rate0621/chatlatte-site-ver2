import type { Metadata } from "next";
import { Contact } from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "chatlatteへのお問い合わせ・30分の無料相談はこちらから。AI業務自動化、ベンダー見積もりの相談、技術顧問など、課題が曖昧なままでも大丈夫です。1営業日以内に返信します。",
};

export default function ContactPage() {
  return (
    <main>
      <div className="mx-auto max-w-2xl px-6 pt-16">
        <h1 className="font-display text-center text-3xl font-bold tracking-wide text-[#33261C]">
          お問い合わせ
        </h1>
        <p className="mt-4 text-center leading-loose text-[#6E5B4A]">
          お仕事のご相談・ご質問はこちらのフォームからどうぞ。売り込みはしませんので、
          「まだ相談するほどでもないかも」という段階でも気軽にご連絡ください。
        </p>
      </div>
      <Contact />
    </main>
  );
}
