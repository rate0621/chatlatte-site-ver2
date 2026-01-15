export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-amber-600 font-medium tracking-wider text-sm mb-4 text-center">
          ABOUT
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-12 text-center">
          自己紹介
        </h2>

        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
          <p>
            エンジニア歴10年、現在フリーランスとして活動中。
          </p>

          <p>
            システム開発 → インフラ構築 → データアナリスト → PdM → テクニカルディレクターと、キャリアの中で求められる役割に応じてスキルを拡張してきました。
          </p>

          <p>
            私の強みは<span className="marker-highlight font-semibold">「技術に固執しないこと」</span>。組織が本当に必要としているものを見極め、その場で調査・学習しながら課題解決を推進します。
          </p>

          <p>
            特に「エンジニアがいない/足りない組織」で、GTM・GA・SQL・AIツールなどを活用した業務改善・自動化を得意としています。
          </p>
        </div>
      </div>
    </section>
  );
}
