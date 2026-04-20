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
  title: "Nexin — AI Automasjonsstudio | Lead Gen på Autopilot",
  description:
    "Nexin er AI-automasjonsstudioet for operatører. Vår flaggskip lead-gen-motor setter kvalifiserte møter i kalenderen din — mens du sover.",
  metadataBase: new URL("https://nexin.ai"),
  openGraph: {
    title: "Nexin — AI Automasjonsstudio",
    description:
      "Send AI-automasjoner som faktisk beveger inntekter. Starter med lead-gen-motoren som booker møter mens du sover.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="no"
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
