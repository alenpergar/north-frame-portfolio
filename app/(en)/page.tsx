import { Nav } from "@/components/nav";
import { StructuredData } from "@/components/structured-data";
import { Hero } from "@/components/hero";
import { Opening } from "@/components/cinematic/opening";
import { TheLens } from "@/components/cinematic/the-lens";
import { ScrollTimelineProvider } from "@/components/cinematic/scroll-timeline-provider";
import { PauseBeat } from "@/components/cinematic/pause-beat";
import { Commercials } from "@/components/commercials";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { DigitalWork } from "@/components/digital-work";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
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
          <ScrollTimelineProvider>
            <Opening />
            <TheLens />
            <Hero dict={dict} />
          </ScrollTimelineProvider>
          <Commercials dict={dict} />
          <Capabilities dict={dict} />
          <Process dict={dict} />
          <DigitalWork dict={dict} locale={locale} />
          <PauseBeat />
          <Pricing dict={dict} />
          <Faq dict={dict} />
          <Closing dict={dict} />
        </main>
        <Footer dict={dict} locale={locale} />
      </FilmPlayerProvider>
    </PlaybackProvider>
  );
}
