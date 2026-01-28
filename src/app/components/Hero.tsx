import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWorks = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center px-6 py-20 bg-[#fafbfa] relative overflow-hidden noise-bg">
      {/* Soft decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#5BBFB3]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#5BBFB3]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-3xl">
          {/* Logo */}
          <img
            src="/chatlatte_logo.png"
            alt="chatlatte"
            className="h-8 md:h-10 mb-8 animate-fade-in-up"
          />

          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#4a5568] leading-[1.2] mb-8 animate-fade-in-up animation-delay-100">
            <span className="marker-highlight">「ちょっと聞いていい？」</span>
            <br />
            から始まる課題解決
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#6b7280] leading-relaxed mb-10 animate-fade-in-up animation-delay-200">
            「結局どうすればいいの？」に答えるのが得意です。
            <br className="hidden md:block" />
            組織の技術まわりの困りごと、一緒に解決しませんか。
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-[#5BBFB3] hover:bg-[#4AA99E] text-white px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all group"
            >
              お問い合わせ
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={scrollToWorks}
              size="lg"
              variant="outline"
              className="border-2 border-[#5BBFB3]/30 bg-white hover:bg-[#5BBFB3]/5 text-[#4a5568] px-8 py-6 text-lg rounded-full shadow-sm hover:shadow-md transition-all"
            >
              実績を見る
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce animation-delay-600">
        <ChevronDown className="w-8 h-8 text-[#5BBFB3]" />
      </div>
    </section>
  );
}
