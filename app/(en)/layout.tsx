import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { htmlLang } from "@/lib/i18n";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata("en");

// One root layout per locale, which is what lets each language ship the
// correct <html lang>. Next.js supports this through route groups as long as
// there is no app/layout.tsx above them.
export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the pre-paint intro script sets data-intro on
    // <html> before React hydrates (see components/sell/loader.tsx), which React
    // would otherwise report as an attribute mismatch on a return visit.
    <html
      lang={htmlLang.en}
      data-scroll-behavior="smooth"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
