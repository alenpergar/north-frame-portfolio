import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { Approach } from "@/components/approach";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getDict } from "@/lib/i18n";

const locale = "sl" as const;

export default function Home() {
  const dict = getDict(locale);

  return (
    <>
      <Nav dict={dict} locale={locale} path="/" />
      <main>
        <Hero dict={dict} />
        <SelectedWork dict={dict} locale={locale} />
        <Services dict={dict} />
        <Approach dict={dict} />
        <Process dict={dict} />
        <About dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
