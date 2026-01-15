import { Settings, BarChart3, Globe, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

const services = [
  {
    icon: Settings,
    title: "業務効率化ツール開発",
    items: [
      "AI活用による自動化（コンテンツ生成、画像生成など）",
      "社内業務のボトルネック特定と解消",
      "月150時間以上の工数削減",
    ],
  },
  {
    icon: BarChart3,
    title: "マーケティング基盤の技術支援",
    items: [
      "GTM/GA4の設計・実装・整理",
      "計測要件の整理とタグ管理",
      "Karte、HubSpotなどMAツール連携",
    ],
  },
  {
    icon: Globe,
    title: "Webサイト運用・改善",
    items: [
      "LP制作（設計〜コーディング〜公開）",
      "サイトのテクニカルディレクション",
      "セキュリティリスク対応・構成改善",
    ],
  },
  {
    icon: DollarSign,
    title: "コスト最適化",
    items: [
      "AWSなどクラウドリソースの棚卸し・除却",
      "不要コストの可視化と削減提案",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[#1e3a5f] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <p className="text-amber-400 font-medium tracking-wider text-sm mb-4 text-center">
          SERVICES
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16 text-center">
          できること
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all rounded-2xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-amber-400/20 rounded-xl">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-200">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
