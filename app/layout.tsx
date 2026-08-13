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
  metadataBase: new URL("https://www.drypointcreative.com"),
  title: {
    default: "DRYPOINT — Premium Digital Design Studio",
    template: "%s — DRYPOINT",
  },
  description:
    "DRYPOINT is a premium digital design studio crafting high-end websites, landing pages, and AI-powered creative experiences for brands that refuse to look ordinary.",
  openGraph: {
    title: "DRYPOINT — Premium Digital Design Studio",
    description:
      "High-end websites, landing pages, and AI-powered creative experiences.",
    siteName: "DRYPOINT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DRYPOINT — Premium Digital Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRYPOINT — Premium Digital Design Studio",
    description:
      "High-end websites, landing pages, and AI-powered creative experiences.",
    images: ["/og-image.png"],
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
