import { Nav } from "@/components/nav";
import { StructuredData } from "@/components/structured-data";
import { Hero } from "@/components/hero";
import { Commercials } from "@/components/commercials";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { DigitalWork } from "@/components/digital-work";
import { Closing } from "@/components/closing";
import { Footer } from "@/components/footer";
import { PlaybackProvider } from "@/components/video/playback-provider";
import { FilmPlayerProvider } from "@/components/video/film-player-provider";
import { getDict } from "@/lib/i18n";

const locale = "en" as const;

export default function Home() {
  const dict = getDict(locale);

  return (
    <PlaybackProvider>
      <FilmPlayerProvider dict={dict}>
        <StructuredData />
        <Nav dict={dict} locale={locale} path="/" />
        <main>
          <Hero dict={dict} />
          <Commercials dict={dict} />
          <Capabilities dict={dict} />
          <Process dict={dict} />
          <DigitalWork dict={dict} locale={locale} />
          <Closing dict={dict} />
        </main>
        <Footer dict={dict} locale={locale} />
      </FilmPlayerProvider>
    </PlaybackProvider>
  );
}
