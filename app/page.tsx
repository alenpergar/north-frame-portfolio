import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { Approach } from "@/components/approach";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <Services />
        <Approach />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
