export function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12 text-center">
          About
        </h2>
        
        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
          <p>
            エンジニア歴10年、現在フリーランスとして活動中。
          </p>
          
          <p>
            システム開発 → インフラ構築 → データアナリスト → PdM → テクニカルディレクターと、キャリアの中で求められる役割に応じてスキルを拡張してきました。
          </p>
          
          <p>
            私の強みは「技術に固執しないこと」。組織が本当に必要としているものを見極め、その場で調査・学習しながら課題解決を推進します。
          </p>
          
          <p>
            特に「エンジニアがいない/足りない組織」で、GTM・GA・SQL・AIツールなどを活用した業務改善・自動化を得意としています。
          </p>
        </div>
      </div>
    </section>
  );
}
