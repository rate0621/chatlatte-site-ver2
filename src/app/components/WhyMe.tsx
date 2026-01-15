import { MessageCircle, Target, RefreshCw, Handshake } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

const reasons = [
  {
    icon: MessageCircle,
    title: "非エンジニア組織でも話が通じる",
    description:
      "専門用語を使わず、誰にでもわかる言葉で伝えます。「小難しいことを言う人種」ではなく、課題解決のパートナーとして伴走します。",
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
    <section id="why-me" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">
          Why Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="border-slate-200 hover:shadow-xl transition-all text-center rounded-2xl hover:border-blue-200">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-50 rounded-full">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-snug">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
