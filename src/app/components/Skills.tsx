import { Badge } from "@/app/components/ui/badge";

const skillCategories = [
  {
    category: "言語・フレームワーク",
    skills: ["Python", "PHP", "Perl", "JavaScript", "SQL"],
  },
  {
    category: "インフラ・クラウド",
    skills: ["AWS", "Vercel", "サーバ構築・自動化"],
  },
  {
    category: "マーケティング・分析",
    skills: ["Google Tag Manager", "GA4", "Karte", "HubSpot", "データ抽出・分析"],
  },
  {
    category: "その他",
    skills: ["AI活用（GPT系ツール開発）", "プロジェクトマネジメント", "PdM"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#f7fafa]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-16 text-center">
          スキルセット
        </h2>

        <div className="space-y-10">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-[#4a5568]">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-base bg-white border border-[#e0eeec] text-[#6b7280] hover:bg-[#e8f5f3] hover:border-[#5BBFB3]/30 transition-colors rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
