import { Card, CardContent } from "@/app/components/ui/card";
import { Users, TrendingUp, Heart, Scale, Sparkles, Handshake, UserPlus, Puzzle } from "lucide-react";

const topStrengths = [
  {
    rank: 1,
    name: "個別化",
    description: "一人ひとりの強みや特性を見極め、最適な関わり方を考えます",
    icon: Users,
  },
  {
    rank: 2,
    name: "成長促進",
    description: "相手の可能性を見出し、小さな成長も見逃さず後押しします",
    icon: TrendingUp,
  },
  {
    rank: 3,
    name: "親密性",
    description: "広く浅くより、深い信頼関係を築くことを大切にします",
    icon: Heart,
  },
  {
    rank: 4,
    name: "調和性",
    description: "対立を避け、共通点を見つけて現実的な解決へ導きます",
    icon: Scale,
  },
  {
    rank: 5,
    name: "ポジティブ",
    description: "前向きなエネルギーで周囲を明るくします",
    icon: Sparkles,
  },
];

const applications = [
  {
    title: "クライアントワーク",
    tags: ["個別化", "親密性"],
    description: "お客様ごとの状況や課題を深く理解し、本当に必要なものを一緒に見極めます",
    icon: Handshake,
  },
  {
    title: "チーム支援",
    tags: ["成長促進", "ポジティブ"],
    description: "メンバーの得意を活かした役割分担と、前向きな雰囲気づくりを心がけています",
    icon: UserPlus,
  },
  {
    title: "プロジェクト推進",
    tags: ["調和性", "アレンジ"],
    description: "関係者の意見を調整しながら、リソースを最適に組み合わせて進めます",
    icon: Puzzle,
  },
];

export function Strengths() {
  return (
    <section id="strengths" className="py-24 px-6 bg-[#f0f9f7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-8 text-center">
          私の特性
        </h2>

        {/* リード文 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[#6b7280] leading-relaxed mb-4">
            ストレングスファインダー®の診断結果から見える、私が自然と力を発揮できる領域です。
          </p>
          <p className="text-[#6b7280] leading-relaxed">
            34の資質のうち、上位10個中8つが<span className="marker-highlight font-semibold text-[#4a5568]">「人間関係構築力」</span>の領域。
            <br className="hidden md:inline" />
            技術者でありながら、人との関わりを通じて価値を生み出すタイプです。
          </p>
        </div>

        {/* TOP5 資質 */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-[#4a5568] mb-6 text-center">TOP 5</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topStrengths.map((strength) => {
              const Icon = strength.icon;
              return (
                <Card
                  key={strength.rank}
                  className="bg-white border-[#e0eeec] hover:shadow-lg hover:border-[#5BBFB3]/30 transition-all rounded-2xl"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-[#5BBFB3] text-white flex items-center justify-center text-sm font-bold mb-3">
                        {strength.rank}
                      </div>
                      <div className="p-3 bg-[#e8f5f3] rounded-xl mb-3">
                        <Icon className="w-6 h-6 text-[#5BBFB3]" />
                      </div>
                      <h4 className="font-semibold text-[#4a5568] mb-2">{strength.name}</h4>
                      <p className="text-sm text-[#6b7280]">{strength.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 仕事での活かし方 */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-[#4a5568] mb-6 text-center">仕事での活かし方</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map((app, index) => {
              const Icon = app.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border-[#e0eeec] hover:shadow-lg hover:border-[#5BBFB3]/30 transition-all rounded-2xl"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-[#e8f5f3] rounded-xl mb-4">
                        <Icon className="w-6 h-6 text-[#5BBFB3]" />
                      </div>
                      <h4 className="font-semibold text-[#4a5568] mb-2">{app.title}</h4>
                      <div className="flex flex-wrap gap-2 justify-center mb-3">
                        {app.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-[#e8f5f3] text-[#5BBFB3] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-[#6b7280]">{app.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 締めの一文 */}
        <p className="text-center text-[#6b7280] mb-8">
          「技術に固執しない」という私のスタンスは、この人間関係構築力に支えられています。
        </p>

        {/* フッター注釈 */}
        <p className="text-center text-xs text-[#9ca3af]">
          ※ CliftonStrengths®はGallup, Inc.の登録商標です
        </p>
      </div>
    </section>
  );
}
