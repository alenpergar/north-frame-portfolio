import type { Metadata } from "next";
import { CaseStudyZilavec } from "@/components/case-study-zilavec";
import { getDict } from "@/lib/i18n";
import { caseStudyMetadata } from "@/lib/metadata";

const locale = "en" as const;

export const metadata: Metadata = caseStudyMetadata(locale);

export default function HiseZilavecCaseStudy() {
  return <CaseStudyZilavec dict={getDict(locale)} locale={locale} />;
}
