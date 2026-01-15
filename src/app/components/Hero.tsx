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
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-slate-50 text-slate-800 relative">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          「ちょっと聞いていい？」から<br />始まる課題解決
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          「結局どうすればいいの？」に答えるのが得意です。<br />
          組織の技術まわりの困りごと、一緒に解決しませんか。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all group"
          >
            お問い合わせ
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={scrollToWorks}
            size="lg"
            variant="outline"
            className="border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-8 py-6 text-lg rounded-full shadow-sm hover:shadow-md transition-all"
          >
            実績を見る
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-slate-400" />
      </div>
    </section>
  );
}
