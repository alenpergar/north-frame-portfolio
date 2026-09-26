import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/motion-primitives";
import { FilmFrame } from "@/components/video/film-frame";
import { StatusLine } from "@/components/video/status-line";
import { campaigns, formatDuration, type Campaign } from "@/lib/media";
import type { Dict } from "@/lib/i18n";

function FilmMeta({ campaign, dict, line }: { campaign: Campaign; dict: Dict; line: string }) {
  return (
    <Reveal delay={0.15} className="mt-4 space-y-2">
      <StatusLine
        name={campaign.name}
        status={dict.status[campaign.status]}
        detail={formatDuration(campaign.duration)}
      />
      <p className="max-w-md text-sm text-ink-muted leading-relaxed">{line}</p>
    </Reveal>
  );
}

/**
 * The work. One featured story film given the full width, then the two social
 * films as an offset vertical pair. PULSE lives in the hero and is not
 * repeated here.
 */
export function Commercials({ dict }: { dict: Dict }) {
  const t = dict.commercials;
  const { snap, proda, matcha } = campaigns;

  return (
    <section id="work" className="relative py-28 md:py-44">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading title={t.title} />

        <div className="mt-14 md:mt-20">
          <FilmFrame
            campaign={snap}
            dict={dict}
            sizes="(min-width: 1360px) 1232px, (min-width: 1024px) 88vw, 92vw"
          />
          <FilmMeta campaign={snap} dict={dict} line={t.lines.snap} />
        </div>

        <div className="mt-28 md:mt-44">
          <Reveal>
            <h3 className="text-2xl font-medium tracking-[-0.02em] text-ink md:text-3xl">
              {t.feedTitle}
            </h3>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-20 md:mt-14 md:grid-cols-12 md:gap-8">
            <Parallax
              amount={24}
              desktopOnly
              className="relative w-[85%] md:col-span-4 md:col-start-2 md:w-auto"
            >
              <FilmFrame
                campaign={proda}
                dict={dict}
                sizes="(min-width: 768px) 30vw, 85vw"
              />
              <FilmMeta campaign={proda} dict={dict} line={t.lines.proda} />
            </Parallax>

            <Parallax
              amount={-24}
              desktopOnly
              className="relative ml-auto w-[85%] md:col-span-4 md:col-start-8 md:ml-0 md:mt-40 md:w-auto"
            >
              <FilmFrame
                campaign={matcha}
                dict={dict}
                sizes="(min-width: 768px) 30vw, 85vw"
              />
              <FilmMeta campaign={matcha} dict={dict} line={t.lines.matcha} />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
