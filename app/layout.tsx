import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "P6 / SECRET SCAN — Fuites de secrets GitHub",
  description: "P6 — Scanner de fuites de secrets dans les repos open-source publics. Patterns DB_PASSWORD, API_KEY, AWS_SECRET. Anonymisé.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
