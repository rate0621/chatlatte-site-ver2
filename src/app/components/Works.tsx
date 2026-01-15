import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { AlertCircle, Lightbulb, Trophy } from "lucide-react";

const works = [
  {
    title: "AIを活用した業務自動化",
    challenge: "コンテンツ制作に時間がかかりすぎている",
    solution: "生成AIを活用した自動化ツールを開発し、定型作業を効率化",
    achievement: "月150時間の工数削減",
    achievementLabel: "質を担保しつつ大量のコンテンツ生産に成功",
  },
  {
    title: "クリエイティブ制作の効率化",
    challenge: "画像素材の制作がボトルネックになっている",
    solution: "AIによる画像自動生成ツールを開発し、制作フローを短縮",
    achievement: "１時間/件の工数削減",
    achievementLabel: "制作コスト削減と公開スピード向上",
  },
  {
    title: "社内ツールによる運用改善",
    challenge: "手作業での更新作業が多く、ミスも発生しやすい",
    solution: "一括処理ツールを開発し、作業を標準化・自動化",
    achievement: "30分/件の工数削減",
    achievementLabel: "工数短縮、ヒューマンエラー削減",
  },
  {
    title: "LP制作の内製化支援",
    challenge: "LPを作るたびに外注コストと時間がかかる",
    solution: "テンプレート化と制作フローの整備で内製化を実現",
    achievement: "PDCAの回転数向上",
    achievementLabel: "制作リードタイム短縮、ABテストの実施",
  },
  {
    title: "セキュリティリスクへの対応",
    challenge: "技術的な脆弱性があるが、社内に対応できる人がいない",
    solution: "リスク調査から要件整理、社内提案、ベンダー調整まで一気通貫で対応",
    achievement: "リスク防止",
    achievementLabel: "情報漏えいリスクの未然防止、将来の拡張性確保",
  },
  {
    title: "クラウドコストの最適化",
    challenge: "AWSなどのクラウド費用が膨らんでいるが、整理できていない",
    solution: "不要リソースの棚卸しと除却を実施",
    achievement: "月10万円以上",
    achievementLabel: "コスト削減",
  },
];

export function Works() {
  return (
    <section id="works" className="py-24 px-6 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto">
        <p className="text-amber-600 font-medium tracking-wider text-sm mb-4 text-center">
          WORKS
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-16 text-center">
          解決してきた課題と成果
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:grid-rows-[repeat(2,_auto_auto_auto_auto)] lg:grid-rows-[repeat(2,_auto_auto_auto_auto)]">
          {works.map((work, index) => (
            <Card key={index} className="border-slate-200/80 bg-white hover:shadow-xl transition-all hover:border-amber-300 overflow-hidden rounded-2xl grid grid-rows-subgrid row-span-4">
              <CardHeader className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] pb-4">
                <CardTitle className="text-lg leading-snug text-white">
                  {work.title}
                </CardTitle>
              </CardHeader>

              {/* 課題 */}
              <div className="flex gap-2 px-6">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-rose-500">課題</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {work.challenge}
                  </p>
                </div>
              </div>

              {/* 解決 */}
              <div className="flex gap-2 px-6">
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-amber-500">解決</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {work.solution}
                  </p>
                </div>
              </div>

              {/* 成果 */}
              <div className="flex gap-2 px-6 pb-6">
                <Trophy className="w-4 h-4 text-[#1e3a5f] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-[#1e3a5f]">成果</div>
                  <div className="text-xl font-bold text-[#1e3a5f] mb-1">
                    {work.achievement}
                  </div>
                  <div className="text-sm text-slate-500">
                    {work.achievementLabel}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
