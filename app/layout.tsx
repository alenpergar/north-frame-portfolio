import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northframe.studio"),
  title: {
    default: "North Frame — Premium Digital Design Studio",
    template: "%s — North Frame",
  },
  description:
    "North Frame is a premium digital design studio crafting high-end websites, landing pages, and AI-powered creative experiences for brands that refuse to look ordinary.",
  openGraph: {
    title: "North Frame — Premium Digital Design Studio",
    description:
      "High-end websites, landing pages, and AI-powered creative experiences.",
    siteName: "North Frame",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
