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
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-blue-50 to-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">
          Skills
        </h2>
        
        <div className="space-y-10">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-base bg-white border border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 transition-colors rounded-full shadow-sm"
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