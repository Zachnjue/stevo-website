import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Thee Printing Hub | Branding & Printing",
  description:
    "Thee Printing Hub is a below-the-line branding and printing company in Nairobi offering corporate identity, staff uniforms, promotional merchandise, office supplies, and printing services.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
