import { Sparkles, MessageCircle, Wrench } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "AI業務自動化",
    badge: "いちばん相談が多い仕事",
    description:
      "毎月の手作業や定型業務を、生成AIを使ったツールで自動化します。月150時間の工数削減を実現した実績があります。",
    items: [
      "生成AIを使った業務ツールの開発",
      "コンテンツ制作・画像制作の自動化",
      "業務のボトルネック調査と解消",
    ],
  },
  {
    icon: MessageCircle,
    title: "技術顧問",
    badge: null,
    description:
      "「聞ける人がいない」をなくす、継続的な相談相手です。判断材料をそろえるだけでなく、軽微な作業ならその場で手を動かします。",
    items: [
      "ベンダー見積もりの妥当性チェック（「なぜこの金額？」に答えます）",
      "テキスト修正・バナー差し替えなど、外注するほどでもない作業の巻き取り",
      "GTM / GA4などマーケティング基盤の整備",
      "セキュリティリスクの確認と対応",
      "クラウド費用など技術コストの健全化",
    ],
  },
  {
    icon: Wrench,
    title: "スポット開発・改善",
    badge: null,
    description:
      "必要なところだけ、必要なぶんだけ。単発のご依頼も、そのまま作り切るところまで対応します。",
    items: [
      "社内向けツール・Webアプリの開発",
      "LP制作と内製化の仕組みづくり",
      "他社が作ったサイト・システムの引き継ぎと保守",
    ],
  },
] as const;

export function Services() {
  return (
    <section id="services" className="bg-[#FFFDF9] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display mb-4 text-center text-2xl font-bold tracking-wide text-[#33261C] md:text-3xl">
          頼めること
        </h2>
        <p className="mb-14 text-center leading-relaxed text-[#6E5B4A]">
          この3つに当てはまらなくても大丈夫。「どれに当てはまるか分からない」も、よくある相談です。
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex flex-col rounded-3xl border-2 border-[#E4D6C3] bg-[#F6F1E8] p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-2xl bg-[#B37A4C]/15 p-3">
                    <Icon className="h-6 w-6 text-[#B37A4C]" />
                  </div>
                  {service.badge && (
                    <span className="rounded-full bg-[#B37A4C] px-3 py-1 text-xs font-bold text-[#FFFDF9]">
                      {service.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display mb-3 text-xl font-bold text-[#33261C]">
                  {service.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-[#6E5B4A]">
                  {service.description}
                </p>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-[#6E5B4A]"
                    >
                      <span className="mt-0.5 text-[#B37A4C]">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
