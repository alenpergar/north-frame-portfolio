// Organization + WebSite JSON-LD for the homepage. Every value here already
// appears on the site itself (logo, social links in the footer) — nothing is
// invented. `dangerouslySetInnerHTML` is the pattern Next.js documents for
// JSON-LD: this is a server component rendering static, deterministic JSON,
// so server and client output are identical and hydration never runs against
// this node's contents.
import { SITE as SITE_URL } from "@/lib/metadata";
import { htmlLang, locales } from "@/lib/i18n";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "DRYPOINT",
      url: SITE_URL,
      logo: `${SITE_URL}/drypoint-logo-dark.png`,
      // Official studio profiles only. A personal profile does not belong here.
      sameAs: ["https://www.instagram.com/drypointcreative/"],
    },
    {
      "@type": "WebSite",
      name: "DRYPOINT",
      url: SITE_URL,
      inLanguage: locales.map((l) => htmlLang[l]),
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
