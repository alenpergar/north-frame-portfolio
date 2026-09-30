import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { PlanExperience } from "@/components/plan/plan-experience";
import { SPACES } from "@/components/plan/plan-data";
import { CONCEPT_TEXT, FORM_TYPES } from "@/components/plan/plan-content";
import { getDict, type Dict } from "@/lib/i18n";

const locale = "en" as const;
const EMAIL = "hello@drypointcreative.com";

/**
 * The homepage is THE PLAN (components/plan), in the site's own shell. Wired
 * the same way as /lab/plan-production, which stays as the reference until
 * this has been verified in production.
 */
export default function Home() {
  const dict = getDict(locale);
  // Page-local; the global dictionary is untouched: header and footer link to
  // the plan's spaces ("/#work" from every page), and the form offers only the
  // options for a website inquiry.
  const spaces = SPACES.filter((sp) => sp.id !== "home").map((sp) => ({ to: `/#${sp.id}`, label: sp.label }));
  const planDict: Dict = {
    ...dict,
    nav: { ...dict.nav, links: spaces },
    footer: { ...dict.footer, links: spaces },
    contact: { ...dict.contact, projectTypes: dict.contact.projectTypes.filter((t) => FORM_TYPES.includes(t.value)) },
  };
  const price = (name: string) => dict.pricing.items.find((i) => i.name === name)!;

  return (
    <>
      <StructuredData />
      <Nav dict={planDict} locale={locale} path="/" />
      <main>
        <PlanExperience
          home="/"
          copy={{
            title: dict.digital.description,
            cta: dict.nav.cta,
            status: { client: dict.status.client, concept: dict.status.concept },
            projects: {
              zilavec: dict.digital.zilavec.description,
              vivelle: dict.digital.vivelle.description,
              ...CONCEPT_TEXT,
            },
            pricing: ["Web Design & Development", "Custom Projects"].map((n) => ({ name: price(n).name, price: price(n).price })),
            email: EMAIL,
            privacy: { label: dict.privacy.title, href: "/privacy" },
            form: planDict,
          }}
        />
      </main>
      <Footer dict={planDict} locale={locale} />
    </>
  );
}
