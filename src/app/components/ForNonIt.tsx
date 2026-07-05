const nonItExamples = [
  "予約台帳と顧客リストが、紙とExcelでバラバラ",
  "毎月の売上集計は、営業後に手作業",
  "リピート率は、なんとなくの肌感覚だけ",
  "同じ情報を、帳簿とソフトに二重入力",
] as const;

export function ForNonIt() {
  return (
    <section className="bg-[#33261C] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display mb-6 text-2xl font-bold leading-relaxed tracking-wide text-[#F6F1E8] md:text-3xl">
          「うちはIT企業じゃないから、関係ない」
          <br />
          と思った方へ
        </h2>
        <p className="mb-10 leading-loose text-[#C9B7A4]">
          治療院、クリニック、小売店、飲食店、士業の事務所——。
          <br className="hidden md:block" />
          ITの会社でなくても、予約も、お金も、顧客の管理も、もう仕事はITの上に乗っています。
        </p>

        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {nonItExamples.map((example) => (
            <div
              key={example}
              className="rounded-2xl border border-[#5C4A3B] bg-[#3E2E22] px-5 py-4 text-sm leading-relaxed text-[#F6F1E8]"
            >
              {example}
            </div>
          ))}
        </div>

        <p className="mb-3 leading-loose text-[#F6F1E8]">
          こうした毎日の面倒は、エンジニアがひとりつくだけで
          <span className="font-bold text-[#E0A96D]">思ったより減ります。</span>
        </p>
        <p className="text-sm leading-loose text-[#C9B7A4]">
          専任で雇う必要はありません。
          「うちみたいな業種でも頼めるの？」の確認だけのご連絡も、歓迎です。
        </p>
      </div>
    </section>
  );
}
