import type { Metadata } from "next";
import "./globals.css";
import { Antic_Didone, Inter, Literata, Parisienne } from "next/font/google";
import siteData from "../data";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageShell from "@/components/PageShell";
import Navbar from "@/components/sections/Navbar";
import Sidebar from "@/components/sections/Sidebar";

const anticDidone = Antic_Didone({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-snippet",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-palanquin",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reading",
});

export const metadata: Metadata = {
  title: "Intersecting Lines",
  description:
    "A creative space for poems, stories, and reflections on philosophy — where thoughts meet emotions, and words search for meaning.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anticDidone.variable} ${parisienne.variable} ${inter.variable} ${literata.variable}`}
      suppressHydrationWarning
    >
      <body className="manuscript-background bg-[#F5F5F0] dark:bg-[#1E1E1E] transition-colors duration-300 antialiased">
        <ThemeProvider>
          <Navbar />
          <Sidebar />
          <PageShell>{children}</PageShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
