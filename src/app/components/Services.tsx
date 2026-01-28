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
      "他社開発サイトの引き継ぎ・保守対応",
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
    <section id="services" className="py-24 px-6 bg-[#f7fafa]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-16 text-center">
          できること
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="bg-white border-[#e0eeec] hover:shadow-lg hover:border-[#5BBFB3]/30 transition-all rounded-2xl">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-[#e8f5f3] rounded-xl">
                      <Icon className="w-6 h-6 text-[#5BBFB3]" />
                    </div>
                    <CardTitle className="text-xl text-[#4a5568]">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-[#6b7280]">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#5BBFB3] mt-1">•</span>
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
