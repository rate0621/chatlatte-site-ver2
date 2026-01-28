export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-12 text-center">
          自己紹介
        </h2>

        <div className="prose prose-lg max-w-none text-[#6b7280] leading-relaxed space-y-6">
          <p>
            山形県を拠点に、フリーランスとして活動中。エンジニア歴10年。
          </p>

          <p>
            システム開発 → インフラ構築 → データアナリスト → PdM → テクニカルディレクターと、キャリアの中で求められる役割に応じてスキルを拡張してきました。
          </p>

          <p>
            私の強みは<span className="marker-highlight font-semibold text-[#4a5568]">「技術に固執しないこと」</span>。組織が本当に必要としているものを見極め、その場で調査・学習しながら課題解決を推進します。
          </p>

          <p>
            特に「エンジニアがいない/足りない組織」で、GTM・GA・SQL・AIツールなどを活用した業務改善・自動化を得意としています。
          </p>
        </div>
      </div>
    </section>
  );
}
