import { Coffee, Search, Rocket } from "lucide-react";

const steps = [
  {
    icon: Coffee,
    cup: "一杯目",
    title: "無料相談（30分・オンライン）",
    description:
      "いまの状況を、そのまま聞かせてください。資料も要件もいりません。その場で「まず何をすべきか」の方向性までお話しします。売り込みはしません。",
  },
  {
    icon: Search,
    cup: "二杯目",
    title: "調査とご提案",
    description:
      "課題を調査し、取れる選択肢を専門用語なしでご提案します。費用の目安もこの段階で明示するので、社内での検討にそのまま使えます。",
  },
  {
    icon: Rocket,
    cup: "三杯目から",
    title: "実装・伴走",
    description:
      "スポットで作り切るか、顧問として継続的に伴走するか。会社の状況に合わせて決めましょう。途中でやめるのも自由です。",
  },
] as const;

const engagements = [
  {
    title: "技術顧問",
    type: "月額・継続",
    description:
      "「いつでも聞ける相手がいる」状態をつくる契約。相談、ベンダー調整、マーケ基盤やセキュリティの面倒まで。",
  },
  {
    title: "スポット開発",
    type: "単発",
    description:
      "AI自動化ツールや社内システムなど、決まった課題を作り切る契約。調査から実装まで一人で完結します。",
  },
  {
    title: "まずは相談だけ",
    type: "無料",
    description:
      "契約の前に、30分話すだけでも構いません。「頼むほどのことか分からない」の判定からどうぞ。",
  },
] as const;

export function Process() {
  return (
    <section id="process" className="bg-[#F6F1E8] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display mb-4 text-center text-2xl font-bold tracking-wide text-[#33261C] md:text-3xl">
          進め方は、コーヒー3杯分
        </h2>
        <p className="mb-14 text-center leading-relaxed text-[#6E5B4A]">
          最初の一杯は、こちらのおごりです。
        </p>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.cup}
                className="rounded-3xl border-2 border-[#E4D6C3] bg-[#FFFDF9] p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-[#B37A4C]/15 p-3">
                    <Icon className="h-6 w-6 text-[#B37A4C]" />
                  </div>
                  <span className="font-display text-sm font-bold tracking-wider text-[#B37A4C]">
                    {step.cup}
                  </span>
                </div>
                <h3 className="font-display mb-3 text-lg font-bold leading-snug text-[#33261C]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6E5B4A]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <h3 className="font-display mb-8 text-center text-xl font-bold text-[#33261C]">
          関わり方は3つ
        </h3>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {engagements.map((engagement) => (
            <div
              key={engagement.title}
              className="rounded-3xl bg-[#FFFDF9] border-2 border-[#E4D6C3] p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h4 className="font-display text-lg font-bold text-[#33261C]">
                  {engagement.title}
                </h4>
                <span className="rounded-full bg-[#F1E7D8] px-3 py-1 text-xs font-bold text-[#9A6238]">
                  {engagement.type}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#6E5B4A]">
                {engagement.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm leading-loose text-[#8A7461]">
          費用は課題の規模によって変わるため、無料相談の際に目安をお伝えします。
          <br className="hidden md:block" />
          予算が合わない場合は、その範囲でできることを一緒に考えます。
        </p>
      </div>
    </section>
  );
}
