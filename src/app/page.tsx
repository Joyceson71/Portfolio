import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/ui/footer";
import { TitanSvg } from "@/components/ui/titan-svg";
import { WingsSvg } from "@/components/ui/wings-svg";

export default function Home() {
  return (
    <main className="flex flex-col w-full relative z-10" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Hero />
      <TitanSvg />
      <About />
      <WingsSvg />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
