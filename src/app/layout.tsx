import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Ceylonaire — AI-Powered Sri Lanka Travel Itineraries",
    template: "%s | Ceylonaire",
  },
  description:
    "Plan your perfect Sri Lanka trip with Ceyla, your AI travel companion. Get personalized itineraries in seconds.",
  metadataBase: new URL("https://ceylonaire.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ceylonaire.com",
    siteName: "Ceylonaire",
    images: [
      {
        url: "/og/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Ceylonaire — AI-Powered Sri Lanka Travel Itineraries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
