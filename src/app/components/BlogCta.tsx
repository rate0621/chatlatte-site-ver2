import Link from "next/link";

export function BlogCta() {
  return (
    <section className="mt-16 rounded-3xl bg-[#33261C] px-8 py-12 text-center md:px-12">
      <h2 className="font-display mb-4 text-xl font-bold leading-relaxed text-[#F6F1E8] md:text-2xl">
        読んでいて「ちょっと聞いてみたいかも」が生まれたら
      </h2>
      <p className="mb-8 text-sm leading-loose text-[#C9B7A4]">
        エンジニアがいない会社の、「最初のエンジニア」をやっています。
        <br className="hidden md:block" />
        課題が曖昧なままで大丈夫です。売り込みはしません。
      </p>
      <Link
        href="/#contact"
        className="inline-block rounded-full bg-[#B37A4C] px-8 py-3.5 font-bold text-[#FFFDF9] transition-colors hover:bg-[#9A6238]"
      >
        コーヒー1杯分、話しませんか（30分・無料）
      </Link>
    </section>
  );
}
