const problems = [
  "この毎月の手作業、AIでどうにかならない？",
  "テキスト修正とバナー差し替えだけで、7万円の見積もりが来たんだけど…",
  "ベンダーの見積もり、これって妥当？どうしてこんなにお金かかるの？",
  "AWSの請求、なんでこんなに高いの？",
  "前の担当者が作った仕組み、誰も触れなくて…",
  "GA4もGTMも、設定したまま放置になってる",
] as const;

export function Problems() {
  return (
    <section className="bg-[#FFFDF9] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display mb-4 text-center text-2xl font-bold tracking-wide text-[#33261C] md:text-3xl">
          たとえば、こんな「ちょっと」
        </h2>
        <p className="mb-12 text-center leading-relaxed text-[#6E5B4A]">
          ベンダーに頼むほどじゃない。でも、社内に聞ける人がいない。
          <br className="hidden md:block" />
          そのサイズの困りごとを引き受けるのが、私の仕事です。
        </p>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div
              key={problem}
              className={`rounded-3xl border-2 border-[#E4D6C3] bg-[#F6F1E8] px-6 py-5 leading-relaxed text-[#33261C] ${
                index % 2 === 0 ? "rounded-bl-md" : "rounded-br-md"
              }`}
            >
              「{problem}」
            </div>
          ))}
        </div>

        {/* ヒーローの会話と対になる返し */}
        <div className="mb-10 flex justify-center">
          <div className="rounded-3xl rounded-br-md bg-[#B37A4C] px-7 py-4">
            <p className="font-display font-bold text-[#FFFDF9]">
              お、それくらいなら、やっておきますよ。
            </p>
          </div>
        </div>

        <p className="text-center leading-loose text-[#6E5B4A]">
          こう返すのが、私の仕事です。ぜんぶ
          <span className="font-bold text-[#33261C]">「ちょっと」のままで構いません。</span>
          <br />
          大きな案件にまとめる必要はありません。見積もりの読み方の解説から、その場でできる修正まで、
          相談されたところから必要なぶんだけ動きます。
        </p>
      </div>
    </section>
  );
}
