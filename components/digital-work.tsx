import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { StatusLine } from "@/components/video/status-line";
import { localePath, type Dict, type Locale } from "@/lib/i18n";

const ZILAVEC_CASE_STUDY = "/work/hise-zilavec";
// Static concept export served from public/ through the rewrite in next.config.ts.
const VIVELLE_SITE = "/vivelle-beauty";

function Action({ label }: { label: string }) {
  return (
    <span className="mt-4 inline-flex items-center gap-2 text-sm text-ink transition-colors duration-[240ms] group-hover:text-ink-muted">
      {label}
      <ArrowUpRight
        size={14}
        aria-hidden
        className="transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </span>
  );
}

/**
 * The second discipline, deliberately smaller than the films: two still
 * frames, no video. The client site leads, the concept sits offset beside it.
 */
export function DigitalWork({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.digital;

  return (
    <section id="digital" className="relative border-t border-border py-28 md:py-40">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading title={t.title} description={t.description} />

        <div className="mt-14 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <Link href={localePath(locale, ZILAVEC_CASE_STUDY)} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <Image
                  src="/images/work/zilavec-hero.jpg"
                  alt={t.zilavec.alt}
                  fill
                  sizes="(min-width: 1360px) 720px, (min-width: 768px) 56vw, 92vw"
                  className="object-cover object-left transition-transform duration-[900ms] ease-cinematic group-hover:scale-[1.02]"
                />
              </div>
              <StatusLine
                name={t.zilavec.title}
                status={dict.status.client}
                detail={dict.status.website}
                className="mt-4"
              />
              <p className="mt-2 max-w-md text-sm text-ink-muted leading-relaxed">
                {t.zilavec.description}
              </p>
              <Action label={t.zilavec.action} />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:mt-24">
            <a href={VIVELLE_SITE} target="_blank" rel="noreferrer" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src="/images/work/vivelle-hero.jpg"
                  alt={t.vivelle.alt}
                  fill
                  sizes="(min-width: 1360px) 420px, (min-width: 768px) 32vw, 92vw"
                  className="object-cover transition-transform duration-[900ms] ease-cinematic group-hover:scale-[1.02]"
                />
              </div>
              <StatusLine
                name={t.vivelle.title}
                status={dict.status.concept}
                detail={dict.status.website}
                className="mt-4"
              />
              <p className="mt-2 max-w-md text-sm text-ink-muted leading-relaxed">
                {t.vivelle.description}
              </p>
              <Action label={t.vivelle.action} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
