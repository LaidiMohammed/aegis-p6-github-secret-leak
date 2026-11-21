import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
const monoFont = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono", display: "swap" });
const displayFont = Inter({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-display", display: "swap" });
import "./globals.css";
export const metadata: Metadata = {
  title: "P6 / SECRET SCAN — Fuites de secrets GitHub",
  description: "P6 — Scanner de fuites de secrets dans les repos open-source publics. Patterns DB_PASSWORD, API_KEY, AWS_SECRET. Anonymisé.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr" className={`${monoFont.variable} ${displayFont.variable}`}><body>{children}</body></html>;
}
