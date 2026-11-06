import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/privacy-policy";
import { getDict } from "@/lib/i18n";
import { privacyMetadata } from "@/lib/metadata";

const locale = "sl" as const;

export const metadata: Metadata = privacyMetadata(locale);

export default function Privacy() {
  return <PrivacyPolicy dict={getDict(locale)} locale={locale} />;
}
