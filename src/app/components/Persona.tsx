import { MapPin } from "lucide-react";

interface Strength {
  readonly rank: number;
  readonly name: string;
  /** 人間関係構築力の領域かどうか */
  readonly relationship: boolean;
  readonly domain?: string;
}

const strengthsTop10: readonly Strength[] = [
  { rank: 1, name: "個別化", relationship: true },
  { rank: 2, name: "成長促進", relationship: true },
  { rank: 3, name: "親密性", relationship: true },
  { rank: 4, name: "調和性", relationship: true },
  { rank: 5, name: "ポジティブ", relationship: true },
  { rank: 6, name: "最上志向", relationship: false, domain: "影響力" },
  { rank: 7, name: "共感性", relationship: true },
  { rank: 8, name: "適応性", relationship: true },
  { rank: 9, name: "運命思考", relationship: true },
  { rank: 10, name: "アレンジ", relationship: false, domain: "実行力" },
];

const career = [
  "システム開発",
  "インフラ構築",
  "データアナリスト",
  "PdM",
  "テクニカルディレクター",
] as const;

export function Persona() {
  return (
    <section id="persona" className="bg-[#FFFDF9] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display mb-14 text-center text-2xl font-bold tracking-wide text-[#33261C] md:text-3xl">
          相談に乗るのは、こんな人
        </h2>

        <div className="mb-10 flex items-center justify-center gap-2 text-[#6E5B4A]">
          <MapPin className="h-4 w-4 text-[#B37A4C]" />
          <p className="text-sm">
            山形県天童市から、全国の会社を支援しています（打ち合わせはオンライン）
          </p>
        </div>

        <div className="mb-10 rounded-3xl border-2 border-[#E4D6C3] bg-[#F6F1E8] p-7 md:p-9">
          <h3 className="font-display mb-4 text-lg font-bold text-[#33261C]">
            10年間、ずっと「足りない役割」をやってきました
          </h3>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {career.map((role, index) => (
              <span key={role} className="flex items-center gap-2">
                <span className="rounded-full bg-[#FFFDF9] border border-[#E4D6C3] px-4 py-1.5 text-sm font-medium text-[#33261C]">
                  {role}
                </span>
                {index < career.length - 1 && (
                  <span aria-hidden="true" className="text-[#B37A4C]">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="leading-loose text-[#6E5B4A]">
            エンジニア歴10年。組織で「いま求められている役割」に合わせてスキルを広げてきた結果、
            開発からインフラ、データ分析、プロダクトマネジメントまで一人で回せるようになりました。
            調査から実装まで一気通貫でお任せいただけるのは、この経歴のおかげです。
          </p>
        </div>

        <div className="mb-10 rounded-3xl border-2 border-[#E4D6C3] bg-[#F6F1E8] p-7 md:p-9">
          <h3 className="font-display mb-4 text-lg font-bold text-[#33261C]">
            信条は「技術に固執しない」
          </h3>
          <p className="leading-loose text-[#6E5B4A]">
            エンジニアに相談すると、難しい言葉と一緒に「技術的にすごい解決策」が返ってくる——
            そんな経験はありませんか。私は逆です。会社にとって本当に必要なものを見極めて、
            ときには「それ、システム化しないほうがいいですよ」とも言います。
            ツールを作ることではなく、困りごとが消えることがゴールだからです。
          </p>
        </div>

        <div className="rounded-3xl border-2 border-dashed border-[#E4D6C3] p-7 text-center md:p-9">
          <p className="mb-6 leading-loose text-[#6E5B4A]">
            ストレングスファインダー®では、上位10資質のうち8つが
            <span className="font-bold text-[#33261C]">「人間関係構築力」</span>の領域でした。
          </p>

          <div className="mb-4 flex flex-wrap justify-center gap-2.5">
            {strengthsTop10.map((strength) =>
              strength.relationship ? (
                <span
                  key={strength.rank}
                  className="rounded-full bg-[#B37A4C] px-4 py-2 text-sm font-bold text-[#FFFDF9]"
                >
                  {strength.rank}. {strength.name}
                </span>
              ) : (
                <span
                  key={strength.rank}
                  className="rounded-full border border-[#E4D6C3] bg-[#FFFDF9] px-4 py-2 text-sm text-[#8A7461]"
                >
                  {strength.rank}. {strength.name}
                  <span className="ml-1 text-xs">（{strength.domain}）</span>
                </span>
              )
            )}
          </div>

          <p className="mb-6 text-xs text-[#8A7461]">
            <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#B37A4C]" />
            が「人間関係構築力」の資質（8/10）
          </p>

          <p className="mb-4 text-sm leading-relaxed text-[#8A7461]">
            技術者なのに、診断上は「人と話して価値を出すタイプ」。
            非エンジニアの方との相性の良さは、性格由来の本物です。
          </p>
          <p className="text-xs text-[#8A7461]">
            ※ CliftonStrengths®はGallup, Inc.の登録商標です
          </p>
        </div>
      </div>
    </section>
  );
}
