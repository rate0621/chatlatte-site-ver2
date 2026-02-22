import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Strengths } from "@/app/components/Strengths";
import { Services } from "@/app/components/Services";
import { Works } from "@/app/components/Works";
import { Skills } from "@/app/components/Skills";
import { WhyMe } from "@/app/components/WhyMe";
import { Contact } from "@/app/components/Contact";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Strengths />
      <Services />
      <Works />
      <Skills />
      <WhyMe />
      <Contact />
    </>
  );
}
