import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CursorBlob } from "@/components/ui/cursor-blob";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexin — AI Automation Studio | Lead Gen on Autopilot",
  description:
    "Nexin is the AI automation studio for operators. Our flagship lead-gen engine puts qualified meetings on your calendar — while you sleep.",
  metadataBase: new URL("https://nexin.ai"),
  openGraph: {
    title: "Nexin — AI Automation Studio",
    description:
      "Ship AI automations that actually move revenue. Starting with the lead-gen engine that books meetings while you sleep.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable}`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased">
        <ScrollProgress />
        <CursorBlob />
        {children}
      </body>
    </html>
  );
}
