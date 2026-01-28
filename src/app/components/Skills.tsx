import { Code, Server, BarChart3, Sparkles } from "lucide-react";

const skillAreas = [
  {
    icon: Code,
    title: "開発",
    description: "言語を問わず、課題に合わせて最適な技術を選定。ツール開発からWebアプリまで対応。",
  },
  {
    icon: Server,
    title: "インフラ構築・運用",
    description: "AWSなどクラウド環境の構築・管理・コスト最適化。サーバ運用の自動化も。",
  },
  {
    icon: BarChart3,
    title: "マーケティング基盤",
    description: "GTM / GA4 の設計・実装、MAツール連携、データ抽出・分析まで。",
  },
  {
    icon: Sparkles,
    title: "AI活用・マネジメント",
    description: "生成AIを活用したツール開発。プロジェクト推進やPdMとしての経験も。",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#f7fafa]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-16 text-center">
          スキルセット
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-[#e0eeec] hover:shadow-md hover:border-[#5BBFB3]/30 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-[#e8f5f3] rounded-xl">
                    <Icon className="w-6 h-6 text-[#5BBFB3]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#4a5568] mb-2">
                    {area.title}
                  </h3>
                  <p className="text-[#6b7280] leading-relaxed">
                    {area.description}
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
