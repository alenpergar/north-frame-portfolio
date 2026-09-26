import { Geist, Geist_Mono } from "next/font/google";

// One family for everything: Geist for display and body, Geist Mono only for
// the small metadata lines under the films (status, duration). Shared by both
// root layouts so the two locales load one identical font set.
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${geist.variable} ${geistMono.variable}`;
