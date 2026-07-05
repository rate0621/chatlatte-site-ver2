interface Work {
  readonly consultation: string;
  readonly action: string;
  readonly result: string;
  readonly resultNote: string;
  /** 【要確認】業種・従業員規模（例：「メディア運営企業・従業員約50名」）を確認後に記載 */
  readonly client: string;
}

const featuredWork: Work & { readonly badge: string } = {
  badge: "ベンダーに頼んでも解決しなかった相談",
  consultation:
    "クラウドの費用が想定より高くて。ベンダーに調査してもらっているんだけど、なかなか解決しなくて…",
  action:
    "請求内容とシステム構成をこちらで調べ直し、費用が膨らんでいた原因を特定。削減の実施までやり切りました。",
  result: "原因を特定し、コスト削減を実現",
  resultNote: "「調査しましたが分かりませんでした」で終わらせないのが、社内側に立つエンジニアの仕事です",
  client: "",
};

const works: readonly Work[] = [
  {
    consultation: "コンテンツ制作に時間がかかりすぎている",
    action:
      "社内コンテンツをもとに生成AIで記事を作成し、内容確認からCMS入稿までワンクリックで完了する管理ツールを開発。",
    result: "月150時間削減",
    resultNote: "質を担保したまま、コンテンツの大量生産に成功",
    client: "",
  },
  {
    consultation: "画像素材の制作がボトルネックになっている",
    action:
      "記事のタイトルと説明文からサムネイル画像を一括生成し、CMS入稿まで自動化する機能を実装。",
    result: "1件あたり1時間削減",
    resultNote: "制作コスト削減と公開スピードの向上",
    client: "",
  },
  {
    consultation: "手作業の更新が多くて、ミスも起きやすい",
    action:
      "CMSやデータベースへの入稿をバッチ処理化し、作業を標準化・自動化。",
    result: "1件あたり30分削減",
    resultNote: "工数短縮に加えて、ヒューマンエラーも削減",
    client: "",
  },
  {
    consultation: "LPを作るたびに外注費と時間がかかる",
    action:
      "HTMLとCSSのテンプレートと制作フローを整備し、デザイナーだけでLPを量産できる体制に。",
    result: "内製化を実現",
    resultNote: "リードタイム短縮、ABテストを回せる体制に",
    client: "",
  },
  {
    consultation: "脆弱性がありそうだけど、対応できる人がいない",
    action:
      "APIキー漏洩や実装上のリスクを調査し、要件整理・社内提案・ベンダー調整まで一気通貫で対応。",
    result: "リスクを未然に防止",
    resultNote: "情報漏えいの回避と、将来の拡張性を確保",
    client: "",
  },
  {
    consultation: "クラウド費用が膨らんでいるが、誰も整理できない",
    action:
      "誰も触れず放置されていたAWS環境を、バックアップを取った上で棚卸し・除却。",
    result: "月10万円超削減",
    resultNote: "「怖くて触れない」状態から、管理できる状態へ",
    client: "",
  },
];

export function Works() {
  return (
    <section id="works" className="bg-[#F6F1E8] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display mb-4 text-center text-2xl font-bold tracking-wide text-[#33261C] md:text-3xl">
          相談から、こうなりました
        </h2>
        <p className="mb-14 text-center leading-relaxed text-[#6E5B4A]">
          どれも、最初は「ちょっと聞きたいんだけど」から始まった仕事です。
        </p>

        {/* 目玉実績：ベンダーで解決しなかった問題を解決した話 */}
        <article className="mb-6 rounded-3xl border-2 border-[#B37A4C]/50 bg-[#FFFDF9] p-7 transition-shadow hover:shadow-lg hover:shadow-[#33261C]/5 md:p-8">
          <span className="mb-5 inline-block rounded-full bg-[#B37A4C] px-4 py-1.5 text-xs font-bold text-[#FFFDF9]">
            {featuredWork.badge}
          </span>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-bold tracking-wider text-[#8A7461]">
                もらった相談
              </p>
              <p className="rounded-2xl rounded-bl-md bg-[#F1E7D8] px-4 py-3 text-sm leading-relaxed text-[#33261C]">
                「{featuredWork.consultation}」
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold tracking-wider text-[#8A7461]">
                やったこと
              </p>
              <p className="text-sm leading-relaxed text-[#6E5B4A]">
                {featuredWork.action}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold tracking-wider text-[#B37A4C]">
                結果
              </p>
              <p className="font-display text-xl font-bold leading-snug text-[#33261C]">
                {featuredWork.result}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#8A7461]">
                {featuredWork.resultNote}
              </p>
              {featuredWork.client && (
                <p className="mt-2 text-xs text-[#8A7461]">{featuredWork.client}</p>
              )}
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <article
              key={work.consultation}
              className="flex flex-col rounded-3xl border-2 border-[#E4D6C3] bg-[#FFFDF9] p-6 transition-shadow hover:shadow-lg hover:shadow-[#33261C]/5"
            >
              <div className="mb-4">
                <p className="mb-2 text-xs font-bold tracking-wider text-[#8A7461]">
                  もらった相談
                </p>
                <p className="rounded-2xl rounded-bl-md bg-[#F1E7D8] px-4 py-3 text-sm leading-relaxed text-[#33261C]">
                  「{work.consultation}」
                </p>
              </div>

              <div className="mb-5 flex-1">
                <p className="mb-2 text-xs font-bold tracking-wider text-[#8A7461]">
                  やったこと
                </p>
                <p className="text-sm leading-relaxed text-[#6E5B4A]">
                  {work.action}
                </p>
              </div>

              <div className="border-t-2 border-dashed border-[#E4D6C3] pt-4">
                <p className="mb-1 text-xs font-bold tracking-wider text-[#B37A4C]">
                  結果
                </p>
                <p className="font-display text-xl font-bold text-[#33261C]">
                  {work.result}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#8A7461]">
                  {work.resultNote}
                </p>
                {work.client && (
                  <p className="mt-2 text-xs text-[#8A7461]">{work.client}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
