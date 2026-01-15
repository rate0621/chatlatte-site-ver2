import { Toaster } from "@/app/components/ui/sonner";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Services } from "@/app/components/Services";
import { Works } from "@/app/components/Works";
import { Skills } from "@/app/components/Skills";
import { WhyMe } from "@/app/components/WhyMe";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <Hero />
      <About />
      <Services />
      <Works />
      <Skills />
      <WhyMe />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}
