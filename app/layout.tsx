import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://koryucreatives.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KORYU Creatives — Digital Transformation, Told as One Story",
    template: "%s — KORYU Creatives",
  },
  description:
    "KORYU Creatives is a full-service digital transformation agency — website design & development, content creation, video editing, and paid ad management, built by one team as a single cohesive story.",
  keywords: [
    "digital agency",
    "website design",
    "social media content creation",
    "video editing",
    "paid ad management",
    "digital transformation",
    "brand identity",
  ],
  openGraph: {
    title: "KORYU Creatives — Digital Transformation, Told as One Story",
    description:
      "One team. One story. Website, content, video, and paid ads — built together, not fragmented across five freelancers.",
    url: siteUrl,
    siteName: "KORYU Creatives",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KORYU Creatives — Digital Transformation, Told as One Story",
    description:
      "One team. One story. Website, content, video, and paid ads — built together, not fragmented across five freelancers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink-950 font-body text-ink-50 antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <GrainOverlay />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
