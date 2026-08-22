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
    <html
      lang={htmlLang.en}
      data-scroll-behavior="smooth"
      className={fontVariables}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
