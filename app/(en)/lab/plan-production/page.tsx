import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { PlanExperience } from "@/components/plan/plan-experience";
import { SPACES } from "@/components/plan/plan-data";
import { CONCEPT_TEXT, FORM_TYPES } from "@/components/plan/plan-content";
import { getDict, type Dict } from "@/lib/i18n";

// THE PLAN in the production shell (layout, header, footer, form), built on
// components/plan. A test route: not linked, not indexed, and / and /sl are
// untouched. Delete this folder to remove it.
export const metadata: Metadata = {
  title: "THE PLAN (production test)",
  robots: { index: false, follow: false },
};

const EMAIL = "hello@drypointcreative.com";

export default function PlanProductionTest() {
  const dict = getDict("en");
  // Page-local, the global dictionary is untouched: header and footer link to
  // the plan's spaces the way they will on the homepage ("/#work" works from
  // every page), and the form offers only the options for a website inquiry.
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
      <Nav dict={planDict} locale="en" path="/" />
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
      <Footer dict={planDict} locale="en" />
    </>
  );
}
