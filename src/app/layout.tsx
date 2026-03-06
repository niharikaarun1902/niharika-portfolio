import type { Metadata } from "next";
import { Inter, Fraunces, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-comic",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Niharika Arun – Data Engineer & Analyst",
  description:
    "Portfolio of Niharika Arun — Purdue MSBAIM, former Deloitte USI Data Engineer. SQL, Python, BigQuery, ETL, and scalable data pipelines.",
  openGraph: {
    title: "Niharika Arun – Data Engineer & Analyst",
    description:
      "Practical AI, built end to end. Explore projects, skills, and experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${fredoka.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
