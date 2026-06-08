import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comendador | Full Stack Software Engineer",
  description: "Professional portfolio of Comendador, a Full Stack Software Engineer specializing in Next.js, React, TypeScript, and clean modern web architectures.",
  keywords: ["Comendador", "Software Engineer", "Full Stack Developer", "Next.js Portfolio", "React Developer", "TypeScript"],
  authors: [{ name: "Comendador" }],
  openGraph: {
    title: "Comendador | Full Stack Software Engineer",
    description: "Professional software engineering portfolio showing skills, projects, and contact info.",
    type: "website",
    locale: "en_US",
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-bg-dark text-white min-h-screen flex flex-col selection:bg-primary/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
