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
  title: "Comendador | Computer Engineer",
  description: "Professional portfolio of Christian John Comendador, a Computer Engineering graduate specializing in IoT, embedded systems, networks, and technical design.",
  keywords: ["Comendador", "Christian John Comendador", "Computer Engineer", "Computer Engineering", "IoT", "Embedded Systems", "Next.js Portfolio"],
  authors: [{ name: "Comendador" }],
  openGraph: {
    title: "Comendador | Computer Engineer",
    description: "Professional Computer Engineering portfolio showing skills, projects, and contact info.",
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
      <body className="bg-bg-dark text-black min-h-screen flex flex-col selection:bg-primary/30 selection:text-black">
        {children}
      </body>
    </html>
  );
}
