import { Hero } from "@/app/components/Hero";
import { Problems } from "@/app/components/Problems";
import { ForNonIt } from "@/app/components/ForNonIt";
import { Works } from "@/app/components/Works";
import { Services } from "@/app/components/Services";
import { Process } from "@/app/components/Process";
import { Persona } from "@/app/components/Persona";
import { LatestPosts } from "@/app/components/LatestPosts";
import { Contact } from "@/app/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <ForNonIt />
      <Works />
      <Services />
      <Process />
      <Persona />
      <LatestPosts />
      <Contact />
    </>
  );
}
