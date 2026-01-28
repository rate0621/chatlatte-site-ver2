import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/components/ui/hover-card";
import { AlertCircle, Lightbulb, Trophy, Info } from "lucide-react";

const works = [
  {
    title: "AIを活用した業務自動化",
    challenge: "コンテンツ制作に時間がかかりすぎている",
    solution: "生成AIを活用した自動化ツールを開発し、定型作業を効率化",
    achievement: "月150時間の工数削減",
    achievementLabel: "質を担保しつつ大量のコンテンツ生産に成功",
    details: "社内にあるコンテンツを元に記事を生成→内容を確認→CMSへの入稿。までをワンクリックで行える管理ツールの開発", // ここに詳細テキストを追加
  },
  {
    title: "クリエイティブ制作の効率化",
    challenge: "画像素材の制作がボトルネックになっている",
    solution: "AIによる画像自動生成ツールを開発し、制作フローを短縮",
    achievement: "１時間/件の工数削減",
    achievementLabel: "制作コスト削減と公開スピード向上",
    details: "記事のタイトルとディスクリプションを元にサムネイルを一括で生成→CMSへの入稿までをワンクリックで行える機能の実装", // ここに詳細テキストを追加
  },
  {
    title: "社内ツールによる運用改善",
    challenge: "手作業での更新作業が多く、ミスも発生しやすい",
    solution: "一括処理ツールを開発し、作業を標準化・自動化",
    achievement: "30分/件の工数削減",
    achievementLabel: "工数短縮、ヒューマンエラー削減",
    details: "CMSやDBなどへの入稿をバッチ処理で完結", // ここに詳細テキストを追加
  },
  {
    title: "LP制作の内製化支援",
    challenge: "LPを作るたびに外注コストと時間がかかる",
    solution: "テンプレート化と制作フローの整備で内製化を実現",
    achievement: "PDCAの回転数向上",
    achievementLabel: "制作リードタイム短縮、ABテストの実施",
    details: "HTMLとCSSだけでテンプレートとなるページを作成し、デザイナーのほうで自由にLPを量産できるように。", // ここに詳細テキストを追加
  },
  {
    title: "セキュリティリスクへの対応",
    challenge: "技術的な脆弱性があるが、社内に対応できる人がいない",
    solution: "リスク調査から要件整理、社内提案、ベンダー調整まで一気通貫で対応",
    achievement: "リスク防止",
    achievementLabel: "情報漏えいリスクの未然防止、将来の拡張性確保",
    details: "APIキーの漏洩、実装上のセキュリティリスクの検知", // ここに詳細テキストを追加
  },
  {
    title: "クラウドコストの最適化",
    challenge: "AWSなどのクラウド費用が膨らんでいるが、整理できていない",
    solution: "不要リソースの棚卸しと除却を実施",
    achievement: "月10万円以上",
    achievementLabel: "コスト削減",
    details: "使っていない環境があるが誰もAWSを触れないため放置されていた環境を引き継ぎいざというときのバックアップなども行ったうえで環境の除却", // ここに詳細テキストを追加
  },
];

export function Works() {
  return (
    <section id="works" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-16 text-center">
          解決してきた課題と成果
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:grid-rows-[repeat(2,_auto_auto_auto_auto)] lg:grid-rows-[repeat(2,_auto_auto_auto_auto)]">
          {works.map((work, index) => (
            <HoverCard key={index} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="grid grid-rows-subgrid row-span-4">
                  <Card className="border-[#e0eeec] bg-white hover:shadow-lg hover:border-[#5BBFB3]/30 transition-all overflow-hidden rounded-2xl grid grid-rows-subgrid row-span-4 cursor-pointer">
                  <CardHeader className="bg-gradient-to-br from-[#f7fafa] to-[#e8f5f3] pb-4">
                    <CardTitle className="text-lg leading-snug text-[#4a5568] flex items-start justify-between gap-2">
                      <span>{work.title}</span>
                      {work.details && (
                        <Info className="w-4 h-4 text-[#5BBFB3] flex-shrink-0 mt-0.5" />
                      )}
                    </CardTitle>
                  </CardHeader>

                  {/* 課題 */}
                  <div className="flex gap-2 px-6">
                    <AlertCircle className="w-4 h-4 text-[#e0a9a9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-[#d09999]">課題</div>
                      <p className="text-[#6b7280] text-sm leading-relaxed">
                        {work.challenge}
                      </p>
                    </div>
                  </div>

                  {/* 解決 */}
                  <div className="flex gap-2 px-6">
                    <Lightbulb className="w-4 h-4 text-[#5BBFB3] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-[#5BBFB3]">解決</div>
                      <p className="text-[#6b7280] text-sm leading-relaxed">
                        {work.solution}
                      </p>
                    </div>
                  </div>

                  {/* 成果 */}
                  <div className="flex gap-2 px-6 pb-6">
                    <Trophy className="w-4 h-4 text-[#4a5568] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-[#4a5568]">成果</div>
                      <div className="text-xl font-bold text-[#4a5568] mb-1">
                        {work.achievement}
                      </div>
                      <div className="text-sm text-[#9ca3af]">
                        {work.achievementLabel}
                      </div>
                    </div>
                  </div>
                </Card>
                </div>
              </HoverCardTrigger>
              {work.details && (
                <HoverCardContent className="w-80 bg-white border-[#e0eeec] shadow-lg">
                  <p className="text-sm text-[#6b7280] leading-relaxed whitespace-pre-wrap">
                    {work.details}
                  </p>
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
