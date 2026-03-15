import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CISOStartupRadar - The CISO Directory for Cybersecurity Startups",
    template: "%s | CISOStartupRadar",
  },
  description:
    "The CISO Directory to Explore, Invest and Partner with the Right Cybersecurity Startups. Verified CISO directory, curated startup intelligence, and real deal flow.",
  openGraph: {
    title: "CISOStartupRadar",
    description:
      "The CISO Directory to Explore, Invest and Partner with the Right Cybersecurity Startups",
    url: "https://cisostartupradar.com",
    siteName: "CISOStartupRadar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(instrumentSerif.variable, dmSans.variable)}
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
