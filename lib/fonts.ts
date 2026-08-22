import { Fraunces, Manrope } from "next/font/google";

// Shared by both root layouts so the two locales load one identical font set
// rather than two competing instances.
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const fontVariables = `${fraunces.variable} ${manrope.variable}`;
