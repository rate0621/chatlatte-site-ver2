import { MessageCircle, Target, RefreshCw, Handshake } from "lucide-react";

const reasons = [
  {
    icon: MessageCircle,
    title: "非エンジニア組織でも話が通じる",
    description:
      "専門用語を使わず、誰にでもわかる言葉で伝えます。「エンジニア＝小難しいことを言う人」ではなく、課題解決のパートナーとして伴走します。",
  },
  {
    icon: Target,
    title: "技術だけでなく「何が必要か」から考える",
    description:
      "組織に本当に必要なものを見極め、技術に固執せず最適な解決策を提案・実行します。",
  },
  {
    icon: RefreshCw,
    title: "調査から実装まで一気通貫",
    description:
      "「何が問題かわからない」状態からでも大丈夫。課題の整理、解決策の提案、実装、運用まで一人で対応できます。",
  },
  {
    icon: Handshake,
    title: "「課題が曖昧」でも大丈夫",
    description:
      "何を頼めばいいかわからない段階でもOK。話を聞きながら、一緒に課題を整理するところから始められます。",
  },
];

export function WhyMe() {
  return (
    <section id="why-me" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-16 text-center">
          選ばれる理由（多分)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-[#e8f5f3] rounded-2xl">
                    <Icon className="w-7 h-7 text-[#5BBFB3]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#4a5568] mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-[#6b7280] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
