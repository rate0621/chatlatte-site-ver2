"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const proofBadges = [
  { label: "AI自動化で", value: "月150時間", suffix: "削減" },
  { label: "クラウド費", value: "月10万円超", suffix: "削減" },
  { label: "エンジニア歴", value: "10年", suffix: "" },
] as const;

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWorks = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#F6F1E8] px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      {/* ラテアート風の円モチーフ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-44 h-96 w-96 rounded-full border-[54px] border-[#B37A4C]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border-[38px] border-[#B37A4C]/5"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* 会話：訪問者の悩みの代弁から始める */}
        <div className="mb-10 max-w-2xl animate-fade-in-up">
          <div className="mb-4 w-fit rounded-3xl rounded-bl-md border-2 border-[#E4D6C3] bg-[#FFFDF9] px-6 py-4">
            <p className="mb-1 text-xs tracking-wider text-[#8A7461]">
              エンジニアがいない会社で、よくある悩み
            </p>
            <p className="leading-relaxed text-[#33261C]">
              「『これ、システムでなんとかならない？』って聞ける相手が、社内にいない」
            </p>
          </div>
          <div className="ml-auto w-fit rounded-3xl rounded-br-md bg-[#B37A4C] px-6 py-3.5">
            <p className="font-display font-bold text-[#FFFDF9]">
              その相談、私が聞きます。
            </p>
          </div>
        </div>

        {/* 宣言 */}
        <h1 className="font-display mb-5 text-3xl font-bold leading-[1.55] tracking-wide text-[#33261C] animate-fade-in-up animation-delay-100 md:text-5xl md:leading-[1.5]">
          エンジニアがいない会社の、
          <br />
          <span className="text-[#B37A4C]">「最初のエンジニア」</span>です。
        </h1>

        <p className="mb-8 max-w-2xl leading-loose text-[#6E5B4A] animate-fade-in-up animation-delay-200 md:text-lg">
          要件も、専門用語もいりません。課題の整理から実装まで、
          社内側に立って一緒に進めます。山形から、全国の会社へ。
        </p>

        {/* 証拠バッジ */}
        <div className="mb-10 flex flex-wrap gap-3 animate-fade-in-up animation-delay-300">
          {proofBadges.map((badge) => (
            <div
              key={badge.value}
              className="rounded-full border-2 border-[#E4D6C3] bg-[#FFFDF9] px-5 py-2.5 text-sm text-[#6E5B4A]"
            >
              {badge.label}{" "}
              <span className="text-base font-bold text-[#33261C]">
                {badge.value}
              </span>
              {badge.suffix}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start gap-5 animate-fade-in-up animation-delay-400 sm:flex-row sm:items-center">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="group rounded-full bg-[#33261C] px-8 py-7 text-base font-bold text-[#F6F1E8] shadow-lg shadow-[#33261C]/20 transition-all hover:bg-[#4A382B] hover:shadow-xl"
          >
            コーヒー1杯分、話しませんか（30分・無料）
            <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
          <button
            onClick={scrollToWorks}
            className="cursor-pointer border-b border-[#33261C]/40 pb-0.5 text-sm font-medium text-[#33261C] transition-colors hover:border-[#B37A4C] hover:text-[#B37A4C]"
          >
            実績を見る
          </button>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[#8A7461] animate-fade-in-up animation-delay-500">
          売り込みはしません。「何を頼めばいいか分からない」段階で大丈夫です。
        </p>
      </div>
    </section>
  );
}
